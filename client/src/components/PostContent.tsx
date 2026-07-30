import { useEffect, useRef, useState } from "react";

type CreatePostData = {
  caption: string;
  user: string;
};

export default function PostContent({
  caption,
  user,
}: CreatePostData) {
  const [expanded, setExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);

  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const element = textRef.current;

    if (!element) return;

    setIsOverflowing(
      element.scrollHeight > element.clientHeight
    );
  }, [caption]);

  return (
    <div>
      <p
        ref={textRef}
        className={`mt-1 whitespace-pre-wrap break-words ${
          !expanded ? "line-clamp-2" : ""
        }`}
      >
        <span className="font-semibold">{user} </span>
        {caption}
      </p>

      {isOverflowing && (
        <button
          onClick={() => setExpanded((prev) => !prev)}
          className="mt-2 text-sm font-medium text-gray-500 hover:underline"
        >
          {expanded ? "Show less" : "See more"}
        </button>
      )}
    </div>
  );
}