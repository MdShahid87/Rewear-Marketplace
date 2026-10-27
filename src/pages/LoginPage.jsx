import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import { useAuth } from "../hooks/useAuth";
import { validateLogin } from "../utils/validators";

export default function LoginPage() {
  const { login, busy, error, setError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  // Handle form submission and authenticate the user.
  const onSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validateLogin(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    try {
      await login(form.email, form.password);
      navigate(location.state?.from || "/dashboard", { replace: true });
    } catch {
      /* error is shown from context */
    }
  };

  const fill = (email, password) => {
    setForm({ email, password });
    setError("");
  };

  return (
    <div className="page-enter mx-auto grid max-w-5xl items-center gap-10 px-4 py-12 md:grid-cols-2">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-clay">
          Welcome back
        </p>
        <h1 className="mt-2 font-display text-4xl text-forest">
          Sign in to keep swapping.
        </h1>
        <p className="mt-3 text-muted">
          Use your ReWear account to list unused clothes, send swap requests,
          and negotiate in chat.
        </p>
      </div>
      <form
        onSubmit={onSubmit}
        className="space-y-4 rounded-3xl bg-white p-6 shadow-sm"
      >
        <Input
          id="email"
          label="Email"
          type="email"
          value={form.email}
          error={errors.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          value={form.password}
          error={errors.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <Button type="submit" className="w-full" disabled={busy}>
          {busy ? "Signing in…" : "Sign in"}
        </Button>
        <div className="flex flex-wrap gap-2 text-xs">
          <button
            type="button"
            className="rounded-full bg-sand px-3 py-1"
            onClick={() => fill("demo@rewear.com", "demo123")}
          >
            Demo user
          </button>
          <button
            type="button"
            className="rounded-full bg-sand px-3 py-1"
            onClick={() => fill("admin@rewear.com", "admin123")}
          >
            Demo admin
          </button>
        </div>
        <p className="text-sm text-muted">
          New here?{" "}
          <Link className="text-forest underline" to="/register">
            Create an account
          </Link>
        </p>
      </form>
    </div>
  );
}
