const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-Memory Data Store
let jobs = [
    {
        id: '1',
        company: 'Tech Corp',
        role: 'Frontend Developer',
        status: 'Applied',
        dateApplied: new Date().toISOString(),
        notes: 'Waiting for response'
    },
    {
        id: '2',
        company: 'Startup Inc',
        role: 'React Engineer',
        status: 'Interview',
        dateApplied: new Date(Date.now() - 86400000).toISOString(),
        notes: 'Technical round next week'
    }
];

// Routes

// GET /api/jobs
app.get('/api/jobs', (req, res) => {
    res.json(jobs);
});

// POST /api/jobs
app.post('/api/jobs', (req, res) => {
    const { company, role, status, notes } = req.body;

    if (!company || !role) {
        return res.status(400).json({ error: 'Company and Role are required' });
    }

    const newJob = {
        id: crypto.randomUUID(),
        company,
        role,
        status: status || 'Applied',
        dateApplied: new Date().toISOString(),
        notes: notes || ''
    };

    jobs.unshift(newJob); // Add to beginning
    res.status(201).json(newJob);
});

// PUT /api/jobs/:id
app.put('/api/jobs/:id', (req, res) => {
    const { id } = req.params;
    const { company, role, status, notes } = req.body;

    const jobIndex = jobs.findIndex(j => j.id === id);

    if (jobIndex === -1) {
        return res.status(404).json({ error: 'Job not found' });
    }

    const updatedJob = {
        ...jobs[jobIndex],
        company: company || jobs[jobIndex].company,
        role: role || jobs[jobIndex].role,
        status: status || jobs[jobIndex].status,
        notes: notes !== undefined ? notes : jobs[jobIndex].notes
    };

    jobs[jobIndex] = updatedJob;
    res.json(updatedJob);
});

// DELETE /api/jobs/:id
app.delete('/api/jobs/:id', (req, res) => {
    const { id } = req.params;
    const jobExists = jobs.some(j => j.id === id);

    if (!jobExists) {
        return res.status(404).json({ error: 'Job not found' });
    }

    jobs = jobs.filter(j => j.id !== id);
    res.status(200).json({ message: 'Job deleted successfully' });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
