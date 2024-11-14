import TaskItem from "./TaskItem";

export default function TaskList({
  tasks,
  onEdit,
  onDelete,
  onToggleComplete,
  onPriorityChange,
}) {
  return (
    <div>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleComplete={onToggleComplete}
          onPriorityChange={onPriorityChange}
        />
      ))}
    </div>
  );
}