import { Play } from "lucide-react";

interface Activity {
  user: string;
  song: string;
  time: string;
}

interface RecentActivityProps {
  recentActivity: Activity[];
}

const RecentActivity = ({ recentActivity }: RecentActivityProps) => {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
      <div className="flex items-center space-x-3 mb-6">
        <div className="h-6 w-6 text-blue-400 bg-blue-400 rounded-full flex items-center justify-center">
          <Play className="h-4 w-4 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-white">
          Recently Sung Nearby
        </h3>
      </div>
      <div className="space-y-4">
        {recentActivity.map((activity, index) => (
          <div
            key={index}
            className="flex items-center space-x-4 p-3 bg-white/5 rounded-lg"
          >
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <div className="flex-1">
              <h4 className="text-white font-semibold">
                {activity.user}
              </h4>
              <p className="text-gray-400 text-sm">
                Singing `{activity.song}` • {activity.time}
              </p>
            </div>
            <Play className="h-4 w-4 text-blue-400" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;