export default function Statistics() {
  return (
    <section className="bg-gray-900 text-white py-24 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-orange-500 font-semibold mb-2">NO AFFILIATION. JUST RESULTS.</p>
          <h2 className="text-6xl font-bold mb-4">364,608,639</h2>
          <p className="text-gray-400 text-lg">tasks automated every single day</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12">
          {[
            { stat: '1B+', desc: 'workflows created' },
            { stat: '6,000+', desc: 'app integrations' },
            { stat: '500K+', desc: 'team users' },
            { stat: '99.99%', desc: 'uptime guarantee' },
          ].map((item, idx) => (
            <div key={idx} className="border-l border-gray-700 pl-8">
              <p className="text-5xl font-bold text-orange-500 mb-2">{item.stat}</p>
              <p className="text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
