import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">LMS Platform</Link>
        <div className="space-x-4">
          <Link to="/courses" className="hover:text-blue-200">Courses</Link>
          {isAuthenticated ? (
            <>
              <Link to="/profile" className="hover:text-blue-200">Profile</Link>
              {user?.role === 'instructor' && (
                <Link to="/course/create" className="hover:text-blue-200">Create Course</Link>
              )}
              <button onClick={logout} className="hover:text-blue-200">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-200">Login</Link>
              <Link to="/signup" className="hover:text-blue-200">Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
