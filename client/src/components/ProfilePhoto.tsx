import ImageDefault from "../assets/defaultProfile.jpg"
import { storageUrl } from "../helpers/storageUrl";

type ProfileProps = {
  onClick?: () => void;
  image: string;
};
export default function ProfilePhoto({onClick, image}:ProfileProps) {
  return (
    <div onClick={onClick} className="w-full h-full overflow-hidden rounded-full border border-gray-200 cursor-pointer">
      <img
        src={image?.trim() ? `${storageUrl(image)}` : ImageDefault}
        alt="Profile"
        className="w-full h-full object-cover"
      />
    </div>
  );
}
