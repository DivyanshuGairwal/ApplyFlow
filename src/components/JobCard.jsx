import React from 'react';

const STATUS_COLORS = {
    'Applied': { bg: 'var(--status-applied)', text: 'var(--status-applied-text)' },
    'Interview': { bg: 'var(--status-interview)', text: 'var(--status-interview-text)' },
    'Offer': { bg: 'var(--status-offer)', text: 'var(--status-offer-text)' },
    'Rejected': { bg: 'var(--status-rejected)', text: 'var(--status-rejected-text)' },
};

export default function JobCard({ job, onDelete, onUpdateStatus }) {
    const { bg, text } = STATUS_COLORS[job.status] || STATUS_COLORS['Applied'];

    return (
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
            <div className="flex justify-between items-center">
                <h3 className="font-bold" style={{ fontSize: '1.25rem' }}>{job.company}</h3>
                <span className="badge" style={{ backgroundColor: bg, color: text }}>
                    {job.status}
                </span>
            </div>

            <p style={{ fontWeight: 500 }}>{job.role}</p>

            {job.notes && (
                <p className="text-muted text-sm" style={{ marginTop: '0.5rem' }}>
                    {job.notes}
                </p>
            )}

            <p className="text-muted text-sm">
                Applied on: {new Date(job.dateApplied).toLocaleDateString()}
            </p>

            <div className="flex justify-between items-center" style={{ marginTop: 'var(--spacing-md)', paddingTop: 'var(--spacing-md)', borderTop: '1px solid var(--border)' }}>
                <select
                    value={job.status}
                    onChange={(e) => onUpdateStatus(job.id, e.target.value)}
                    className="input"
                    style={{ width: 'auto', fontSize: '0.875rem', padding: '0.25rem 0.5rem' }}
                >
                    <option value="Applied">Applied</option>
                    <option value="Interview">Interview</option>
                    <option value="Offer">Offer</option>
                    <option value="Rejected">Rejected</option>
                </select>

                <button
                    onClick={() => onDelete(job.id)}
                    className="btn btn-danger text-sm"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}
