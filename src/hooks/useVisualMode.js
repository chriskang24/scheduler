import { useState } from "react";

export default function useVisualMode(initial) {

  const [history, setHistory] = useState([initial]);

  const transition = (nextMode, replace = false) => {

    if (replace) {
      const newArr = [...history]
      newArr[0] = nextMode
      setHistory(newArr)
    } else {
    
    setHistory(prev => [nextMode, ...prev]);
    }
    
  }

  const back = () => {

    setHistory(prev => prev.length > 1 ? prev.slice(1) : prev)
  }

  return { mode: history[0], transition, back };
}
