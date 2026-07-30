import { useState } from "react";
import { ImagePlus } from "lucide-react";
import { useCreatePost } from "../hooks/Post/useCreatePost";
import { useNavigate } from "react-router-dom";
type CreatePostModalProps = {
  onSuccess?: () => void;
};

export default function CreatePostModal({ onSuccess }: CreatePostModalProps) {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  // const image2 =
  //   "https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg";

  const createPost = useCreatePost();
  const navigate = useNavigate();

  const handleSubmit = () => {
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
      },
    });
  };

  const handleSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="grid h-[80vh] grid-cols-9">
      <div className="col-span-5 border-r border-gray-500 bg-gray-100">
        {preview ? (
          <div className="h-full w-full  max-h-[80vh] overflow-hidden">
            <img
              src={preview}
              alt=""
              className="h-full w-full object-contain"
            />
          </div>
        ) : (
          <label className="flex h-full cursor-pointer flex-col items-center justify-center gap-4">
            <ImagePlus size={64} className="text-gray-400" />

            <p className="text-lg font-semibold">Drag photos here</p>

            <div className="rounded-lg bg-blue-500 px-4 py-2 text-white">
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

      <div className="col-span-4 flex flex-col">
        <div className="flex items-center gap-3 border-b border-gray-500 p-4">
          <div className="font-semibold">Caption</div>
        </div>

        <div className="flex-1 p-4">
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            maxLength={2200}
            placeholder="Write a caption..."
            className="h-full w-full resize-none outline-none"
          />

          <div className="text-right text-sm text-gray-400">
            {caption.length} / 2200
          </div>
        </div>

        <div className="p-4">
          <button
            disabled={!image || createPost.isPending}
            onClick={handleSubmit}
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white disabled:bg-gray-300"
          >
            {createPost.isPending ? "Uploading..." : "Share"}
          </button>
        </div>
      </div>
    </div>
  );
}
