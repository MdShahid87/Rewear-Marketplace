const STYLES = {
  pending: 'bg-amber-100 text-amber-900',
  negotiating: 'bg-sky-100 text-sky-900',
  accepted: 'bg-emerald-100 text-emerald-900',
  shipped: 'bg-indigo-100 text-indigo-900',
  completed: 'bg-forest/15 text-forest',
  rejected: 'bg-red-100 text-red-800',
}

export default function SwapStatusBadge({ status }) {
  return (
    <span className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${STYLES[status] || 'bg-stone-100'}`}>
      {status}
    </span>
  )
}
