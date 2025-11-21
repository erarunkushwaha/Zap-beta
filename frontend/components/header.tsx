import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  return (
    <header className="border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-orange-500 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">z</span>
            </div>
            <span className="font-bold text-lg">zap-Beta</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button
            className="text-sm text-gray-700 hover:text-gray-900"
            onClick={() => router.push("/login")}
          >
            Log in
          </button>
          <Button
            className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-6"
            onClick={() => router.push("/signup")}
          >
            Sign up
          </Button>
        </div>
      </div>
    </header>
  );
}
