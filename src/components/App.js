import React from 'react';
import trivia from './trivia';
import Game from './Game';

//Get a random array of 6 questions
function getQuestionsIndex(){
  let questionIndexArray = [];
    for(let i = 0; i < 6; i++){
      questionIndexArray.push(Math.floor(Math.random()*5));
    }
  return questionIndexArray
}

//Main application component
class App extends React.Component {
  constructor () {
    super();
    this.state = {
      questionIndex: getQuestionsIndex(), //Random questions array
      currentQuestion: 0, //Current question in array
      gameOver: false, //show game over screen on true
      category: 0, //which current category to update cheese
      correct: [], //push correct categories to array
      message: "", //display correct/incorrect message
      showModal: false //shows modal after question answered
    };
    this.onAnswer = this.onAnswer.bind(this);
    this.updateCheese = this.updateCheese.bind(this);
    this.updateBoard = this.updateBoard.bind(this);
    this.gameEnd = this.gameEnd.bind(this);
    this.onCorrect = this.onCorrect.bind(this);
    this.onWrong = this.onWrong.bind(this);
    this.onGameEnd = this.onGameEnd.bind(this);
  }

  //Check if answer given is correct
  onAnswer (e, category, currentQuestion) {
    return (
      e.target.innerText === trivia[category].questions[currentQuestion].answer ? this.onCorrect() : this.onWrong()
    )
  }

  //add colored piece
  updateCheese () {
    let correctArr = this.state.correct;
    correctArr.push(trivia[this.state.category].color);
    this.setState({
      correct: correctArr,
      message: "Correct",
      showModal: true
    });
  }

  //add timeout between modal and next question
  updateBoard () {
    setTimeout(() => {
      let cat = this.state.category += 1;
      let current = this.state.currentQuestion += 1;
      this.setState({
        currentQuestion: cat,
        category: current,
        showModal: false
      });
    },2000)
  }

  //display modal on game end
  gameEnd () {
    setTimeout(() => {
      let message = "You Scored " + this.state.correct.length;
      this.setState({
        gameOver: true,
        message: message
      });
    },2000)
  }

  //handle if correct answer given
  onCorrect () {
    if (this.state.category < 5) {
      this.updateCheese();
      this.updateBoard();
    }
    else {
      this.updateCheese();
      this.gameEnd();
    }
  }

  //handle if correct answer given
  onWrong () {
    if (this.state.category < 5) {
      this.setState({
        message: "Incorrect",
        showModal: true
      });
      this.updateBoard();
    }
    else {
      this.state.showModal = true;
      this.setState({
        message: "Incorrect",
        showModal: true
      });
      this.gameEnd();
    }
  }

  //Reset Game on game end.
  onGameEnd () {
    this.setState({
      questionIndex: getQuestionsIndex(),
      currentQuestion: 0,
      gameOver: false,
      category: 0,
      correct: [],
      message: "",
      showModal: false
    });
  }

  render () {
    return (
      <div className="container">
        <Game
          trivia={trivia}
          questionIndex={this.state.questionIndex}
          category={this.state.category}
          currentQuestion={this.state.currentQuestion}
          correct={this.state.correct}
          message={this.state.message}
          gameOver={this.state.gameOver}
          onAnswer={this.onAnswer}
          showModal={this.state.showModal}
          onPlayAgain={this.onGameEnd}
        />
      </div>
    );
  }
};

export default App;
