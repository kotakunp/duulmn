"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Play, Search } from "lucide-react";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { fetchSongs } from "../../utils/api";
import { ISong } from "../../types";

const SongIndexPage = () => {
  const [songs, setSongs] = useState<ISong[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { state: authState } = useAuth();

  useEffect(() => {
    const loadSongs = async () => {
      try {
        setLoading(true);
        const response = await fetchSongs(50, 0, searchQuery || undefined); // Fetch more songs
        
        if (response.success && response.data.songs) {
          setSongs(response.data.songs);
        } else {
          setError(response.message || 'Failed to load songs');
        }
      } catch (err) {
        console.error('Error fetching songs:', err);
        setError('Failed to load songs');
      } finally {
        setLoading(false);
      }
    };

    loadSongs();
  }, [searchQuery]);

  // Format play count to be more readable
  const formatPlays = (playCount: number): string => {
    if (playCount >= 1000000) {
      return `${(playCount / 1000000).toFixed(1)}M`;
    }
    if (playCount >= 1000) {
      return `${(playCount / 1000).toFixed(1)}K`;
    }
    return playCount.toString();
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-900 to-black text-white">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-2">Songs</h1>
        <p className="text-gray-400 mb-8">
          Browse {songs.length} songs on Duul.mn
        </p>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search songs..."
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="text-gray-400">Loading songs...</div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="text-red-400">{error}</div>
          </div>
        ) : (
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700 text-left text-gray-400 text-sm">
                  <th className="pb-4 pl-6 w-12">#</th>
                  <th className="pb-4">TITLE</th>
                  <th className="pb-4">ARTIST</th>
                  <th className="pb-4">ALBUM</th>
                  <th className="pb-4 text-right pr-6">DURATION</th>
                  <th className="pb-4 pr-6">PLAYS</th>
                </tr>
              </thead>
              <tbody>
                {songs.map((song, index) => (
                  <tr
                    key={song._id}
                    className="border-b border-gray-800/50 hover:bg-gray-700/30 group"
                  >
                    <td className="py-4 pl-6 text-gray-400 group-hover:text-white">
                      {index + 1}
                    </td>
                    <td className="py-4">
                      <div className="flex items-center space-x-4">
                        <Image
                          src={song.coverImage || `https://placehold.co/40x40/6366f1/white?text=${encodeURIComponent(song.title.substring(0, 2))}`}
                          alt={song.title}
                          width={40}
                          height={40}
                          className="rounded"
                        />
                        <div>
                          <div className="font-medium">{song.title}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 text-gray-300">{song.artist}</td>
                    <td className="py-4 text-gray-400">{song.album || 'N/A'}</td>
                    <td className="py-4 text-gray-400 text-right pr-6 flex items-center justify-end">
                      <div className="mr-4">{song.duration}</div>
                      <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play className="h-4 w-4" />
                      </button>
                    </td>
                    <td className="py-4 text-gray-400 pr-6">{formatPlays(song.plays)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {songs.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No songs found matching your search.
              </div>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default SongIndexPage;
