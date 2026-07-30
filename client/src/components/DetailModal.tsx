import { Bookmark, Heart, MessageCircle, Repeat, Send } from "lucide-react";
import PostContent from "./PostContent";
import ProfilePhoto from "./ProfilePhoto";
import PostImage from "./PostImage";
import { usePost } from "../hooks/Post/usePost";
import { timeAgo } from "../helpers/timeAgo";
import { useMe } from "../hooks/Auth/useMe";
type props = {
  id: number;
};

export default function DetaiModal({id}: props) {
    const image =
    "https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg";

    const {data} =usePost(id);
    const {data:me} =useMe();
    console.log(data)
  return (
    <div className="grid grid-cols-9">
      <div className="col-span-4">
        <PostImage image={data?.image}  />
      </div>
      <div className="col-span-5">
        <div className="flex gap-2 items-center p-4 py-2">
          <div className="w-12 h-12 my-2">
            <ProfilePhoto image={data?.user?.profile_image} />
          </div>
          <div className="font-semibold">{data?.user?.name}</div>
          <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
          <div>{timeAgo(data?.created_at)}</div>
        </div>
        <div className="h-75 overflow-y-auto border-t border-gray-400 ">
          <div className="p-4">
            <PostContent caption={data?.caption} />
            {[1,2,3,4,5].map(()=>(
                <div className="flex flex-col">
              <div className="grid grid-cols-8">
                <div className="col-span-1 p-2">
                  <div className="w-full aspect-square">
                    <ProfilePhoto image="" />
                  </div>
                </div>
                <div className="col-span-7 flex flex-col ">
                  <div className="font-bold ">subaaaiii</div>
                  <div className="text-lg">Sebelum apply, yuk update cv nya kak❤️🔥</div>
                </div>
              </div>
            </div>
            ))
            }
          </div>
        </div>
        <div className="flex justify-between mt-4 px-4 pt-4  border-t border-gray-400">
          <div className="flex gap-6 items-center">
            <Heart size={32} />
            <MessageCircle size={28} />
            <Repeat size={28} />
            <Send size={28} />
          </div>
          <div>
            <Bookmark size={30} />
          </div>
        </div>
        <div className="py-2 px-4">
          Liked by <span className="font-semibold">Sahrul</span> and others
        </div>
        <div className="flex items-center gap-3 p-4">
          <div className="w-12 h-12 shrink-0">
            <ProfilePhoto image={me?.profile_image} />
          </div>

          <input
            type="text"
            placeholder="Add a comment..."
            className="flex-1 bg-transparent outline-none placeholder:text-gray-400"
          />

          <button className="shrink-0 font-semibold text-blue-600 hover:text-blue-700 disabled:opacity-50">
            Post
          </button>
        </div>
      </div>

      <div></div>
    </div>
  );
}
