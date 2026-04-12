import { useEffect, useMemo, useState } from 'react';
import api from '../services/api';

const subjects = ['DSA', 'DBMS', 'OS', 'CN'];
const statuses = ['not-started', 'in-progress', 'completed'];

function Topics() {
  const [topics, setTopics] = useState([]);
  const [search, setSearch] = useState('');
  const [filterSubject, setFilterSubject] = useState('All');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const loadTopics = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter !== 'all') {
        params.append('status', statusFilter);
      }

      const response = await api.get(`/topics?${params.toString()}`);
      setTopics(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Unable to load topics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTopics();
  }, [statusFilter]);

  const filteredTopics = useMemo(() => {
    return topics.filter((topic) => {
      const matchesSubject = filterSubject === 'All' || topic.subject === filterSubject;
      const matchesSearch = topic.title.toLowerCase().includes(search.toLowerCase());
      return matchesSubject && matchesSearch;
    });
  }, [topics, filterSubject, search]);

  const handleUpdate = async (id, changes) => {
    try {
      const response = await api.put(`/topics/${id}`, changes);
      setTopics((prev) => prev.map((topic) => (topic._id === id ? response.data : topic)));
      setMessage('Topic updated successfully');
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update topic');
      setMessage('');
    }
  };

  return (
    <div className="container-fluid px-4">
      <div className="d-flex justify-content-between align-items-center mb-4 mt-3">
        <div>
          <h1 className="h2 mb-1 text-dark">Topics</h1>
          <p className="text-muted mb-0">Manage your interview topics and track status.</p>
        </div>
      </div>

      {message && <div className="alert alert-success alert-dismissible fade show" role="alert">
        {message}
        <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
      </div>}

      {error && <div className="alert alert-danger alert-dismissible fade show" role="alert">
        <strong>Error:</strong> {error}
        <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
      </div>}

      <div className="alert alert-info border-0 bg-light">
        <div className="d-flex align-items-center">
          <i className="bi bi-info-circle-fill text-info me-2"></i>
          <div>
            <strong>Info:</strong> Topics are preloaded for each subject. Use the status dropdown to update progress for a topic.
          </div>
        </div>
      </div>

      <div className="row mb-4 g-3">
        <div className="col-lg-4 col-md-6">
          <div className="input-group">
            <span className="input-group-text bg-light border-end-0">
              <i className="bi bi-search"></i>
            </span>
            <input
              className="form-control border-start-0 ps-0"
              placeholder="Search topics..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <select className="form-select" value={filterSubject} onChange={(e) => setFilterSubject(e.target.value)}>
            <option value="All">All Subjects</option>
            {subjects.map((subject) => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>
        </div>
        <div className="col-lg-4 col-md-6">
          <select className="form-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="all">All Status</option>
            <option value="not-started">Not Started</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      <div className="card shadow-sm border-0">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th className="border-0 fw-semibold">Subject</th>
                <th className="border-0 fw-semibold">Title</th>
                <th className="border-0 fw-semibold">Status</th>
                <th className="border-0 fw-semibold">Notes</th>
                <th className="border-0 fw-semibold">Resources</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center py-5">
                    <div className="d-flex justify-content-center">
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : filteredTopics.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-5 text-muted">
                    <div>
                      <i className="bi bi-search fs-1 text-muted mb-3"></i>
                      <p className="mb-0">No topics found matching your criteria.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredTopics.map((topic) => (
                  <tr key={topic._id} className="align-middle">
                    <td>
                      <span className="badge bg-primary-subtle text-primary fw-semibold px-3 py-1">
                        {topic.subject}
                      </span>
                    </td>
                    <td className="fw-medium">{topic.title}</td>
                    <td>
                      <select
                        className="form-select form-select-sm"
                        value={topic.status}
                        onChange={(e) => handleUpdate(topic._id, { status: e.target.value })}
                      >
                        {statuses.map((status) => (
                          <option key={status} value={status}>
                            {status === 'not-started' ? 'Not Started' :
                             status === 'in-progress' ? 'In Progress' : 'Completed'}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="text-muted small">
                      {topic.notes || <span className="text-muted fst-italic">No notes</span>}
                    </td>
                    <td>
                      {topic.resources ? (
                        <a
                          href={topic.resources}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm btn-outline-primary"
                        >
                          <i className="bi bi-link-45deg me-1"></i>
                          View
                        </a>
                      ) : (
                        <span className="text-muted fst-italic small">No resources</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Topics;
