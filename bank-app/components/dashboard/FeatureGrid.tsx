'use client';

import FeatureCard from '../ui/FeatureCard';
import {
  BarChart3,
  Send,
  Receipt,
  CreditCard,
} from 'lucide-react';

export default function FeatureGrid() {
  return (
    <section className="mt-10">
      <div
        className="
          grid
          grid-cols-1
          gap-6
          sm:grid-cols-2
          lg:grid-cols-4
        "
      >
        <FeatureCard
          title="Insights"
          description="Analyze your spending and view statements."
          icon={<BarChart3 className="h-6 w-6 text-blue-600" />}
          onClick={() => alert('Opening Insights')}
        />

        <FeatureCard
          title="Move Money"
          description="Instant transfers to saved or new payees."
          icon={<Send className="h-6 w-6 text-green-600" />}
          onClick={() => alert('Initiating Transfer')}
        />

        <FeatureCard
          title="Bill Payments"
          description="Pay utilities and credit cards easily."
          icon={<Receipt className="h-6 w-6 text-orange-600" />}
          onClick={() => alert('Opening Bill Pay')}
        />

        <FeatureCard
          title="My Cards"
          description="Freeze cards, change PINs, or request new ones."
          icon={<CreditCard className="h-6 w-6 text-purple-600" />}
          onClick={() => alert('Managing Cards')}
        />
      </div>
    </section>
  );
}
