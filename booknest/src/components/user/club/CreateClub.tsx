import React, { useState } from "react";
import Link from "next/link";

const CreateClub: React.FC = () => {
  const [clubName, setClubName] = useState("Tran Van Tuong");
  const [description, setDescription] = useState("bla bla bla");
  const [scope, setScope] = useState("Private");

  return (
    <div className="flex flex-col items-start p-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-6">Create club</h2>
      <div className="bg-white rounded-md shadow p-6 w-full max-w-md">
        <div className="space-y-4">
          {/* Club Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Club name
            </label>
            <input
              type="text"
              value={clubName}
              onChange={(e) => setClubName(e.target.value)}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-brown-500 focus:border-brown-500 sm:text-sm"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-brown-500 focus:border-brown-500 sm:text-sm"
            />
          </div>

          {/* Scope */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Scope
            </label>
            <div className="relative rounded-md shadow-sm">
              <select
                value={scope}
                onChange={(e) => setScope(e.target.value)}
                className="appearance-none block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-brown-500 focus:border-brown-500 sm:text-sm"
              >
                <option value="Private">Private</option>
                <option value="Public">Public</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-start gap-2 mt-6">
            <Link
              href="/user/club"
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brown-500"
            >
              Back
            </Link>
            <Link
              href="/user/club" // hoặc "/clubs/my-clubs" nếu bạn có trang danh sách riêng
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-amber-950 bg-brown-500 hover:bg-brown-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brown-500"
            >
              Done
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateClub;
