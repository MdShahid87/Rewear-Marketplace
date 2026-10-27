import Loader from '../components/common/Loader'
import SwapRequestCard from '../components/swap/SwapRequestCard'
import { useAuth } from '../hooks/useAuth'
import { useSwapRequests } from '../hooks/useSwapRequests'
import { updateSwapStatus } from '../services/swapService'

export default function SwapRequestsPage() {
  const { user } = useAuth()
  const { swaps, loading, refresh } = useSwapRequests()

  const onStatus = async (id, status) => {
    await updateSwapStatus(id, status, user.id)
    refresh()
  }

  const incoming = swaps.filter((swap) => swap.toUserId === user.id)
  const outgoing = swaps.filter((swap) => swap.fromUserId === user.id)

  if (loading) return <Loader label="Loading swap inbox…" />

  return (
    <div className="page-enter mx-auto max-w-4xl px-4 py-10">
      <h1 className="font-display text-4xl text-forest">Swap requests</h1>
      <p className="mt-2 text-muted">Accept, reject, negotiate, and track each exchange from pending through handover.</p>

      <section className="mt-8 space-y-4">
        <h2 className="font-display text-2xl">Incoming</h2>
        {incoming.length === 0 && <p className="text-sm text-muted">No incoming requests yet.</p>}
        {incoming.map((swap) => (
          <SwapRequestCard key={swap.id} swap={swap} currentUserId={user.id} onStatus={onStatus} />
        ))}
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="font-display text-2xl">Sent</h2>
        {outgoing.length === 0 && <p className="text-sm text-muted">You have not proposed a swap yet.</p>}
        {outgoing.map((swap) => (
          <SwapRequestCard key={swap.id} swap={swap} currentUserId={user.id} onStatus={onStatus} />
        ))}
      </section>
    </div>
  )
}
