import {
  Bookmark,
  Heart,
  MessageCircle,
  Plus,
  Repeat,
  Send,
} from "lucide-react";
import Carousel from "../components/Carousel";
import { useTest } from "../hooks/test";
import PostContent from "../components/PostContent";
import { useNavigate } from "react-router-dom";
import ProfilePhoto from "../components/ProfilePhoto";
import Modal from "../components/Modal";
import { useState } from "react";
import DetaiModal from "../components/DetailModal";
import CreatePostModal from "./FormPost";

const Home = () => {
  const { data, isLoading } = useTest();
  const [open, setOpen] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  // useEffect(()=>{
  //     console.log(data)
  // },[])
  // console.log(data);
  const navigate = useNavigate();
  if (isLoading) return <p>Loading...</p>;
  return (
    <div className="max-w-6xl mx-auto pb-40">
      <div className="grid grid-cols-8">
        <div className="col-span-5 flex flex-col px-30">
          <div className="sticky top-0 z-50 flex items-center justify-between border-b border-gray-200 bg-white py-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/profile")}
                className="h-12 w-12 overflow-hidden rounded-full"
              >
                <ProfilePhoto />
              </button>

              <div>
                <p className="text-sm text-gray-500">
                  Welcome <span className="font-semibold">Subairi !</span>
                </p>
              </div>
            </div>

            <button
              className="rounded-full p-2 transition hover:bg-gray-100"
              aria-label="Create post"
              onClick={() => setOpenCreate(true)}
            >
              <Plus size={32} />
            </button>
            <Modal open={openCreate} onClose={() => setOpenCreate(false)}>
              <div className="">
                <CreatePostModal />
              </div>
            </Modal>
          </div>
          {[1, 2, 3, 4, 5].map(() => (
            <div>
              <div className="pt-10 pb-4 px-4 flex justify-between">
                <div className="flex gap-2 items-center">
                  <div className="w-12 h-12">
                    <ProfilePhoto />
                  </div>
                  <div className="font-semibold">Subairi</div>
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                  <div>2 h</div>
                </div>
              </div>
              <div className="rounded-md overflow-hidden">
                <Carousel />
              </div>
              <div className="flex justify-between mt-4 px-2">
                <div className="flex gap-6 items-center">
                  <Heart size={32} />
                  <button onClick={() => setOpen(true)}>
                    <MessageCircle size={28} />
                  </button>
                  <Repeat size={28} />
                  <Send size={28} />
                </div>
                <div>
                  <Bookmark size={30} />
                </div>
              </div>

              <div className="mt-2 px-2">
                Liked by <span className="font-semibold">Sahrul</span> and
                others
              </div>
              <div className="p-2">
                <PostContent />
              </div>
            </div>
          ))}
          <Modal open={open} onClose={() => setOpen(false)}>
            <div className="">
              <DetaiModal />
            </div>
          </Modal>
        </div>
        <div className="col-span-3 flex flex-col px-10 pt-10">
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <div className="w-12 h-12">
                <ProfilePhoto onClick={() => navigate("/profile")} />
              </div>
              <div className="flex flex-col">
                <div className="font-semibold cursor-pointer">subaaaiii</div>
                <div className="font-light">Subairi</div>
              </div>
            </div>
            <div className="text-blue-700 text-sm hover:underline cursor-pointer">
              Logout
            </div>
          </div>
          <div className="flex justify-between items-center pt-8 pb-6">
            <div className="font-semibold">Suggested for you</div>
            <div className="text-sm font-semibold">see all</div>
          </div>
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex justify-between items-center pb-4">
              <div className="flex gap-2">
                <div className="w-12 h-12">
                  <ProfilePhoto />
                </div>
                <div className="flex flex-col">
                  <div className="font-semibold cursor-pointer">
                    someone's else
                  </div>
                  <div className="font-light">Suggested for you</div>
                </div>
              </div>
              <div className="text-blue-700 text-sm hover:underline cursor-pointer">
                Follow
              </div>
            </div>
          ))}
          <div className="font-light pt-10">© 2026 Instagram from Meta</div>
        </div>
      </div>
    </div>
  );
};
export default Home;
