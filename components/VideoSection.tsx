"use client";

const videos = [
  {
    src: "/videos/indshortvidone.mp4",
    poster: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
    title: "Industrial Overview",
  },
  {
    src: "/videos/video2indus.mp4",
    poster: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
    title: "Project Management",
  },
  {
    src: "/videos/indusvide3.mp4",
    poster: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
    title: "Engineering Solutions",
  },
  {
    src: "/videos/indusvideo4.mp4",
    poster: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
    title: "EPC Services",
  },
  {
    src: "/videos/indusvid5.mp4",
    poster: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
    title: "Supply Chain",
  },
  {
    src: "/videos/indusvideo6.mp4",
    poster: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
    title: "Architecture Design",
  },
];

export default function VideoSection() {
  return (
    <section aria-label="Featured videos" className="py-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-3xl font-bold text-center text-gray-900">Our Latest Videos</h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {videos.map((v, i) => (
            <div key={i} className="group relative overflow-hidden rounded-lg shadow-lg">
              <video
                className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                src={v.src}
                poster={v.poster}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                controls={false}
              />
                          </div>
          ))}
        </div>
      </div>
    </section>
  );
}
