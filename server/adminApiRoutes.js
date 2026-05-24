import { pool } from "./db.js";
import { adminMiddleware } from "./authMiddleware.js";
import { registerAdminBlogRoutes } from "./blogRoutes.js";
import { registerAdminRouteRoutes } from "./routePageRoutes.js";
import { registerAdminReferenceRoutes } from "./referenceRoutes.js";
import { registerAdminGuideRoutes } from "./guideRoutes.js";

/**
 * @param {import('express').Express} app
 */
export function registerAdminRoutes(app) {
  app.get("/api/admin/stats/overview", adminMiddleware, async (req, res) => {
    try {
      const [
        users,
        tickets,
        orders,
        paidSum,
        ticketPay,
        orderStatus,
      ] = await Promise.all([
        pool.query(`SELECT COUNT(*)::int AS c FROM users`),
        pool.query(`SELECT COUNT(*)::int AS c FROM tickets`),
        pool.query(`SELECT COUNT(*)::int AS c FROM orders`),
        pool.query(
          `SELECT COALESCE(SUM(total_price), 0)::numeric AS s FROM tickets WHERE payment_status = 'paid'`
        ),
        pool.query(
          `SELECT payment_status, COUNT(*)::int AS c FROM tickets GROUP BY payment_status`
        ),
        pool.query(
          `SELECT status, COUNT(*)::int AS c FROM orders GROUP BY status`
        ),
      ]);

      res.json({
        users: users.rows[0]?.c ?? 0,
        tickets: tickets.rows[0]?.c ?? 0,
        orders: orders.rows[0]?.c ?? 0,
        revenuePaidTickets: paidSum.rows[0]?.s ?? "0",
        ticketsByPaymentStatus: Object.fromEntries(
          ticketPay.rows.map((r) => [r.payment_status || "unknown", r.c])
        ),
        ordersByStatus: Object.fromEntries(
          orderStatus.rows.map((r) => [r.status || "unknown", r.c])
        ),
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: e.message || "Stats failed" });
    }
  });

  app.get(
    "/api/admin/stats/timeseries",
    adminMiddleware,
    async (req, res) => {
      const days = Math.min(
        90,
        Math.max(7, parseInt(String(req.query.days || "30"), 10) || 30)
      );
      const intervalSql = `${days} days`;

      try {
        const [usersTs, ticketsTs, revenueTs] = await Promise.all([
          pool.query(
            `SELECT (created_at AT TIME ZONE 'UTC')::date AS d, COUNT(*)::int AS c
             FROM users
             WHERE created_at >= NOW() - $1::interval
             GROUP BY 1 ORDER BY 1`,
            [intervalSql]
          ),
          pool.query(
            `SELECT (created_at AT TIME ZONE 'UTC')::date AS d, COUNT(*)::int AS c
             FROM tickets
             WHERE created_at >= NOW() - $1::interval
             GROUP BY 1 ORDER BY 1`,
            [intervalSql]
          ),
          pool.query(
            `SELECT (payment_paid_at AT TIME ZONE 'UTC')::date AS d,
                    COALESCE(SUM(total_price), 0)::numeric AS s
             FROM tickets
             WHERE payment_status = 'paid'
               AND payment_paid_at IS NOT NULL
               AND payment_paid_at >= NOW() - $1::interval
             GROUP BY 1 ORDER BY 1`,
            [intervalSql]
          ),
        ]);

        res.json({
          days,
          usersPerDay: usersTs.rows.map((r) => ({
            date: r.d,
            count: r.c,
          })),
          ticketsPerDay: ticketsTs.rows.map((r) => ({
            date: r.d,
            count: r.c,
          })),
          revenuePerDay: revenueTs.rows.map((r) => ({
            date: r.d,
            sum: r.s,
          })),
        });
      } catch (e) {
        console.error(e);
        res.status(500).json({ error: e.message || "Timeseries failed" });
      }
    }
  );

  registerAdminBlogRoutes(app);
  registerAdminRouteRoutes(app);
  registerAdminReferenceRoutes(app);
  registerAdminGuideRoutes(app);
}
