'use client';

import { useCallback, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Download, Menu, X } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { ButtonLink } from '@/components/ui/Button';
import { NAV_LINKS, SITE } from '@/constants/site';
import { useLockBodyScroll, useScrolled, useScrollSpy } from '@/hooks';
import { cn, scrollToSection } from '@/lib/utils';

const SECTION_IDS = NAV_LINKS.map((link) => link.id);

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useScrolled(24);
  const activeId = useScrollSpy(SECTION_IDS);

  useLockBodyScroll(menuOpen);

  const handleNavigate = useCallback((id: string) => {
    setMenuOpen(false);
    // Let the menu close before scrolling so the target lands in the right place.
    window.setTimeout(() => scrollToSection(id), 60);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className={cn('fixed inset-x-0 top-0 z-75 transition-all duration-300', scrolled ? 'py-2.5' : 'py-4')}
      >
        <nav
          aria-label="Primary"
          className={cn(
            'container-page flex items-center justify-between gap-4 rounded-2xl transition-all duration-300',
            scrolled && 'glass-strong px-4 py-2.5 shadow-lg sm:px-5',
          )}
        >
          {/* Wordmark */}
          <a
            href="#home"
            onClick={(event) => {
              event.preventDefault();
              handleNavigate('home');
            }}
            className="group flex shrink-0 items-center gap-2.5"
            aria-label={`${SITE.name} — back to top`}
          >
            <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-[color:var(--fg)] text-sm font-bold text-[color:var(--bg)] shadow-[0_6px_20px_-6px_rgb(9_9_11_/_0.5)]">
              LS
            </span>
            <span className="hidden text-sm font-semibold tracking-tight sm:block">
              {SITE.firstName}
              <span className="text-gradient">.</span>
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => {
              const isActive = activeId === link.id;
              return (
                <li key={link.id}>
                  <a
                    href={link.href}
                    onClick={(event) => {
                      event.preventDefault();
                      handleNavigate(link.id);
                    }}
                    aria-current={isActive ? 'true' : undefined}
                    className={cn(
                      'relative rounded-lg px-3 py-2 text-[13px] font-medium transition-colors',
                      isActive
                        ? 'text-[color:var(--fg)]'
                        : 'text-muted hover:text-[color:var(--fg)]',
                    )}
                  >
                    {/* Shared layout pill slides between active items. */}
                    {isActive ? (
                      <motion.span
                        layoutId="nav-active-pill"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        className="absolute inset-0 -z-10 rounded-lg bg-brand-500/12 ring-1 ring-brand-500/25"
                      />
                    ) : null}
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle />

            <ButtonLink
              href={SITE.resumePath}
              download
              size="sm"
              variant="mono"
              className="hidden sm:inline-flex"
              aria-label="Download resume as PDF"
            >
              <Download className="h-3.5 w-3.5" aria-hidden />
              Resume
            </ButtonLink>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="grid h-10 w-10 place-items-center rounded-xl glass text-muted transition-colors hover:text-brand-400 lg:hidden"
            >
              {menuOpen ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-74 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
              onClick={() => setMenuOpen(false)}
              aria-hidden
            />

            <motion.nav
              aria-label="Mobile"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 32 }}
              className="absolute inset-y-0 right-0 flex w-[min(20rem,85vw)] flex-col gap-2 glass-strong px-6 pt-24 pb-8"
            >
              {NAV_LINKS.map((link, index) => (
                <motion.a
                  key={link.id}
                  href={link.href}
                  onClick={(event) => {
                    event.preventDefault();
                    handleNavigate(link.id);
                  }}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * index + 0.1 }}
                  className={cn(
                    'rounded-xl px-4 py-3 text-base font-medium transition-colors',
                    activeId === link.id
                      ? 'bg-brand-500/12 text-brand-400'
                      : 'text-muted hover:text-[color:var(--fg)]',
                  )}
                >
                  {link.label}
                </motion.a>
              ))}

              <ButtonLink href={SITE.resumePath} download size="md" variant="mono" className="mt-4" glow>
                <Download className="h-4 w-4" aria-hidden />
                Download Resume
              </ButtonLink>
            </motion.nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
