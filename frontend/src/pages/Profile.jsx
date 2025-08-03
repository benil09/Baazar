import { Camera } from "lucide-react";
import { useUserStore } from "../store/useUserStore";

const Profile = () => {
  // Sample user data (replace with real data via props or context)
  const { user } = useUserStore();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex flex-col items-center">
          <img
            src={user.profileImage}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-2 border-indigo-500"
          />
          <div className="relative mt-2">
            <label
              htmlFor="profileUpload"
              className="cursor-pointer absolute left-3 bottom-1 bg-indigo-500 text-white rounded-full p-2 hover:bg-indigo-600 transition-colors duration-300"
            >
              <Camera className="w-5 h-5  text-white-600 " />
            </label>
            <input
              type="file"
              id="profileUpload"
              className="hidden"
              accept="image/*"
              onChange={(e) => console.log("Selected file:", e.target.files[0])}
            />
          </div>
          <h2 className="text-xl font-semibold mt-4">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-gray-500 text-sm mt-1">
            Joined on {new Date(user.createdAt).toDateString()}
          </p>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-800">About</h3>
          <p className="text-gray-700 mt-2">{user.bio}</p>

          <div className="mt-4">
            <h4 className="text-sm text-gray-600">Location:</h4>
            <p className="text-gray-800">{user.location}</p>
            {user ? (
              <div className=" h-3 w-3  mt-4 rounded-full bg-green-400">
              </div>
            ) : (
              <div className=" h-3 w-3 mt-4  rounded-full bg-red-400"></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
