import React from 'react';
import { CheckCircleIcon } from 'lucide-react';
export function Hero() {
  return <section className="bg-gradient-to-b from-blue-50 to-white py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Streamline Your Construction Workforce
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              AppChang Pro helps construction companies recruit, manage, and
              optimize their workforce with powerful, easy-to-use tools.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 text-center">
                Get Started Free
              </button>
              <button className="px-6 py-3 border border-blue-600 text-blue-600 rounded-md font-medium hover:bg-blue-50 text-center">
                Schedule Demo
              </button>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center text-gray-600 text-sm">
              <div className="flex items-center mb-2 sm:mb-0 sm:mr-6">
                <CheckCircleIcon size={16} className="text-blue-600 mr-2" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center">
                <CheckCircleIcon size={16} className="text-blue-600 mr-2" />
                <span>14-day free trial</span>
              </div>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="bg-white p-2 rounded-lg shadow-xl">
              <img src="https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" alt="AppChang Pro dashboard" className="rounded-md w-full" />
            </div>
          </div>
        </div>
      </div>
    </section>;
}