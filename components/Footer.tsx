import { Music } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black/40 backdrop-blur-md border-t border-white/10 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Music className="h-8 w-8 text-purple-400" />
              <span className="text-2xl font-bold text-white">
                KaraokeHub
              </span>
            </div>
            <p className="text-gray-400 mb-4">
              The ultimate karaoke platform for singers worldwide. Sing your
              favorite songs with professional backing tracks.
            </p>
            <div className="flex space-x-4">
              <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
              <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
              <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Community
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Status
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Copyright
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-6 mb-4 md:mb-0">
            <div className="flex space-x-2">
              <div className="w-12 h-8 bg-gray-700 rounded"></div>
              <div className="w-12 h-8 bg-gray-700 rounded"></div>
              <div className="w-12 h-8 bg-gray-700 rounded"></div>
            </div>
            <select className="bg-transparent text-gray-400 border border-gray-700 rounded px-3 py-1">
              <option>English</option>
              <option>Mongolian</option>
            </select>
          </div>

          <div className="flex space-x-4">
            <button className="px-6 py-3 bg-black/30 text-white rounded-lg border border-white/20 hover:bg-black/40 transition-colors">
              App Store
            </button>
            <button className="px-6 py-3 bg-black/30 text-white rounded-lg border border-white/20 hover:bg-black/40 transition-colors">
              Google Play
            </button>
          </div>
        </div>

        <div className="text-center text-gray-500 mt-8">
          © 2024 KaraokeHub. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;