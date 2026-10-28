import { memo } from 'react';

export const TaskItem = memo(function TaskItem({ task, onToggle, onRemove, onRename }) {
  console.log('Рисуем задачу:', task.text);

  const handleEdit = () => {
    const newText = prompt('Редактировать задачу:', task.text);
    if (newText && newText.trim()) {
      onRename(task.id, newText.trim());
    }
  };

  return (
    <li className={task.done ? 'done' : ''}>
      <input 
        type="checkbox" 
        checked={task.done} 
        onChange={() => onToggle(task.id)} 
      />
      <span>{task.text}</span>
      <button onClick={handleEdit} style={{ marginRight: '8px', fontSize: '13px' }}>Редакт.</button>
      <button onClick={() => onRemove(task.id)}>×</button>
    </li>
  );
});
