import Image from "next/image";

interface PlaylistCardProps {
  id: number;
  title: string;
  artist: string;
  cover: string;
  buttonLabel?: string;
  buttonColor?: string;
  onButtonClick?: () => void;
}

const PlaylistCard = ({ 
  title, 
  artist, 
  cover, 
  buttonLabel = "Sing Now",
  buttonColor = "purple",
  onButtonClick
}: PlaylistCardProps) => {
  const buttonColors: Record<string, string> = {
    purple: "bg-purple-600 hover:bg-purple-700",
    blue: "bg-blue-600 hover:bg-blue-700",
    pink: "bg-pink-600 hover:bg-pink-700",
    yellow: "bg-yellow-600 hover:bg-yellow-700"
  };

  return (
    <div className="shrink-0 w-64 bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-purple-400/50 transition-all group">
      <Image
        src={cover}
        alt={title}
        width={256}
        height={256}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-white font-semibold mb-1">{title}</h3>
        <p className="text-gray-400 text-sm">{artist}</p>
        <button 
          onClick={onButtonClick}
          className={`mt-3 w-full ${buttonColors[buttonColor]} text-white py-2 rounded-lg text-sm font-medium transition-colors`}
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  );
};

export default PlaylistCard;