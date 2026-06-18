type ScrollableCellProps = {
  children: React.ReactNode;
  className?: string;
  maxHeightClass?: string;
};

export default function ScrollableCell({
  children,
  className = "",
  maxHeightClass = "max-h-24",
}: ScrollableCellProps) {
  return (
    <div
      className={`${maxHeightClass} overflow-y-auto pr-1 text-sm leading-6 text-gray-600 ${className}`}
    >
      {children}
    </div>
  );
}
