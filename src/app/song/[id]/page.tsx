"use client";

import { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { Play, Heart, MoreHorizontal, User } from "lucide-react";
import Image from "next/image";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useParams } from "next/navigation";
import Link from "next/link";

interface Song {
  id: string;
  title: string;
  artist: string;
  artistId: string;
  album: string;
  duration: string;
  cover: string;
  plays: string;
  likes: number;
  releaseDate: string;
  genre: string;
  lyrics: string;
}

const SongPage = () => {
  const params = useParams();
  const songId = params.id as string;

  // Mock data for different songs based on ID
  const getSongData = (id: string): Song => {
    switch (id) {
      case "shape-of-you":
        return {
          id: "shape-of-you",
          title: "Shape of You",
          artist: "Ed Sheeran",
          artistId: "ed-sheeran",
          album: "÷",
          duration: "3:53",
          cover: "https://placehold.co/400x400/6366f1/white?text=SOE",
          plays: "1.8B",
          likes: 45231,
          releaseDate: "January 6, 2017",
          genre: "Pop",
          lyrics: `The club isn't the best place to find a lover
So the bar is where I go
Me and my friends at the table doing shots
Drinking fast and then we talk slow
And you come over and start up a conversation with just me
And trust me I'll give it a chance now
Take my hand, stop, put Van The Man on the jukebox
And then we start to dance, and now I'm singing like
Girl, you know I want your love
Your love was handmade for somebody like me
Come on now, follow my lead
I may be crazy, don't mind me
Say, boy, let's not talk too much
Grab on my waist and put that body on me
Come on now, follow my lead
Come, come on now, follow my lead
I'm in love with the shape of you
We push and pull like a magnet do
Although my heart is falling too
I'm in love with your body
And last night you were in my room
And now my bedsheets smell like you
Every day discovering something brand new
I'm in love with your body`,
        };
      case "bad-guy":
        return {
          id: "bad-guy",
          title: "bad guy",
          artist: "Billie Eilish",
          artistId: "billie-eilish",
          album: "When We All Fall Asleep",
          duration: "3:14",
          cover: "https://placehold.co/400x400/10b981/white?text=BG",
          plays: "1.5B",
          likes: 38765,
          releaseDate: "March 29, 2019",
          genre: "Electropop",
          lyrics: `White shirt now red, my bloody nose
Sleeping, you're on your tippy toes
Creeping around like no one knows
Think you're so criminal
Bruises on both my knees for you
Don't say thank you or please
I do what I want when I'm wanting to
My soul? So cynical
So you're a tough guy
Like it really rough guy
Just can't get enough guy
Chest always so puffed guy
I'm that bad type
Make your mama sad type
Make your girlfriend mad tight
Might seduce your dad type
I'm the bad guy, duh`,
        };
      case "blinding-lights":
        return {
          id: "blinding-lights",
          title: "Blinding Lights",
          artist: "The Weeknd",
          artistId: "the-weeknd",
          album: "After Hours",
          duration: "3:20",
          cover: "https://placehold.co/400x400/8b5cf6/white?text=BL",
          plays: "2.1B",
          likes: 52987,
          releaseDate: "November 29, 2019",
          genre: "Synth-pop",
          lyrics: `Yeah
I been tryna call
I been on my own for long enough
Maybe you can show me how to love, maybe
I'm going through withdrawals
You don't even have to do too much
You can turn me on with just a touch, baby
I look around and Sin City's cold and empty (Oh)
No one's around to judge me (Oh)
I can't see clearly when you're gone
I said, ooh, I'm blinded by the lights
No, I can't sleep until I feel your touch
I said, ooh, I'm drowning in the night
Oh, when I'm like this, you're the one I trust
Hey, hey, hey`,
        };
      default:
        return {
          id: "default",
          title: "Song Title",
          artist: "Artist Name",
          artistId: "artist-id",
          album: "Album Name",
          duration: "3:00",
          cover: "https://placehold.co/400x400/000000/white?text=NA",
          plays: "0",
          likes: 0,
          releaseDate: "Unknown",
          genre: "Unknown",
          lyrics: "Lyrics not available.",
        };
    }
  };

  const song = getSongData(songId);

  const { state: authState } = useAuth();
  
  // State for header
  const [searchQuery] = useState("");

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-900 to-black text-white">
      <Header
        searchQuery={searchQuery}
        onSearchChange={() => {}} // No-op for song page
      />

      {/* Song header */}
      <div className="sticky top-0 z-10 bg-linear-to-b from-gray-900/80 to-transparent backdrop-blur-md pb-4">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end space-x-6">
            <Image
              src={song.cover}
              alt={song.title}
              width={250}
              height={250}
              className="rounded-md shadow-2xl border border-gray-800"
            />
            <div className="pb-4">
              <div className="text-sm font-bold">SONG</div>
              <h1 className="text-7xl font-bold mt-2">{song.title}</h1>
              <div className="flex items-center space-x-4 mt-4 text-gray-300">
                <Link
                  href={`/artist/${song.artistId}`}
                  className="hover:underline"
                >
                  <span className="flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>{song.artist}</span>
                  </span>
                </Link>
                <span>•</span>
                <span>{song.plays} plays</span>
                <span>•</span>
                <span>{song.likes.toLocaleString()} likes</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-20">
        {/* Action buttons */}
        <div className="flex items-center space-x-4 mt-6 mb-10">
          <button className="flex items-center space-x-2 bg-white text-black px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform">
            <Play className="h-5 w-5 fill-current" />
            <span>PLAY</span>
          </button>
          <button className="p-3 rounded-full border border-gray-400 hover:bg-gray-800 transition-colors">
            <Heart className="h-6 w-6" />
          </button>
          <button className="p-3 rounded-full border border-gray-400 hover:bg-gray-800 transition-colors">
            <MoreHorizontal className="h-6 w-6" />
          </button>
        </div>

        {/* Song info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-xl font-bold mb-3">Song Details</h3>
            <div className="space-y-2 text-gray-300">
              <div className="flex justify-between">
                <span>Album</span>
                <span>{song.album}</span>
              </div>
              <div className="flex justify-between">
                <span>Duration</span>
                <span>{song.duration}</span>
              </div>
              <div className="flex justify-between">
                <span>Release Date</span>
                <span>{song.releaseDate}</span>
              </div>
              <div className="flex justify-between">
                <span>Genre</span>
                <span>{song.genre}</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 bg-gray-800/30 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-xl font-bold mb-3">Lyrics</h3>
            <div className="text-gray-300 whitespace-pre-line max-h-96 overflow-y-auto pr-4">
              {song.lyrics}
            </div>
          </div>
        </div>

        {/* Related songs */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Related Songs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }, (_, i) => (
              <div
                key={i}
                className="flex items-center space-x-4 bg-gray-800/30 backdrop-blur-sm rounded-lg p-4 hover:bg-gray-700/30 transition-colors"
              >
                <Image
                  src={`https://placehold.co/60x60/6366f1/white?text=S${i + 1}`}
                  alt={`Related Song ${i + 1}`}
                  width={60}
                  height={60}
                  className="rounded"
                />
                <div className="flex-1">
                  <div className="font-medium">Related Song {i + 1}</div>
                  <div className="text-gray-400 text-sm">Artist {i + 1}</div>
                </div>
                <button className="p-2 rounded-full hover:bg-gray-700">
                  <Play className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SongPage;
