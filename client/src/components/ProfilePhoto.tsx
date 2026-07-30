type ProfileProps = {
  onClick?: () => void;
};
export default function ProfilePhoto({onClick}:ProfileProps) {
  return (
    <div onClick={onClick} className="w-full h-full overflow-hidden rounded-full border border-gray-200 cursor-pointer">
      <img
        src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg"
        alt="Profile"
        className="w-full h-full object-cover"
      />
    </div>
  );
}
