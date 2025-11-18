export default function Workflows() {
  return (
    <section className="bg-white py-24 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            { title: 'Let AI handle your IT support tickets', icon: '🎯' },
            { title: 'Turn sales calls into coaching moments', icon: '📞' },
            { title: 'Automate your content workflow', icon: '✨' },
          ].map((item, idx) => (
            <div key={idx} className="bg-gray-50 rounded-xl p-8">
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
              <p className="text-gray-600 text-sm mt-3">Pre-built templates to get you started quickly</p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-8 py-3 font-medium">
            Explore Templates
          </button>
        </div>
      </div>
    </section>
  )
}
