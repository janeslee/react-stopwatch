import { useState, useRef } from 'react';

import './App.css';

/*
  Notes:
  - since we don't need to render lastTickTiming, we can use useRef() to store the value rather than tracking it via state
  - there are diff ways to accomplish this but the diff between setInterval and setTimeout:
    - setInterval runs the function repeatedly at the set interval until cleared
    - setTimeout runs the function once at the set time
  - callback form of useState is useful when you need to perform some side effects as state updates,
    and when you have to be aware of the prev state. It also ensures that you get the latest updated state.
*/

const formatter = (milli) => {
  let date = new Date(milli);

  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  const milliseconds = String(date.getUTCMilliseconds()).padStart(2, '0');

  return `${hours}:${minutes}:${seconds}:${milliseconds}`;
};

function App() {
  const [timerId, setTimerId] = useState(null);
  const [totalDuration, setTotalDuration] = useState(0);
  const lastTickTiming = useRef(null);

  function startTimer() {
    lastTickTiming.current = Date.now();
    setTimerId(
      window.setInterval(() => {
        const now = Date.now();
        const timePassed = now - lastTickTiming.current;
        setTotalDuration((duration) => duration + timePassed);
        lastTickTiming.current = now;
      }, 1)
    );
  }

  function stopTimer() {
    window.clearInterval(timerId);
    setTimerId(null);
  }

  function resetTimer() {
    stopTimer();
    setTotalDuration(0);
  }

  return (
    <div className="App">
      {formatter(totalDuration)}
      <div>
        <button onClick={startTimer}>Start</button>
        <button onClick={stopTimer}>Stop</button>
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
}

export default App;
