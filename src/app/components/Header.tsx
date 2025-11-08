import { Search, Mic, Music } from "lucide-react";
import Image from "next/image";
import { useAuth } from "../../contexts/AuthContext";
import Link from "next/link";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const Header = ({ searchQuery, onSearchChange }: HeaderProps) => {
  const { state: authState, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <Music className="h-8 w-8 text-purple-400" />
              <span className="text-xl font-bold text-white">Duul.mn</span>
            </Link>
          </div>

          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search 6000+ karaoke songs..."
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-full text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
              />
              <Mic className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 cursor-pointer hover:text-white" />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {authState.loading ? (
              <div className="text-white">Loading...</div>
            ) : authState.user ? (
              <div className="flex items-center space-x-4">
                <Link href="/profile" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden">
                    <Image
                      src={authState.user.profileImage || `https://placehold.co/32x32/6366f1/white?text=${authState.user.username.charAt(0).toUpperCase()}`}
                      alt="Profile"
                      fill
                      sizes="32px"
                      className="object-cover"
                    />
                  </div>
                  <span className="text-white font-medium">{authState.user.username}</span>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="px-3 py-1 text-sm bg-gray-600 text-white rounded-full hover:bg-gray-700 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex space-x-3">
                <Link 
                  href="/signin"
                  className="px-4 py-2 text-white border border-white/30 rounded-full hover:bg-white/10 transition-colors"
                >
                  Sign In
                </Link>
                <Link 
                  href="/signup"
                  className="px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;