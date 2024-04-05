type ContentBlockProps = {
  children: React.ReactNode;
};

export default function ContentBlock({ children }: ContentBlockProps) {
  return (
    <div className="bg-[#f7fbfa] shadow-sm rounded-md overflow-hidden size-full">
      {children}
    </div>
  );
}
