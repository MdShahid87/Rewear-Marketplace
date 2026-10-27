import { useMemo, useState } from "react";
import Button from "../components/common/Button";
import SwapStatusBadge from "../components/swap/SwapStatusBadge";
import { useAuth } from "../hooks/useAuth";
import { useStore } from "../hooks/useStore";
import { removeListing } from "../services/clothingService";
import { resetToSeed, updateStore } from "../store";
import { formatCurrency } from "../utils/formatCurrency";

export default function AdminPage() {
  const { user } = useAuth();
  const store = useStore();
  const [query, setQuery] = useState("");

  const listings = store.listings.filter((item) => item.status !== "removed");
  const kpis = useMemo(() => {
    const completed = store.swaps.filter(
      (swap) => swap.status === "completed",
    ).length;
    const conversion = store.swaps.length
      ? Math.round((completed / store.swaps.length) * 100)
      : 0;
    return {
      listings: listings.length,
      users: store.users.length,
      swaps: store.swaps.length,
      completed,
      conversion,
    };
  }, [store, listings.length]);

  const filtered = listings.filter((item) =>
    [item.title, item.brand, item.city]
      .join(" ")
      .toLowerCase()
      .includes(query.toLowerCase()),
  );

  const suspendUser = (id) => {
    if (id === user.id) return;
    updateStore((current) => ({
      ...current,
      users: current.users.filter((item) => item.id !== id),
      listings: current.listings.map((item) =>
        item.ownerId === id ? { ...item, status: "removed" } : item,
      ),
    }));
  };

  return (
    <div className="page-enter mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display text-4xl text-forest">Admin panel</h1>
      <p className="mt-2 text-muted">
        Monitor listings, users, swap activity, and disputes. Demo data lives in
        your browser.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <Kpi label="Listings" value={kpis.listings} />
        <Kpi label="Users" value={kpis.users} />
        <Kpi label="Swap requests" value={kpis.swaps} />
        <Kpi label="Successful swaps" value={kpis.completed} />
        <Kpi label="Request conversion" value={`${kpis.conversion}%`} />
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        <Button variant="secondary" onClick={resetToSeed}>
          Reset demo data
        </Button>
      </div>

      <section className="mt-10">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="font-display text-2xl">Listings</h2>
          <input
            className="rounded-full border border-stone-200 px-4 py-2 text-sm"
            placeholder="Search listings"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="overflow-x-auto rounded-3xl bg-white">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="text-xs uppercase tracking-wider text-muted">
              <tr>
                <th className="px-4 py-3">Item</th>
                <th>City</th>
                <th>Value</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} className="border-t border-sand">
                  <td className="px-4 py-3">
                    <p className="font-medium">{item.title}</p>
                    <p className="text-xs text-muted">{item.brand}</p>
                  </td>
                  <td>{item.city}</td>
                  <td>{formatCurrency(item.estimatedValue)}</td>
                  <td className="capitalize">{item.status}</td>
                  <td className="px-4">
                    <Button
                      variant="danger"
                      className="px-3 py-1.5 text-xs"
                      onClick={() => removeListing(item.id, user)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl bg-white p-5">
          <h2 className="font-display text-2xl">Users</h2>
          <ul className="mt-3 space-y-3">
            {store.users.map((member) => (
              <li
                key={member.id}
                className="flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={member.avatar}
                    alt=""
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-medium">{member.name}</p>
                    <p className="text-xs text-muted">
                      {member.email} · {member.city}
                    </p>
                  </div>
                </div>
                {member.role !== "admin" && (
                  <Button
                    variant="ghost"
                    onClick={() => suspendUser(member.id)}
                  >
                    Remove
                  </Button>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl bg-white p-5">
          <h2 className="font-display text-2xl">Swap activity</h2>
          <ul className="mt-3 space-y-3">
            {store.swaps.map((swap) => (
              <li
                key={swap.id}
                className="flex items-center justify-between text-sm"
              >
                <span>
                  {swap.id} · {swap.meetingType}
                </span>
                <SwapStatusBadge status={swap.status} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

function Kpi({ label, value }) {
  return (
    <div className="rounded-3xl bg-white p-4">
      <p className="text-xs uppercase tracking-widest text-muted">{label}</p>
      <p className="mt-1 font-display text-3xl text-forest">{value}</p>
    </div>
  );
}
