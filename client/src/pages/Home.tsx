import {
  Bookmark,
  Heart,
  MessageCircle,
  Plus,
  Repeat,
  Send,
} from "lucide-react";

import PostContent from "../components/PostContent";
import { useNavigate } from "react-router-dom";
import ProfilePhoto from "../components/ProfilePhoto";
import Modal from "../components/Modal";
import { useEffect, useState } from "react";
import DetaiModal from "../components/DetailModal";
import CreatePostModal from "./CreatePostModal";
import { usePosts } from "../hooks/Post/usePosts";
import PostImage from "../components/PostImage";
import { useMe } from "../hooks/Auth/useMe";
import { timeAgo } from "../helpers/timeAgo";
import { useLogout } from "../hooks/Auth/useLogout";
import { useUsersSuggestion } from "../hooks/User/useUsersSuggestion";
import FullPageLoader from "../components/Loader";

const Home = () => {
  // const { data: posts, isPending, isError } = usePosts();
  // const { data: me } = useMe();
  // const {data :suggest} = useUsersSuggestion();
  const logout = useLogout();

  const [open, setOpen] = useState(false);
  const [detailPost, setDetailPost] = useState<number | null>(null);
  const [openCreate, setOpenCreate] = useState(false);

  const { data: posts, isPending, isError } = usePosts();
  const { data: me, isPending: meLoading } = useMe();
  const { data: suggest, isPending: suggestLoading } = useUsersSuggestion();

  // useEffect(() => {
  //   console.log(posts);
  // }, []);
  // console.log(posts);
  const navigate = useNavigate();

  if (isPending || meLoading || suggestLoading) {
    return <FullPageLoader />;
  }

  if (isError) {
    return <div>Failed to load posts.</div>;
  }
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
                <ProfilePhoto image={me?.profile_image} />
              </button>

              <div>
                <p className="text-sm text-gray-500">
                  Welcome back{" "}
                  <span className="font-semibold">{me?.name} !</span>
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
                <CreatePostModal onSuccess={() => setOpenCreate(false)} />
              </div>
            </Modal>
          </div>
          {posts?.map((post: any) => (
            <div key={post?.id}>
              <div className="pt-10 pb-4 px-4 flex justify-between">
                <div className="flex gap-2 items-center">
                  <div className="w-12 h-12">
                    <ProfilePhoto image={post?.user?.profile_image} />
                  </div>
                  <div className="font-semibold">{post?.user.name}</div>
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                  <div>{timeAgo(post?.created_at)}</div>
                </div>
              </div>
              <div className="rounded-md overflow-hidden">
                <PostImage image={post?.image} />
              </div>
              <div className="flex justify-between mt-4 px-2">
                <div className="flex gap-6 items-center">
                  <Heart size={32} />
                  <button
                    onClick={() => {
                      setOpen(true);
                      setDetailPost(post.id);
                    }}
                  >
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
                <PostContent caption={post.caption} />
              </div>
            </div>
          ))}
          <Modal open={open} onClose={() => setOpen(false)}>
            <div className="">
              <DetaiModal id={detailPost!} />
            </div>
          </Modal>
        </div>
        <div className="col-span-3 flex flex-col px-10 pt-10">
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <div className="w-12 h-12">
                <ProfilePhoto
                  image={me?.profile_image}
                  onClick={() => navigate("/profile")}
                />
              </div>
              <div className="flex flex-col">
                <div className="font-semibold cursor-pointer">
                  {me?.username}
                </div>
                <div className="font-light">{me?.name}</div>
              </div>
            </div>
            <button
              onClick={() => logout.mutate()}
              disabled={logout.isPending}
              className="text-blue-700 text-sm hover:underline cursor-pointer"
            >
              {logout.isPending ? "Logging out..." : "Logout"}
            </button>
          </div>
          <div className="flex justify-between items-center pt-8 pb-6">
            <div className="font-semibold">Suggested for you</div>
          </div>
          {suggest?.map((user: any) => (
            <div
              onClick={() => navigate(`/profile/${user?.username}`)}
              key={user?.id}
              className="flex justify-between items-center pb-4"
            >
              <div className="flex gap-2">
                <div className="w-12 h-12">
                  <ProfilePhoto image={user?.profile_image} />
                </div>
                <div className="flex flex-col">
                  <div className="font-semibold cursor-pointer">
                    {user?.name}
                  </div>
                  <div className="font-light">Suggested for you</div>
                </div>
              </div>
              <div
                onClick={() => navigate(`/profile/${user?.username}`)}
                className="text-blue-700 text-sm hover:underline cursor-pointer"
              >
                Go to profile
              </div>
            </div>
          ))}
          <div className="font-light pt-10 text-center">© 2026 InstaApp</div>
        </div>
      </div>
    </div>
  );
};
export default Home;
