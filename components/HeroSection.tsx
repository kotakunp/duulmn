import { Play, Crown } from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/lib/context/AuthContext";

interface HeroSectionProps {
  showMiniPlayer: boolean;
  setShowMiniPlayer: (show: boolean) => void;
}

const HeroSection = ({ showMiniPlayer, setShowMiniPlayer }: HeroSectionProps) => {
  const { state: authState } = useAuth();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video Placeholder */}
      <div className="absolute inset-0 bg-linear-to-r from-purple-900/50 to-blue-900/50">
        <div className="absolute inset-0 bg-black/30"></div>
        {/* Animated background elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-blue-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {authState.user ? (
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Welcome back, <span className="text-purple-400">{authState.user.username}</span> —
            pick up where you left off 🎶
          </h1>
        ) : (
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Sing your heart out — anytime, anywhere.
          </h1>
        )}

        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
          Join thousands of singers worldwide. Access 6000+ karaoke songs with
          professional backing tracks and real-time lyrics.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => setShowMiniPlayer(true)}
            className="flex items-center space-x-2 px-8 py-4 bg-linear-to-r from-purple-600 to-blue-600 text-white rounded-full text-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg"
          >
            <Play className="h-5 w-5" />
            <span>Start Singing Free</span>
          </button>
          <button className="flex items-center space-x-2 px-8 py-4 bg-linear-to-r from-yellow-500 to-orange-500 text-white rounded-full text-lg font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all transform hover:scale-105 shadow-lg">
            <Crown className="h-5 w-5" />
            <span>Go Premium</span>
          </button>
        </div>
      </div>

      {/* Mini Player */}
      {showMiniPlayer && (
        <div className="absolute bottom-8 right-8 bg-gray-900/90 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-white/20">
          <div className="flex items-center space-x-4">
            <Image
              src="https://placehold.co/60x60/6366f1/white?text=Demo"
              alt="Demo Song"
              width={60}
              height={60}
              className="w-15 h-15 rounded-lg"
            />
            <div className="flex-1">
              <h3 className="text-white font-semibold">
                Perfect - Ed Sheeran
              </h3>
              <p className="text-gray-400 text-sm">Demo Track</p>
            </div>
            <button className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-full">
              <Play className="h-4 w-4" />
            </button>
            <button
              onClick={() => setShowMiniPlayer(false)}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;