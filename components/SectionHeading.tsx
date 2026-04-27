import Image from "next/image";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  id?: string;
  align?: "left" | "center";
};

export default function SectionHeading({
  eyebrow,
  title,
  id,
  align = "center",
}: SectionHeadingProps) {
  return (
    <div
      className={
        align === "center"
          ? "mx-auto mb-10 max-w-3xl text-center sm:mb-14"
          : "mb-10 sm:mb-14"
      }
    >
      <p
        className={`mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-[#ff8c00] ${
          align === "center" ? "justify-center" : ""
        }`}
      >
        <Image src="/icon/subTitleIcon.svg" alt="" width={18} height={12} aria-hidden />
        {eyebrow}
      </p>
      <h2
        id={id}
        className="text-2xl font-bold leading-tight text-[#1a1a1a] sm:text-3xl lg:text-4xl"
      >
        {title}
      </h2>
    </div>
  );
}
