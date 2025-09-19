import React from 'react';
import { Users, Calendar, TrendingUp } from 'lucide-react';
export function ValueProps() {
  return <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Construction Companies Choose AppChang Pro
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform is specifically designed to address the unique
            challenges of construction workforce management.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Value Prop 1 */}
          <div className="bg-blue-50 rounded-lg p-8 text-center hover:shadow-md transition-shadow">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
              <Users size={32} className="text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Simplified Recruitment
            </h3>
            <p className="text-gray-600">
              Find qualified construction professionals faster with our
              specialized recruitment tools and talent pool.
            </p>
          </div>
          {/* Value Prop 2 */}
          <div className="bg-blue-50 rounded-lg p-8 text-center hover:shadow-md transition-shadow">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
              <Calendar size={32} className="text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Workforce Scheduling
            </h3>
            <p className="text-gray-600">
              Efficiently schedule crews, track time, and manage project
              assignments all in one place.
            </p>
          </div>
          {/* Value Prop 3 */}
          <div className="bg-blue-50 rounded-lg p-8 text-center hover:shadow-md transition-shadow">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
              <TrendingUp size={32} className="text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Performance Analytics
            </h3>
            <p className="text-gray-600">
              Gain insights into workforce productivity, project efficiency, and
              labor costs with powerful analytics.
            </p>
          </div>
        </div>
      </div>
    </section>;
}