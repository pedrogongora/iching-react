import React, { useState } from "react";
import seedrandom from "seedrandom";
import StateContext from "./StateContext";
import CoinShuffle from "./CoinShuffle";
import ResultPanel from "./ResultPanel";
import StartButton from "./StartButton";
import DarkmodeSwitch from "./DarkmodeSwitch";
import BackButton from "./BackButton";

const rng = new seedrandom();

const defaultTheme = window.localStorage.getItem("theme") ?? "light";

const AppContainer = () => {
  // theme: 'light' | 'dark'
  const [theme, setTheme] = useState(defaultTheme);

  // step: 'start' | 'coinshuffle' | 'result'
  const [step, setStep] = useState("start");

  // hexagram: [number]
  const [hexagram, setHexagram] = useState([]);

  // coinResult: [number]
  const [coinResult, setCoinResult] = useState([]);

  // start/toss coins button callback
  const onStart = () => {
    if (hexagram.length === 6) {
      setStep("result");
      return;
    }

    const res = [1, 2, 3].map(() => Math.abs(rng.int32() % 2));
    const line = res.map((v) => (v === 0 ? 2 : 3)).reduce((a, v) => a + v);
    const updatedHexagram = [line].concat(hexagram);

    setStep("coinshuffle");
    setCoinResult(res);
    setHexagram(updatedHexagram);
  };

  // back button callback
  const onBack = () => {
    if (step === "coinshuffle") {
      setStep("start");
      setHexagram([]);
    }

    if (step === "result") {
      setStep("coinshuffle");
    }
  };

  // change theme button callback
  const changeTheme = (t) => {
    setTheme(t);
    window.localStorage.setItem("theme", t);
  };

  return (
    <StateContext.Provider value={{ theme, step, hexagram, coinResult }}>
      <div className={`app-container ${theme}`}>
        {(step === "start" || step === "coinshuffle") && (
          <StartButton onStart={onStart} />
        )}
        {step === "coinshuffle" && <CoinShuffle />}
        {step === "result" && <ResultPanel />}
        {step !== "start" && <BackButton onBack={onBack} />}
        <DarkmodeSwitch changeTheme={changeTheme} />
      </div>
    </StateContext.Provider>
  );
};

export default AppContainer;
