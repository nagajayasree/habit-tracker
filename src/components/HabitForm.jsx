import { useEffect, useState } from 'react';
import HabitCard from './HabitCard';

export default function HabitForm() {
  const [name, setName] = useState('');

  const [storedHabits, setStoredHabits] = useState(() => {
    const saved = localStorage.getItem('habits');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(storedHabits));
  }, [storedHabits]);

  function handleAddHabit(e) {
    e.preventDefault();
    if (!name.trim()) return;

    const createdDate = new Intl.DateTimeFormat('en-US').format(new Date());

    setStoredHabits([
      ...storedHabits,
      {
        id: crypto.randomUUID(),
        name: name.trim(),
        createdAt: createdDate,
        completions: [],
      },
    ]);
    setName('');
  }

  return (
    <div>
      <form onSubmit={handleAddHabit}>
        <input
          placeholder="Add a new habit.."
          required
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />{' '}
        <button type="submit">+ Add Habit</button>
      </form>

      <div>
        {storedHabits.length === 0 ? (
          <p>No habits added yet.</p>
        ) : (
          <ul>
            {storedHabits.map((habit) => (
              <HabitCard
                key={habit.id}
                habit={habit}
                storedHabits={storedHabits}
                setStoredHabits={setStoredHabits}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
