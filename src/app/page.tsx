"use client";

import { useState, useEffect } from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import FeaturedPlaylists from "./components/FeaturedPlaylists";
import CommunitySection from "./components/CommunitySection";
import PremiumSection from "./components/PremiumSection";
import Footer from "./components/Footer";
import { fetchSongs } from "../utils/api";
import { ISong } from "../types";
import { SongProvider, useSongContext } from "../contexts/SongContext";
import { useAuth } from "../contexts/AuthContext";
import { useDebounce } from "../hooks/useDebounce";

interface PlaylistItem {
  id: string;
  title: string;
  artist: string;
  cover: string;
}

interface PlaylistData {
  trending: PlaylistItem[];
  newReleases: PlaylistItem[];
  duets: PlaylistItem[];
  mongolian: PlaylistItem[];
}

// Separate component that uses the context
const AppContent = () => {
  const { state, dispatch } = useSongContext();
  const { state: authState } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [showMiniPlayer, setShowMiniPlayer] = useState(false);
  const [featuredPlaylists, setFeaturedPlaylists] = useState<PlaylistData>({
    trending: [],
    newReleases: [],
    duets: [],
    mongolian: []
  });
  const [loading, setLoading] = useState(true);

  // Debounce search query to avoid too many API calls
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    const loadSongs = async () => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        
        // Fetch songs from the API, with search if query exists
        const response = await fetchSongs(20, 0, debouncedSearchQuery);
        
        if (response.success && response.data.songs) {
          const allSongs = response.data.songs;
          
          // Dispatch all songs to context
          dispatch({ type: 'SET_SONGS', payload: allSongs });
          
          // Categorize songs based on different criteria
          const trending = allSongs.slice(0, 4);
          const newReleases = allSongs.slice(4, 7);
          const duets = allSongs.filter(song => 
            song.title.toLowerCase().includes('duet') || 
            song.artist.toLowerCase().includes('&') ||
            song.title.toLowerCase().includes('feat') ||
            song.artist.toLowerCase().includes('and')
          ).slice(0, 4);
          const mongolian = allSongs.filter(song => 
            song.language?.toLowerCase() === 'mongolian'
          ).slice(0, 4);
          
          setFeaturedPlaylists({
            trending: trending.map(song => ({
              id: song._id,
              title: song.title,
              artist: song.artist,
              cover: song.coverImage || `https://placehold.co/300x300/6366f1/white?text=${encodeURIComponent(song.title.substring(0, 3))}`
            })),
            newReleases: newReleases.map(song => ({
              id: song._id,
              title: song.title,
              artist: song.artist,
              cover: song.coverImage || `https://placehold.co/300x300/f59e0b/white?text=${encodeURIComponent(song.title.substring(0, 3))}`
            })),
            duets: duets.length > 0 ? duets.map(song => ({
              id: song._id,
              title: song.title,
              artist: song.artist,
              cover: song.coverImage || `https://placehold.co/300x300/8b5cf6/white?text=${encodeURIComponent(song.title.substring(0, 3))}`
            })) : [...Array(2)].map((_, i) => ({
              id: i.toString(),
              title: "Sample Duet",
              artist: "Artist 1 & Artist 2",
              cover: `https://placehold.co/300x300/8b5cf6/white?text=Duet${i+1}`
            })),
            mongolian: mongolian.length > 0 ? mongolian.map(song => ({
              id: song._id,
              title: song.title,
              artist: song.artist,
              cover: song.coverImage || `https://placehold.co/300x300/06b6d4/white?text=${encodeURIComponent(song.title.substring(0, 3))}`
            })) : [...Array(2)].map((_, i) => ({
              id: i.toString(),
              title: `Монгол дуу ${i+1}`,
              artist: "Монголын дуучин",
              cover: `https://placehold.co/300x300/06b6d4/white?text=Монгол${i+1}`
            }))
          });
        }
      } catch (error) {
        console.error('Error fetching songs:', error);
        dispatch({ type: 'SET_ERROR', payload: 'Failed to load songs' });
        
        // Fallback to some mock data in case of error
        setFeaturedPlaylists({
          trending: [
            {
              id: "1",
              title: "Dancing Queen",
              artist: "ABBA",
              cover: "https://placehold.co/300x300/6366f1/white?text=ABBA",
            },
            {
              id: "2",
              title: "Bohemian Rhapsody",
              artist: "Queen",
              cover: "https://placehold.co/300x300/8b5cf6/white?text=Queen",
            },
            {
              id: "3",
              title: "Sweet Caroline",
              artist: "Neil Diamond",
              cover: "https://placehold.co/300x300/06b6d4/white?text=Neil",
            },
            {
              id: "4",
              title: "Don't Stop Believin'",
              artist: "Journey",
              cover: "https://placehold.co/300x300/10b981/white?text=Journey",
            },
          ],
          newReleases: [
            {
              id: "5",
              title: "Flowers",
              artist: "Miley Cyrus",
              cover: "https://placehold.co/300x300/f59e0b/white?text=Miley",
            },
            {
              id: "6",
              title: "As It Was",
              artist: "Harry Styles",
              cover: "https://placehold.co/300x300/ef4444/white?text=Harry",
            },
            {
              id: "7",
              title: "Anti-Hero",
              artist: "Taylor Swift",
              cover: "https://placehold.co/300x300/ec4899/white?text=Taylor",
            },
          ],
          duets: [
            {
              id: "8",
              title: "Shallow",
              artist: "Lady Gaga & Bradley Cooper",
              cover: "https://placehold.co/300x300/8b5cf6/white?text=Shallow",
            },
            {
              id: "9",
              title: "Endless Love",
              artist: "Lionel Richie & Diana Ross",
              cover: "https://placehold.co/300x300/f97316/white?text=Endless",
            },
          ],
          mongolian: [
            {
              id: "10",
              title: "Хөх тэнгэр",
              artist: "Бямбацогт",
              cover: "https://placehold.co/300x300/06b6d4/white?text=Хөх",
            },
            {
              id: "11",
              title: "Зүүнбаян",
              artist: "Наранцэцэг",
              cover: "https://placehold.co/300x300/10b981/white?text=Зүүн",
            },
          ]
        });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
        setLoading(false);
      }
    };

    loadSongs();
  }, [dispatch, debouncedSearchQuery]);

  const topSingers = [
    {
      name: "Tuya",
      songs: 127,
      avatar: "https://placehold.co/40x40/6366f1/white?text=T",
    },
    {
      name: "Bataa",
      songs: 98,
      avatar: "https://placehold.co/40x40/8b5cf6/white?text=B",
    },
    {
      name: "Saruul",
      songs: 85,
      avatar: "https://placehold.co/40x40/06b6d4/white?text=S",
    },
  ];

  const recentActivity = [
    { user: "Nara", song: "Shape of You", time: "2 min ago" },
    { user: "Bold", song: "Perfect", time: "5 min ago" },
    { user: "Oyuna", song: "Thinking Out Loud", time: "8 min ago" },
  ];

  if (state.loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-2xl">Loading songs...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Header 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      
      <HeroSection 
        showMiniPlayer={showMiniPlayer}
        setShowMiniPlayer={setShowMiniPlayer}
      />
      
      {/* Quick Access */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-4">Quick Access</h2>
            <div className="flex flex-wrap gap-3">
              <button className="px-4 py-2 bg-purple-600/20 text-purple-300 rounded-full hover:bg-purple-600/30 transition-colors">
                Continue Singing
              </button>
              <button className="px-4 py-2 bg-blue-600/20 text-blue-300 rounded-full hover:bg-blue-600/30 transition-colors">
                Recent Searches
              </button>
              <button className="px-4 py-2 bg-green-600/20 text-green-300 rounded-full hover:bg-green-600/30 transition-colors">
                My Favorites
              </button>
            </div>
          </div>
        </div>
      </section>

      <FeaturedPlaylists featuredPlaylists={featuredPlaylists} />
      <PremiumSection />
      <CommunitySection topSingers={topSingers} recentActivity={recentActivity} />

      {/* Ad Zone - Only for free users */}
      {!authState.user && (
        <section className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="bg-linear-to-r from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 relative">
              <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                AD
              </div>
              <div className="flex items-center justify-center space-x-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-600 rounded-full mx-auto mb-3"></div>
                  <h3 className="text-white font-semibold">
                    Premium Karaoke Experience
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Upgrade now for ad-free singing
                  </p>
                </div>
                <div className="hidden md:block w-px h-16 bg-gray-700"></div>
                <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors">
                  Go Premium
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <SongProvider>
      <AppContent />
    </SongProvider>
  );
};

export default App;
