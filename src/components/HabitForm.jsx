import { useEffect, useState } from 'react';

export default function HabitForm() {
  const [name, setName] = useState('');

  const [storedHabits, setStoredHabits] = useState(
    JSON.parse(localStorage.getItem('habit')),
  );

  useEffect(() => {
    localStorage.setItem('habit', JSON.stringify(storedHabits));
  }, [storedHabits]);

  return (
    <div>
      <h2>Add a New Habit</h2>
      <form>
        <label htmlFor="habit-name">Habit Name:</label>{' '}
        <input
          required
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />{' '}
        <button
          type="button"
          onClick={() => {
            setStoredHabits([
              ...storedHabits,
              { id: name, name: name, createdAt: new Date() },
            ]);
            setName('');
          }}
        >
          Add Habit
        </button>
      </form>

      <div>
        <h3>Saved Habits in Local Storage:</h3>
        {storedHabits.length === 0 ? (
          <p>No habits added yet.</p>
        ) : (
          <ul>
            {storedHabits.map((habit) => (
              <li key={habit.id}>
                {habit.name}
                {''}
                <button
                  onClick={() => {
                    setStoredHabits(
                      storedHabits.filter((h) => h.name !== habit.name),
                    );
                  }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
