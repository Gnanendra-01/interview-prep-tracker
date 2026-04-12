import { Link, useNavigate, useLocation } from 'react-router-dom';
import { clearToken, isAuthenticated } from '../utils/auth';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const authenticated = isAuthenticated();

  const handleLogout = () => {
    clearToken();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/dashboard">
          📚 Interview Tracker
        </Link>
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {authenticated && (
              <>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${isActive('/dashboard') ? 'active fw-semibold' : ''}`}
                    to="/dashboard"
                  >
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${isActive('/topics') ? 'active fw-semibold' : ''}`}
                    to="/topics"
                  >
                    Topics
                  </Link>
                </li>
              </>
            )}
          </ul>
          <div className="d-flex gap-2">
            {!authenticated ? (
              <>
                <Link className="btn btn-outline-light btn-sm px-3" to="/login">
                  Login
                </Link>
                <Link className="btn btn-light btn-sm px-3 text-primary fw-semibold" to="/register">
                  Register
                </Link>
              </>
            ) : (
              <button className="btn btn-outline-light btn-sm px-3" onClick={handleLogout}>
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
