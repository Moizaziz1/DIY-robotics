export function SkeletonCard() {
  return (
    <div className="bg-[#0c0c14] border border-white/[0.06] rounded-2xl overflow-hidden">
      <div className="h-52 skeleton" />
      <div className="p-6 space-y-3">
        <div className="h-3 skeleton w-1/4 rounded-md" />
        <div className="h-5 skeleton w-3/4 rounded-md" />
        <div className="h-3 skeleton w-full rounded-md" />
        <div className="h-3 skeleton w-2/3 rounded-md" />
      </div>
    </div>
  );
}

export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="h-4 skeleton rounded-md" style={{ width: `${85 - i * 15}%` }} />
      ))}
    </div>
  );
}
