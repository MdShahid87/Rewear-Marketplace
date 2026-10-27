import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function DashboardLayout() {
  const { isAdmin } = useAuth();
  // Defines the dashboard navigation links and conditionally adds the admin link.
  const links = [
    { to: "/dashboard", label: "Overview" },
    { to: "/listings/new", label: "New listing" },
    { to: "/swaps", label: "Swap inbox" },
    { to: "/chat", label: "Messages" },
    { to: "/profile", label: "Profile" },
    ...(isAdmin ? [{ to: "/admin", label: "Admin panel" }] : []),
  ];

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 lg:grid-cols-[220px_1fr]">
      <aside className="h-fit rounded-3xl bg-white p-4">
        <p className="px-3 pb-2 text-xs uppercase tracking-widest text-muted">
          Workspace
        </p>
        <nav className="flex flex-col gap-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-2xl px-3 py-2 text-sm ${isActive ? "bg-forest text-sand" : "hover:bg-sand"}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      {/* Renders the page component matched by the current nested route. */}
      <div>
        <Outlet />
      </div>
    </div>
  );
}
