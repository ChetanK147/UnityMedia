import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DocumentTextIcon, ClockIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

interface Quote {
  id: string;
  service_type: string;
  project_description: string;
  estimated_amount: number | null;
  status: 'draft' | 'sent' | 'approved' | 'rejected' | 'expired';
  created_at: string;
  valid_until: string | null;
}

const statusColors = {
  draft: 'bg-gray-100 text-gray-800',
  sent: 'bg-blue-100 text-blue-800',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
  expired: 'bg-yellow-100 text-yellow-800',
};

const statusIcons = {
  draft: DocumentTextIcon,
  sent: ClockIcon,
  approved: CheckCircleIcon,
  rejected: XCircleIcon,
  expired: ClockIcon,
};

export function QuotesList() {
  const { user } = useAuth();
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuotes();
  }, [user]);

  const fetchQuotes = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('quotes')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setQuotes(data || []);
    } catch (error: any) {
      toast.error('Failed to fetch quotes');
      console.error('Error fetching quotes:', error);
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
        <h1 className="text-3xl font-bold text-gray-900">My Quotes</h1>
        <p className="text-gray-600 mt-2">
          Track your quote requests and their status
        </p>
      </div>

      {quotes.length === 0 ? (
        <div className="text-center py-12">
          <DocumentTextIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No quotes yet</h3>
          <p className="text-gray-600 mb-6">
            Request a quote for your next project
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white px-6 py-3 rounded-lg font-semibold transition-all"
          >
            Request Quote
          </motion.button>
        </div>
      ) : (
        <div className="space-y-6">
          {quotes.map((quote) => {
            const StatusIcon = statusIcons[quote.status];
            
            return (
              <motion.div
                key={quote.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <StatusIcon className="w-6 h-6 text-gray-400 mr-3" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {quote.service_type}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Requested {format(new Date(quote.created_at), 'MMM dd, yyyy')}
                      </p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[quote.status]}`}>
                    {quote.status.toUpperCase()}
                  </span>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-600 mb-2">Project Description</p>
                  <p className="text-gray-900 line-clamp-2">{quote.project_description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {quote.estimated_amount && (
                    <div>
                      <p className="text-sm font-medium text-gray-600">Estimated Amount</p>
                      <p className="text-gray-900 font-semibold">AED {quote.estimated_amount.toLocaleString()}</p>
                    </div>
                  )}
                  {quote.valid_until && (
                    <div>
                      <p className="text-sm font-medium text-gray-600">Valid Until</p>
                      <p className="text-gray-900">{format(new Date(quote.valid_until), 'MMM dd, yyyy')}</p>
                    </div>
                  )}
                </div>

                <div className="flex justify-end space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 text-primary-600 hover:text-primary-700 font-medium"
                  >
                    View Details
                  </motion.button>
                  {quote.status === 'approved' && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                    >
                      Accept Quote
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