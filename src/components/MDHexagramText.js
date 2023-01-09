import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import texts from "../assets/markdown/ryk";

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

export default MDHexagramText;
