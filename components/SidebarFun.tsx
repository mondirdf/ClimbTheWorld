"use client";

const funVideos = [
  "https://www.youtube.com/embed/2Vv-BfVoq4g?autoplay=1&mute=1&loop=1&playlist=2Vv-BfVoq4g",
  "https://www.youtube.com/embed/L_jWHffIx5E?autoplay=1&mute=1&loop=1&playlist=L_jWHffIx5E",
  "https://www.youtube.com/embed/ZZ5LpwO-An4?autoplay=1&mute=1&loop=1&playlist=ZZ5LpwO-An4",
];

export function SidebarFun() {
  return (
    <aside className="fixed right-4 top-4 z-40 hidden h-[92vh] w-80 overflow-y-auto rounded-xl border border-white/20 bg-black/60 p-4 backdrop-blur xl:block">
      <h2 className="text-lg font-bold">Satisfying Side Quest</h2>
      <p className="mb-3 text-xs text-slate-400">Autoplay loops for focused climbing vibes</p>
      <div className="space-y-4">
        {funVideos.map((video, idx) => (
          <div key={video} className="overflow-hidden rounded-lg border border-white/10">
            <iframe
              title={`Fun video ${idx + 1}`}
              src={video}
              className="aspect-video w-full"
              allow="autoplay; encrypted-media"
            />
          </div>
        ))}
      </div>
    </aside>
  );
}
