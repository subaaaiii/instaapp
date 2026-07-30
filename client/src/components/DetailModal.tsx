import {
  Bookmark,
  Heart,
  MessageCircle,
  Repeat,
  Send,
  Trash,
} from "lucide-react";
import PostContent from "./PostContent";
import ProfilePhoto from "./ProfilePhoto";
import PostImage from "./PostImage";
import { usePost } from "../hooks/Post/usePost";
import { timeAgo } from "../helpers/timeAgo";
import { useMe } from "../hooks/Auth/useMe";
import { useToggleLike } from "../hooks/Like/useToggleLike";
import { useComments } from "../hooks/Comment/useComments";
import { useCreateComment } from "../hooks/Comment/useCreateComment";
import { useState } from "react";
import { useDeleteComment } from "../hooks/Comment/useDeleteComment";
import Swal from "sweetalert2";

type Props = {
  id: number;
};

export default function DetailModal({ id }: Props) {
  const toggleLike = useToggleLike();

  const { data } = usePost(id);
  const { data: comments } = useComments(data?.id);
  const [content, setContent] = useState("");
  const createComment = useCreateComment();
  const deleteComment = useDeleteComment();
  const { data: me } = useMe();

  const handleDeleteComment = async (commentId: number, postId: number) => {
    const result = await Swal.fire({
      title: "Delete comment?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#ef4444",
    });

    if (!result.isConfirmed) return;

    deleteComment.mutate(
      {
        commentId,
        postId,
      },
      {
        onSuccess: () => {
          Swal.fire({
            icon: "success",
            title: "Comment deleted",
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
          });
        },
      },
    );
  };

  console.log("data post", data);

  return (
    <div className="grid grid-cols-9">
      <div className="hidden md:block col-span-4">
        <PostImage image={data?.image} />
      </div>

      <div className="col-span-9 md:col-span-5">
        <div className="flex gap-2 items-center p-4 py-2">
          <div className="w-12 h-12 my-2">
            <ProfilePhoto image={data?.user?.profile_image} />
          </div>
          <div className="font-semibold">{data?.user?.username}</div>
          <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
          <div>{timeAgo(data?.created_at)}</div>
        </div>

        <div className="h-72 overflow-y-auto border-t border-gray-400">
          <div className="p-4">
            <PostContent caption={data?.caption} user={data?.user.username} />

            {comments?.map((comment: any) => (
              <div key={comment.id} className="flex flex-col mb-3 ">
                <div className="grid grid-cols-8 items-center">
                  <div className="col-span-1 p-2">
                    <div className="w-full aspect-square">
                      <ProfilePhoto image={comment.user.profile_image} />
                    </div>
                  </div>
                  <div className="col-span-6 flex flex-col">
                    <div className="font-bold">{comment.user.username}</div>
                    <div className="text-lg">{comment.content}</div>
                  </div>
                  {comment.user.id === me?.id && (
                    <div className="col-span-1 flex flex-col">
                      <button
                        onClick={() => handleDeleteComment(comment.id, data.id)}
                        className="text-gray-400 transition hover:text-red-500"
                      >
                        <Trash size={20} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between mt-4 px-4 pt-4 border-t border-gray-400">
          <div className="flex gap-6 items-center">
            <div className="flex gap-1 items-center">
              <Heart
                size={32}
                fill={data?.is_liked ? "currentColor" : "none"}
                className={`cursor-pointer transition ${
                  data?.is_liked ? "text-red-500" : "hover:text-red-500"
                }`}
                onClick={() => data?.id && toggleLike.mutate(data.id)}
              />
              {data?.likes_count ? <div>{data.likes_count}</div> : null}
            </div>
            <div className="flex gap-1 items-center">
              <MessageCircle size={28} className="cursor-pointer" />

              {data?.comments_count > 0 && <div>{data?.comments_count}</div>}
            </div>
            <Repeat size={28} className="cursor-pointer" />
            <Send size={28} className="cursor-pointer" />
          </div>
          <div>
            <Bookmark size={30} className="cursor-pointer" />
          </div>
        </div>

        <div className="py-2 px-4">
          Liked by <span className="font-semibold">Sahrul</span> and others
        </div>

        <div className="flex items-center gap-3 p-4">
          <div className="h-12 w-12 shrink-0">
            <ProfilePhoto image={me?.profile_image} />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();

              if (!content.trim()) return;

              createComment.mutate({
                postId: data.id,
                content,
              });

              setContent("");
            }}
            className="flex flex-1 items-center gap-3"
          >
            <input
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 bg-transparent outline-none placeholder:text-gray-400"
            />

            <button
              type="submit"
              disabled={createComment.isPending}
              className="shrink-0 font-semibold text-blue-600 hover:text-blue-700 disabled:opacity-50"
            >
              {createComment.isPending ? "Posting..." : "Post"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
