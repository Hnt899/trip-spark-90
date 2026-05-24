import bcrypt from "bcryptjs";
import request from "supertest";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { onQuery, poolMock, resetPgMock } from "../mocks/pgMock";

vi.mock("../../db.js", () => ({ pool: poolMock }));
vi.mock("../../sendSms.js", () => ({ sendExolveSms: vi.fn(async () => ({ success: true })) }));
vi.mock("../../emailOtp.js", () => ({ sendEmailOtp: vi.fn(async () => undefined) }));

describe("admin api", () => {
  let userHash = "";
  let adminHash = "";

  beforeEach(async () => {
    resetPgMock();
    userHash = await bcrypt.hash("user-pass", 6);
    adminHash = await bcrypt.hash("admin-pass", 6);
  });

  async function createApp() {
    const { createTestApp } = await import("../mocks/createTestApp");
    return createTestApp();
  }

  function seedLoginQueries() {
    onQuery(/SELECT \* FROM users WHERE email = \$1/, (_sql, params) => {
      if (params?.[0] === "admin@test.dev") {
        return { rows: [{ id: "admin-1", email: "admin@test.dev", password_hash: adminHash, raw_user_meta: {}, is_admin: true }] };
      }
      return { rows: [{ id: "user-1", email: "user@test.dev", password_hash: userHash, raw_user_meta: {}, is_admin: false }] };
    });
    onQuery(/SELECT is_2fa_enabled/, () => ({ rows: [{ en: false }] }));
    onQuery(/SELECT is_admin FROM users WHERE id = \$1/, (_sql, params) => ({
      rows: [{ is_admin: params?.[0] === "admin-1" }],
    }));
  }

  it("forbids non-admin user from admin endpoints", async () => {
    seedLoginQueries();
    const app = await createApp();
    const login = await request(app).post("/api/auth/login").send({ email: "user@test.dev", password: "user-pass" });

    const res = await request(app)
      .get("/api/admin/stats/overview")
      .set("Authorization", `Bearer ${login.body.access_token}`);

    expect(res.status).toBe(403);
    expect(res.body.error).toMatch(/Admin access required/i);
  });

  it("allows admin user and returns dashboard stats", async () => {
    seedLoginQueries();
    onQuery(/SELECT COUNT\(\*\)::int AS c FROM users/, () => ({ rows: [{ c: 10 }] }));
    onQuery(/SELECT COUNT\(\*\)::int AS c FROM tickets/, () => ({ rows: [{ c: 20 }] }));
    onQuery(/SELECT COUNT\(\*\)::int AS c FROM orders/, () => ({ rows: [{ c: 15 }] }));
    onQuery(/SELECT COALESCE\(SUM\(total_price\), 0\)::numeric AS s FROM tickets WHERE payment_status = 'paid'/, () => ({
      rows: [{ s: "150000.00" }],
    }));
    onQuery(/SELECT payment_status, COUNT\(\*\)::int AS c FROM tickets GROUP BY payment_status/, () => ({
      rows: [{ payment_status: "paid", c: 12 }],
    }));
    onQuery(/SELECT status, COUNT\(\*\)::int AS c FROM orders GROUP BY status/, () => ({
      rows: [{ status: "pending", c: 3 }],
    }));

    const app = await createApp();
    const login = await request(app).post("/api/auth/login").send({ email: "admin@test.dev", password: "admin-pass" });

    const res = await request(app)
      .get("/api/admin/stats/overview")
      .set("Authorization", `Bearer ${login.body.access_token}`);

    expect(res.status).toBe(200);
    expect(res.body.users).toBe(10);
    expect(res.body.tickets).toBe(20);
  });

  it("supports admin CRUD for blog posts", async () => {
    seedLoginQueries();
    onQuery(/INSERT INTO blog_posts/, () => ({
      rows: [{ id: "post-1", slug: "test-post", title: "Test Post" }],
    }));
    onQuery(/SELECT \* FROM blog_posts WHERE id = \$1::uuid/, () => ({
      rows: [{ id: "post-1", slug: "test-post", title: "Test Post", content_blocks: [] }],
    }));
    onQuery(/UPDATE blog_posts SET/, () => ({
      rows: [{ id: "post-1", slug: "test-post-upd", title: "Updated" }],
    }));
    onQuery(/DELETE FROM blog_posts WHERE id = \$1::uuid/, () => ({ rows: [], rowCount: 1 }));

    const app = await createApp();
    const login = await request(app).post("/api/auth/login").send({ email: "admin@test.dev", password: "admin-pass" });
    const token = login.body.access_token as string;

    const createRes = await request(app)
      .post("/api/admin/blog/posts")
      .set("Authorization", `Bearer ${token}`)
      .send({
        slug: "test-post",
        title: "Test Post",
        excerpt: "excerpt",
        body_text: "hello",
      });
    expect(createRes.status).toBe(201);

    const readRes = await request(app)
      .get("/api/admin/blog/posts/id/post-1")
      .set("Authorization", `Bearer ${token}`);
    expect(readRes.status).toBe(200);

    const updateRes = await request(app)
      .patch("/api/admin/blog/posts/id/post-1")
      .set("Authorization", `Bearer ${token}`)
      .send({ slug: "test-post-upd", title: "Updated", content_blocks: [{ type: "paragraph", text: "upd" }] });
    expect(updateRes.status).toBe(200);

    const deleteRes = await request(app)
      .delete("/api/admin/blog/posts/id/post-1")
      .set("Authorization", `Bearer ${token}`);
    expect(deleteRes.status).toBe(200);
    expect(deleteRes.body.ok).toBe(true);
  });

  it("supports admin CRUD for reference posts and sections", async () => {
    seedLoginQueries();
    onQuery(/INSERT INTO reference_sections/, () => ({
      rows: [{ id: "section-1", kind: "trains", slug: "pokupka", name: "Покупка" }],
    }));
    onQuery(/FROM reference_sections\s+WHERE id = \$1::uuid/, () => ({
      rows: [{ id: "section-1", kind: "trains", parent_id: null, slug: "pokupka", name: "Покупка", sort_order: 0 }],
    }));
    onQuery(/INSERT INTO reference_posts/, () => ({
      rows: [{ id: "ref-1", kind: "trains", slug: "how-to-buy", title: "Как купить", section_id: "section-1" }],
    }));
    onQuery(/SELECT p\.\*, s\.name AS section_name, s\.slug AS section_slug/, () => ({
      rows: [
        {
          id: "ref-1",
          kind: "trains",
          slug: "how-to-buy",
          title: "Как купить",
          section_id: "section-1",
          content_blocks: [{ type: "paragraph", text: "txt" }],
        },
      ],
    }));
    onQuery(/SELECT \* FROM reference_posts WHERE id = \$1::uuid/, () => ({
      rows: [{ id: "ref-1", kind: "trains", slug: "how-to-buy", title: "Как купить", section_id: "section-1", content_blocks: [] }],
    }));
    onQuery(/UPDATE reference_posts SET/, () => ({
      rows: [{ id: "ref-1", kind: "trains", slug: "how-to-buy-upd", title: "Как купить 2", section_id: "section-1" }],
    }));
    onQuery(/DELETE FROM reference_posts WHERE id = \$1::uuid/, () => ({ rows: [], rowCount: 1 }));

    const app = await createApp();
    const login = await request(app).post("/api/auth/login").send({ email: "admin@test.dev", password: "admin-pass" });
    const token = login.body.access_token as string;

    const sectionRes = await request(app)
      .post("/api/admin/reference/sections")
      .set("Authorization", `Bearer ${token}`)
      .send({ kind: "trains", name: "Покупка", slug: "pokupka" });
    expect(sectionRes.status).toBe(201);

    const createRes = await request(app)
      .post("/api/admin/reference/posts")
      .set("Authorization", `Bearer ${token}`)
      .send({
        section_id: "section-1",
        slug: "how-to-buy",
        title: "Как купить",
        excerpt: "Коротко",
        content_blocks: [{ type: "paragraph", text: "text" }],
      });
    expect(createRes.status).toBe(201);

    const readRes = await request(app)
      .get("/api/admin/reference/posts/id/ref-1")
      .set("Authorization", `Bearer ${token}`);
    expect(readRes.status).toBe(200);

    const updateRes = await request(app)
      .patch("/api/admin/reference/posts/id/ref-1")
      .set("Authorization", `Bearer ${token}`)
      .send({ slug: "how-to-buy-upd", title: "Как купить 2", section_id: "section-1" });
    expect(updateRes.status).toBe(200);

    const deleteRes = await request(app)
      .delete("/api/admin/reference/posts/id/ref-1")
      .set("Authorization", `Bearer ${token}`);
    expect(deleteRes.status).toBe(200);
    expect(deleteRes.body.ok).toBe(true);
  });

  it("supports admin CRUD for guide posts and categories", async () => {
    seedLoginQueries();
    onQuery(/INSERT INTO guide_categories/, () => ({
      rows: [{ id: "guide-cat-1", slug: "passenger", name: "Полезно пассажиру" }],
    }));
    onQuery(/FROM guide_categories\s+WHERE id = \$1::uuid/, () => ({
      rows: [{ id: "guide-cat-1", parent_id: null, slug: "passenger", name: "Полезно пассажиру", sort_order: 0 }],
    }));
    onQuery(/INSERT INTO guide_posts/, () => ({
      rows: [{ id: "guide-1", category_slug: "passenger", slug: "how-to-buy", title: "Как купить", category_id: "guide-cat-1" }],
    }));
    onQuery(/SELECT p\.\*, c\.name AS category_name/, () => ({
      rows: [
        {
          id: "guide-1",
          category_slug: "passenger",
          slug: "how-to-buy",
          title: "Как купить",
          category_id: "guide-cat-1",
          content_blocks: [{ type: "paragraph", text: "txt" }],
        },
      ],
    }));
    onQuery(/SELECT \* FROM guide_posts WHERE id = \$1::uuid/, () => ({
      rows: [{ id: "guide-1", category_slug: "passenger", slug: "how-to-buy", title: "Как купить", category_id: "guide-cat-1", content_blocks: [] }],
    }));
    onQuery(/UPDATE guide_posts SET/, () => ({
      rows: [{ id: "guide-1", category_slug: "passenger", slug: "how-to-buy-upd", title: "Как купить 2", category_id: "guide-cat-1" }],
    }));
    onQuery(/DELETE FROM guide_posts WHERE id = \$1::uuid/, () => ({ rows: [], rowCount: 1 }));

    const app = await createApp();
    const login = await request(app).post("/api/auth/login").send({ email: "admin@test.dev", password: "admin-pass" });
    const token = login.body.access_token as string;

    const categoryRes = await request(app)
      .post("/api/admin/guide/categories")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Полезно пассажиру", slug: "passenger" });
    expect(categoryRes.status).toBe(201);

    const createRes = await request(app)
      .post("/api/admin/guide/posts")
      .set("Authorization", `Bearer ${token}`)
      .send({
        category_id: "guide-cat-1",
        slug: "how-to-buy",
        title: "Как купить",
        excerpt: "Коротко",
        content_blocks: [{ type: "paragraph", text: "text" }],
      });
    expect(createRes.status).toBe(201);

    const readRes = await request(app)
      .get("/api/admin/guide/posts/id/guide-1")
      .set("Authorization", `Bearer ${token}`);
    expect(readRes.status).toBe(200);

    const updateRes = await request(app)
      .patch("/api/admin/guide/posts/id/guide-1")
      .set("Authorization", `Bearer ${token}`)
      .send({ slug: "how-to-buy-upd", title: "Как купить 2", category_id: "guide-cat-1" });
    expect(updateRes.status).toBe(200);

    const deleteRes = await request(app)
      .delete("/api/admin/guide/posts/id/guide-1")
      .set("Authorization", `Bearer ${token}`);
    expect(deleteRes.status).toBe(200);
    expect(deleteRes.body.ok).toBe(true);
  });
});
