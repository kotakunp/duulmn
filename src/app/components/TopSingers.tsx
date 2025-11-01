import { Star } from "lucide-react";
import Image from "next/image";

interface Singer {
  name: string;
  songs: number;
  avatar: string;
}

interface TopSingersProps {
  topSingers: Singer[];
}

const TopSingers = ({ topSingers }: TopSingersProps) => {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
      <div className="flex items-center space-x-3 mb-6">
        <div className="h-6 w-6 text-purple-400 bg-purple-400 rounded-full flex items-center justify-center">
          <Star className="h-4 w-4 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-white">
          Top Singers This Week
        </h3>
      </div>
      <div className="space-y-4">
        {topSingers.map((singer, index) => (
          <div
            key={index}
            className="flex items-center space-x-4 p-3 bg-white/5 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl font-bold text-purple-400">
                {index + 1}
              </span>
              <Image
                src={singer.avatar}
                alt={singer.name}
                width={40}
                height={40}
                className="w-10 h-10 rounded-full"
              />
            </div>
            <div className="flex-1">
              <h4 className="text-white font-semibold">
                {singer.name}
              </h4>
              <p className="text-gray-400 text-sm">
                {singer.songs} songs sung
              </p>
            </div>
            <Star className="h-5 w-5 text-yellow-400" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopSingers;