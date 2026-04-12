import { useEffect, useState } from 'react';
import api from '../services/api';
import SubjectCard from '../components/SubjectCard';

const subjects = ['DSA', 'DBMS', 'OS', 'CN'];

function Dashboard() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadTopics = async () => {
      try {
        const response = await api.get('/topics');
        setTopics(response.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to load topics');
      } finally {
        setLoading(false);
      }
    };
    loadTopics();
  }, []);

  const stats = subjects.map((subject) => {
    const subjectTopics = topics.filter((topic) => topic.subject === subject);
    const completed = subjectTopics.filter((topic) => topic.status === 'completed').length;
    return { subject, completed, total: subjectTopics.length };
  });

  const total = topics.length;
  const completedTotal = topics.filter((topic) => topic.status === 'completed').length;
  const overallPercent = total > 0 ? Math.round((completedTotal / total) * 100) : 0;

  return (
    <div className="container-fluid px-4">
      <div className="d-flex justify-content-between align-items-center mb-4 mt-3">
        <div>
          <h1 className="h2 mb-1 text-dark">Dashboard</h1>
          <p className="text-muted mb-0">Track your interview preparation progress across all subjects.</p>
        </div>
      </div>

      {error && <div className="alert alert-danger alert-dismissible fade show" role="alert">
        <strong>Error:</strong> {error}
        <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
      </div>}

      {loading ? (
        <div className="d-flex justify-content-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <div className="card mb-4 shadow-sm border-0">
            <div className="card-body p-4">
              <div className="d-flex align-items-center mb-3">
                <div className="flex-grow-1">
                  <h5 className="card-title mb-2 fw-semibold">Overall Completion</h5>
                  <p className="card-text text-muted mb-0">
                    You have completed <strong>{completedTotal}</strong> out of <strong>{total}</strong> topics.
                  </p>
                </div>
                <div className="ms-3">
                  <span className="badge bg-primary fs-6 px-3 py-2">{overallPercent}%</span>
                </div>
              </div>
              <div className="progress" style={{ height: '20px' }}>
                <div
                  className="progress-bar bg-success progress-bar-striped"
                  role="progressbar"
                  style={{ width: `${overallPercent}%` }}
                  aria-valuenow={overallPercent}
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  {overallPercent}%
                </div>
              </div>
            </div>
          </div>

          <div className="row g-4">
            {stats.map((stat) => (
              <SubjectCard key={stat.subject} {...stat} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;