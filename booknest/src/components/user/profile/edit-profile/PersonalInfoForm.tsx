// components/profile/PersonalInfoForm.tsx

export default function PersonalInfoForm() {
  return (
    <div className="bg-white rounded-xl p-8 w-full max-w-md shadow-md">
      <h3 className="text-xl font-bold text-center text-[#6b3e2e] mb-6">
        Personal information:
      </h3>
      <div className="space-y-4">
        <div>
          <label className="block text-[#6b3e2e] mb-1">Name</label>
          <input
            className="w-full rounded-md border px-3 py-2 bg-gray-100"
            value="Chi Kien"
            readOnly
          />
        </div>
        <div>
          <label className="block text-[#6b3e2e] mb-1">Email</label>
          <input
            className="w-full rounded-md border px-3 py-2 bg-gray-100"
            value="Kien0405@booknest.com"
            readOnly
          />
        </div>
        <div className="text-center">
          <label className="block text-[#6b3e2e] mb-2">Avatar</label>
          <div className="flex justify-center items-center gap-4">
            <img
              src="/avatar.png"
              alt="User Avatar"
              className="w-10 h-10 rounded-full border"
            />
            <button className="bg-[#d6b28c] px-3 py-1 rounded text-[#5a3b2e] hover:bg-[#e4c5a3] shadow">
              Choose Image
            </button>
          </div>
        </div>
        <div className="flex justify-between pt-6">
          <button className="bg-[#d6b28c] px-4 py-2 rounded-lg text-[#5a3b2e] shadow hover:bg-[#e4c5a3]">
            Edit
          </button>
          <button className="bg-[#d6b28c] px-4 py-2 rounded-lg text-[#5a3b2e] shadow hover:bg-[#e4c5a3]">
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
