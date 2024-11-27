import Spinner from "./spinner";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  classNames?: string;
  title?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  loading?: boolean;
  disabled?: boolean;
  text?: string;
  outline?: boolean;
  full?: boolean;
  children?: React.ReactNode;
}

export default function Button({
  type = "button",
  classNames = "",
  title = "",
  onClick = () => {},
  loading = false,
  disabled = false,
  text = "",
  outline = false,
  full = false,
  children = null,
}: ButtonProps) {
  const btnClassNames = [
    "focus:outline-none",
    "transition-all",
    "duration-300",
    "rounded-md",
    full ? "w-full" : "block mr-auto px-4 py-2",
    outline
      ? "bg-white border-[#CDCBCB] border-2 text-altBlack hover:bg-primary hover:text-white"
      : "bg-primary border-primary text-white hover:opacity-80",
    disabled
      ? "bg-[#e5e5e5] text0[#bdbdbd] cursor-not-allowed"
      : "cursor-pointer",
    classNames,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      title={title}
      className={btnClassNames}
      onClick={onClick}
      disabled={loading || disabled}
    >
      {loading ? <Spinner /> : children || text}
    </button>
  );
}
