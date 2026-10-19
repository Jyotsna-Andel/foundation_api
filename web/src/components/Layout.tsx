import { NavLink, Outlet } from 'react-router';

const links = [
  { to: '/books', label: 'Books' },
  { to: '/loans', label: 'Loans' },
  { to: '/members', label: 'Members' },
  { to: '/authors', label: 'Authors' },
  { to: '/categories', label: 'Categories' },
];

export function Layout() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-8 gap-y-2 px-4 py-3">
          <span className="text-lg font-semibold text-indigo-700">
            📚 Library
          </span>
          <nav className="flex flex-wrap gap-1">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `rounded-md px-3 py-1.5 text-sm font-medium ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
