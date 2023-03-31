import React, { useContext, useState } from "react";
import Journal from "./Journal";
import MDHexagramText from "./MDHexagramText";
import StateContext from "./StateContext";
import hexagrams from '../assets/json/hexagrams.json'
import Hexagram from "./Hexagram";

const Back = ({ onClick }) => {
  const { theme } = useContext(StateContext);
  return (
    <div className={`log-back-button ${theme}`} onClick={onClick}>
      <svg viewBox="0 0 512 512">
        <path
          d="M477.9,221.9H116.5L263.1,75.3c13.3-13.3,13.3-34.9,0-48.3c-13.3-13.3-34.9-13.3-48.3,0L10,231.9C3.6,238.2,0,247,0,256
 s3.6,17.8,10,24.1l204.8,204.8c13.3,13.3,34.9,13.3,48.3,0c13.3-13.3,13.3-34.9,0-48.2L116.5,290.1h361.4
 c18.9,0,34.1-15.3,34.1-34.1C512,237.1,496.7,221.9,477.9,221.9z"
        />
      </svg>
    </div>
  );
};

const HexagramList = () => {
  const [showHexagram, setShowHexagram] = useState(0);

  const itemClickHandler = (hexagramNumber) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowHexagram(hexagramNumber);
  };
  console.log(hexagrams)

  return (
    <div className="hexagram-list">
      {showHexagram === 0 && (
        <ul>
          {hexagrams.map((h) => (
            <li key={`hex-link-${h.wenNumber}`}>
              <div
                className="hexagram-list-button"
                onClick={itemClickHandler(h.wenNumber)}
              >{`${h.wenNumber}. ${h.char} ${h.name}`}</div>
            </li>
          ))}
        </ul>
      )}
      {showHexagram > 0 && (
        <>
          <Back onClick={() => setShowHexagram(0)} />
          <div className="hexagram-text">
            <Hexagram lines={
                hexagrams[showHexagram - 1]
                  .binaryString
                  .split('')
                  .map(c => c === '1' ? 7 : 8)
                  .reverse()
              }
            />
            <MDHexagramText hexagramNumber={showHexagram} />
          </div>
        </>
      )}
    </div>
  );
};

const Logbook = ({ onClose }) => {
  const { theme } = useContext(StateContext);
  const [tab, setTab] = useState("hexagrams-tab");

  return (
    <div className="logbook">
      <div className={`logbook-window ${theme}`}>
        <div className="logbook-contents">
          {tab === "hexagrams-tab" && <HexagramList />}
          {tab === "journal-tab" && <Journal />}
        </div>
        <button
          type="button"
          className={`logbook-close-button ${theme}`}
          onClick={onClose}
        >
          &times;
        </button>
        <div className={`logbook-topbar ${theme} ${tab}`}>
          <ul>
            <li>
              <div
                className={`${tab === "hexagrams-tab" ? "selected" : ""}`}
                onClick={() => setTab("hexagrams-tab")}
              >
                Hexagramas
              </div>
            </li>
            <li>
              <div
                className={`${tab === "journal-tab" ? "selected" : ""}`}
                onClick={() => setTab("journal-tab")}
              >
                Bitácora
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Logbook;
