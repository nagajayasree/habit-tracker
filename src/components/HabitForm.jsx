import { useEffect, useState } from 'react';
import HabitCard from './HabitCard';

export default function HabitForm() {
  const [name, setName] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [daysSelected, setDaysSelected] = useState([]);

  const [storedHabits, setStoredHabits] = useState(
    JSON.parse(localStorage.getItem('habit')),
  );

  useEffect(() => {
    localStorage.setItem('habit', JSON.stringify(storedHabits));
  }, [storedHabits]);

  return (
    <div>
      <form>
        <input
        //   placeholder="Add a new habit.."
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
              {
                id: crypto.randomUUID(),
                name: name,
                createdAt: new Date(),
                isChecked: isChecked,
                daysSelected: daysSelected,
              },
            ]);
            // setName('');
            setIsChecked(false);
          }}
        >
          + Add Habit
        </button>
      </form>

      <div>
        <h3>Saved Habits in Local Storage:</h3>
        {storedHabits.length === 0 ? (
          <p>No habits added yet.</p>
        ) : (
          <ul>
            <HabitCard
              storedHabits={storedHabits}
              setStoredHabits={setStoredHabits}
              setIsChecked={setIsChecked}
			  setDaysSelected={setDaysSelected}
            />
          </ul>
        )}
      </div>
    </div>
  );
}
