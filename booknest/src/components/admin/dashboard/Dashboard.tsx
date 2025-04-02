import StatsCard from "./StatsCard";

const Dashboard = () => {
  return (
    <main className="p-8 bg-[#F4ECE4] min-h-screen">
      <h1 className="text-center text-2xl font-semibold text-[#5B3B1D] mb-6">
        Welcome to your dashboard, BookNest
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-center">
        <StatsCard count={472} label="Accounts" />
        <StatsCard count={472} label="Books" />
        <StatsCard count={472} label="Reviews" />
        <StatsCard count={472} label="Discussions" />
      </div>

      <section className="mt-12">
        <FeatureItem title="Add other admins" />
        <FeatureItem title="Add books" />
        <FeatureItem title="Add Clubs" />
      </section>
    </main>
  );
};

interface FeatureItemProps {
  title: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ title }) => (
  <div className="flex items-start mt-4">
    <div className="bg-[#6B4226] text-white p-2 rounded-full mr-4">+</div>
    <div>
      <h3 className="text-lg font-semibold text-[#5B3B1D]">{title}</h3>
      <p className="text-sm text-[#7A5230]">
        Create rich course content and coaching products for your students.
      </p>
    </div>
  </div>
);

export default Dashboard;