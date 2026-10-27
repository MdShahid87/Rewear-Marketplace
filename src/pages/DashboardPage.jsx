import { Link } from 'react-router-dom'
import ClothingGrid from '../components/clothing/ClothingGrid'
import SwapStatusBadge from '../components/swap/SwapStatusBadge'
import { useAuth } from '../hooks/useAuth'
import { useClothing } from '../hooks/useClothing'
import { useSwapRequests } from '../hooks/useSwapRequests'

export default function DashboardPage() {
  const { user } = useAuth()
  const { items } = useClothing({ ownerId: user.id })
  const { swaps } = useSwapRequests()
  const liveListings = items.filter((item) => item.status !== 'removed')
  const completed = swaps.filter((swap) => swap.status === 'completed').length
  const open = swaps.filter((swap) => !['completed', 'rejected'].includes(swap.status)).length

  return (
    <div className="page-enter space-y-8">
      <header>
        <p className="text-xs uppercase tracking-[0.2em] text-muted">Your wardrobe</p>
        <h1 className="font-display text-4xl text-forest">Hello, {user.name.split(' ')[0]}</h1>
        <p className="mt-2 text-muted">{user.city} · {user.bio}</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Active listings" value={liveListings.filter((i) => i.status === 'available').length} />
        <Stat label="Open swaps" value={open} />
        <Stat label="Completed swaps" value={completed} />
      </div>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-2xl">Your listings</h2>
          <Link className="text-sm text-forest underline" to="/listings/new">Add clothing</Link>
        </div>
        <ClothingGrid items={liveListings} />
      </section>

      <section>
        <h2 className="mb-3 font-display text-2xl">Recent swap activity</h2>
        <div className="space-y-2">
          {swaps.slice(0, 5).map((swap) => (
            <Link key={swap.id} to={`/chat/${swap.id}`} className="flex items-center justify-between rounded-2xl bg-white px-4 py-3">
              <span className="text-sm">
                {swap.offeredItem?.title} ↔ {swap.requestedItem?.title}
              </span>
              <SwapStatusBadge status={swap.status} />
            </Link>
          ))}
          {swaps.length === 0 && <p className="text-sm text-muted">No swaps yet — browse listings to propose one.</p>}
        </div>
      </section>
    </div>
  )
}

function Stat({ label, value }) {
  return (
    <div className="rounded-3xl bg-white p-5">
      <p className="text-xs uppercase tracking-widest text-muted">{label}</p>
      <p className="mt-2 font-display text-4xl text-forest">{value}</p>
    </div>
  )
}
