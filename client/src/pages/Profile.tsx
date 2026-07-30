import { Camera, Ellipse, EllipsisVertical, Heart, MessageCircle, Pencil, Trash2 } from "lucide-react";
import ProfilePhoto from "../components/ProfilePhoto";
import { useMe } from "../hooks/Auth/useMe";
import { useChangeProfileImage } from "../hooks/Auth/useChangeProfileImage";
import { useUserPosts } from "../hooks/Post/useUserPost";
import Modal from "../components/Modal";
import { useState } from "react";
import DetaiModal from "../components/DetailModal";
import { storageUrl } from "../helpers/storageUrl";
import { useParams } from "react-router-dom";
import { useUser } from "../hooks/User/useUser";
import CreatePostModal from "./CreatePostModal";
import { useDeletePost } from "../hooks/Post/useDeletePost";
import Swal from "sweetalert2";

const Profile = () => {
  const { username } = useParams();
  const { data: me } = useMe();

  const isMyProfile = !username || username === me?.username;
  const { data: profile } = isMyProfile ? useMe() : useUser(username!);
  const [openEdit, setOpenEdit] = useState(false);
  const [editingPost, setEditingPost] = useState<any | null>(null);

  const changeProfileImage = useChangeProfileImage();
  const deletePost = useDeletePost();

  const handleChangeProfileImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("profile_image", file);

    changeProfileImage.mutate(formData, {
      onSuccess: () => {
        Swal.fire({
          icon: "success",
          title: "profile photo changed",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        });
      },
    });
  };

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "Delete post?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc2626",
    });

    if (!result.isConfirmed) return;

    deletePost.mutate(id, {
      onSuccess: () => {
        Swal.fire({
          icon: "success",
          title: "Post deleted",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        });
      },
    });
  };

  const [open, setOpen] = useState(false);
  const [detailPost, setDetailPost] = useState<number | null>(null);
  const { data: userPosts } = useUserPosts(profile?.username);
  console.log(profile);
  return (
    <div className="max-w-5xl mx-auto ">
      <div className="md:px-30">
        <div className="grid grid-cols-4 items-center  ">
          <div className="col-span-1 flex justify-center p-4">
            <div className="relative w-52">
              <div className="aspect-square overflow-hidden rounded-full">
                <ProfilePhoto image={profile?.profile_image} />
              </div>
              {isMyProfile && (
                <label className="absolute bottom-2 right-2 cursor-pointer rounded-full bg-white p-2 shadow hover:bg-gray-100">
                  <Camera size={18} />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleChangeProfileImage}
                  />
                </label>
              )}
            </div>
          </div>

          <div className="col-span-3 flex flex-col space-y-4 p-4">
            <h1 className="text-2xl font-bold">@{profile?.username}</h1>

            <div>
              <p className="text-lg">{profile?.name}</p>
            </div>

            <div className="flex gap-6">
              <div>
                <span className="font-semibold">{profile?.posts_count}</span>{" "}
                Posts
              </div>

              <div>
                <span className="font-semibold">1,213</span> Followers
              </div>

              <div>
                <span className="font-semibold">1,213</span> Following
              </div>
            </div>
          </div>
        </div>
      </div>
      {userPosts && userPosts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-1 mt-6 overflow-hidden rounded-md px-4 xl:px-0 justify-center">
          {userPosts?.map((post: any) => (
            <div
              key={post.id}
              onClick={() => {
                setOpen(true);
                setDetailPost(post.id);
              }}
              className="group relative aspect-[4/5] cursor-pointer overflow-hidden"
            >
              <img
                src={storageUrl(post?.image)}
                alt="post"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {isMyProfile && (
                  <div className="absolute md:hidden top-3 right-3 flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingPost(post);
                        setOpenEdit(true);
                      }}
                      className="rounded-full bg-white/20 p-2 text-white backdrop-blur hover:bg-white/30"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(post.id);
                      }}
                      disabled={deletePost.isPending}
                      className="rounded-full bg-red-500/80 p-2 text-white hover:bg-red-600 disabled:opacity-50"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                )}

              <div className="absolute inset-0 bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {isMyProfile && (
                  <div className="absolute top-3 right-3 flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingPost(post);
                        setOpenEdit(true);
                      }}
                      className="rounded-full bg-white/20 p-2 text-white backdrop-blur hover:bg-white/30"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(post.id);
                      }}
                      disabled={deletePost.isPending}
                      className="rounded-full bg-red-500/80 p-2 text-white hover:bg-red-600 disabled:opacity-50"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                )}

                <div className="flex h-full items-center justify-center">
                  <div className="flex items-center gap-8 font-semibold text-white">
                    <div className="flex items-center gap-2">
                      <Heart size={22} fill="currentColor" />
                      <span>{post.likes_count}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <MessageCircle size={22} fill="currentColor" />
                      <span>{post.comments_count}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <Modal
            open={openEdit}
            onClose={() => {
              setOpenEdit(false);
              setEditingPost(null);
            }}
          >
            {editingPost && (
              <CreatePostModal
                post={{
                  id: editingPost.id,
                  caption: editingPost.caption,
                  image: editingPost.image,
                }}
                onSuccess={() => {
                  setOpenEdit(false);
                  setEditingPost(null);
                }}
              />
            )}
          </Modal>
        </div>
      ) : (
        <div className="mt-20 flex flex-col items-center justify-center text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-gray-300">
            <MessageCircle size={36} className="text-gray-500" />
          </div>

          <h2 className="mt-4 text-2xl font-semibold">No posts yet</h2>

          <p className="mt-2 max-w-sm text-gray-500">
            {isMyProfile ? "You haven't" : "This user hasn't"} shared any posts
            yet.
          </p>
        </div>
      )}
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="">
          <DetaiModal id={detailPost!} />
        </div>
      </Modal>
      <div className="font-light pt-10 text-center pb-10">© 2026 InstaApp</div>
    </div>
  );
};
export default Profile;
