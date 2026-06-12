import { useState } from 'react';
import { useTasks } from './hooks/useTasks';
import TaskStats from './components/TaskStats';
import TaskForm from './components/TaskForm';
import SearchBar from './components/SearchBar';
import FilterBar from './components/FilterBar';
import TaskList from './components/TaskList';

export default function App() {
  const { tasks, loading, error, addTask, updateTask, deleteTask, toggleTask } = useTasks();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [editId, setEditId] = useState(null);

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      (task.description && task.description.toLowerCase().includes(search.toLowerCase()));
    if (!matchesSearch) return false;

    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    if (filter === 'high') return task.priority === 'high' && !task.completed;
    return true;
  });

  async function handleAdd(data) {
    await addTask(data);
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] font-sans text-white">
      <div className="max-w-2xl mx-auto px-4 py-10">

        {/* Header */}
        <header className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-black font-bold">✓</div>
          <div>
            <h1 className="text-lg font-medium leading-tight text-white">Taskflow</h1>
            <p className="text-xs text-neutral-500">Personal task manager</p>
          </div>
        </header>

        {/* Stats */}
        <TaskStats tasks={tasks} />

        {/* Add form */}
        <TaskForm onSubmit={handleAdd} />

        {/* Toolbar */}
        <div className="flex gap-2 mb-4 flex-wrap items-center">
          <SearchBar value={search} onChange={setSearch} />
          <FilterBar current={filter} onChange={setFilter} />
        </div>

        {/* Error */}
        {error && (
          <div className="bg-[#1A0A0A] text-red-400 px-4 py-2 rounded-lg text-sm mb-4 border border-red-900">
            {error}
          </div>
        )}

        {/* Task count */}
        {!loading && (
          <div className="text-xs font-medium text-neutral-600 uppercase tracking-widest mb-3">
            {filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'}
          </div>
        )}

        {/* List */}
        {loading ? (
          <div className="text-center py-16 text-neutral-600 text-sm">Loading tasks...</div>
        ) : (
          <TaskList
            tasks={filteredTasks}
            onToggle={toggleTask}
            onDelete={deleteTask}
            onEdit={updateTask}
            editId={editId}
            setEditId={setEditId}
          />
        )}
      </div>
    </div>
  );
}