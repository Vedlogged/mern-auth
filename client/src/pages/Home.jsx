import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { HiOutlineShieldCheck, HiOutlineLightningBolt, HiOutlineLockClosed } from 'react-icons/hi';

/**
 * Home Page Component
 * Landing page with information about the authentication system
 */
const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-blue-100">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6">
            Secure{' '}
            <span className="text-primary-600">MERN</span>{' '}
            Authentication
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            A complete authentication system built with MongoDB, Express, React, and Node.js.
            Features secure JWT authentication, password hashing, and protected routes.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl"
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl"
                >
                  Get Started
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-primary-600 bg-white rounded-lg hover:bg-gray-50 transition-colors shadow-lg hover:shadow-xl border border-primary-200"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Key Features
          </h2>
          <p className="text-gray-600">
            Built with security and best practices in mind
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
              <HiOutlineShieldCheck className="w-7 h-7 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Secure Authentication
            </h3>
            <p className="text-gray-600">
              JWT-based authentication with HTTP-only cookies for enhanced security against XSS attacks.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
              <HiOutlineLockClosed className="w-7 h-7 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Password Protection
            </h3>
            <p className="text-gray-600">
              Passwords are securely hashed using bcrypt with salt rounds for maximum protection.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
              <HiOutlineLightningBolt className="w-7 h-7 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Fast & Responsive
            </h3>
            <p className="text-gray-600">
              Built with React and Vite for lightning-fast performance and optimal user experience.
            </p>
          </div>
        </div>
      </div>

      {/* Tech Stack Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Tech Stack
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="text-4xl mb-2">🍃</div>
              <span className="font-medium text-gray-900">MongoDB</span>
              <span className="text-sm text-gray-500">Database</span>
            </div>
            <div className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="text-4xl mb-2">⚡</div>
              <span className="font-medium text-gray-900">Express</span>
              <span className="text-sm text-gray-500">Backend</span>
            </div>
            <div className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="text-4xl mb-2">⚛️</div>
              <span className="font-medium text-gray-900">React</span>
              <span className="text-sm text-gray-500">Frontend</span>
            </div>
            <div className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="text-4xl mb-2">🟢</div>
              <span className="font-medium text-gray-900">Node.js</span>
              <span className="text-sm text-gray-500">Runtime</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            Built with ❤️ using the MERN Stack
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
