export default function Automation() {
  return (
    <section className="bg-white py-24 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-5xl font-bold text-gray-900 mb-4">Move fast. Stay in control.</h2>
        <p className="text-xl text-gray-600 mb-12">
          Built for teams. Control access, review history, and manage governance at every step.
        </p>
        
        <div className="grid md:grid-cols-3 gap-8">
          {['Built for scale', 'Enterprise security', 'Advanced monitoring'].map((feature, idx) => (
            <div key={idx} className="bg-gray-50 rounded-xl p-8">
              <div className="w-12 h-12 bg-orange-100 rounded-lg mb-4"></div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">{feature}</h3>
              <p className="text-gray-600">Industry-leading features for modern teams</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
