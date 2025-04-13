export default function ProfileHeader() {
  return (
    <div className="relative bg-gradient-to-r from-[#f2e3cd] to-[#e0c197] rounded-b-3xl shadow-lg p-8 text-[#5a3b2e]">
      {/* Avatar */}
      <div className="absolute left-1/2 -top-10 transform -translate-x-1/2">
        <img
          src="/avatar.png"
          alt="User Avatar"
          className="w-20 h-20 rounded-full border-4 border-white shadow-md"
        />
      </div>

      <div className="flex flex-col items-center pt-12 space-y-2">
        <h2 className="text-2xl font-semibold font-serif">Nguyen Chi Kien</h2>
        <div className="flex gap-16 pt-2 text-sm font-medium">
          <p>Followers: <span className="font-bold">5</span></p>
          <p>Followings: <span className="font-bold">8</span></p>
        </div>
      </div>

      {/* Button & Info Sections */}
      <div className="mt-6 grid grid-cols-2 text-center items-center font-serif">
        <div>
          <p className="mb-2">Your book reviews:</p>
          <button className="bg-[#d6b28c] hover:bg-[#e4c5a3] text-[#5a3b2e] px-4 py-2 rounded-lg shadow">
            Show List
          </button>
        </div>
        <div>
          <p className="mb-2">Your Personal information:</p>
          <button className="bg-[#d6b28c] hover:bg-[#e4c5a3] text-[#5a3b2e] px-4 py-2 rounded-lg shadow">
            Edit information
          </button>
        </div>
      </div>
    </div>
  );
}
