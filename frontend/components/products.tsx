export default function Products() {
  return (
    <section className="bg-white py-24 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Get started fast with pre-built templates
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Automate advanced workflows with the full building power of Zapier.
            </p>
            <button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-8 py-3 font-medium">
              Explore AI Workflows
            </button>
          </div>
          <div>
            <div className="bg-gradient-to-br from-gray-100 to-gray-50 rounded-xl h-96 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-orange-100 rounded-lg mx-auto mb-4"></div>
                <p className="text-gray-500">Workflow visualization</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
