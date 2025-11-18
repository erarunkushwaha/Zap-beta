'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function Hero() {
  const [showModal, setShowModal] = useState(false)

  return (
    <section className="relative min-h-screen flex items-center justify-between overflow-hidden bg-white">
      {/* Left side content */}
      <div className="max-w-7xl mx-auto px-6 py-16 flex-1 z-10">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold text-orange-500 uppercase tracking-wide mb-4">
            SCALE AI AGENTS WITH ZAPIER
          </p>
          <h1 className="text-6xl font-bold text-gray-900 mb-6 leading-tight">
            The most connected AI orchestration platform
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Build and ship AI workflows in minutes—no IT bottlenecks, no complexity. Just results.
          </p>
          <div className="flex items-center gap-4 mb-12">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-8 py-6 text-base">
              Start free with email
            </Button>
            <Button 
              variant="outline" 
              className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-full px-8 py-6 text-base"
              onClick={() => setShowModal(true)}
            >
              Start free with Google
            </Button>
          </div>
        </div>
      </div>

      {/* Right side decorative elements */}
      <div className="flex-1 relative h-full min-h-screen hidden lg:flex items-center justify-end pr-12">
        {/* Large orange circle */}
        <div className="absolute top-32 right-0 w-96 h-96 bg-orange-500 rounded-full opacity-90 blur-3xl"></div>
        
        {/* Medium orange circle */}
        <div className="absolute bottom-40 right-20 w-64 h-64 bg-orange-400 rounded-full opacity-70 blur-2xl"></div>
        
        {/* Small decorative line */}
        <div className="absolute top-40 right-32 w-32 h-1 bg-orange-500"></div>
      </div>

      {/* Modal Overlay */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-8 max-w-md w-full relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">How did you hear about us?</h3>
            
            <div className="space-y-4">
              {['Word of mouth', 'LinkedIn', 'YouTube', 'Search engine', 'Website Referrals', 'Podcast', 'Facebook/Instagram', 'TikTok', 'AI tools (e.g. ChatGPT)', 'Billboard', 'Other'].map((option, idx) => (
                <label key={idx} className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" name="source" className="w-5 h-5 accent-orange-500" />
                  <span className="text-gray-700">{option}</span>
                </label>
              ))}
            </div>
            
            <Button className="w-full mt-8 bg-gray-300 text-gray-700 hover:bg-gray-400 rounded-lg">
              Submit
            </Button>
          </div>
        </div>
      )}
    </section>
  )
}
