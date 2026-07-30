import ProfilePhoto from "../components/ProfilePhoto";
import { ImagePlus } from "lucide-react";

export default function CreatePostModal() {
  return (
    <div className="grid h-[80vh] grid-cols-9">
      <div className="col-span-5 flex items-center justify-center border-r bg-gray-100">
        <label className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-4">
          <ImagePlus size={64} className="text-gray-400" />

          <p className="text-lg font-semibold">
            Drag photos here
          </p>

          <button
            type="button"
            className="rounded-lg bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600"
          >
            Select from computer
          </button>

          <input
            type="file"
            accept="image/*"
            className="hidden"
          />
        </label>
      </div>

      <div className="col-span-4 flex flex-col">
        <div className="flex items-center gap-3 border-b p-4">
          <div className="h-12 w-12">
            <ProfilePhoto />
          </div>

          <div className="font-semibold">
            Subairi
          </div>
        </div>

        <div className="flex-1 p-4">
          <textarea
            placeholder="Write a caption..."
            maxLength={2200}
            className="h-full w-full resize-none border-none outline-none"
          />

          <div className="mt-2 text-right text-sm text-gray-400">
            0 / 2200
          </div>
        </div>

        <div className="border-t p-4">
          <button className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700">
            Share
          </button>
        </div>
      </div>
    </div>
  );
}