import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CalendarDaysIcon, ClockIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

interface Booking {
  id: string;
  equipment_items: string[];
  start_date: string;
  end_date: string;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  total_amount: number;
  created_at: string;
}

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  in_progress: 'bg-green-100 text-green-800',
  completed: 'bg-gray-100 text-gray-800',
  cancelled: 'bg-red-100 text-red-800',
};

const statusIcons = {
  pending: ClockIcon,
  confirmed: CheckCircleIcon,
  in_progress: CalendarDaysIcon,
  completed: CheckCircleIcon,
  cancelled: XCircleIcon,
};

export function BookingsList() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, [user]);

  const fetchBookings = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBookings(data || []);
    } catch (error: any) {
      toast.error('Failed to fetch bookings');
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
        <p className="text-gray-600 mt-2">
          Track your equipment rental bookings and their status
        </p>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-12">
          <CalendarDaysIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings yet</h3>
          <p className="text-gray-600 mb-6">
            Start by browsing our equipment and making your first booking
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white px-6 py-3 rounded-lg font-semibold transition-all"
          >
            Browse Equipment
          </motion.button>
        </div>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking) => {
            const StatusIcon = statusIcons[booking.status];
            
            return (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <StatusIcon className="w-6 h-6 text-gray-400 mr-3" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Booking #{booking.id.slice(0, 8)}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Created {format(new Date(booking.created_at), 'MMM dd, yyyy')}
                      </p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[booking.status]}`}>
                    {booking.status.replace('_', ' ').toUpperCase()}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Rental Period</p>
                    <p className="text-gray-900">
                      {format(new Date(booking.start_date), 'MMM dd')} - {format(new Date(booking.end_date), 'MMM dd, yyyy')}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Equipment Items</p>
                    <p className="text-gray-900">{booking.equipment_items.length} items</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Amount</p>
                    <p className="text-gray-900 font-semibold">AED {booking.total_amount.toLocaleString()}</p>
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 text-primary-600 hover:text-primary-700 font-medium"
                  >
                    View Details
                  </motion.button>
                  {booking.status === 'pending' && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                    >
                      Cancel
                    </motion.button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}