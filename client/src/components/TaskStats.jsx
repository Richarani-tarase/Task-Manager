export default function TaskStats({ tasks }) {
  const total = tasks.length;
  const active = tasks.filter((t) => !t.completed).length;
  const high = tasks.filter((t) => t.priority === 'high' && !t.completed).length;
  const completed = tasks.filter((t) => t.completed).length;

  const stats = [
    { label: 'Total tasks', value: total, icon: '📋', iconBg: 'bg-[#1A1A1A] border border-[#2A2A2A]' },
    { label: 'Active', value: active, icon: '⏳', iconBg: 'bg-[#2E1F06] text-amber-400' },
    { label: 'High priority', value: high, icon: '🔥', iconBg: 'bg-[#2A0A0A] text-red-400' },
    { label: 'Done', value: completed, icon: '✓', iconBg: 'bg-[#0D2310] text-green-400' },
  ];

  return (
    <div className="grid grid-cols-4 gap-3 mb-6">
      {stats.map((s) => (
        <div key={s.label} className="bg-[#111] border border-[#222] rounded-2xl p-3 flex items-center gap-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${s.iconBg}`}>
            {s.icon}
          </div>
          <div>
            <div className="text-xl font-semibold text-white">{s.value}</div>
            <div className="text-xs text-neutral-500">{s.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}