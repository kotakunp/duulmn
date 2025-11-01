import { TrendingUp, Users, Star } from "lucide-react";
import PlaylistCard from "./PlaylistCard";

interface Song {
  id: number;
  title: string;
  artist: string;
  cover: string;
}

interface FeaturedPlaylistsProps {
  featuredPlaylists: {
    trending: Song[];
    newReleases: Song[];
    duets: Song[];
    mongolian: Song[];
  };
}

const FeaturedPlaylists = ({ featuredPlaylists }: FeaturedPlaylistsProps) => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-12">
          {/* Trending */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <TrendingUp className="h-6 w-6 text-purple-400" />
              <h2 className="text-3xl font-bold text-white">
                Trending This Week
              </h2>
            </div>
            <div className="flex space-x-6 overflow-x-auto pb-4">
              {featuredPlaylists.trending.map((song) => (
                <PlaylistCard
                  key={song.id}
                  id={song.id}
                  title={song.title}
                  artist={song.artist}
                  cover={song.cover}
                  buttonLabel="Sing Now"
                  buttonColor="purple"
                />
              ))}
            </div>
          </div>

          {/* New Releases */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">
              New Releases
            </h2>
            <div className="flex space-x-6 overflow-x-auto pb-4">
              {featuredPlaylists.newReleases.map((song) => (
                <PlaylistCard
                  key={song.id}
                  id={song.id}
                  title={song.title}
                  artist={song.artist}
                  cover={song.cover}
                  buttonLabel="Sing Now"
                  buttonColor="blue"
                />
              ))}
            </div>
          </div>

          {/* Duets & Challenges */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <Users className="h-6 w-6 text-pink-400" />
              <h2 className="text-3xl font-bold text-white">
                Duets & Challenges
              </h2>
            </div>
            <div className="flex space-x-6 overflow-x-auto pb-4">
              {featuredPlaylists.duets.map((song) => (
                <PlaylistCard
                  key={song.id}
                  id={song.id}
                  title={song.title}
                  artist={song.artist}
                  cover={song.cover}
                  buttonLabel="Start Duet"
                  buttonColor="pink"
                />
              ))}
            </div>
          </div>

          {/* Mongolian Classics */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <Star className="h-6 w-6 text-yellow-400" />
              <h2 className="text-3xl font-bold text-white">
                Mongolian Classics
              </h2>
            </div>
            <div className="flex space-x-6 overflow-x-auto pb-4">
              {featuredPlaylists.mongolian.map((song) => (
                <PlaylistCard
                  key={song.id}
                  id={song.id}
                  title={song.title}
                  artist={song.artist}
                  cover={song.cover}
                  buttonLabel="Sing Now"
                  buttonColor="yellow"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPlaylists;