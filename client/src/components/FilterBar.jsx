const filters = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Done' },
  { value: 'high', label: '🔴 High' },
];

export default function FilterBar({ current, onChange }) {
  return (
    <div className="flex bg-[#111] border border-[#222] p-1 rounded-full gap-1">
      {filters.map((f) => (
        <button
          key={f.value}
          onClick={() => onChange(f.value)}
          className={`px-3 py-1 text-sm font-medium transition-all rounded-full
            ${current === f.value
              ? 'bg-white text-black shadow-sm'
              : 'text-neutral-500 hover:text-neutral-300 bg-transparent'
            }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}