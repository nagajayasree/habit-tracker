export default function HabitCard({ habit, storedHabits, setStoredHabits }) {
  function getLast7Days() {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      days.push({
        dateStr: d.toISOString().split('T')[0],
        label: d.toLocaleDateString('en-US', { weekday: 'short' })[0], // "S","M","T"...
        name: d.toLocaleDateString('en-US', { weekday: 'long' }), // "Sunday"
        isToday: i === 0,
      });
    }
    // console.log(days);
    return days;
  }

  function getTodayStr() {
    return new Date().toISOString().split('T')[0];
  }

  function getStreak(completions) {
    let streak = 0;
    const today = new Date();
    while (true) {
      const d = new Date(today);
      d.setDate(today.getDate() - streak);
      if (completions.includes(d.toISOString().split('T')[0])) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  }

  function toggleDay(dateStr) {
    setStoredHabits(
      storedHabits.map((h) => {
        if (h.id !== habit.id) return h;
        const already = h.completions.includes(dateStr);
        return {
          ...h,
          completions: already
            ? h.completions.filter((d) => d !== dateStr)
            : [...h.completions, dateStr],
        };
      }),
    );
  }

  function deleteHabit() {
    setStoredHabits(storedHabits.filter((h) => h.id !== habit.id));
  }

  const todayStr = getTodayStr();
  const doneToday = habit.completions.includes(todayStr);
  const streak = getStreak(habit.completions);
  const last7Days = getLast7Days();

  return (
    <div>
      <input
        type="checkbox"
        checked={doneToday}
        onChange={() => toggleDay(todayStr)}
      />
      {habit.name}
      {streak > 0 && <span> 🔥 {streak}d</span>}
      <button onClick={deleteHabit}>Delete</button>

      <div style={styles.container}>
        <div style={styles.buttonGroup}>
          {last7Days.map((day) => {
            const isFilled = habit.completions.includes(day.dateStr);
            return (
              <div key={day.dateStr} style={{ textAlign: 'center' }}>
                <button
                  type="button"
                  onClick={() => toggleDay(day.dateStr)}
                  style={{
                    ...styles.button,
                    ...(isFilled
                      ? styles.buttonSelected
                      : styles.buttonUnselected),
                  }}
                />
                <label>{day.isToday ? 'Today' : day.label}</label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { padding: '16px' },
  buttonGroup: { display: 'flex', gap: '8px' },
  button: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    border: '1px solid #d1d5db',
    cursor: 'pointer',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
  },
  buttonSelected: { backgroundColor: '#2563eb', color: '#ffffff' },
  buttonUnselected: { backgroundColor: '#ffffff' },
};
