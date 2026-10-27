import { useState } from "react";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import { CITIES } from "../data/seed";
import { useAuth } from "../hooks/useAuth";
import { useSwapRequests } from "../hooks/useSwapRequests";

export default function ProfilePage() {
  const { user, updateProfile, busy, error } = useAuth();
  const { swaps } = useSwapRequests();
  const [form, setForm] = useState({
    name: user.name,
    bio: user.bio,
    city: user.city,
  });
  const [saved, setSaved] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    const city = CITIES.find((item) => item.name === form.city);
    await updateProfile({ ...form, lat: city.lat, lng: city.lng });
    setSaved(true);
  };

  return (
    <div className="page-enter mx-auto max-w-3xl px-4 py-10">
      <div className="flex items-center gap-4">
        <img
          src={user.avatar}
          alt=""
          className="h-20 w-20 rounded-full object-cover"
        />
        <div>
          <h1 className="font-display text-4xl text-forest">{user.name}</h1>
          <p className="text-muted">
            {user.email} · {user.role}
          </p>
        </div>
      </div>

      <form
        onSubmit={onSubmit}
        className="mt-8 space-y-4 rounded-3xl bg-white p-6"
      >
        <Input
          label="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <label className="block space-y-1.5 text-sm">
          City
          <select
            className="w-full rounded-2xl border border-stone-200 px-4 py-2.5"
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
          >
            {CITIES.map((item) => (
              <option key={item.name}>{item.name}</option>
            ))}
          </select>
        </label>
        <Input
          as="textarea"
          rows={4}
          label="Bio"
          value={form.bio}
          onChange={(e) => setForm({ ...form, bio: e.target.value })}
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        {saved && <p className="text-sm text-forest">Profile updated.</p>}
        <Button type="submit" disabled={busy}>
          Save profile
        </Button>
      </form>

      <section className="mt-8 rounded-3xl bg-white p-6">
        <h2 className="font-display text-2xl">Swap history</h2>
        <ul className="mt-3 space-y-2 text-sm">
          {swaps.map((swap) => (
            <li
              key={swap.id}
              className="flex justify-between gap-3 border-b border-sand py-2"
            >
              <span>
                {swap.offeredItem?.title} ↔ {swap.requestedItem?.title}
              </span>
              <span className="capitalize text-muted">{swap.status}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
