import React from 'react';
import ThemeToggle from './ThemeToggle';

export default function Header({ theme, toggleTheme }) {
  return (
    <header style={{
      background: 'var(--bg-card)',
      borderBottom: '1px solid var(--border)',
      padding: 'var(--spacing-md) 0'
    }}>
      <div className="container flex items-center justify-between">
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ color: 'var(--primary)' }}>Apply</span>Flow
        </h1>
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      </div>
    </header>
  );
}
