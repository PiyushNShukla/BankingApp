// File: app/insights/page.tsx

'use client';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/ui/Navbar';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import { 
  TrendingUp,  
  DollarSign, 
  ShoppingCart, 
  Coffee, 
  Home, 
  Car, 
  Heart, 
  Smartphone,
  Calendar,
  Download,
  Filter,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import NavbarWrapper from '@/components/wrapper/NavbarWrapper';

interface Transaction {
  id: string;
  category: string;
  amount: number;
  date: string;
  merchant: string;
  type: 'debit' | 'credit';
}

interface CategorySpending {
  category: string;
  amount: number;
  percentage: number;
  icon: any;
  color: string;
}

interface TimeRangeData {
  week: {
    transactions: Transaction[];
    categorySpending: CategorySpending[];
    totalSpent: number;
    totalIncome: number;
    monthlyTrend: { label: string; amount: number }[];
  };
  month: {
    transactions: Transaction[];
    categorySpending: CategorySpending[];
    totalSpent: number;
    totalIncome: number;
    monthlyTrend: { label: string; amount: number }[];
  };
  year: {
    transactions: Transaction[];
    categorySpending: CategorySpending[];
    totalSpent: number;
    totalIncome: number;
    monthlyTrend: { label: string; amount: number }[];
  };
}

// Dummy data generators
const generateDummyData = (): TimeRangeData => {
  return {
    week: {
      totalSpent: 6500.00,
      totalIncome: 8000.00,
      transactions: [
        { id: '1', category: 'Shopping', amount: 2499, date: '2026-01-13', merchant: 'Amazon', type: 'debit' },
        { id: '2', category: 'Food', amount: 850, date: '2026-01-12', merchant: 'Swiggy', type: 'debit' },
        { id: '3', category: 'Bills', amount: 1200, date: '2026-01-11', merchant: 'Electricity Bill', type: 'debit' },
        { id: '4', category: 'Shopping', amount: 1951, date: '2026-01-10', merchant: 'Flipkart', type: 'debit' },
      ],
      categorySpending: [
        { category: 'Shopping', amount: 4450, percentage: 68.5, icon: ShoppingCart, color: 'bg-purple-500' },
        { category: 'Food & Dining', amount: 850, percentage: 13.1, icon: Coffee, color: 'bg-orange-500' },
        { category: 'Bills & Utilities', amount: 1200, percentage: 18.4, icon: Home, color: 'bg-blue-500' },
      ],
      monthlyTrend: [
        { label: 'Mon', amount: 1200 },
        { label: 'Tue', amount: 2100 },
        { label: 'Wed', amount: 950 },
        { label: 'Thu', amount: 1300 },
        { label: 'Fri', amount: 650 },
        { label: 'Sat', amount: 300 },
      ],
    },
    month: {
      totalSpent: 28450.00,
      totalIncome: 45000.00,
      transactions: [
        { id: '1', category: 'Shopping', amount: 2499, date: '2026-01-13', merchant: 'Amazon', type: 'debit' },
        { id: '2', category: 'Income', amount: 45000, date: '2026-01-10', merchant: 'Salary Deposit', type: 'credit' },
        { id: '3', category: 'Food', amount: 850, date: '2026-01-12', merchant: 'Swiggy', type: 'debit' },
        { id: '4', category: 'Bills', amount: 1200, date: '2026-01-11', merchant: 'Electricity Bill', type: 'debit' },
        { id: '5', category: 'Shopping', amount: 3200, date: '2026-01-09', merchant: 'Flipkart', type: 'debit' },
      ],
      categorySpending: [
        { category: 'Shopping', amount: 8500, percentage: 29.9, icon: ShoppingCart, color: 'bg-purple-500' },
        { category: 'Food & Dining', amount: 6200, percentage: 21.8, icon: Coffee, color: 'bg-orange-500' },
        { category: 'Bills & Utilities', amount: 5800, percentage: 20.4, icon: Home, color: 'bg-blue-500' },
        { category: 'Transportation', amount: 3200, percentage: 11.2, icon: Car, color: 'bg-green-500' },
        { category: 'Entertainment', amount: 2450, percentage: 8.6, icon: Heart, color: 'bg-pink-500' },
        { category: 'Technology', amount: 2300, percentage: 8.1, icon: Smartphone, color: 'bg-indigo-500' },
      ],
      monthlyTrend: [
        { label: 'Week 1', amount: 6200 },
        { label: 'Week 2', amount: 7150 },
        { label: 'Week 3', amount: 8200 },
        { label: 'Week 4', amount: 6900 },
      ],
    },
    year: {
      totalSpent: 325640.00,
      totalIncome: 520000.00,
      transactions: [
        { id: '1', category: 'Shopping', amount: 2499, date: '2026-01-13', merchant: 'Amazon', type: 'debit' },
        { id: '2', category: 'Income', amount: 45000, date: '2026-01-10', merchant: 'Salary Deposit', type: 'credit' },
        { id: '3', category: 'Food', amount: 15600, date: '2025-12-28', merchant: 'Various Restaurants', type: 'debit' },
        { id: '4', category: 'Bills', amount: 68000, date: '2025-12-01', merchant: 'Annual Bills', type: 'debit' },
        { id: '5', category: 'Travel', amount: 45000, date: '2025-11-15', merchant: 'Flight Booking', type: 'debit' },
      ],
      categorySpending: [
        { category: 'Shopping', amount: 98600, percentage: 30.3, icon: ShoppingCart, color: 'bg-purple-500' },
        { category: 'Food & Dining', amount: 72400, percentage: 22.2, icon: Coffee, color: 'bg-orange-500' },
        { category: 'Bills & Utilities', amount: 68500, percentage: 21.0, icon: Home, color: 'bg-blue-500' },
        { category: 'Transportation', amount: 36200, percentage: 11.1, icon: Car, color: 'bg-green-500' },
        { category: 'Entertainment', amount: 28500, percentage: 8.7, icon: Heart, color: 'bg-pink-500' },
        { category: 'Technology', amount: 21440, percentage: 6.6, icon: Smartphone, color: 'bg-indigo-500' },
      ],
      monthlyTrend: [
        { label: 'Jan', amount: 28450 },
        { label: 'Feb', amount: 32000 },
        { label: 'Mar', amount: 28000 },
        { label: 'Apr', amount: 31000 },
        { label: 'May', amount: 29500 },
        { label: 'Jun', amount: 32500 },
        { label: 'Jul', amount: 30200 },
        { label: 'Aug', amount: 29800 },
        { label: 'Sep', amount: 28000 },
        { label: 'Oct', amount: 31000 },
        { label: 'Nov', amount: 29500 },
        { label: 'Dec', amount: 32500 },
      ],
    },
  };
};

