import { useEffect, useState } from "react";
import { ImagePlus } from "lucide-react";
import { useCreatePost } from "../hooks/Post/useCreatePost";
import { useUpdatePost } from "../hooks/Post/useUpdatePost";
import { storageUrl } from "../helpers/storageUrl";
import Swal from "sweetalert2";
import { useMediaQuery } from "../hooks/useMediaQuery";

type CreatePostModalProps = {
  onSuccess?: () => void;
  post?: {
    id: number;
    caption: string;
    image: string;
  };
};

export default function CreatePostModal({
  onSuccess,
  post,
}: CreatePostModalProps) {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const isEdit = !!post;

  const createPost = useCreatePost();
  const updatePost = useUpdatePost();

  const [caption, setCaption] = useState(post?.caption ?? "");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (post) {
      setCaption(post.caption);
    }
  }, [post]);

  const handleSubmit = () => {
    if (isEdit) {
      updatePost.mutate(
        {
          id: post.id,
          caption,
        },
        {
          onSuccess: () => {
            onSuccess?.();
          },
        },
      );

      return;
    }

    const formData = new FormData();

    formData.append("caption", caption);

    if (image) {
      formData.append("image", image);
    }

    createPost.mutate(formData, {
      onSuccess: () => {
        setCaption("");
        setImage(null);
        setPreview("");
        onSuccess?.();
        Swal.fire({
          icon: "success",
          title: "Post Created",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        });
      },
    });
  };

  const handleSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };
  const [step, setStep] = useState<1 | 2>(1);

  if (isMobile) {
  return (
    <div className="flex h-[80vh] flex-col">
      {step === 1 && (
        <>
          <div className="flex items-center justify-between border-b p-4">
            <h2 className="font-semibold">
              {isEdit ? "Edit Post" : "Create Post"}
            </h2>

            {(preview || isEdit) && (
              <button
                onClick={() => setStep(2)}
                className="font-semibold text-yellow-600"
              >
                Next
              </button>
            )}
          </div>

          <div className="flex-1 bg-gray-100 ">
            {isEdit ? (
              <div className="aspect-[4/5] w-full overflow-hidden rounded-lg bg-gray-100">
                <img
                src={storageUrl(post.image)}
                alt=""
                className="w-full h-full object-cover"
              />
              </div>
              
            ) : preview ? (
              <div className="aspect-[4/5] w-fit overflow-hidden rounded-lg bg-gray-100">
                <img
                src={preview}
                alt=""
                className="w-full h-full object-cover"
              />
              </div>
            ) : (
              <label className="flex h-full cursor-pointer flex-col items-center justify-center gap-4">
                <ImagePlus size={64} className="text-gray-400" />

                <p className="font-semibold">
                  Select an image
                </p>

                <div className="rounded-lg bg-yellow-600 px-4 py-2 text-white">
                  Choose Image
                </div>

                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={handleSelectImage}
                />
              </label>
            )}
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <div className="flex items-center justify-between border-b p-4">
            <button
              onClick={() => setStep(1)}
              className="font-medium"
            >
              Back
            </button>

            <h2 className="font-semibold">
              Caption
            </h2>

            <button
              onClick={handleSubmit}
              disabled={
                isEdit
                  ? updatePost.isPending
                  : !image || createPost.isPending
              }
              className="font-semibold text-yellow-600 disabled:text-gray-400"
            >
              {isEdit ? "Save" : "Share"}
            </button>
          </div>

          <div className="flex-1 p-4">
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Write a caption..."
              maxLength={2200}
              className="h-full w-full resize-none outline-none"
            />

            <div className="-mt-4 text-right text-sm text-gray-400">
              {caption.length} / 2200
            </div>
          </div>
        </>
      )}
    </div>
  );
}

  return (
    <div className="grid h-[80vh] grid-cols-9">
      <div className="col-span-4 md:col-span-5 border-r border-gray-300 bg-gray-100">
        {isEdit ? (
          <div className="h-full w-full overflow-hidden">
            <img
              src={storageUrl(post.image)}
              alt="post"
              className="h-[80vh] w-full object-contain"
            />
          </div>
        ) : preview ? (
          <div className="h-[80vh] w-full overflow-hidden">
            <img
              src={preview}
              alt="preview"
              className="h-full w-full object-contain"
            />
          </div>
        ) : (
          <label className="flex h-full cursor-pointer flex-col items-center justify-center gap-4">
            <ImagePlus size={64} className="text-gray-400" />

            <p className="text-lg font-semibold">Drag photos here</p>

            <div className="rounded-lg bg-yellow-600 px-4 py-2 text-white">
              Select from computer
            </div>

            <input
              hidden
              type="file"
              accept="image/*"
              onChange={handleSelectImage}
            />
          </label>
        )}
      </div>

      <div className="col-span-5 md:col-span-4 flex flex-col">
        <div className="border-b border-gray-300 p-4">
          <h2 className="font-semibold text-lg">
            {isEdit ? "Edit Caption" : "Create Post"}
          </h2>
        </div>

        <div className="flex-1 p-4">
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Write a caption..."
            maxLength={2200}
            className="h-full w-full resize-none outline-none"
          />

          <div className="mt-2 text-right text-sm text-gray-400">
            {caption.length} / 2200
          </div>
        </div>

        <div className="p-4">
          <button
            onClick={handleSubmit}
            disabled={
              isEdit ? updatePost.isPending : !image || createPost.isPending
            }
            className="w-full rounded-lg bg-yellow-600 py-3 font-semibold text-white transition hover:bg-yellow-500 disabled:bg-gray-300"
          >
            {isEdit
              ? updatePost.isPending
                ? "Saving..."
                : "Save Changes"
              : createPost.isPending
                ? "Uploading..."
                : "Share"}
          </button>
        </div>
      </div>
    </div>
  );
}
