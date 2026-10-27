import { Leaf, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Button from "../common/Button";
const linkClass = ({ isActive }) =>
  `rounded-full px-3 py-1.5 text-sm transition ${
    isActive ? "bg-forest text-sand" : "text-ink/80 hover:bg-white"
  }`;

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const links = user
    ? [
        { to: "/browse", label: "Listings" },
        { to: "/swaps", label: "Swap requests" },
        { to: "/chat", label: "Chat" },
        { to: "/dashboard", label: "Dashboard" },
        ...(isAdmin ? [{ to: "/admin", label: "Admin" }] : []),
      ]
    : [
        { to: "/browse", label: "Browse" },
        { to: "/login", label: "Login" },
      ];

  return (
    <header className="sticky top-0 z-40 border-b border-forest/10 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link to="/" className="flex items-center gap-2 text-forest">
          <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-forest text-sand">
            <Leaf size={18} />
          </span>
          <span>
            <span className="block font-display text-xl leading-none">
              ReWear
            </span>
            <span className="text-[11px] uppercase tracking-[0.18em] text-muted">
              Swap, don&apos;t shop
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              <Button onClick={() => navigate("/listings/new")}>
                List an item
              </Button>
              <Link to="/profile" className="flex items-center gap-2">
                <img
                  src={user.avatar}
                  alt=""
                  className="h-9 w-9 rounded-full object-cover"
                />
              </Link>
              <Button
                variant="ghost"
                onClick={() => logout().then(() => navigate("/"))}
              >
                Sign out
              </Button>
            </>
          ) : (
            <Button onClick={() => navigate("/register")}>Join ReWear</Button>
          )}
        </div>

        <button
          className="rounded-full p-2 md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="space-y-2 border-t border-forest/10 px-4 py-3 md:hidden">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className="block rounded-2xl px-3 py-2 hover:bg-white"
            >
              {link.label}
            </NavLink>
          ))}
          {user && (
            <Button
              className="w-full"
              onClick={() => {
                setOpen(false);
                navigate("/listings/new");
              }}
            >
              List an item
            </Button>
          )}
        </div>
      )}
    </header>
  );
}
