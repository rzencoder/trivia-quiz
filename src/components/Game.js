import React from 'react';
import Result from './Result'

//Shuffle function to shuffle question options taken from http://stackoverflow.com/questions/6274339/
function shuffle(a) {
  for (let i = a.length; i; i--) {
    let j = Math.floor(Math.random() * i);
    [a[i - 1], a[j]] = [a[j], a[i - 1]];
  }
}

//Game component. Handles rendering questions/options and listening for clicks on answer.

class Game extends React.Component {
  render () {
    let category = this.props.category;
    let currentQuestion = this.props.questionIndex[this.props.currentQuestion];
    //Stops reshuffling of options between questions
    if(!this.props.showModal){
    shuffle(this.props.trivia[category].questions[currentQuestion].options);
    }
    //show modal after an answer has been clicked
    let result;
    if(this.props.showModal){
      result = <Result
                 color={this.props.trivia[category].color}
                 correct={this.props.correct}
                 message={this.props.message}
                 gameOver={this.props.gameOver}
                 onAgainClick={this.props.onPlayAgain}
               />
    }
    return (
      <div className="game-container">
        <h1>Trivia Quiz</h1>
        <div className="questions-container">
          <div className={"category "+ this.props.trivia[category].color}>{this.props.trivia[category].category}</div>
          <div className="question">{this.props.trivia[category].questions[currentQuestion].question}</div>
          <ul className="options" onClick={(e)=>this.props.onAnswer(e, category, currentQuestion)}>
            <li>{this.props.trivia[category].questions[currentQuestion].options[0]}</li>
            <li>{this.props.trivia[category].questions[currentQuestion].options[1]}</li>
            <li>{this.props.trivia[category].questions[currentQuestion].options[2]}</li>
            <li>{this.props.trivia[category].questions[currentQuestion].options[3]}</li>
          </ul>
        </div>
        {result}
      </div>
    );
  }
};

export default Game;
