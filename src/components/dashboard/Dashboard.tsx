import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  HomeIcon,
  CameraIcon,
  CalendarDaysIcon,
  DocumentTextIcon,
  UserIcon,
  Cog6ToothIcon,
  ChartBarIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from '../../contexts/AuthContext';
import { BookingsList } from './BookingsList';
import { ProfileSettings } from './ProfileSettings';
import { QuotesList } from './QuotesList';

const navigation = [
  { name: 'Overview', icon: HomeIcon, id: 'overview' },
  { name: 'My Bookings', icon: CalendarDaysIcon, id: 'bookings' },
  { name: 'Quotes', icon: DocumentTextIcon, id: 'quotes' },
  { name: 'Profile', icon: UserIcon, id: 'profile' },
];

const adminNavigation = [
  { name: 'Analytics', icon: ChartBarIcon, id: 'analytics' },
  { name: 'Equipment', icon: CameraIcon, id: 'equipment' },
  { name: 'All Bookings', icon: CalendarDaysIcon, id: 'all-bookings' },
  { name: 'Settings', icon: Cog6ToothIcon, id: 'settings' },
];

export function Dashboard() {
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const isAdmin = user?.profile?.role === 'admin';

  const navItems = isAdmin ? [...navigation, ...adminNavigation] : navigation;

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <DashboardOverview />;
      case 'bookings':
        return <BookingsList />;
      case 'quotes':
        return <QuotesList />;
      case 'profile':
        return <ProfileSettings />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-sm border-r border-gray-200 min-h-screen">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900">Dashboard</h2>
            <p className="text-sm text-gray-600 mt-1">
              Welcome, {user?.profile?.full_name}
            </p>
          </div>

          <nav className="px-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === item.id
                    ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-500'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </button>
            ))}
          </nav>

          <div className="absolute bottom-4 left-4 right-4">
            <button
              onClick={signOut}
              className="w-full px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

function DashboardOverview() {
  const { user } = useAuth();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.profile?.full_name}!
        </h1>
        <p className="text-gray-600 mt-2">
          Here's what's happening with your account
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
        >
          <div className="flex items-center">
            <CalendarDaysIcon className="w-8 h-8 text-primary-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Bookings</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
        >
          <div className="flex items-center">
            <DocumentTextIcon className="w-8 h-8 text-accent-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending Quotes</p>
              <p className="text-2xl font-bold text-gray-900">2</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
        >
          <div className="flex items-center">
            <CameraIcon className="w-8 h-8 text-creative-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Equipment Used</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
        >
          <div className="flex items-center">
            <ChartBarIcon className="w-8 h-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Spent</p>
              <p className="text-2xl font-bold text-gray-900">AED 15,400</p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Booking confirmed</p>
                <p className="text-xs text-gray-500">Sony FX3 rental for Dec 15-17</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Quote received</p>
                <p className="text-xs text-gray-500">Drone filming project quote</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Payment pending</p>
                <p className="text-xs text-gray-500">Equipment rental invoice #1234</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white rounded-lg font-medium transition-all"
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              New Equipment Booking
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center px-4 py-3 border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white rounded-lg font-medium transition-all"
            >
              <DocumentTextIcon className="w-5 h-5 mr-2" />
              Request Quote
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}