import DaysGrid from './DaysGrid';

export default function HabitCard({
  storedHabits,
  setStoredHabits,
  setIsChecked,
}) {
  return (
    <div>
      {storedHabits.map((habit) => (
        <div key={habit.id}>
          <input
            type="checkbox"
            checked={setIsChecked ? habit.isChecked : false}
            onChange={(e) => {
              setStoredHabits(
                storedHabits.map((h) =>
                  h.id === habit.id ? { ...h, isChecked: e.target.checked } : h,
                ),
              );
            }}
          />
          {habit.name}
          {''}
          <button
            onClick={() => {
              setStoredHabits(storedHabits.filter((h) => h.id !== habit.id));
            }}
          >
            Delete
          </button>
          <div>
            <DaysGrid />
          </div>
        </div>
      ))}
    </div>
  );
}
