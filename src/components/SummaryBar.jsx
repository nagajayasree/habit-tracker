export default function SummaryBar({ doneToday, bestStreak, totalHabits }) {
  return (
    <div
      style={{ display: 'flex', justifyContent: 'center', gap: '50px' }}
    >
      <div>
        <p>
          Done today: {doneToday} / {totalHabits}
        </p>
      </div>
      <div>
        <p>Best streak: {bestStreak}</p>
      </div>
      <div>
        <p>Total habits: {totalHabits}</p>
      </div>
    </div>
  );
}
