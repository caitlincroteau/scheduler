import { useState } from "react";


export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  //history = [initial, mode1]

  function transition(mode, replace = false) {
    //if replace is true, remove current mode from history
    //this will then set the current mode in history with the new mode
    //eg if you click back from THIRD you will go to FIRST not SECOND in history
    if (replace) {
      history.pop();
    }
    //set new mode and add it to history
    setMode(mode);
    history.push(mode);
  }

  function back() {
    if (history.length > 1) {
      //removes the last item in the array - the current mode
      history.pop();
      //sets mode to be the prev mode
      setMode(history[history.length - 1]);
    }
  }

  return { mode, transition, back };

}



