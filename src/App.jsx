import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import DashboardStats from './components/DashboardStats';
import AddJobForm from './components/AddJobForm';
import JobFilter from './components/JobFilter';
import JobCard from './components/JobCard';

function App() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Load from localStorage on mount
  useEffect(() => {
    const savedJobs = localStorage.getItem('applyFlow_jobs');
    if (savedJobs) {
      try {
        setJobs(JSON.parse(savedJobs));
      } catch (e) {
        console.error('Failed to parse jobs', e);
      }
    }
  }, []);

  // Save to localStorage whenever jobs change
  useEffect(() => {
    localStorage.setItem('applyFlow_jobs', JSON.stringify(jobs));
  }, [jobs]);

  const addJob = (job) => {
    const newJob = {
      ...job,
      id: crypto.randomUUID(),
      dateApplied: new Date().toISOString()
    };
    setJobs([newJob, ...jobs]);
  };

  const deleteJob = (id) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      setJobs(jobs.filter(job => job.id !== id));
    }
  };

  const updateJobStatus = (id, newStatus) => {
    setJobs(jobs.map(job =>
      job.id === id ? { ...job, status: newStatus } : job
    ));
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="App">
      <Header />
      <main className="container">
        <DashboardStats jobs={jobs} />

        <AddJobForm onAdd={addJob} />

        <div className="flex justify-between items-center" style={{ marginBottom: 'var(--spacing-md)' }}>
          <h2 className="font-bold" style={{ fontSize: '1.5rem' }}>Your Applications ({filteredJobs.length})</h2>
        </div>

        <JobFilter
          onFilterChange={setStatusFilter}
          onSearchChange={setSearchTerm}
        />

        {filteredJobs.length === 0 ? (
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
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
