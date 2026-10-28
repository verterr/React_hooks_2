import { useId, useRef, useState, useImperativeHandle } from 'react';

export function AddTaskForm({ onAdd, inputRef }) {
  const [text, setText] = useState('');
  const localInputRef = useRef(null);
  const inputId = useId();

  if (inputRef) {
    inputRef.current = localInputRef.current;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const clean = text.trim();
    if (!clean) return;
    onAdd(clean);
    setText('');
    localInputRef.current.focus();
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor={inputId} className="sr">Новая задача</label>
      <input
        id={inputId}
        ref={localInputRef}
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Новая задача (Нажмите / для фокуса)"
      />
      <button>Добавить</button>
    </form>
  );
}
