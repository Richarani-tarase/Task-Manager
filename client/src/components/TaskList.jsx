import TaskItem from './TaskItem';

export default function TaskList({ tasks, onToggle, onDelete, onEdit, editId, setEditId }) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-16 text-neutral-600">
        <div className="text-4xl mb-3">📋</div>
        <div className="text-base font-medium text-neutral-400 mb-1">No tasks here</div>
        <div className="text-sm">Add your first task above or try a different search</div>
      </div>
    );
  }

  return (
    <div>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
          editId={editId}
          setEditId={setEditId}
        />
      ))}
    </div>
  );
}