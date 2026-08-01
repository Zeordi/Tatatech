import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { NAV_LINKS } from '../../../utils/constants.js';
import { Button } from '../ui/Button.jsx';
import { ThemeToggle } from '../ui/ThemeToggle.jsx';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/80 backdrop-blur dark:bg-background/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center" aria-label="TATATECH home">
          <img src="/TATA.png" alt="TATATECH" className="h-11 w-auto" />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `relative px-3 py-2 text-sm font-medium transition-colors ${
                  isActive ? 'text-primary' : 'text-text-secondary hover:text-primary'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  {isActive ? (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-primary"
                    />
                  ) : null}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button as={Link} to="/contact" variant="accent" className="hidden sm:inline-flex">
            Get a Quote
          </Button>
          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-border lg:hidden"
            aria-expanded={open}
            aria-label="Open menu"
            onClick={() => setOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <>
            <motion.button
              type="button"
              aria-label="Close menu overlay"
              className="fixed inset-0 z-[60] bg-slate-950/40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              className="fixed inset-y-0 right-0 z-[70] flex h-full w-80 flex-col border-l border-border bg-background p-6 shadow-xl lg:hidden"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="font-heading text-lg font-bold">Menu</span>
                <button
                  type="button"
                  aria-label="Close menu"
                  className="rounded-lg p-2 hover:bg-surface-alt"
                  onClick={() => setOpen(false)}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex flex-1 flex-col gap-1" aria-label="Mobile">
                {NAV_LINKS.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * index }}
                  >
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        `block rounded-lg px-3 py-3 text-base font-medium ${
                          isActive
                            ? 'bg-primary-light text-primary dark:bg-primary/20'
                            : 'text-text-secondary hover:bg-surface-alt'
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  </motion.div>
                ))}
              </nav>
              <Button as={Link} to="/contact" variant="accent" className="w-full">
                Get a Quote
              </Button>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
