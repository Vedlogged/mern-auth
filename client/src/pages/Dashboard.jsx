import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import authService from '../services/authService';
import toast, { Toaster } from 'react-hot-toast';
import { 
  HiOutlineUser, 
  HiOutlineMail, 
  HiOutlineCalendar,
  HiOutlineLogout,
  HiOutlineShieldCheck
} from 'react-icons/hi';

/**
 * Dashboard Page Component
 * Protected page that shows user profile information
 * Only accessible to authenticated users
 */
const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  /**
   * Fetch user profile on component mount
   */
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await authService.getProfile();
        setProfile(response.user);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
        toast.error('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  /**
   * Handle logout
   */
  const handleLogout = async () => {
    await logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  /**
   * Format date for display
   */
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  const displayUser = profile || user;

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster position="top-right" />

      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              <HiOutlineLogout className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 text-white mb-8">
          <div className="flex items-center space-x-4">
            <div className="bg-white/20 rounded-full p-4">
              <HiOutlineUser className="w-10 h-10" />
            </div>
            <div>
              <h2 className="text-3xl font-bold">
                Welcome back, {displayUser?.name}!
              </h2>
              <p className="text-primary-100 mt-1">
                You have successfully logged in to your account.
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Profile Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center space-x-2 mb-6">
              <HiOutlineShieldCheck className="w-6 h-6 text-green-500" />
              <h3 className="text-xl font-semibold text-gray-900">
                Profile Information
              </h3>
            </div>

            <div className="space-y-6">
              {/* Name */}
              <div className="flex items-start space-x-4">
                <div className="bg-primary-100 rounded-lg p-3">
                  <HiOutlineUser className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="text-lg font-medium text-gray-900">
                    {displayUser?.name}
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 rounded-lg p-3">
                  <HiOutlineMail className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email Address</p>
                  <p className="text-lg font-medium text-gray-900">
                    {displayUser?.email}
                  </p>
                </div>
              </div>

              {/* Member Since */}
              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 rounded-lg p-3">
                  <HiOutlineCalendar className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Member Since</p>
                  <p className="text-lg font-medium text-gray-900">
                    {formatDate(displayUser?.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Account Status Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Account Status
            </h3>

            <div className="space-y-4">
              {/* Status Item */}
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Authentication Status</span>
                </div>
                <span className="text-green-600 font-medium">Active</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700">Session Status</span>
                </div>
                <span className="text-blue-600 font-medium">Valid</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-700">Account Type</span>
                </div>
                <span className="text-purple-600 font-medium">Standard User</span>
              </div>
            </div>

            {/* Security Info */}
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Security Info</h4>
              <p className="text-sm text-gray-600">
                Your session is secured with JWT authentication. Your password is 
                securely hashed and never stored in plain text.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            API Endpoints Used
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <code className="text-sm text-primary-600 font-mono">POST /api/auth/register</code>
              <p className="text-sm text-gray-500 mt-1">User registration</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <code className="text-sm text-primary-600 font-mono">POST /api/auth/login</code>
              <p className="text-sm text-gray-500 mt-1">User authentication</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <code className="text-sm text-primary-600 font-mono">GET /api/auth/profile</code>
              <p className="text-sm text-gray-500 mt-1">Get user profile (protected)</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
