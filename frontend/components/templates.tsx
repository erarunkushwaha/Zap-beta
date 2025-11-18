export default function Templates() {
  return (
    <section className="bg-white py-24 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-5xl font-bold text-gray-900 mb-4">Real teams, real AI workflows</h2>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl">
          See how some of the world's smartest teams use AI workflows to work better, faster and smarter.
        </p>
        
        <div className="grid md:grid-cols-2 gap-12">
          {[
            { company: 'Fortune 500', metric: '2,000+', desc: 'workflows deployed', img: '🏢' },
            { company: 'Global Enterprise', metric: '10M+', desc: 'tasks automated', img: '🌍' },
          ].map((item, idx) => (
            <div key={idx} className="bg-gray-50 rounded-xl p-8 h-80 flex flex-col justify-between">
              <div>
                <p className="text-4xl mb-4">{item.img}</p>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{item.company}</h3>
                <p className="text-5xl font-bold text-orange-500 mb-2">{item.metric}</p>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
