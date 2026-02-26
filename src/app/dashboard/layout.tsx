export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-slate-800 text-white p-6 hidden md:block">
        <h2 className="text-2xl font-bold mb-8 text-blue-400">AdminPanel</h2>
<nav className="space-y-4">
  <a href="/dashboard" className="block hover:text-blue-300 transition">📊 Dashboard</a>
  <a href="/dashboard/add-product" className="block hover:text-blue-300 transition">➕ Add Product</a>
</nav>

      </aside>

      <main className="flex-1 overflow-y-auto p-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-xl font-semibold">Welcome, Admin!</h1>
          <button className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
        </header>
        {children}
      </main>
    </div>
  );
}
