import { Leaf } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-forest/10 bg-forest text-sand">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3">
        <div>
          <div className="mb-3 flex items-center gap-2 font-display text-2xl">
            <Leaf size={18} /> ReWear
          </div>
          <p className="max-w-sm text-sm text-sand/80">
            A barter marketplace for wearable clothes. Swap locally, skip the checkout, keep fabric in circulation.
          </p>
        </div>
        <div className="text-sm">
          <p className="mb-2 font-medium">Explore</p>
          <div className="flex flex-col gap-1 text-sand/80">
            <Link to="/browse">Clothing listings</Link>
            <Link to="/register">Create an account</Link>
            <Link to="/login">Member login</Link>
          </div>
        </div>
        <div className="text-sm text-sand/80">
          <p className="mb-2 font-medium text-sand">Demo access</p>
          <p>User: demo@rewear.com / demo123</p>
          <p>Admin: admin@rewear.com / admin123</p>
        </div>
      </div>
    </footer>
  )
}
