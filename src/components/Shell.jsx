import { Suspense, useEffect, useState } from 'react';
import { Link, NavLink, Outlet, ScrollRestoration, useLocation } from 'react-router-dom';
import { BookOpen, Bot, Home, Library, Search, Star } from 'lucide-react';
import logo from '../assets/logo-mark.png';
import { site } from '../config/site';
import AudienceSwitcher from './AudienceSwitcher';
import CommandSearch from './CommandSearch';

const NAV = [
  { to: '/', label: 'Home', icon: Home, end: true, mobileOnly: true },
  { to: '/learn', label: 'Learn', icon: BookOpen },
  { to: '/prompts', label: 'Prompts', icon: Library },
  { to: '/agents', label: 'Agents', icon: Bot },
  { to: '/my-kit', label: 'My Kit', icon: Star },
];

export default function Shell() {
  const [searchOpen, setSearchOpen] = useState(false);
  const { pathname, hash } = useLocation();

  // Ctrl/Cmd + K or "/" opens search from anywhere.
  useEffect(() => {
    const onKey = (e) => {
      const typing = /INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName);
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !typing)) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Scroll to #anchors after lazy pages render.
  useEffect(() => {
    if (!hash) return;
    const t = setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' }), 120);
    return () => clearTimeout(t);
  }, [pathname, hash]);

  return (
    <div className="flex min-h-dvh flex-col">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[80] focus:rounded-lg focus:bg-white focus:px-3 focus:py-2">
        Skip to content
      </a>

      <header className="sticky top-0 z-50 bg-navy-deep text-white shadow-[0_1px_0_rgba(255,255,255,0.08)]">
        <div className="container-page flex h-16 items-center gap-3">
          <Link to="/" className="flex shrink-0 items-center gap-2.5" aria-label={`${site.orgName} ${site.hubName} home`}>
            <img src={logo} alt="" className="h-8 w-auto" />
            <span className="hidden border-l border-white/20 pl-2.5 font-heading text-sm font-semibold tracking-wide text-white/90 lg:inline">
              {site.hubName}
            </span>
          </Link>

          <nav className="ml-4 hidden items-center gap-1 md:flex" aria-label="Main">
            {NAV.filter((n) => !n.mobileOnly).map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                className={({ isActive }) =>
                  `relative rounded-lg px-3 py-2 font-heading text-sm font-medium transition ${
                    isActive ? 'text-white' : 'text-white/65 hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {n.label}
                    {isActive && <span className="absolute inset-x-3 -bottom-[13px] h-[3px] rounded-full bg-orange" />}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="flex h-10 items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 text-sm text-white/70 transition hover:bg-white/10 hover:text-white"
              aria-label="Search the hub"
            >
              <Search size={16} aria-hidden />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden rounded border border-white/20 px-1.5 font-mono text-[11px] text-white/50 lg:inline">Ctrl K</kbd>
            </button>
            <AudienceSwitcher />
          </div>
        </div>
      </header>

      <main id="main" className="flex-1 pb-24 md:pb-0">
        <Suspense fallback={<PageSkeleton />}>
          <Outlet />
        </Suspense>
      </main>

      <footer className="mb-16 bg-navy-deep text-white/60 md:mb-0">
        <div className="container-page flex flex-col gap-3 py-8 text-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="" className="h-7 w-auto opacity-90" />
            <span>
              © {new Date().getFullYear()} {site.orgName} · {site.hubName}
            </span>
          </div>
          <a href={`mailto:${site.contactEmail}`} className="hover:text-white">
            Questions? {site.contactEmail}
          </a>
        </div>
      </footer>

      {/* Mobile tab bar */}
      <nav
        className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-5 border-t border-white/10 bg-navy-deep pb-[env(safe-area-inset-bottom)] md:hidden"
        aria-label="Main"
      >
        {NAV.map((n) => (
          <NavLink
            key={n.to}
            to={n.to}
            end={n.end}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 py-2.5 text-[11px] font-semibold ${isActive ? 'text-orange' : 'text-white/60'}`
            }
          >
            <n.icon size={20} aria-hidden />
            {n.label}
          </NavLink>
        ))}
      </nav>

      <CommandSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
      <ScrollRestoration />
    </div>
  );
}

function PageSkeleton() {
  return (
    <div className="container-page animate-pulse py-12" aria-busy="true" aria-label="Loading">
      <div className="h-4 w-24 rounded bg-line/60" />
      <div className="mt-4 h-9 w-2/3 rounded bg-line/60" />
      <div className="mt-3 h-4 w-1/2 rounded bg-line/50" />
    </div>
  );
}
