import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { LayoutDashboard, FileText, Map, Loader2 } from "lucide-react";
import { NavLink, Navigate, Outlet } from "react-router-dom";

const nav = [
  { to: "/admin/dashboard", label: "Статистика", icon: LayoutDashboard },
  { to: "/admin/blog", label: "Блог (CMS)", icon: FileText },
  { to: "/admin/routes", label: "Маршруты (CMS)", icon: Map },
];

export default function AdminLayout() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-muted-foreground">
        <Loader2 className="h-8 w-8 animate-spin" aria-hidden />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (!user.is_admin) {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center">
        <h1 className="text-xl font-semibold">Нет доступа</h1>
        <p className="mt-2 text-muted-foreground">
          Вход в админ-панель только для пользователей с ролью администратора.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="flex">
        <aside className="sticky top-0 flex h-screen w-56 shrink-0 flex-col border-r bg-card px-3 py-6">
          <div className="mb-8 px-2">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Админ-панель
            </p>
            <p className="mt-1 truncate text-sm text-foreground">{user.email}</p>
          </div>
          <nav className="flex flex-1 flex-col gap-1">
            {nav.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )
                }
              >
                <Icon className="h-4 w-4 shrink-0" />
                {label}
              </NavLink>
            ))}
          </nav>
          <NavLink
            to="/"
            className="mt-auto rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            ← На сайт
          </NavLink>
        </aside>
        <main className="min-w-0 flex-1 p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
