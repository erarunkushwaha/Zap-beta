export default function RealTeams() {
  return (
    <section className="bg-white py-24 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              AI-powered automations that work 24/7
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Your business never stops, and neither should your workflows.
              Deploy AI automations that run around the clock.
            </p>
            <button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-8 py-3 font-medium">
              Start Building
            </button>
          </div>
          <div className="bg-gradient-to-br from-blue-100 to-green-100 rounded-xl h-96">
            <video
              src="https://res.cloudinary.com/zapier-media/video/upload/q_auto:best/f_auto/v1745864931/AI%20LP%20-%204-29-25/Unified_lead_capture_3_q70ayv.mp4"
              autoPlay
              loop
              muted
              className="w-full h-full rounded-xl object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
