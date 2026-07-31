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
import { useEffect, useRef, useState } from "react";
import DetaiModal from "../components/DetailModal";
import CreatePostModal from "./CreatePostModal";
import { usePosts } from "../hooks/Post/usePosts";
import PostImage from "../components/PostImage";
import { useMe } from "../hooks/Auth/useMe";
import { timeAgo } from "../helpers/timeAgo";
import { useLogout } from "../hooks/Auth/useLogout";
import { useUsersSuggestion } from "../hooks/User/useUsersSuggestion";
import FullPageLoader from "../components/Loader";
import { useToggleLike } from "../hooks/Like/useToggleLike";

const Home = () => {
  // const { data: posts, isPending, isError } = usePosts();
  // const { data: me } = useMe();
  // const {data :suggest} = useUsersSuggestion();
  const logout = useLogout();
  const toggleLike = useToggleLike();

  const [open, setOpen] = useState(false);
  const [detailPost, setDetailPost] = useState<number | null>(null);
  const [openCreate, setOpenCreate] = useState(false);

  const { data: posts, isPending, isError } = usePosts();
  const { data: me, isPending: meLoading } = useMe();
  const { data: suggest, isPending: suggestLoading } = useUsersSuggestion();

  const navigate = useNavigate();

  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (isPending || meLoading || suggestLoading) {
    return <FullPageLoader />;
  }

  if (isError) {
    return <div>Failed to load posts.</div>;
  }
  return (
    <div className="max-w-6xl mx-auto pb-40 ">
      <div className="grid grid-cols-8">
        <div className="col-span-8 md:col-span-5 px-2 xl:px-0 flex flex-col ">
          <div className="sticky px-4 rounded-md top-0 shadow-[0_1px_3px_rgba(0,0,0,0.08)] z-50 flex items-center justify-between border-b border-gray-200 bg-white py-4">
            <div className="flex items-center gap-3">
              <div className="relative block md:hidden" ref={menuRef}>
                <button
                  onClick={() => setOpenMenu((prev) => !prev)}
                  className="h-12 w-12"
                >
                  <ProfilePhoto image={me?.profile_image} />
                </button>

                {openMenu && (
                  <div className="absolute -right-40 mt-2 w-48 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
                    <button
                      onClick={() => {
                        navigate("/profile");
                        setOpenMenu(false);
                      }}
                      className="w-full px-4 py-3 text-left transition hover:bg-gray-100"
                    >
                      Go to Profile
                    </button>

                    <button
                      onClick={() => {
                        logout.mutate();
                        setOpenMenu(false);
                      }}
                      className="w-full px-4 py-3 text-left text-red-600 transition hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
              <div>
                <p className="text-lg font-semibold">For your page</p>
              </div>
            </div>
            <button
              className="rounded-full bg-yellow-500 p-2 transition hover:bg-yellow-400"
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
          <div className="grid xl:grid-cols-2 gap-6">
            {posts?.map((post: any) => (
              <div key={post?.id} className="shadow-md mt-6 rounded-b-md">
                <div className="p-4 flex justify-between rounded-t-md border border-gray-200 ">
                  <div className="flex gap-2 items-center ">
                    <div className="w-12 h-12">
                      <ProfilePhoto image={post?.user?.profile_image} onClick={() => navigate(`/profile/${post?.user.username}`)} />
                    </div>
                    <div className="font-semibold">{post?.user.username}</div>
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                    <div>{timeAgo(post?.created_at)}</div>
                  </div>
                </div>
                <div className="overflow-hidden border border-gray-200">
                  <PostImage image={post?.image} />
                </div>
                <div className="flex justify-between mt-4 px-2">
                  <div className="flex gap-4 items-center">
                    <div className="flex gap-1 items-center">
                      <Heart
                        size={32}
                        fill={post.is_liked ? "currentColor" : "none"}
                        className={`cursor-pointer transition ${
                          post.is_liked ? "text-red-500" : "hover:text-red-500"
                        }`}
                        onClick={() => toggleLike.mutate(post.id)}
                      />
                      {post?.likes_count > 0 && <div>{post?.likes_count}</div>}
                    </div>
                    <div className="flex gap-1 items-center">
                      <button
                        onClick={() => {
                          setOpen(true);
                          setDetailPost(post.id);
                        }}
                      >
                        <MessageCircle size={28} />
                      </button>
                      {post?.comments_count > 0 && (
                        <div>{post?.comments_count}</div>
                      )}
                    </div>
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
                  <PostContent
                    caption={post?.caption}
                    user={post?.user.username}
                  />
                </div>
              </div>
            ))}
          </div>
          <Modal open={open} onClose={() => setOpen(false)}>
            <div className="">
              <DetaiModal id={detailPost!} />
            </div>
          </Modal>
        </div>
        <div className="hidden md:block col-span-3 flex flex-col px-10 pt-10">
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
                    {user?.username}
                  </div>
                  <div className="font-light">Suggested for you</div>
                </div>
              </div>
              <div
                onClick={() => navigate(`/profile/${user?.username}`)}
                className="hidden xl:block text-blue-700 text-sm hover:underline cursor-pointer"
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
