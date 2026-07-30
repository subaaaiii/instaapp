import { storageUrl } from "../helpers/storageUrl";

type PostImageProps = {
  image: string;
};

export default function PostImage({ image }: PostImageProps) {
  return (
    <div className="w-full aspect-[4/5] overflow-hidden">
      <img
        src={storageUrl(image)}
        alt="Post"
        className="w-full h-full object-cover"
      />
    </div>
  );
}