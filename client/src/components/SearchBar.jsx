export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative flex-1">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">🔍</span>
      <input
        type="text"
        placeholder="Search tasks..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-[#111] border border-[#222] rounded-xl px-3 py-2 pl-9 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-neutral-600 w-full"
      />
    </div>
  );
}