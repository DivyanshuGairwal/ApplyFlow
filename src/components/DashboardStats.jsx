import React from 'react';

export default function DashboardStats({ jobs }) {
    const stats = {
        total: jobs.length,
        applied: jobs.filter(j => j.status === 'Applied').length,
        interview: jobs.filter(j => j.status === 'Interview').length,
        offer: jobs.filter(j => j.status === 'Offer').length,
        rejected: jobs.filter(j => j.status === 'Rejected').length,
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-xl)' }}>
            <StatCard label="Total Applications" value={stats.total} />
            <StatCard label="In Progress" value={stats.applied + stats.interview} color="var(--primary)" />
            <StatCard label="Offers" value={stats.offer} color="var(--status-offer-text)" bg="var(--status-offer)" />
            <StatCard label="Rejected" value={stats.rejected} color="var(--status-rejected-text)" bg="var(--status-rejected)" />
        </div>
    );
}

function StatCard({ label, value, color, bg }) {
    return (
        <div className="card" style={{ background: bg || 'var(--bg-card)' }}>
            <p className="text-muted text-sm" style={{ marginBottom: '0.25rem' }}>{label}</p>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: color || 'var(--text-main)' }}>{value}</p>
        </div>
    );
}
