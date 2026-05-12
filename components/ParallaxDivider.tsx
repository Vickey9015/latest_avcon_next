/**
 * ParallaxDivider
 *
 * A full-width section that shows only the factoryOuter.jpg image with
 * background-attachment:fixed. Because the StatsSection below uses the exact
 * same image + fixed attachment, both sections appear to share one single
 * locked backdrop while all other content scrolls over it.
 */
export default function ParallaxDivider() {
  return (
    <div
      aria-hidden="true"
      className="relative w-full"
      style={{
        height: "650px",
        backgroundImage:
          "url('/assets/docs/img/factoryOuter_new.jpg')",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* very subtle darkening so the two "windows" feel seamless with StatsSection */}
      <div className="absolute inset-0 bg-slate-900/40" />
    </div>
  );
}
