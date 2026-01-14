'use client'
import { useState } from 'react';
import {
  ArrowRightLeft,
  User,
  Building2,
  Wallet,
  CheckCircle2,
  IndianRupee
} from 'lucide-react';

import { useRouter } from 'next/router';
import NavbarWrapper from '@/components/wrapper/NavbarWrapper';

export default function TransfersPreview() {
  const [activeTab, setActiveTab] = useState('quick');
  const [selectedBeneficiary, setSelectedBeneficiary] = useState('1');
  const [amount, setAmount] = useState('5000');
  const [showSuccess, setShowSuccess] = useState(false);

  const beneficiaries = [
    {
      id: '1',
      name: 'John Doe',
      accountNumber: '1234567890',
      bankName: 'HDFC Bank'
    },
    {
      id: '2',
      name: 'Jane Smith',
      accountNumber: '9876543210',
      bankName: 'ICICI Bank'
    }
  ];

  const transferHistory = [
    {
      id: '1',
      type: 'sent',
      recipient: 'John Doe',
      amount: 5000,
      date: '2026-01-14',
      status: 'completed',
      accountNumber: '****7890'
    },
    {
      id: '2',
      type: 'received',
      recipient: 'Sarah Wilson',
      amount: 12000,
      date: '2026-01-13',
      status: 'completed',
      accountNumber: '****4321'
    },
    {
      id: '3',
      type: 'sent',
      recipient: 'Jane Smith',
      amount: 3500,
      date: '2026-01-12',
      status: 'completed',
      accountNumber: '****3210'
    }
  ];

  return (
    <main className="bg-slate-50 min-h-screen">
        <NavbarWrapper />
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <ArrowRightLeft className="text-blue-600" size={32} />
            Money Transfers
          </h1>
          <p className="text-gray-600 mt-2">Send money securely to anyone, anywhere</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('quick')}
              className={`flex-1 px-6 py-4 font-medium transition ${
                activeTab === 'quick'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Quick Transfer
            </button>
            <button
              onClick={() => setActiveTab('new')}
              className={`flex-1 px-6 py-4 font-medium transition ${
                activeTab === 'new'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              New Transfer
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex-1 px-6 py-4 font-medium transition ${
                activeTab === 'history'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              History
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Quick Transfer Tab */}
            {activeTab === 'quick' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Transfer to Saved Beneficiaries</h3>
                
                {/* Beneficiary Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {beneficiaries.map((beneficiary) => (
                    <div
                      key={beneficiary.id}
                      onClick={() => setSelectedBeneficiary(beneficiary.id)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition ${
                        selectedBeneficiary === beneficiary.id
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="bg-blue-100 rounded-full p-2">
                          <User className="text-blue-600" size={20} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{beneficiary.name}</h4>
                          <p className="text-sm text-gray-600">A/c: {beneficiary.accountNumber}</p>
                          <p className="text-sm text-gray-500">{beneficiary.bankName}</p>
                        </div>
                        {selectedBeneficiary === beneficiary.id && (
                          <CheckCircle2 className="text-blue-600" size={20} />
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Amount Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount (₹)
                  </label>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="Enter amount"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-black"
                    />
                  </div>
                </div>

                {/* Remarks */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Remarks (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="Add a note"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-black"
                  />
                </div>

                {/* Transfer Button */}
                <button
                  onClick={() => setShowSuccess(true)}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Transfer Now
                </button>
              </div>
            )}

            {/* New Transfer Tab */}
            {activeTab === 'new' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Transfer to New Account</h3>

                {/* Transfer Type */}
                <div className="grid grid-cols-2 gap-4">
                  <button className="p-4 rounded-lg border-2 border-gray-200 hover:border-gray-300 transition">
                    <Wallet className="mx-auto mb-2 text-blue-600" size={24} />
                    <p className="font-medium text-gray-900">Own Account</p>
                  </button>
                  <button className="p-4 rounded-lg border-2 border-blue-600 bg-blue-50 transition">
                    <Building2 className="mx-auto mb-2 text-blue-600" size={24} />
                    <p className="font-medium text-gray-900">Other Bank</p>
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Beneficiary Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Account Number
                  </label>
                  <input
                    type="text"
                    placeholder="Enter account number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    IFSC Code
                  </label>
                  <input
                    type="text"
                    placeholder="Enter IFSC code"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-black uppercase"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount (₹)
                  </label>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="number"
                      placeholder="Enter amount"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-black"
                    />
                  </div>
                </div>

                <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                  Transfer Now
                </button>
              </div>
            )}

            {/* History Tab */}
            {activeTab === 'history' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Transfers</h3>
                
                {transferHistory.map((transfer) => (
                  <div
                    key={transfer.id}
                    className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`rounded-full p-3 ${
                        transfer.type === 'sent' ? 'bg-red-100' : 'bg-green-100'
                      }`}>
                        <ArrowRightLeft
                          className={transfer.type === 'sent' ? 'text-red-600' : 'text-green-600'}
                          size={20}
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{transfer.recipient}</h4>
                        <p className="text-sm text-gray-600">
                          {transfer.accountNumber} • {transfer.date}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold text-lg ${
                        transfer.type === 'sent' ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {transfer.type === 'sent' ? '-' : '+'}₹{transfer.amount.toLocaleString()}
                      </p>
                      <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">
                        {transfer.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center">
            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="text-green-600" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Transfer Successful!</h3>
            <p className="text-gray-600 mb-4">₹{amount} has been transferred successfully</p>
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <p className="text-sm text-gray-600">Transaction ID</p>
              <p className="font-mono font-semibold text-gray-900">1736876543</p>
            </div>
            <button
              onClick={() => setShowSuccess(false)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
    </main>
  );
}