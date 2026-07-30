import { Heart, Images, MessageCircle } from "lucide-react";
import ProfilePhoto from "../components/ProfilePhoto";

const Profile = () => {
  const image =
    "https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg";
  return (
    <div className="max-w-5xl mx-auto">
      <div className="px-30">
        <div className="grid grid-cols-4">
          <div className="col-span-1 p-4">
            <div className="w-full aspect-square">
              <ProfilePhoto />
            </div>
          </div>
          <div className="col-span-3 p-4 flex flex-col  space-y-3">
            <div className="font-bold text-2xl">subaaaiii</div>
            <div className="text-lg">subairi</div>
            <div className="flex gap-4 ">
              <div>
                <span className="font-semibold">3</span> Post
              </div>
              <div>
                <span className="font-semibold">1,213</span> Followers
              </div>
              <div>
                <span className="font-semibold">1,213</span> Following
              </div>
            </div>
            <div>Hei</div>
            <div>
                <button className="py-2 px-6 bg-gray-200 rounded-lg font-semibold">edit profile</button>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-1 mt-6 rounded-md overflow-hidden">
        {[1, 2, 3, 4, 5, 6].map((_, index) => (
          <div
            key={index}
            className="group relative aspect-[4/5] overflow-hidden cursor-pointer"
          >
            <img
              src={image}
              alt=""
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />

            <Images
              size={24}
              className="absolute top-3 right-3 text-white drop-shadow-md"
            />

            <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="flex items-center gap-8 text-white font-semibold">
                <div className="flex items-center gap-2">
                  <Heart size={22} fill="currentColor" />
                  <span>1.2k</span>
                </div>

                <div className="flex items-center gap-2">
                  <MessageCircle size={22} fill="currentColor" />
                  <span>245</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="font-light pt-10 text-center pb-10">© 2026 Instagram from Meta</div>
    </div>
  );
};
export default Profile;
