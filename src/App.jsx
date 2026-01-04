import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import DashboardStats from './components/DashboardStats';
import AddJobForm from './components/AddJobForm';
import JobFilter from './components/JobFilter';
import JobCard from './components/JobCard';

const API_URL = 'http://localhost:5000/api/jobs';

function App() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [editingJob, setEditingJob] = useState(null);
  const [theme, setTheme] = useState('light');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load theme from localStorage (keep theme local)
  useEffect(() => {
    const savedTheme = localStorage.getItem('applyFlow_theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('applyFlow_theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  // Fetch jobs from backend
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Failed to fetch jobs');
      const data = await response.json();
      setJobs(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addJob = async (job) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(job)
      });
      if (!response.ok) throw new Error('Failed to add job');
      const newJob = await response.json();
      setJobs([newJob, ...jobs]);
    } catch (err) {
      alert('Error adding job: ' + err.message);
    }
  };

  const deleteJob = async (id) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      try {
        const response = await fetch(`${API_URL}/${id}`, {
          method: 'DELETE'
        });
        if (!response.ok) throw new Error('Failed to delete job');
        setJobs(jobs.filter(job => job.id !== id));
      } catch (err) {
        alert('Error deleting job: ' + err.message);
      }
    }
  };

  const updateJobStatus = async (id, newStatus) => {
    try {
      // Optimistic update
      const previousJobs = [...jobs];
      setJobs(jobs.map(job =>
        job.id === id ? { ...job, status: newStatus } : job
      ));

      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) {
        setJobs(previousJobs); // Revert on failure
        throw new Error('Failed to update status');
      }
    } catch (err) {
      alert('Error updating status: ' + err.message);
    }
  };

  const startEditing = (job) => {
    setEditingJob(job);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const updateJob = async (updatedJobData) => {
    try {
      const response = await fetch(`${API_URL}/${editingJob.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedJobData)
      });

      if (!response.ok) throw new Error('Failed to update job');
      const updatedJob = await response.json();

      setJobs(jobs.map(job =>
        job.id === editingJob.id ? updatedJob : job
      ));
      setEditingJob(null);
    } catch (err) {
      alert('Error updating job: ' + err.message);
    }
  };

  const cancelEdit = () => {
    setEditingJob(null);
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="App">
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main className="container">
        <DashboardStats jobs={jobs} />

        <AddJobForm
          onAdd={addJob}
          editingJob={editingJob}
          onUpdate={updateJob}
          onCancel={cancelEdit}
        />

        <div className="flex justify-between items-center" style={{ marginBottom: 'var(--spacing-md)' }}>
          <h2 className="font-bold" style={{ fontSize: '1.5rem' }}>Your Applications ({filteredJobs.length})</h2>
          {loading && <span className="text-muted">Loading...</span>}
          {error && <span style={{ color: 'var(--status-rejected-text)' }}>Error: {error}</span>}
        </div>

        <JobFilter
          onFilterChange={setStatusFilter}
          onSearchChange={setSearchTerm}
        />

        {filteredJobs.length === 0 && !loading ? (
          <div className="card" style={{ textAlign: 'center', padding: 'var(--spacing-xl)', color: 'var(--text-muted)' }}>
            <p>No applications found.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 'var(--spacing-md)' }}>
            {filteredJobs.map(job => (
              <JobCard
                key={job.id}
                job={job}
                onDelete={deleteJob}
                onUpdateStatus={updateJobStatus}
                onEdit={startEditing}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
