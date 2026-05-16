const MovieSkeleton = () => {
  return (
    <div className="bg-zinc-900 rounded-xl overflow-hidden animate-pulse">
      <div className="w-full aspect-[2/3] bg-zinc-800" />
      
      <div className="p-4 space-y-3">
        <div className="h-4 bg-zinc-800 rounded w-3/4" />
        <div className="flex justify-between">
          <div className="h-3 bg-zinc-800 rounded w-1/4" />
          <div className="h-3 bg-zinc-800 rounded w-1/4" />
        </div>
      </div>
    </div>
  );
};

export default MovieSkeleton;