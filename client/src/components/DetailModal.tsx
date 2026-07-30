import { Bookmark, Heart, MessageCircle, Repeat, Send } from "lucide-react";
import Carousel from "./Carousel";
import PostContent from "./PostContent";
import ProfilePhoto from "./ProfilePhoto";

export default function DetaiModal() {
  return (
    <div className="grid grid-cols-9">
      <div className="col-span-4">
        <Carousel />
      </div>
      <div className="col-span-5">
        <div className="flex gap-2 items-center p-4 py-2">
          <div className="w-12 h-12 my-2">
            <ProfilePhoto />
          </div>
          <div className="font-semibold">Subairi</div>
          <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
          <div>2 h</div>
        </div>
        <div className="h-75 overflow-y-auto border-t border-gray-400 ">
          <div className="p-4">
            <PostContent />
            {[1,2,3,4,5].map(()=>(
                <div className="flex flex-col">
              <div className="grid grid-cols-8">
                <div className="col-span-1 p-2">
                  <div className="w-full aspect-square">
                    <ProfilePhoto />
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
            <ProfilePhoto />
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
