"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";

const SongIndexPage = () => {
  // Mock data for popular songs
  const popularSongs = [
    {
      id: "1",
      title: "Blinding Lights",
      artist: "The Weeknd",
      album: "After Hours",
      duration: "3:20",
      cover: "https://placehold.co/200x200/8b5cf6/white?text=BL",
      plays: "2.1B",
    },
    {
      id: "2",
      title: "Shape of You",
      artist: "Ed Sheeran",
      album: "÷",
      duration: "3:53",
      cover: "https://placehold.co/200x200/6366f1/white?text=SOE",
      plays: "1.8B",
    },
    {
      id: "3",
      title: "Bad Guy",
      artist: "Billie Eilish",
      album: "When We All Fall Asleep",
      duration: "3:14",
      cover: "https://placehold.co/200x200/10b981/white?text=BG",
      plays: "1.5B",
    },
    {
      id: "4",
      title: "Dance Monkey",
      artist: "Tones and I",
      album: "The Kids Are Coming",
      duration: "3:29",
      cover: "https://placehold.co/200x200/f59e0b/white?text=DT",
      plays: "1.3B",
    },
    {
      id: "5",
      title: "Blinding Lights",
      artist: "The Weeknd",
      album: "After Hours",
      duration: "3:20",
      cover: "https://placehold.co/200x200/ec4899/white?text=BL",
      plays: "2.1B",
    },
    {
      id: "6",
      title: "Uptown Funk",
      artist: "Mark Ronson ft. Bruno Mars",
      album: "Uptown Special",
      duration: "4:30",
      cover: "https://placehold.co/200x200/06b6d4/white?text=UF",
      plays: "1.2B",
    },
  ];

  // State for header
  const [isLoggedIn] = useState(false);
  const [searchQuery] = useState("");

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-900 to-black text-white">
      <Header
        isLoggedIn={isLoggedIn}
        searchQuery={searchQuery}
        onSearchChange={() => {}} // No-op for songs page
      />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-2">Songs</h1>
        <p className="text-gray-400 mb-12">
          Browse the most popular songs on Duul.mn
        </p>

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
              {popularSongs.map((song, index) => (
                <tr
                  key={song.id}
                  className="border-b border-gray-800/50 hover:bg-gray-700/30 group"
                >
                  <td className="py-4 pl-6 text-gray-400 group-hover:text-white">
                    {index + 1}
                  </td>
                  <td className="py-4">
                    <div className="flex items-center space-x-4">
                      <Image
                        src={song.cover}
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
                  <td className="py-4 text-gray-400">{song.album}</td>
                  <td className="py-4 text-gray-400 text-right pr-6 flex items-center justify-end">
                    <div className="mr-4">{song.duration}</div>
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play className="h-4 w-4" />
                    </button>
                  </td>
                  <td className="py-4 text-gray-400 pr-6">{song.plays}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SongIndexPage;
