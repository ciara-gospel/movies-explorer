interface SortFiltersProps {
  currentSort: string;
  onSortChange: (newSort: string) => void;
}

const SortFilters = ({ currentSort, onSortChange }: SortFiltersProps) => {
  const filters = [
    { id: 'popularity.desc', label: 'Most Popular' },
    { id: 'vote_average.desc', label: 'Top Rated' },
    { id: 'primary_release_date.desc', label: 'Newest' },
  ];

  return (
    <div className="flex flex-wrap gap-3 mb-8">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onSortChange(filter.id)}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-all border ${
            currentSort === filter.id
              ? 'bg-red-600 border-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.4)]'
              : 'bg-zinc-900 border-white/10 text-gray-400 hover:border-white/30'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default SortFilters;