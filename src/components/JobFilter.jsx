import React from 'react';

export default function JobFilter({ onFilterChange, onSearchChange }) {
    return (
        <div className="card flex items-center gap-md" style={{ marginBottom: 'var(--spacing-lg)' }}>
            <input
                type="text"
                placeholder="Search specific company..."
                className="input"
                onChange={(e) => onSearchChange(e.target.value)}
            />
            <select
                className="input"
                style={{ width: '200px' }}
                onChange={(e) => onFilterChange(e.target.value)}
            >
                <option value="All">All Statuses</option>
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
            </select>
        </div>
    );
}
