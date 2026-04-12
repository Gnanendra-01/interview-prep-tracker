function SubjectCard({ subject, completed, total }) {
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  const getProgressColor = () => {
    if (percent === 0) return 'bg-secondary';
    if (percent < 50) return 'bg-warning';
    if (percent < 100) return 'bg-info';
    return 'bg-success';
  };

  return (
    <div className="col-lg-3 col-md-6 mb-4">
      <div className="card h-100 shadow-sm border-0 hover-card">
        <div className="card-body p-4 text-center">
          <div className="mb-3">
            <h5 className="card-title fw-bold text-primary mb-3">{subject}</h5>
            <div className="display-6 fw-bold text-dark mb-2">
              {completed}<span className="text-muted fs-6">/{total}</span>
            </div>
            <small className="text-muted">topics completed</small>
          </div>

          <div className="progress mb-3" style={{ height: '16px' }}>
            <div
              className={`progress-bar ${getProgressColor()} progress-bar-striped`}
              role="progressbar"
              style={{ width: `${percent}%` }}
              aria-valuenow={percent}
              aria-valuemin="0"
              aria-valuemax="100"
            >
              {percent}%
            </div>
          </div>

          <p className="small text-muted mb-0">
            {percent === 100 ? '🎉 Complete!' : `${percent}% progress`}
          </p>
        </div>
      </div>
    </div>
  );
}

export default SubjectCard;
