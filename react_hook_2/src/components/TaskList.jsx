import { TaskItem } from './TaskItem.jsx';

export function TaskList({ tasks, onToggle, onRemove, onRename }) {
  return (
    <ul>
      {tasks.map((t) => (
        <TaskItem 
          key={t.id} 
          task={t} 
          onToggle={onToggle} 
          onRemove={onRemove} 
          onRename={onRename} 
        />
      ))}
    </ul>
  );
}