export default function InsightsPage() {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  
  const dummyData = generateDummyData();
  const currentData = dummyData[timeRange];

  // Filter transactions based on selected month/year
  const filteredTransactions = currentData.transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.date);
    
    if (selectedMonth !== null) {
      if (transactionDate.getMonth() !== selectedMonth) return false;
    }
    
    if (selectedYear !== null) {
      if (transactionDate.getFullYear() !== selectedYear) return false;
    }
    
    return true;
  });

  // Calculate filtered data
  const getTotalSpent = () => {
    if (selectedMonth !== null || selectedYear !== null) {
      return filteredTransactions
        .filter(t => t.type === 'debit')
        .reduce((sum, t) => sum + t.amount, 0);
    }
    return currentData.totalSpent;
  };

  const getTotalIncome = () => {
    if (selectedMonth !== null || selectedYear !== null) {
      return filteredTransactions
        .filter(t => t.type === 'credit')
        .reduce((sum, t) => sum + t.amount, 0);
    }
    return currentData.totalIncome;
  };

  const totalSpent = getTotalSpent();
  const totalIncome = getTotalIncome();
  const savingsRate = totalIncome > 0 ? ((totalIncome - totalSpent) / totalIncome * 100).toFixed(1) : '0';
  const comparedToLastMonth = -12.5;
  
  const categorySpending = currentData.categorySpending;
  const recentTransactions = filteredTransactions.slice(0, 5);
  const monthlyTrend = currentData.monthlyTrend;

  const maxTrend = Math.max(...monthlyTrend.map(m => m.amount));

  return (
    <main className="bg-slate-50 min-h-screen pb-20">
      <NavbarWrapper />
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Financial Insights</h1>
              <p className="text-gray-600 mt-1">Track your spending and savings patterns</p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition text-gray-700">
                <Filter className="w-4 h-4" />
                Filter
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>

          {/* Time Range Selector */}
          <div className="flex gap-2 mt-6 mb-6">
            {(['week', 'month', 'year'] as const).map((range) => (
              <button
                key={range}
                onClick={() => {
                  setTimeRange(range);
                  setSelectedMonth(null);
                  setSelectedYear(null);
                }}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  timeRange === range
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {range.charAt(0).toUpperCase() + range.slice(1)}
              </button>
            ))}
          </div>

          {/* Filter by Month/Year */}
          <div className="flex gap-4 items-center">
            {timeRange !== 'week' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Month:</label>
                  <select
                    value={selectedMonth ?? ''}
                    onChange={(e) => setSelectedMonth(e.target.value ? parseInt(e.target.value) : null)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All Months</option>
                    {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month, idx) => (
                      <option key={idx} value={idx}>
                        {month}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Year:</label>
                  <select
                    value={selectedYear ?? ''}
                    onChange={(e) => setSelectedYear(e.target.value ? parseInt(e.target.value) : null)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All Years</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                  </select>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-red-100 rounded-lg">
                <ArrowDownRight className="w-6 h-6 text-red-600" />
              </div>
              <span className={`text-sm font-semibold ${comparedToLastMonth < 0 ? 'text-green-600' : 'text-red-600'}`}>
                {comparedToLastMonth > 0 ? '+' : ''}{comparedToLastMonth}%
              </span>
            </div>
            <h3 className="text-gray-600 text-sm mb-1">Total Spent</h3>
            <p className="text-2xl font-bold text-gray-900">₹{totalSpent.toLocaleString('en-IN')}</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <ArrowUpRight className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-sm font-semibold text-green-600">+8.2%</span>
            </div>
            <h3 className="text-gray-600 text-sm mb-1">Total Income</h3>
            <p className="text-2xl font-bold text-gray-900">₹{totalIncome.toLocaleString('en-IN')}</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-sm font-semibold text-green-600">+3.1%</span>
            </div>
            <h3 className="text-gray-600 text-sm mb-1">Savings Rate</h3>
            <p className="text-2xl font-bold text-gray-900">{savingsRate}%</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-sm font-semibold text-green-600">+15.4%</span>
            </div>
            <h3 className="text-gray-600 text-sm mb-1">Net Savings</h3>
            <p className="text-2xl font-bold text-gray-900">₹{(totalIncome - totalSpent).toLocaleString('en-IN')}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Charts */}
          <div className="lg:col-span-2 space-y-8">
            {/* Spending Trend */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Spending Trend</h2>
                <Calendar className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-4">
                {monthlyTrend.map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <span className="text-sm font-medium text-gray-600 w-12">{item.month}</span>
                    <div className="flex-1 bg-gray-100 rounded-full h-8 relative overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full rounded-full transition-all duration-500 flex items-center justify-end pr-3"
                        style={{ width: `${(item.amount / maxTrend) * 100}%` }}
                      >
                        <span className="text-xs font-semibold text-white">
                          ₹{(item.amount / 1000).toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Category Breakdown */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Spending by Category</h2>
              <div className="space-y-4">
                {categorySpending.map((cat, index) => {
                  const Icon = cat.icon;
                  return (
                    <div key={index} className="flex items-center gap-4">
                      <div className={`p-2 ${cat.color} rounded-lg`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-gray-900">{cat.category}</span>
                          <span className="text-sm font-semibold text-gray-900">
                            ₹{cat.amount.toLocaleString('en-IN')}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-100 rounded-full h-2">
                            <div
                              className={`${cat.color} h-full rounded-full transition-all duration-500`}
                              style={{ width: `${cat.percentage}%` }}
                            />
                          </div>
                          <span className="text-xs font-medium text-gray-500 w-12 text-right">
                            {cat.percentage}%
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column - Recent Transactions */}
          <div className="space-y-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Transactions</h2>
              <div className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                    <div>
                      <p className="font-medium text-gray-900">{transaction.merchant}</p>
                      <p className="text-xs text-gray-500 mt-1">{transaction.date}</p>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${transaction.type === 'credit' ? 'text-green-600' : 'text-gray-900'}`}>
                        {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount.toLocaleString('en-IN')}
                      </p>
                      <span className="text-xs text-gray-500">{transaction.category}</span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-6 py-2 text-blue-600 hover:text-blue-700 font-medium text-sm transition">
                View All Transactions
              </button>
            </div>

            {/* Insights Tips */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl p-6 shadow-sm text-white">
              <div className="flex items-start gap-3 mb-4">
                <div className="p-2 bg-white/20 rounded-lg">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Smart Tip</h3>
                  <p className="text-sm opacity-90 mt-1">
                    You're spending 15% less than last month! Keep up the great work on managing your expenses.
                  </p>
                </div>
              </div>
              <button className="w-full mt-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg font-medium text-sm transition">
                Get More Tips
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </main>
  );
}