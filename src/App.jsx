import './App.css';
import HabitForm from './components/HabitForm';

function App() {
  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-evenly',
        }}
      >
        <h1>My Habits</h1>
        <p>{new Date().toDateString()}</p>
      </div>
      <HabitForm />
    </div>
  );
}

export default App;
