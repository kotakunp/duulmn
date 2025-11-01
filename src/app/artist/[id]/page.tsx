"use client";

import { useState } from "react";
import { Play, Heart, MoreHorizontal, User, Music } from "lucide-react";
import Image from "next/image";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { useParams } from "next/navigation";

interface Song {
  id: number;
  title: string;
  album: string;
  duration: string;
  cover: string;
}

interface Album {
  id: number;
  title: string;
  year: number;
  cover: string;
}

const ArtistPage = () => {
  const params = useParams();
  const artistId = params.id as string;
  
  // Mock data for different artists based on ID
  const getArtistData = (id: string) => {
    switch(id) {
      case 'taylor-swift':
        return {
          id: 'taylor-swift',
          name: "Taylor Swift",
          followers: "70.2M",
          monthlyListeners: "61.2M",
          image: "https://placehold.co/500x500/8b5cf6/white?text=TS",
          bio: "Taylor Alison Swift is an American singer-songwriter. Her work is characterized by narrative songs about her personal life, which has led to much public interest and media coverage.",
          genres: ["Pop", "Country", "Alternative"]
        };
      case 'ed-sheeran':
        return {
          id: 'ed-sheeran',
          name: "Ed Sheeran",
          followers: "54.8M",
          monthlyListeners: "42.1M",
          image: "https://placehold.co/500x500/6366f1/white?text=ES",
          bio: "Edward Christopher Sheeran is an English singer-songwriter. He is known for his melodic folk-pop songs and hits like 'Shape of You' and 'Thinking Out Loud'.",
          genres: ["Pop", "Folk", "Singer-Songwriter"]
        };
      case 'billie-eilish':
        return {
          id: 'billie-eilish',
          name: "Billie Eilish",
          followers: "32.1M",
          monthlyListeners: "28.9M",
          image: "https://placehold.co/500x500/10b981/white?text=BE",
          bio: "Billie Eilish Pirate Baird O'Connell is an American singer-songwriter. She is known for her musical stylings and haunting vocals that contrast with her young age.",
          genres: ["Alternative", "Pop", "Electropop"]
        };
      case 'duulmn':
        return {
          id: 'duulmn',
          name: "Duul.mn Artists",
          followers: "1.2M",
          monthlyListeners: "850K",
          image: "https://placehold.co/500x500/ec4899/white?text=DU",
          bio: "Top Mongolian artists on Duul.mn - showcasing the best of Mongolian music and karaoke performances.",
          genres: ["Mongolian", "Pop", "Folk"]
        };
      default:
        return {
          id: 'default',
          name: "Artist",
          followers: "0",
          monthlyListeners: "0",
          image: "https://placehold.co/500x500/000000/white?text=NA",
          bio: "Artist information not available.",
          genres: ["Unknown"]
        };
    }
  };

  const artist = getArtistData(artistId);

  // State for header
  const [isLoggedIn] = useState(false);
  const [searchQuery] = useState("");

  // Get artist-specific data
  const getArtistData = (id: string) => {
    switch(id) {
      case 'taylor-swift':
        return {
          topSongs: [
            { id: 1, title: "Anti-Hero", album: "Midnights", duration: "3:20", cover: "https://placehold.co/60x60/ec4899/white?text=AH" },
            { id: 2, title: "Shake It Off", album: "1989", duration: "3:39", cover: "https://placehold.co/60x60/6366f1/white?text=SI" },
            { id: 3, title: "Love Story", album: "Fearless", duration: "3:55", cover: "https://placehold.co/60x60/06b6d4/white?text=LS" },
            { id: 4, title: "You Belong With Me", album: "Fearless", duration: "3:50", cover: "https://placehold.co/60x60/10b981/white?text=YT" },
            { id: 5, title: "Blank Space", album: "1989", duration: "3:51", cover: "https://placehold.co/60x60/f59e0b/white?text=BS" },
          ],
          albums: [
            { id: 1, title: "Midnights", year: 2022, cover: "https://placehold.co/200x200/ec4899/white?text=MT" },
            { id: 2, title: "1989", year: 2014, cover: "https://placehold.co/200x200/6366f1/white?text=19" },
            { id: 3, title: "Red", year: 2012, cover: "https://placehold.co/200x200/ef4444/white?text=RD" },
            { id: 4, title: "Fearless", year: 2008, cover: "https://placehold.co/200x200/10b981/white?text=FB" },
            { id: 5, title: "Lover", year: 2019, cover: "https://placehold.co/200x200/f97316/white?text=LV" },
            { id: 6, title: "Folklore", year: 2020, cover: "https://placehold.co/200x200/a855f7/white?text=FL" },
          ],
          relatedArtists: [
            { id: 1, name: "Ariana Grande", image: "https://placehold.co/100x100/8b5cf6/white?text=AG" },
            { id: 2, name: "Ed Sheeran", image: "https://placehold.co/100x100/6366f1/white?text=ES" },
            { id: 3, name: "Katy Perry", image: "https://placehold.co/100x100/ec4899/white?text=KP" },
            { id: 4, name: "Selena Gomez", image: "https://placehold.co/100x100/06b6d4/white?text=SG" },
            { id: 5, name: "Billie Eilish", image: "https://placehold.co/100x100/10b981/white?text=BE" },
            { id: 6, name: "Dua Lipa", image: "https://placehold.co/100x100/f59e0b/white?text=DL" },
          ]
        };
      case 'ed-sheeran':
        return {
          topSongs: [
            { id: 1, title: "Shape of You", album: "Divide", duration: "3:53", cover: "https://placehold.co/60x60/6366f1/white?text=SOE" },
            { id: 2, title: "Perfect", album: "Divide", duration: "4:23", cover: "https://placehold.co/60x60/06b6d4/white?text=PER" },
            { id: 3, title: "Thinking Out Loud", album: "X", duration: "4:41", cover: "https://placehold.co/60x60/10b981/white?text=TOL" },
            { id: 4, title: "Castle on the Hill", album: "Divide", duration: "4:21", cover: "https://placehold.co/60x60/f59e0b/white?text=CTH" },
            { id: 5, title: "Photograph", album: "X", duration: "4:17", cover: "https://placehold.co/60x60/ef4444/white?text=PHO" },
          ],
          albums: [
            { id: 1, title: "Divide", year: 2017, cover: "https://placehold.co/200x200/6366f1/white?text=D" },
            { id: 2, title: "Plus", year: 2011, cover: "https://placehold.co/200x200/06b6d4/white?text=+" },
            { id: 3, title: "X", year: 2014, cover: "https://placehold.co/200x200/10b981/white?text=X" },
            { id: 4, title: "Equals", year: 2021, cover: "https://placehold.co/200x200/f59e0b/white?text=EQ" },
            { id: 5, title: "No.6 Collaborations Project", year: 2019, cover: "https://placehold.co/200x200/ec4899/white?text=NC" },
            { id: 6, title: "Subtract", year: 2023, cover: "https://placehold.co/200x200/8b5cf6/white?text=SUB" },
          ],
          relatedArtists: [
            { id: 1, name: "George Ezra", image: "https://placehold.co/100x100/6366f1/white?text=GE" },
            { id: 2, name: "James Bay", image: "https://placehold.co/100x100/06b6d4/white?text=JB" },
            { id: 3, name: "Lewis Capaldi", image: "https://placehold.co/100x100/10b981/white?text=LC" },
            { id: 4, name: "Shawn Mendes", image: "https://placehold.co/100x100/f59e0b/white?text=SM" },
            { id: 5, name: "Charlie Puth", image: "https://placehold.co/100x100/ef4444/white?text=CP" },
            { id: 6, name: "John Legend", image: "https://placehold.co/100x100/ec4899/white?text=JL" },
          ]
        };
      case 'billie-eilish':
        return {
          topSongs: [
            { id: 1, title: "bad guy", album: "When We All Fall Asleep", duration: "3:14", cover: "https://placehold.co/60x60/10b981/white?text=BG" },
            { id: 2, title: "Therefore I Am", album: "Happier Than Ever", duration: "2:58", cover: "https://placehold.co/60x60/f59e0b/white?text=TIAM" },
            { id: 3, title: "Everything I Wanted", album: "When We All Fall Asleep", duration: "4:05", cover: "https://placehold.co/60x60/ef4444/white?text=EIW" },
            { id: 4, title: "Happier Than Ever", album: "Happier Than Ever", duration: "4:58", cover: "https://placehold.co/60x60/ec4899/white?text=HTE" },
            { id: 5, title: "Ocean Eyes", album: "Don't Smile at Me", duration: "3:20", cover: "https://placehold.co/60x60/8b5cf6/white?text=OE" },
          ],
          albums: [
            { id: 1, title: "Happier Than Ever", year: 2021, cover: "https://placehold.co/200x200/10b981/white?text=HTE" },
            { id: 2, title: "When We All Fall Asleep", year: 2019, cover: "https://placehold.co/200x200/f59e0b/white?text=WWAFAS" },
            { id: 3, title: "Don't Smile at Me", year: 2017, cover: "https://placehold.co/200x200/ef4444/white?text=DSAM" },
          ],
          relatedArtists: [
            { id: 1, name: "FINNEAS", image: "https://placehold.co/100x100/10b981/white?text=FN" },
            { id: 2, name: "Clairo", image: "https://placehold.co/100x100/f59e0b/white?text=CL" },
            { id: 3, name: "Rex Orange County", image: "https://placehold.co/100x100/ef4444/white?text=ROC" },
            { id: 4, name: "Phoebe Bridgers", image: "https://placehold.co/100x100/ec4899/white?text=PB" },
            { id: 5, name: "Tate McRae", image: "https://placehold.co/100x100/8b5cf6/white?text=TM" },
            { id: 6, name: "Olivia Rodrigo", image: "https://placehold.co/100x100/06b6d4/white?text=OR" },
          ]
        };
      case 'duulmn':
        return {
          topSongs: [
            { id: 1, title: "Хөх тэнгэр", album: "Classics", duration: "3:45", cover: "https://placehold.co/60x60/06b6d4/white?text=HT" },
            { id: 2, title: "Зүүнбаян", album: "Traditional", duration: "4:12", cover: "https://placehold.co/60x60/10b981/white?text=ZB" },
            { id: 3, title: "Модон чулуун", album: "Folk", duration: "3:28", cover: "https://placehold.co/60x60/f59e0b/white?text=MC" },
            { id: 4, title: "Номин тэнгэр", album: "Mongolian Hits", duration: "4:01", cover: "https://placehold.co/60x60/ec4899/white?text=NT" },
            { id: 5, title: "Бурхан шивээ", album: "Spiritual", duration: "5:15", cover: "https://placehold.co/60x60/8b5cf6/white?text=BS" },
          ],
          albums: [
            { id: 1, title: "Mongolian Classics", year: 2020, cover: "https://placehold.co/200x200/06b6d4/white?text=MC" },
            { id: 2, title: "Modern Mongolian", year: 2021, cover: "https://placehold.co/200x200/10b981/white?text=MM" },
            { id: 3, title: "Traditional Melodies", year: 2019, cover: "https://placehold.co/200x200/f59e0b/white?text=TM" },
            { id: 4, title: "Folk Revival", year: 2022, cover: "https://placehold.co/200x200/ec4899/white?text=FR" },
          ],
          relatedArtists: [
            { id: 1, name: "Бямбацогт", image: "https://placehold.co/100x100/06b6d4/white?text=BY" },
            { id: 2, name: "Наранцэцэг", image: "https://placehold.co/100x100/10b981/white?text=NR" },
            { id: 3, name: "Анхбаяр", image: "https://placehold.co/100x100/f59e0b/white?text=AB" },
            { id: 4, name: "Болд", image: "https://placehold.co/100x100/ec4899/white?text=BL" },
            { id: 5, name: "Цэцгээ", image: "https://placehold.co/100x100/8b5cf6/white?text=CE" },
            { id: 6, name: "Энхжаргал", image: "https://placehold.co/100x100/ef4444/white?text=EN" },
          ]
        };
      default:
        return {
          topSongs: [
            { id: 1, title: "Popular Song", album: "Album", duration: "3:30", cover: "https://placehold.co/60x60/6366f1/white?text=PS" },
            { id: 2, title: "Hit Track", album: "Album", duration: "3:45", cover: "https://placehold.co/60x60/8b5cf6/white?text=HT" },
            { id: 3, title: "Top Single", album: "Album", duration: "3:15", cover: "https://placehold.co/60x60/06b6d4/white?text=TS" },
          ],
          albums: [
            { id: 1, title: "Debut Album", year: 2020, cover: "https://placehold.co/200x200/6366f1/white?text=DA" },
            { id: 2, title: "Second Album", year: 2022, cover: "https://placehold.co/200x200/8b5cf6/white?text=SA" },
          ],
          relatedArtists: [
            { id: 1, name: "Similar Artist 1", image: "https://placehold.co/100x100/6366f1/white?text=SA1" },
            { id: 2, name: "Similar Artist 2", image: "https://placehold.co/100x100/8b5cf6/white?text=SA2" },
          ]
        };
    }
  };

  const { topSongs, albums, relatedArtists } = getArtistData(artistId);

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-900 to-black text-white">
      <Header
        isLoggedIn={isLoggedIn}
        searchQuery={searchQuery}
        onSearchChange={() => {}} // No-op for artist page
      />

      {/* Artist header */}
      <div className="sticky top-0 z-10 bg-linear-to-b from-gray-900/80 to-transparent backdrop-blur-md pb-4">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end space-x-6">
            <Image
              src={artist.image}
              alt={artist.name}
              width={250}
              height={250}
              className="rounded-md shadow-2xl border border-gray-800"
            />
            <div className="pb-4">
              <div className="text-sm font-bold">ARTIST</div>
              <h1 className="text-7xl font-bold mt-2">{artist.name}</h1>
              <div className="flex items-center space-x-4 mt-4 text-gray-300">
                <div className="flex items-center space-x-1">
                  <User className="h-4 w-4" />
                  <span>{artist.followers} followers</span>
                </div>
                <span>•</span>
                <span>{artist.monthlyListeners} monthly listeners</span>
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

        {/* Genres */}
        <div className="flex flex-wrap gap-2 mb-10">
          {artist.genres.map((genre, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-800 rounded-full text-sm hover:bg-gray-700 cursor-pointer"
            >
              {genre}
            </span>
          ))}
        </div>

        {/* About section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-4">About</h2>
          <p className="text-gray-300 max-w-3xl">{artist.bio}</p>
        </div>

        {/* Popular tracks */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Popular</h2>
            <div className="text-gray-400 text-sm">SEE ALL</div>
          </div>

          <div className="bg-gray-900/80 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800 text-left text-gray-400 text-sm">
                  <th className="pb-3 pl-6">#</th>
                  <th className="pb-3">TITLE</th>
                  <th className="pb-3">ALBUM</th>
                  <th className="pb-3 text-right pr-6">DURATION</th>
                </tr>
              </thead>
              <tbody>
                {topSongs.map((song, index) => (
                  <tr
                    key={song.id}
                    className="border-b border-gray-800/50 hover:bg-gray-800/50 group"
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
                    <td className="py-4 text-gray-400">{song.album}</td>
                    <td className="py-4 text-gray-400 text-right pr-6">
                      <div className="flex items-center justify-end space-x-4">
                        <div className="text-gray-400 text-sm">
                          {song.duration}
                        </div>
                        <button className="group-hover:opacity-100 opacity-0">
                          <Play className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Discography */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Albums</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {albums.map((album) => (
              <div key={album.id} className="group">
                <div className="mb-4">
                  <Image
                    src={album.cover}
                    alt={album.title}
                    width={200}
                    height={200}
                    className="rounded-md shadow-md w-full aspect-square object-cover group-hover:opacity-80 transition-opacity"
                  />
                </div>
                <div className="font-medium group-hover:underline">
                  {album.title}
                </div>
                <div className="text-gray-400 text-sm">{album.year}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Related artists */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Related Artists</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {relatedArtists.map((artist) => (
              <div key={artist.id} className="group">
                <div className="mb-4">
                  <Image
                    src={artist.image}
                    alt={artist.name}
                    width={200}
                    height={200}
                    className="rounded-full shadow-md w-full aspect-square object-cover group-hover:opacity-80 transition-opacity"
                  />
                </div>
                <div className="font-medium group-hover:underline">
                  {artist.name}
                </div>
                <div className="text-gray-400 text-sm">Artist</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ArtistPage;
