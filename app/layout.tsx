import '../styles/globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <header className="bg-gray-800 text-white py-4 px-6">
          <nav>
            <ul className="flex space-x-4">
              <li><a href="/">Home</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/products">Products</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </nav>
        </header>
        <main className="p-6">{children}</main>
        <footer className="bg-gray-800 text-white py-4 px-6 text-center">
          &copy; 2023 SuperStore. All rights reserved.
        </footer>
      </body>
    </html>
  )
}
