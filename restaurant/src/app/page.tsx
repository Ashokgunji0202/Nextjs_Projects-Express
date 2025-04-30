import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen font-sans">

      <header className="border-b bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between h-16 px-4 md:px-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-blue-600">FoodiesHub</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="/restaurant" className="hover:text-amber-600 transition-colors">Menu</Link>
            <Link href="#" className="hover:text-amber-600 transition-colors">Order</Link>
            <Link href="#" className="hover:text-amber-600 transition-colors">Book a Table</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <button className="px-4 py-2 text-sm font-semibold border rounded-md hover:bg-gray-100">Log in</button>
            </Link>
            <Link href="/signup">
              <button className="px-4 py-2 text-sm font-semibold bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Sign up
              </button>

            </Link>
          </div>
        </div>
      </header>


      <main className="flex-1 ">
        <section className="bg-amber-50 py-20 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to FoodiesHub</h1>
          <p className="text-gray-600 text-lg">Delicious meals delivered to your doorstep. Reserve your table today.</p>
        </section>

        <section className="container mx-auto px-4 py-12 " >
          <h2 className="text-2xl font-semibold mb-6">Today’s Specials</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border p-4 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-lg font-bold">Paneer Tikka</h3>
              <p className="text-sm text-gray-600">Grilled cottage cheese with Indian spices.</p>
            </div>
            <div className="border p-4 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-lg font-bold">Veg Biryani</h3>
              <p className="text-sm text-gray-600">Aromatic rice with vegetables and spices.</p>
            </div>
            <div className="border p-4 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-lg font-bold">Masala Dosa</h3>
              <p className="text-sm text-gray-600">South Indian crispy crepe with potato filling.</p>
            </div>
          </div>
        </section>
      </main>


      <footer className="border-t bg-gray-50 py-8">
        <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between text-sm text-gray-600">
          <div>
            <h4 className="font-semibold mb-2">FoodiesHub</h4>
            <p>Your go-to place for fresh, delicious food!</p>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6 md:mt-0">
            <div>
              <h4 className="font-semibold mb-2">Quick Links</h4>
              <ul>
                <li><Link href="/restaurant" className="hover:underline">Menu</Link></li>
                <li><Link href="#" className="hover:underline">Order</Link></li>
                <li><Link href="#" className="hover:underline">Book Table</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Company</h4>
              <ul>
                <li><Link href="/about" className="hover:underline">About Us</Link></li>
                <li><Link href="/contact" className="hover:underline">Contact</Link></li>
                <li><Link href="/privacy" className="hover:underline">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="text-center mt-6 text-xs text-gray-500">
          &copy; {new Date().getFullYear()} FoodiesHub. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
