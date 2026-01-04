import React from 'react';

export default function ThemeToggle({ theme, toggleTheme }) {
    return (
        <button
            onClick={toggleTheme}
            className="btn btn-outline"
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
            {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </button>
    );
}
