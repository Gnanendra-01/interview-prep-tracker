import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8">
            <div className="card shadow border-0 text-center">
              <div className="card-body p-5">
                <div className="mb-4">
                  <i className="bi bi-exclamation-triangle display-1 text-warning mb-3"></i>
                  <h1 className="display-4 fw-bold text-muted mb-2">404</h1>
                  <h3 className="h4 text-dark mb-3">Page Not Found</h3>
                  <p className="lead text-muted mb-4">
                    Sorry, the page you are looking for doesn't exist or has been moved.
                  </p>
                </div>
                <Link className="btn btn-primary btn-lg px-4 py-2 fw-semibold" to="/dashboard">
                  <i className="bi bi-house-door me-2"></i>
                  Return to Dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
