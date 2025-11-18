export default function FeaturedBanner() {
  return (
    <section className="bg-white border-b border-gray-200 py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
          <p className="text-sm font-semibold text-gray-700 uppercase tracking-wide">YOUR COMPLETE TOOLKIT FOR AI AUTOMATION</p>
        </div>
        <div className="flex items-center justify-between flex-wrap gap-4">
          {['AI Workflows', 'AI Agents', 'AI Chatbots', 'Tables', 'Interfaces', 'Canvas', 'Enterprise'].map((item) => (
            <button
              key={item}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                item === 'AI Workflows'
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
