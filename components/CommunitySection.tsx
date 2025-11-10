import TopSingers from "./TopSingers";
import RecentActivity from "./RecentActivity";

interface Singer {
  name: string;
  songs: number;
  avatar: string;
}

interface Activity {
  user: string;
  song: string;
  time: string;
}

interface CommunitySectionProps {
  topSingers: Singer[];
  recentActivity: Activity[];
}

const CommunitySection = ({ topSingers, recentActivity }: CommunitySectionProps) => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-white text-center mb-12">
          Community Highlights
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          <TopSingers topSingers={topSingers} />
          <RecentActivity recentActivity={recentActivity} />
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;