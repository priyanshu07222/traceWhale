import React from 'react';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

const features: Feature[] = [
  { icon: '🔍', title: 'Real-Time Monitoring', description: 'Monitor large transactions in real-time on Solana.' },
  { icon: '⚙️', title: 'Custom Alerts', description: 'Set transaction thresholds and track specific accounts.' },
  { icon: '🔒', title: 'Secure & Reliable', description: 'Your data and alerts are safe with our secure platform.' },
];

const FeaturesSection: React.FC = () => {
  return (
    <section className="features py-20 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="feature-card p-6 bg-white rounded-lg shadow-lg text-center">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
