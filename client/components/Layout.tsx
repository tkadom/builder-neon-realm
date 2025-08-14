import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';

interface LayoutProps {
  children: ReactNode;
}

const workflowSteps = [
  { id: 'plan', label: 'Plan', href: '/' },
  { id: 'invoice', label: 'Invoice', href: '/invoice' },
  { id: 'pay', label: 'Pay', href: '/pay', hasAlert: true },
  { id: 'deliver', label: 'Deliver', href: '/deliver' },
  { id: 'settle', label: 'Settle', href: '/settle' },
];

const mainTabs = [
  { id: 'agency-plan', label: 'Agency Plan', href: '/' },
  { id: 'op-plan', label: 'Op. Plan', href: '/op-plan' },
  { id: 'discounts', label: 'Discounts', href: '/discounts' },
];

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <header className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-8">
            <h1 className="text-xl font-semibold text-brand-700">SeedFlow</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">Sales Year:</span>
                <Select defaultValue="2024">
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2022">2022</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">Agency:</span>
                <Select defaultValue="midwest">
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="midwest">Midwest Seeds Co.</SelectItem>
                    <SelectItem value="northeast">Northeast Agricultural</SelectItem>
                    <SelectItem value="southwest">Southwest Growers</SelectItem>
                    <SelectItem value="pacific">Pacific Seed Solutions</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Welcome back, John</span>
            <div className="w-8 h-8 bg-brand-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
              J
            </div>
          </div>
        </div>
      </header>

      {/* Sub Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="px-6">
          <nav className="flex space-x-8">
            {mainTabs.map((tab) => (
              <button
                key={tab.id}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  tab.active
                    ? 'border-brand-500 text-brand-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="flex">
        {/* Left Sidebar */}
        <aside className="w-64 bg-white shadow-sm min-h-screen">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Workflow</h2>
            <nav className="space-y-2">
              {workflowSteps.map((step, index) => (
                <div key={step.id} className="relative">
                  <button
                    className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                      step.active
                        ? 'bg-brand-50 text-brand-700 border border-brand-200'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                          step.active
                            ? 'bg-brand-500 text-white'
                            : index < workflowSteps.findIndex(s => s.active)
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-200 text-gray-600'
                        }`}
                      >
                        {index < workflowSteps.findIndex(s => s.active) ? '✓' : index + 1}
                      </div>
                      <span className="font-medium">{step.label}</span>
                    </div>
                    {step.hasAlert && (
                      <Badge variant="destructive" className="text-xs">
                        Action Required
                      </Badge>
                    )}
                  </button>
                  {index < workflowSteps.length - 1 && (
                    <div className="absolute left-6 top-12 w-0.5 h-4 bg-gray-200"></div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
