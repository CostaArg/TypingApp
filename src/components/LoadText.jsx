import React from "react";
import TypingText from "./TypingText";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./LoadText.css";

export default class LoadText extends React.Component {
  state = {
    loading: true,
    sentence: [],
  };

  async componentDidMount() {
    this.updateSentence();
  }

  async updateSentence() {
    const url = "https://random-word-api.herokuapp.com/word?number=50&swear=0";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ sentence: data, loading: false });
  }

  render() {
    return (
      <div className="app-container">
        <h1 className="title">Typing Game</h1>
        <div className="words-container row">
          {this.state.loading || !this.state.sentence ? (
            <div>Loading text...</div>
          ) : (
            this.state.sentence.map((x) => (
              <div
                className="word"
                id={"word-id-" + Number(this.state.sentence.indexOf(x) + 1)}
              >
                {x}
              </div>
            ))
          )}
        </div>

        <div className="typing-container">
          <TypingText
            sentence={this.state.sentence}
            // updateSentence={this.updateSentence}
          ></TypingText>
        </div>
      </div>
    );
  }
}
