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
              Automate advanced workflows with the full building power of
              Zapier.
            </p>
            <button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-8 py-3 font-medium">
              Explore AI Workflows
            </button>
          </div>
          <div>
            <div className="bg-gradient-to-br from-gray-100 to-gray-50 rounded-xl h-96 flex items-center justify-center">
              <video
                src="https://res.cloudinary.com/zapier-media/video/upload/q_auto/f_auto/c_scale,w_1920/v1745864783/aiworkflowshomepage.mp4"
                autoPlay
                loop
                muted
                className="w-full h-full rounded-xl object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
