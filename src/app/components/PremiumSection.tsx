import { Crown, Shield } from "lucide-react";

const PremiumSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-r from-purple-900/30 to-blue-900/30">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-white mb-6">
          Go Premium. No Ads. HD Audio. Offline.
        </h2>
        <p className="text-xl text-gray-300 mb-12">
          Unlock the full karaoke experience with premium features
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-4">Free Plan</h3>
            <ul className="space-y-3 text-left">
              <li className="flex items-center space-x-2">
                <span className="text-green-400">✓</span>
                <span className="text-gray-300">Access to 3000+ songs</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-green-400">✓</span>
                <span className="text-gray-300">Standard audio quality</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-red-400">✗</span>
                <span className="text-gray-300">Ads between songs</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-red-400">✗</span>
                <span className="text-gray-300">No offline access</span>
              </li>
            </ul>
          </div>

          <div className="bg-linear-to-br from-purple-600/20 to-blue-600/20 backdrop-blur-sm rounded-2xl p-8 border border-purple-400/30 relative">
            <div className="absolute top-4 right-4">
              <Crown className="h-6 w-6 text-yellow-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Premium Plan
            </h3>
            <ul className="space-y-3 text-left">
              <li className="flex items-center space-x-2">
                <span className="text-green-400">✓</span>
                <span className="text-gray-300">
                  Full access to 6000+ songs
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-green-400">✓</span>
                <span className="text-gray-300">HD audio quality</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-green-400">✓</span>
                <span className="text-gray-300">Ad-free experience</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-green-400">✓</span>
                <span className="text-gray-300">Offline downloads</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-green-400">✓</span>
                <span className="text-gray-300">Advanced vocal effects</span>
              </li>
            </ul>
          </div>
        </div>

        <button className="px-8 py-4 bg-linear-to-r from-purple-600 to-blue-600 text-white rounded-full text-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg">
          Start 7-day Free Trial
        </button>

        <div className="flex justify-center items-center space-x-6 mt-8 text-gray-400">
          <Shield className="h-5 w-5" />
          <span>Secure payments with local banks</span>
          <div className="flex space-x-2">
            <div className="w-8 h-5 bg-gray-600 rounded"></div>
            <div className="w-8 h-5 bg-gray-600 rounded"></div>
            <div className="w-8 h-5 bg-gray-600 rounded"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PremiumSection;