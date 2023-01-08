import React, { useContext, useEffect, useState } from "react";
import { animated, useSpring } from "react-spring";
import ReactMarkdown from "react-markdown";
import { mutate, number } from "../hexagrams";
import Hexagram from "./Hexagram";
import StateContext from "./StateContext";
import texts from "../assets/markdown/ryk";

/* const Title = ({ number }) => <h3>{`${number}. ${name(number)}`}</h3>;

const Paragraph = ({ text }) => <pre>{text}</pre>

const Section = ({ text }) => (
  <pre style={{ margin: '1rem 0 .5rem 0' }}>{text}</pre>
)

const Cite = ({ text }) => (
  <pre style={{ margin: '0 0 1rem 2rem' }}>{`${text}`}</pre>
)

const isShort = (s) => s.length < 100

const isAllCaps = (s) =>
  s
    .split('')
    .map((p) => p.toUpperCase() === p)
    .reduce((a, v) => a && v)

const Text = ({ number }) => (
  <>
    {text(number)
      .split('\n\n')
      .map((s, i) => {
        if (isShort(s)) {
          if (isAllCaps(s)) {
            return <Section key={`paragraph-${i}`} text={s} />
          } else {
            return <Cite key={`paragraph-${i}`} text={s} />
          }
        } else {
          return <Paragraph key={`paragraph-${i}`} text={s} />
        }
      })}
  </>
) */

const MDHexagramText = ({ hexagramNumber }) => {
  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    let isMounted = true;

    fetch(texts[hexagramNumber - 1])
      .then((response) => response.text())
      .then((text) => {
        if (isMounted) {
          setMarkdown(text);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [hexagramNumber]);

  return (
    <ReactMarkdown
      children={markdown}
      components={{
        h1: "h3",
        h2: "h4",
        h3: "h5",
      }}
    />
  );
};

const ResultPanel = () => {
  const { hexagram } = useContext(StateContext);
  const animProps = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { tension: 300 },
  });

  const hexagram2 = mutate(hexagram);
  const hexNum1 = number(hexagram);
  const hexNum2 = number(hexagram2);

  return (
    <animated.div className="result" style={animProps}>
      <Hexagram lines={hexagram} />
      <MDHexagramText hexagramNumber={hexNum1} />
      <p>&nbsp;</p>
      <p>&nbsp;</p>
      {hexNum1 !== hexNum2 && (
        <>
          <Hexagram lines={hexagram2} />
          <MDHexagramText hexagramNumber={hexNum2} />
          <p>&nbsp;</p>
          <p>&nbsp;</p>
        </>
      )}
    </animated.div>
  );
};

export default ResultPanel;
