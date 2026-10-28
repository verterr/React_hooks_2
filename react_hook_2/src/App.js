import { useReducer, useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { tasksReducer } from './tasksReducer.js';
import { TaskList } from './components/TaskList.jsx';
import { AddTaskForm } from './components/AddTaskForm.jsx';
import { useTheme } from './ThemeContext.jsx';
import { ThemeToggle } from './components/ThemeToggle.jsx';
import { useLanguage } from './LanguageContext.jsx';

const translations = {
  ru: { title: 'Менеджер задач', total: 'Всего', done: 'выполнено', percent: 'Процент' },
  en: { title: 'Task Manager', total: 'Total', done: 'completed', percent: 'Percentage' }
};

export default function App() {
  const { theme } = useTheme();
  const { lang, setLang } = useLanguage(); // <-- Подключаем язык
  const [tasks, dispatch] = useReducer(tasksReducer, []);
  const [filter, setFilter] = useState('all');
  
  const formInputRef = useRef(null);

  const handleAdd = useCallback((text) => {
    dispatch({ type: 'add', task: { id: Date.now(), text, done: false } });
  }, []);

  const handleToggle = useCallback((id) => {
    dispatch({ type: 'toggle', id });
  }, []);

  const handleRemove = useCallback((id) => {
    dispatch({ type: 'remove', id });
  }, []);

  const handleRename = useCallback((id, text) => {
    dispatch({ type: 'rename', id, text });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '/') {
        if (document.activeElement.tagName !== 'INPUT') {
          e.preventDefault();
          formInputRef.current?.focus();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const visibleTasks = useMemo(() => {
    if (filter === 'done') return tasks.filter((t) => t.done);
    if (filter === 'active') return tasks.filter((t) => !t.done);
    return tasks;
  }, [tasks, filter]);

  const doneCount = useMemo(() => {
    return tasks.filter((t) => t.done).length;
  }, [tasks]);

  const donePercentage = useMemo(() => {
    if (tasks.length === 0) return 0;
    return Math.round((doneCount / tasks.length) * 100);
  }, [tasks.length, doneCount]);

  const t = translations[lang];

  return (
    <div className={`app ${theme}`}>
      <div className="card">
        <header className="top">
          <h1>{t.title}</h1>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={() => setLang(lang === 'ru' ? 'en' : 'ru')}>
              {lang === 'ru' ? 'English' : 'Русский'}
            </button>
            <ThemeToggle />
          </div>
        </header>

        <AddTaskForm onAdd={handleAdd} inputRef={formInputRef} />

        <div className="tabs">
          {[
            ['all', lang === 'ru' ? 'Все' : 'All'],
            ['active', lang === 'ru' ? 'Активные' : 'Active'],
            ['done', lang === 'ru' ? 'Готовые' : 'Done']
          ].map(([key, label]) => (
            <button
              key={key}
              className={filter === key ? 'active' : ''}
              onClick={() => setFilter(key)}
            >
              {label}
            </button>
          ))}
        </div>

        <p className="muted">
          {t.total}: {tasks.length}, {t.done}: {doneCount} | {t.percent}: {donePercentage}%
        </p>

        <TaskList
          tasks={visibleTasks}
          onToggle={handleToggle}
          onRemove={handleRemove}
          onRename={handleRename}
        />
      </div>
    </div>
  );
}
