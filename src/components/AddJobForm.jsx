import React, { useState } from 'react';

export default function AddJobForm({ onAdd }) {
    const [formData, setFormData] = useState({
        company: '',
        role: '',
        status: 'Applied',
        notes: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.company || !formData.role) return;

        onAdd(formData);
        setFormData({ company: '', role: '', status: 'Applied', notes: '' });
    };

    return (
        <div className="card" style={{ marginBottom: 'var(--spacing-xl)' }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: 'var(--spacing-md)', fontWeight: 'bold' }}>Add New Application</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-md">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)' }}>
                    <div>
                        <label className="text-sm font-bold" style={{ display: 'block', marginBottom: '0.25rem' }}>Company Name</label>
                        <input
                            type="text"
                            className="input"
                            placeholder="e.g. Google"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <label className="text-sm font-bold" style={{ display: 'block', marginBottom: '0.25rem' }}>Role</label>
                        <input
                            type="text"
                            className="input"
                            placeholder="e.g. Frontend Engineer"
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            required
                        />
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 'var(--spacing-md)' }}>
                    <div>
                        <label className="text-sm font-bold" style={{ display: 'block', marginBottom: '0.25rem' }}>Status</label>
                        <select
                            className="input"
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        >
                            <option value="Applied">Applied</option>
                            <option value="Interview">Interview</option>
                            <option value="Offer">Offer</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-sm font-bold" style={{ display: 'block', marginBottom: '0.25rem' }}>Notes (Optional)</label>
                        <input
                            type="text"
                            className="input"
                            placeholder="Referral, thoughts, etc."
                            value={formData.notes}
                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        />
                    </div>
                </div>

                <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
                    Add Application
                </button>
            </form>
        </div>
    );
}
