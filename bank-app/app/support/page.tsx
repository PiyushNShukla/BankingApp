'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/ui/Navbar';
import { useAuth } from '@/context/AuthContext';
import { 
  Search, 
  ChevronDown, 
  ChevronUp, 
  Phone, 
  MessageSquare, 
  Mail, 
  MapPin,
  LifeBuoy
} from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
  isOpen: boolean;
}

export default function HelpSupportPage() {
  const router = useRouter();
  const { userName, isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const [faqs, setFaqs] = useState<FAQ[]>([
    { 
      question: "How do I reset my transaction PIN?", 
      answer: "Go to Security Settings and select 'Reset PIN'. You will receive an OTP on your registered mobile number to verify your identity.", 
      isOpen: false 
    },
    { 
      question: "What are the bank's working hours?", 
      answer: "Our branches are open Monday to Friday, 10:00 AM to 4:00 PM. We are closed on 2nd and 4th Saturdays and all public holidays.", 
      isOpen: false 
    },
    { 
      question: "How long does an NEFT transfer take?", 
      answer: "NEFT transactions are processed in hourly batches. Funds are typically credited to the recipient within 2 to 4 hours.", 
      isOpen: false 
    },
    { 
      question: "Is my KYC updated?", 
      answer: "You can check your KYC status in the 'Profile' section. If it shows 'Pending', please visit the Ballygunge branch with your original PAN and Aadhaar card.", 
      isOpen: false 
    },
    { 
      question: "How do I check my credit score?", 
      answer: "We provide a free credit score check once every quarter. You can find this under the 'Loans & Credit' tab on your main dashboard.", 
      isOpen: false 
    }
  ]);

  const toggleFaq = (questionText: string) => {
    setFaqs(faqs.map(faq => 
      faq.question === questionText ? { ...faq, isOpen: !faq.isOpen } : faq
    ));
  };

  const supportTeam = [
    { name: "Prodosh Mitter", role: "Branch Manager", email: "felu.mittir@tddbank.com", initials: "PM", color: "bg-blue-100 text-blue-600" },
    { name: "Pragyaparamita Mukherjee", role: "Relationship Manager", email: "mitin.m@tddbank.com", initials: "PM", color: "bg-amber-100 text-amber-600" },
    { name: "Lalmohan Ganguly", role: "Customer Rep", email: "jatayu@tddbank.com", initials: "LG", color: "bg-green-100 text-green-600" },
    { name: "Maganlal Meghraj", role: "Loan Specialist", email: "m.meghraj@tddbank.com", initials: "MM", color: "bg-purple-100 text-purple-600" },
    { name: "Trilokeshwar Shonku", role: "Technical Support", email: "iam.prof@tddbank.com", initials: "TS", color: "bg-rose-100 text-rose-600" },
    { name: "Ekendra Sen", role: "Insurance Advisor", email: "babu.eken@tddbank.com", initials: "ES", color: "bg-slate-100 text-slate-600" }
  ];

  if (!isAuthenticated) return null;

  return (
    <main className="bg-slate-50 min-h-screen">
      <Navbar userName={userName!} onLogout={() => router.push('/')} />

      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-primary mb-2 flex items-center justify-center gap-3">
            <LifeBuoy className="text-blue-600" size={32} /> Support Center
          </h2>
          <p className="text-slate-500">How can we help you today?</p>
        </div>

        <div className="space-y-6">
          {/* Search Box */}
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
            <input 
              type="text"
              placeholder="Search for help topics (e.g. 'KYC', 'PIN')..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl border bg-white shadow-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-600 outline-none transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* FAQs */}
          <section className="bg-white rounded-2xl border shadow-sm overflow-hidden">
            <div className="p-6 border-b bg-slate-50/50">
              <h3 className="font-semibold text-lg">Frequently Asked Questions</h3>
            </div>
            <div className="divide-y">
              {faqs
                .filter(f => f.question.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((faq) => (
                <div key={faq.question} className="p-4 hover:bg-slate-50 transition-colors">
                  <button 
                    onClick={() => toggleFaq(faq.question)}
                    className="w-full flex items-center justify-between text-left font-medium text-slate-700"
                  >
                    <span>{faq.question}</span>
                    {faq.isOpen ? <ChevronUp size={20} className="text-blue-600" /> : <ChevronDown size={20} />}
                  </button>
                  {faq.isOpen && (
                    <div className="mt-3 text-slate-500 text-sm leading-relaxed bg-blue-50/50 p-4 rounded-lg border border-blue-100">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Dedicated Support Team */}
          <section className="bg-white rounded-2xl border shadow-sm p-6">
            <h3 className="font-semibold text-lg mb-6">Your Support Team</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {supportTeam.map((member) => (
                <div key={member.email} className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all group">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold shrink-0 ${member.color}`}>
                    {member.initials}
                  </div>
                  <div className="overflow-hidden">
                    <h4 className="font-semibold text-slate-800 text-sm truncate">{member.name}</h4>
                    <p className="text-xs text-slate-500 mb-1">{member.role}</p>
                    <a href={`mailto:${member.email}`} className="text-xs text-blue-600 hover:underline flex items-center gap-1">
                      <Mail size={12} /> {member.email}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Branch Contact */}
          <section className="bg-blue-600 rounded-3xl p-8 text-white shadow-lg shadow-blue-200 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <MapPin size={24} /> Kolkata Main Branch
                </h3>
                <p className="text-blue-100 text-sm mt-1">21 Rajani Sen Road, Ballygunge, Kolkata 700019</p>
              </div>
              <div className="flex gap-4">
                <button className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold text-sm flex items-center gap-2 hover:bg-blue-50 transition-colors">
                  <Phone size={16} /> Call Now
                </button>
                <button className="bg-blue-500 text-white border border-blue-400 px-6 py-2 rounded-full font-semibold text-sm flex items-center gap-2 hover:bg-blue-400 transition-colors">
                  <MessageSquare size={16} /> Live Chat
                </button>
              </div>
            </div>
            <div className="hidden lg:block text-blue-200/20">
              <LifeBuoy size={120} />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}