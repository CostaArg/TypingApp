import React, { useState } from "react";
import Button from "react-bootstrap/Button";

let sentenceCounter = 0;
let spacePressed = false;

function TypingText(props) {
  const [input, setInput] = useState({
    "raw-text": "",
  });

  const handleInput = (e) => {
    if (e.target.name === "raw-text") {
      if (spacePressed === false) {
        setInput({ ...input, [e.target.name]: e.target.value });
      } else {
        spacePressed = false;
      }
    }
  };

  function checkText() {
    // let savedText = inputText.slice(0, inputText.length - 1);
    let currentElement = document.getElementById(
      "word-id-" + Number(sentenceCounter + 1)
    );

    if (input["raw-text"] === props.sentence[sentenceCounter]) {
      currentElement.classList.remove("word-wrong");
      currentElement.classList.add("word-typed");
      //   console.log("It's the same! " + props.sentence[sentenceCounter]);
      sentenceCounter++;
      //   console.log("Next word is: " + props.sentence[sentenceCounter]);
      setInput({
        "raw-text": "",
      });
      spacePressed = true;
    } else if (!input["raw-text"].includes(props.sentence[sentenceCounter])) {
      currentElement.classList.add("word-wrong");
    }
  }

  const handleReset = (e) => {
    e.preventDefault();

    setInput({
      "raw-text": "",
    });
  };

  const handleSpace = (e) => {
    if (e.key === " ") {
      checkText();
    }
  };

  // function handleSentenceComplete() {
  //   props.updateSentence();
  // }

  return (
    <div>
      <div className="text-input-container">
        <input
          type="text"
          className="text-input-field"
          value={input["raw-text"]}
          name="raw-text"
          onChange={handleInput}
          onKeyDown={handleSpace}
        />
        <Button className="reset-button" onClick={handleReset}>
          Reset
        </Button>
      </div>
      <div className="words-stats">
        Words typed: <div>{sentenceCounter}</div>
      </div>
    </div>
  );
}
export default TypingText;
