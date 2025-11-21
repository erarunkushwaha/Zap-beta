export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-5 gap-8 mb-12">
          {[
            { title: "Product", links: [] },
            { title: "Company", links: [] },
            {
              title: "Resources",
              links: [],
            },
            {
              title: "Legal",
              links: [],
            },
            {
              title: "Follow",
              links: ["LinkedIn", "GitHub", "StackOverflow", "LeetCode"],
            },
          ].map((col, idx) => (
            <div key={idx}>
              <h4 className="font-bold text-gray-900 mb-4">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link, lidx) => (
                  <li key={lidx}>
                    <a
                      href="#"
                      className="text-gray-600 hover:text-gray-900 text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 pt-8 flex items-center justify-between">
          <p className="text-gray-600 text-sm">
            © 2025 Zap-Beta. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <button className="text-gray-600 hover:text-gray-900">
              Privacy
            </button>
            <button className="text-gray-600 hover:text-gray-900">Terms</button>
            <button className="text-gray-600 hover:text-gray-900">
              Security
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
