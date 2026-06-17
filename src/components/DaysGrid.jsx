const WEEK_DAYS = [
  { id: 0, label: 'S', name: 'Sunday' },
  { id: 1, label: 'M', name: 'Monday' },
  { id: 2, label: 'T', name: 'Tuesday' },
  { id: 3, label: 'W', name: 'Wednesday' },
  { id: 4, label: 'T', name: 'Thursday' },
  { id: 5, label: 'F', name: 'Friday' },
  { id: 6, label: 'S', name: 'Saturday' },
];

export default function DaysGrid() {
  const todayIndex = new Date().getDay();

  return (
    <div style={styles.container}>
      <div style={styles.buttonGroup}>
        {WEEK_DAYS.map((day) => {
          const isToday = day.id === todayIndex;
          return (
            <div key={day.id} style={{ textAlign: 'center' }}>
              <button
                key={day.id}
                type="button"
                style={{
                  ...styles.button,
                  //   ...(isSelected
                  //     ? styles.buttonSelected
                  //     : styles.buttonUnselected),
                }}
              />
              <label>{isToday ? 'Today' : `${day.name}`}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '16px',
  },
  label: {
    fontSize: '14px',
    color: '#4b5563',
    marginBottom: '8px',
  },
  buttonGroup: {
    display: 'flex',
    gap: '8px',
  },
  button: {
    width: '120px',
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
  buttonSelected: {
    backgroundColor: '#2563eb',
    color: '#ffffff',
  },
  buttonUnselected: {
    backgroundColor: '#ffffff',
  },
};
