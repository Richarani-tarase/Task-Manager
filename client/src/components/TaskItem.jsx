import { useState } from 'react';
import { isOverdue, formatDate } from '../utils';

const inputStyles = "border border-[#2A2A2A] rounded-xl px-3 py-2 text-sm text-white placeholder:text-neutral-600 bg-[#0A0A0A] focus:outline-none focus:ring-1 focus:ring-white/10 w-full";

export default function TaskItem({ task, onToggle, onDelete, onEdit, editId, setEditId }) {
  const overdue = isOverdue(task.dueDate, task.completed);
  const isEditing = editId === task.id;
  const isHighPriority = task.priority === 'high' && !task.completed;

  const [editData, setEditData] = useState({
    title: task.title,
    description: task.description || '',
    dueDate: task.dueDate || '',
    priority: task.priority || 'low',
  });

  function handleSave() {
    onEdit(task.id, editData);
    setEditId(null);
  }

  function handleDelete() {
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDelete(task.id);
    }
  }

  const priorityBorder = task.priority === 'high'
    ? 'border-l-red-500'
    : task.priority === 'medium'
      ? 'border-l-amber-500'
      : 'border-l-green-600';

  const priorityChip = task.priority === 'high'
    ? <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border bg-[#2A0A0A] text-red-400 border-red-900">↑ High</span>
    : task.priority === 'medium'
      ? <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border bg-[#2E1F06] text-amber-400 border-amber-900">→ Medium</span>
      : <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border bg-[#0D2310] text-green-400 border-green-900">↓ Low</span>;

  return (
    <div className={`bg-[#111] border border-[#1E1E1E] border-l-4 rounded-r-2xl p-4 mb-2 hover:border-[#2A2A2A] transition-colors
      ${priorityBorder}
      ${overdue ? 'bg-[#150A0A] border-red-900/50' : ''}
      ${isHighPriority && !overdue ? 'ring-1 ring-red-900/60' : ''}
      ${task.completed ? 'opacity-50' : ''}`}
    >
      <div className="flex items-start gap-3">
        <button
          onClick={() => onToggle(task.id, task.completed)}
          className={`w-5 h-5 rounded-full border-2 mt-0.5 flex-shrink-0 flex items-center justify-center transition-colors
            ${task.completed ? 'bg-white border-white text-black' : 'border-neutral-700 bg-transparent hover:border-neutral-400'}`}
        >
          {task.completed && <span className="text-[10px] font-bold">✓</span>}
        </button>

        <div className="flex-1 min-w-0">
          <div className={`text-sm font-medium ${task.completed ? 'line-through text-neutral-600' : 'text-white'}`}>
            {task.title}
          </div>
          {task.description && (
            <div className="text-xs text-neutral-500 mt-0.5 leading-relaxed">{task.description}</div>
          )}

          <div className="flex flex-wrap gap-1.5 mt-2">
            {priorityChip}
            {isHighPriority && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full border bg-[#3A0A0A] text-red-300 border-red-700">
                ⚡ Needs attention
              </span>
            )}
            {task.dueDate && (
              <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border
                ${overdue ? 'bg-[#2A0A0A] text-red-400 border-red-900' : 'bg-[#1A1A1A] text-neutral-500 border-[#2A2A2A]'}`}>
                📅 {overdue ? 'Overdue · ' : 'Due '}{formatDate(task.dueDate)}
              </span>
            )}
            <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border bg-[#1A1A1A] text-neutral-600 border-[#2A2A2A]">
              🕐 Added {formatDate(task.createdAt)}
            </span>
            {task.completed && (
              <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border bg-[#0D2310] text-green-400 border-green-900">
                ✓ Done
              </span>
            )}
          </div>

          {isEditing && (
            <div className="bg-[#0A0A0A] border border-[#222] rounded-xl p-3 mt-3 flex flex-col gap-2">
              <div>
                <label className="block text-xs text-neutral-500 mb-1">Title</label>
                <input
                  type="text"
                  className={inputStyles}
                  value={editData.title}
                  onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs text-neutral-500 mb-1">Description</label>
                <input
                  type="text"
                  className={inputStyles}
                  placeholder="Optional notes"
                  value={editData.description}
                  onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs text-neutral-500 mb-1">Due date (when must this be done by?)</label>
                <input
                  type="date"
                  className={inputStyles}
                  value={editData.dueDate}
                  onChange={(e) => setEditData({ ...editData, dueDate: e.target.value })}
                />
              </div>

              <div className="flex gap-2 mt-1">
                {['low', 'medium', 'high'].map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setEditData({ ...editData, priority: p })}
                    className={`flex-1 py-1.5 rounded-xl text-xs font-medium border transition-all
                      ${editData.priority === p
                        ? (p === 'low' ? 'bg-[#0D2310] border-green-700 text-green-400'
                          : p === 'medium' ? 'bg-[#2E1F06] border-amber-700 text-amber-400'
                          : 'bg-[#2A0A0A] border-red-700 text-red-400')
                        : 'border-[#2A2A2A] text-neutral-500 bg-transparent'}`}
                  >
                    {p === 'low' ? '↓ Low' : p === 'medium' ? '→ Medium' : '↑ High'}
                  </button>
                ))}
              </div>

              <div className="flex gap-2 justify-end mt-1">
                <button onClick={() => setEditId(null)} className="bg-transparent text-neutral-500 border border-[#2A2A2A] px-3 py-1.5 rounded-lg text-xs hover:bg-[#1A1A1A]">
                  Cancel
                </button>
                <button onClick={handleSave} className="bg-white text-black px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-neutral-200">
                  Save changes
                </button>
              </div>
            </div>
          )}
        </div>

        {!isEditing && (
          <div className="flex gap-1 flex-shrink-0">
            <button onClick={() => setEditId(task.id)} className="w-7 h-7 rounded-lg flex items-center justify-center text-neutral-600 transition-all hover:text-white hover:bg-[#1A1A1A]">✏️</button>
            <button onClick={handleDelete} className="w-7 h-7 rounded-lg flex items-center justify-center text-neutral-600 transition-all hover:text-red-400 hover:bg-[#1A0A0A]">🗑️</button>
          </div>
        )}
      </div>
    </div>
  );
}