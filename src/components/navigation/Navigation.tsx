'use client';
import { useState } from 'react';
export function Navigation({ onResidences }: { onResidences: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="navigation">
      <a href="#experience" className="wordmark" aria-label="Aurel home">
        AUREL<span className="wordmark-dot">.</span>
      </a>
      <button
        className="menu-toggle"
        aria-expanded={open}
        aria-controls="main-nav"
        onClick={() => setOpen(!open)}
      >
        {open ? 'Close' : 'Menu'} {open ? '−' : '+'}
      </button>
      <nav
        id="main-nav"
        className={open ? 'nav-links is-open' : 'nav-links'}
        aria-label="Main navigation"
      >
        <button
          onClick={() => {
            setOpen(false);
            onResidences();
          }}
        >
          Residences
        </button>
        <a href="#location" onClick={() => setOpen(false)}>
          Location
        </a>
        <a href="#availability" onClick={() => setOpen(false)}>
          Availability
        </a>
        <a href="#contact" onClick={() => setOpen(false)}>
          Contact <span aria-hidden="true">↗</span>
        </a>
      </nav>
    </header>
  );
}
