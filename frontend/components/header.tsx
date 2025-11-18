import { Button } from '@/components/ui/button'

export default function Header() {
  return (
    <header className="border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-orange-500 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">z</span>
            </div>
            <span className="font-bold text-lg">zapier</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm">
            <button className="text-gray-700 hover:text-gray-900">Products</button>
            <button className="text-gray-700 hover:text-gray-900">Solutions</button>
            <button className="text-gray-700 hover:text-gray-900">Resources</button>
            <button className="text-gray-700 hover:text-gray-900">Enterprise</button>
            <button className="text-gray-700 hover:text-gray-900">Pricing</button>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-sm text-gray-700 hover:text-gray-900">Contact sales</button>
          <button className="text-sm text-gray-700 hover:text-gray-900">Log in</button>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-6">
            Sign up
          </Button>
        </div>
      </div>
    </header>
  )
}
