import { useState, useEffect } from 'react';

const inputStyles = "border border-[#2A2A2A] rounded-xl px-3 py-2 text-sm text-white placeholder:text-neutral-600 bg-[#111] focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-neutral-600 w-full";

export default function TaskForm({ onSubmit, editingTask, onCancel }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('low');
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title || '');
      setDescription(editingTask.description || '');
      setDueDate(editingTask.dueDate || '');
      setPriority(editingTask.priority || 'low');
    }
  }, [editingTask]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) { setError('Title is required'); return; }
    setError('');
    onSubmit({ title, description, dueDate, priority });
    setTitle('');
    setDescription('');
    setDueDate('');
    setPriority('low');
  }

  return (
    <form onSubmit={handleSubmit} className="bg-[#111] border border-[#222] rounded-2xl p-5 mb-6">
      <div className="text-xs font-medium text-neutral-500 uppercase tracking-widest mb-4">
        {editingTask ? 'Edit task' : 'New task'}
      </div>

      {error && <p className="text-red-400 text-xs mb-2">{error}</p>}

      <input
        type="text"
        placeholder="What needs to be done?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={`${inputStyles} mb-3`}
      />

      <div className="grid grid-cols-2 gap-3 mb-1">
        <div>
          <label className="block text-xs text-neutral-500 mb-1">Description</label>
          <textarea
            placeholder="Optional notes about this task"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`${inputStyles} resize-none h-16`}
          />
        </div>
        <div>
          <label className="block text-xs text-neutral-500 mb-1">Due date (when must this be done by?)</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className={inputStyles}
          />
        </div>
      </div>

      {/* Priority */}
      <div className="mb-4 mt-3">
        <p className="text-xs font-medium text-neutral-500 uppercase tracking-widest mb-2">Priority</p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setPriority('low')}
            className={`flex-1 py-1.5 rounded-xl text-xs font-medium border transition-all
              ${priority === 'low' ? 'bg-[#0D2310] border-green-700 text-green-400' : 'border-[#2A2A2A] text-neutral-500 bg-transparent'}`}
          >
            ↓ Low
          </button>
          <button
            type="button"
            onClick={() => setPriority('medium')}
            className={`flex-1 py-1.5 rounded-xl text-xs font-medium border transition-all
              ${priority === 'medium' ? 'bg-[#2E1F06] border-amber-700 text-amber-400' : 'border-[#2A2A2A] text-neutral-500 bg-transparent'}`}
          >
            → Medium
          </button>
          <button
            type="button"
            onClick={() => setPriority('high')}
            className={`flex-1 py-1.5 rounded-xl text-xs font-medium border transition-all
              ${priority === 'high' ? 'bg-[#2A0A0A] border-red-700 text-red-400' : 'border-[#2A2A2A] text-neutral-500 bg-transparent'}`}
          >
            ↑ High
          </button>
        </div>
      </div>

      <div className="flex gap-2">
        <button type="submit" className="flex-1 bg-white text-black rounded-xl py-2.5 text-sm font-semibold hover:bg-neutral-200 transition-colors">
          {editingTask ? 'Save changes' : '+ Add task'}
        </button>
        {editingTask && (
          <button type="button" onClick={onCancel} className="flex-1 bg-[#1A1A1A] text-neutral-400 rounded-xl py-2.5 text-sm font-semibold hover:bg-[#222] transition-colors">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}