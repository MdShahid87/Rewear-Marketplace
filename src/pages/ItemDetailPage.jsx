import { MapPin } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ClothingCard from '../components/clothing/ClothingCard'
import SwapValueBadge from '../components/clothing/SwapValueBadge'
import Button from '../components/common/Button'
import Loader from '../components/common/Loader'
import Modal from '../components/common/Modal'
import { useAuth } from '../hooks/useAuth'
import { findUser } from '../services/api'
import { getClothing, nearbyMatches } from '../services/clothingService'
import { createSwapRequest } from '../services/swapService'
import { formatCurrency } from '../utils/formatCurrency'
import { compareSwapValues, haversineKm } from '../utils/swapValue'
import { getStore } from '../store'

export default function ItemDetailPage() {
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [offerId, setOfferId] = useState('')
  const [meetingType, setMeetingType] = useState('local')
  const [error, setError] = useState('')
  const [matches, setMatches] = useState([])

  useEffect(() => {
    let live = true
    setLoading(true)
    getClothing(id).then((data) => {
      if (!live) return
      setItem(data)
      if (data) setMatches(nearbyMatches(data, user))
      setLoading(false)
    })
    return () => {
      live = false
    }
  }, [id, user])

  if (loading) return <Loader />
  if (!item) {
    return <p className="px-4 py-16 text-center text-muted">This listing is no longer available.</p>
  }

  const owner = findUser(item.ownerId)
  const mine = user?.id === item.ownerId
  const myItems = user
    ? getStore().listings.filter((listing) => listing.ownerId === user.id && listing.status === 'available')
    : []
  const offered = myItems.find((listing) => listing.id === offerId)
  const comparison = offered
    ? compareSwapValues(offered.estimatedValue, item.estimatedValue)
    : null
  const distance = user ? haversineKm(user, item) : null

  const propose = async () => {
    setError('')
    if (!user) {
      navigate('/login', { state: { from: `/items/${item.id}` } })
      return
    }
    if (!offerId) {
      setError('Choose one of your listings to offer')
      return
    }
    try {
      const swap = await createSwapRequest({
        fromUserId: user.id,
        offeredItemId: offerId,
        requestedItemId: item.id,
        meetingType,
      })
      navigate(`/chat/${swap.id}`)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="page-enter mx-auto max-w-6xl px-4 py-10">
      <div className="grid gap-8 lg:grid-cols-2">
        <img src={item.imageUrl} alt={item.title} className="aspect-[4/5] w-full rounded-[2rem] object-cover" />
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted">{item.brand} · {item.category}</p>
          <h1 className="mt-2 font-display text-4xl text-forest">{item.title}</h1>
          <div className="mt-4 flex flex-wrap gap-2">
            <SwapValueBadge value={item.estimatedValue} />
            <span className="rounded-full bg-white px-3 py-1 text-xs">{item.condition}</span>
            <span className="rounded-full bg-white px-3 py-1 text-xs">Size {item.size}</span>
            <span className="rounded-full bg-white px-3 py-1 text-xs capitalize">{item.status}</span>
          </div>
          <p className="mt-4 flex items-center gap-2 text-muted">
            <MapPin size={16} /> {item.city}
            {distance != null && ` · ${distance} km from you`}
          </p>
          <p className="mt-5 leading-relaxed text-ink/80">{item.description}</p>
          {owner && (
            <div className="mt-6 flex items-center gap-3 rounded-3xl bg-white p-4">
              <img src={owner.avatar} alt="" className="h-12 w-12 rounded-full object-cover" />
              <div>
                <p className="font-medium">{owner.name}</p>
                <p className="text-sm text-muted">{owner.city} · {owner.bio}</p>
              </div>
            </div>
          )}
          {!mine && item.status === 'available' && (
            <Button className="mt-6" onClick={() => (user ? setOpen(true) : navigate('/login', { state: { from: `/items/${item.id}` } }))}>
              Propose a swap
            </Button>
          )}
          {mine && (
            <Link to={`/listings/${item.id}/edit`} className="mt-6 inline-block">
              <Button variant="secondary">Edit listing</Button>
            </Link>
          )}
        </div>
      </div>

      <section className="mt-12">
        <h2 className="mb-4 font-display text-3xl text-forest">Fair nearby matches</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {matches.map((match) => (
            <ClothingCard key={match.id} item={match} />
          ))}
        </div>
      </section>

      <Modal open={open} onClose={() => setOpen(false)} title="Propose a swap" wide>
        {myItems.length === 0 ? (
          <p className="text-sm text-muted">
            List something from your wardrobe first.{' '}
            <Link className="underline" to="/listings/new">Add a listing</Link>
          </p>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-muted">Choose an item to offer against {item.title} ({formatCurrency(item.estimatedValue)}).</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {myItems.map((listing) => (
                <button
                  key={listing.id}
                  onClick={() => setOfferId(listing.id)}
                  className={`flex gap-3 rounded-2xl border p-2 text-left ${
                    offerId === listing.id ? 'border-forest bg-sand' : 'border-transparent bg-white'
                  }`}
                >
                  <img src={listing.imageUrl} alt="" className="h-16 w-16 rounded-xl object-cover" />
                  <div>
                    <p className="text-sm font-medium">{listing.title}</p>
                    <p className="text-xs text-muted">{formatCurrency(listing.estimatedValue)}</p>
                  </div>
                </button>
              ))}
            </div>
            {comparison && (
              <div className="rounded-2xl bg-white p-4 text-sm">
                Your offer {formatCurrency(offered.estimatedValue)} vs requested {formatCurrency(item.estimatedValue)}.
                Gap {formatCurrency(Math.abs(comparison.diff))} — {comparison.fairness === 'balanced' ? 'this looks balanced.' : 'use chat to negotiate extras or a different piece.'}
              </div>
            )}
            <label className="block text-sm">
              Exchange method
              <select
                className="mt-1 w-full rounded-2xl border border-stone-200 px-4 py-2.5"
                value={meetingType}
                onChange={(e) => setMeetingType(e.target.value)}
              >
                <option value="local">Local meetup</option>
                <option value="courier">Courier / remote</option>
              </select>
            </label>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <Button onClick={propose}>Send swap request</Button>
          </div>
        )}
      </Modal>
    </div>
  )
}
