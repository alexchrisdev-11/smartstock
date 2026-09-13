import { useState, useEffect } from 'react'
import './components.css'

/**
 * StockClock Component
 *
 * Demonstrates the useEffect lifecycle hook with an active timer subscription and cleanup.
 *
 * State:
 * - time: Date object - holds current timestamp, updated once every second.
 *
 * Lifecycle / Effect Explanation:
 * - The effect has an empty dependency array (`[]`), so it runs setup once on mount (similar to componentDidMount).
 * - Cleanup Function (`return () => clearInterval(...)`):
 *   CRITICAL: When this component is unmounted from the DOM (similar to componentWillUnmount),
 *   React invokes this return function. Clearing the interval timer prevents memory leaks,
 *   wasted CPU cycles, and errors from trying to call setTime on an unmounted component.
 */
function StockClock() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    // 1. Setup phase: start ticking every 1000ms
    const intervalId = setInterval(() => {
      setTime(new Date())
    }, 1000)

    // 2. Cleanup phase: returned function executes when component unmounts
    return () => {
      clearInterval(intervalId)
    }
  }, []) // Empty array ensures the interval is created only once on initial mount

  return (
    <div className="stock-clock" aria-label="System Time Clock">
      <span className="clock-icon" aria-hidden="true">⏱️</span>
      <span className="clock-label">Warehouse Time:</span>
      <span className="clock-value">
        {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
      </span>
    </div>
  )
}

export default StockClock
