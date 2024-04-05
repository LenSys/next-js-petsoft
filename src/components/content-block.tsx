import { cn } from "@/lib/utils";

type ContentBlockProps = {
  children: React.ReactNode;
  className?: string;
};

export default function ContentBlock({
  children,
  className = "",
}: ContentBlockProps) {
  return (
    <div
      className={cn(
        "bg-[#f7fbfa] shadow-sm rounded-md overflow-hidden size-full",
        className
      )}
    >
      {children}
    </div>
  );
}
