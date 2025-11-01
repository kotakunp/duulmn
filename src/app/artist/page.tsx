"use client";

import { useState } from "react";
import { Play, Heart, MoreHorizontal, User, Music } from "lucide-react";
import Image from "next/image";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Link from "next/link";

const ArtistIndexPage = () => {
  // Mock data for featured artists
  const featuredArtists = [
    {
      id: 'taylor-swift',
      name: "Taylor Swift",
      followers: "70.2M",
      image: "https://placehold.co/500x500/8b5cf6/white?text=TS",
      genres: ["Pop", "Country"],
    },
    {
      id: 'ed-sheeran',
      name: "Ed Sheeran",
      followers: "54.8M",
      image: "https://placehold.co/500x500/6366f1/white?text=ES",
      genres: ["Pop", "Folk"],
    },
    {
      id: 'billie-eilish',
      name: "Billie Eilish",
      followers: "32.1M",
      image: "https://placehold.co/500x500/10b981/white?text=BE",
      genres: ["Alternative", "Pop"],
    },
    {
      id: 'duulmn',
      name: "Duul.mn Artists",
      followers: "1.2M",
      image: "https://placehold.co/500x500/ec4899/white?text=DU",
      genres: ["Mongolian", "Folk"],
    },
  ];

  // State for header
  const [isLoggedIn] = useState(false);
  const [searchQuery] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Header 
        isLoggedIn={isLoggedIn} 
        searchQuery={searchQuery}
        onSearchChange={() => {}} // No-op for artist page
      />
      
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-2">Artists</h1>
        <p className="text-gray-400 mb-12">Discover your favorite artists on Duul.mn</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {featuredArtists.map((artist) => (
            <Link href={`/artist/${artist.id}`} key={artist.id}>
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-lg overflow-hidden hover:bg-gray-700/30 transition-all cursor-pointer group">
                <div className="relative">
                  <Image
                    src={artist.image}
                    alt={artist.name}
                    width={400}
                    height={400}
                    className="w-full aspect-square object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                    <h3 className="text-xl font-bold">{artist.name}</h3>
                    <p className="text-gray-300 text-sm">{artist.followers} followers</p>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex flex-wrap gap-2">
                    {artist.genres.map((genre, index) => (
                      <span 
                        key={index} 
                        className="px-2 py-1 text-xs bg-gray-700 rounded-full"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ArtistIndexPage;