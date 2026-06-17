import { useEffect, useState } from 'react';
import HabitCard from './HabitCard';
import SummaryBar from './SummaryBar';

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

  function getTotalHabits() {
    return storedHabits.length;
  }

  function getBestStreak() {
    return storedHabits.reduce((max, habit) => {
      const streak = habit.completions.length;
      return streak > max ? streak : max;
    }, 0);
  }

  function getDoneToday() {
    return storedHabits.reduce((count, habit) => {
      const completed = habit.completions.includes(
        new Date().toISOString().split('T')[0],
      )
        ? count + 1
        : count;
      return completed;
    }, 0);
  }

  return (
    <div style={styles.container}>
      <SummaryBar
        totalHabits={getTotalHabits()}
        bestStreak={getBestStreak()}
        doneToday={getDoneToday()}
      />

      <form onSubmit={handleAddHabit} style={styles.form}>
        <input
          placeholder="Add a new habit.."
          required
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />{' '}
        <button type="submit" style={styles.button}>
          + Add Habit
        </button>
      </form>

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
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    justifyContent: 'center',
  },
  form: {
    display: 'flex',
    justifyContent: 'center',
    gap: '30px',
  },
  input: {
    height: '40px',
    borderRadius: '10px',
    border: '1px solid #d1d5db',
    fontWeight: '600',
  },
  button: {
    width: '120px',
    height: '40px',
    borderRadius: '10px',
    border: '1px solid #d1d5db',
    cursor: 'pointer',
    fontWeight: '400',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};
