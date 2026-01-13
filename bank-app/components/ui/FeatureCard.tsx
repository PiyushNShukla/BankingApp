'use client';

import { ReactNode } from 'react';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  onClick?: () => void;
}

export default function FeatureCard({
  icon,
  title,
  description,
  onClick,
}: FeatureCardProps) {
  return (
    <div
      onClick={onClick}
      className="
        cursor-pointer
        rounded-xl
        border border-gray-200
        bg-white
        p-6
        shadow-sm
        transition
        hover:shadow-md
        hover:-translate-y-1
      "
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100">
        {icon}
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-1">
        {title}
      </h3>

      <p className="text-sm text-gray-500">
        {description}
      </p>
    </div>
  );
}
