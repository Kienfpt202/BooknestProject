import Link from "next/link";

type LinkTextProps = {
  href: string;
  text: string;
  className?: string;
};

const LinkText = ({ href, text, className = "" }: LinkTextProps) => {
  return (
    <Link href={href}>
      <a className={`text-[#442a1a] font-bold hover:underline hover:text-[#5a3e2b] transition-all duration-200 ${className}`} aria-label={text}>
        {text}
      </a>
    </Link>
  );
};

export default LinkText;
