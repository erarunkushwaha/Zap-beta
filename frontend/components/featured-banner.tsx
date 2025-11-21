export default function FeaturedBanner() {
  return (
    <section className="bg-white border-b border-gray-200 py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
          <p className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
            YOUR COMPLETE TOOLKIT FOR AI AUTOMATION
          </p>
        </div>
        {/* <div className="flex flex-row items-center justify-between  gap-4 ">
          <button
            className={`mx-auto px-6 py-2 rounded-full text-sm font-medium transition-colors ${"bg-orange-500 text-white"}`}
          >
            AI Workflows & AI Agents
          </button>
        </div> */}
      </div>
    </section>
  );
}
