import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import { CITIES } from "../data/seed";
import { useAuth } from "../hooks/useAuth";
import { passwordStrength, validateRegister } from "../utils/validators";

export default function RegisterPage() {
  const { register, busy, error } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    city: "Mumbai",
    bio: "",
  });
  const [errors, setErrors] = useState({});

  const onSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validateRegister(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    const city = CITIES.find((item) => item.name === form.city);
    try {
      await register({ ...form, lat: city.lat, lng: city.lng });
      navigate("/dashboard");
    } catch {
      /* context error */
    }
  };

  const strength = passwordStrength(form.password);

  return (
    <div className="page-enter mx-auto max-w-xl px-4 py-12">
      <h1 className="font-display text-4xl text-forest">
        Join the swap circle.
      </h1>
      <p className="mt-2 text-muted">
        No payments. List what you no longer wear and exchange it for something
        you will.
      </p>
      <form
        onSubmit={onSubmit}
        className="mt-8 space-y-4 rounded-3xl bg-white p-6"
      >
        <Input
          label="Full name"
          value={form.name}
          error={errors.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <Input
          label="Email"
          type="email"
          value={form.email}
          error={errors.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <label className="block space-y-1.5">
          <span className="text-sm font-medium">Home city</span>
          <select
            className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-2.5 text-sm"
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
          >
            {CITIES.map((item) => (
              <option key={item.name}>{item.name}</option>
            ))}
          </select>
        </label>
        <Input
          label="Password"
          type="password"
          value={form.password}
          error={errors.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <div className="h-1.5 overflow-hidden rounded-full bg-sand">
          <div
            className="h-full bg-forest transition-all"
            style={{ width: `${(strength / 4) * 100}%` }}
          />
        </div>
        <Input
          label="Confirm password"
          type="password"
          value={form.confirmPassword}
          error={errors.confirmPassword}
          onChange={(e) =>
            setForm({ ...form, confirmPassword: e.target.value })
          }
        />
        <Input
          label="Short bio (optional)"
          as="textarea"
          rows={3}
          value={form.bio}
          onChange={(e) => setForm({ ...form, bio: e.target.value })}
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <Button type="submit" className="w-full" disabled={busy}>
          {busy ? "Creating account…" : "Create account"}
        </Button>
        <p className="text-sm text-muted">
          Already swapping?{" "}
          <Link className="text-forest underline" to="/login">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}
