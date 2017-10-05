import React from 'react';

//Component for the modal screen displaying correct/incorrect and the cheese wheel and pieces
function Result(props) {
  //rendering a colored piece into the cheese for correct categories
  let cheeses = []
  props.correct.forEach((color)=>{
    cheeses.push(<div className={"piece " + color}></div>);
  })
  //choosing style of message based on correct/incorrect answer
  let messageStyle = "";
  if(props.message === 'Correct'){
    messageStyle = "correct"
  }
  else if(props.message === 'Incorrect'){
    messageStyle = "incorrect"
  }
  else {
    messageStyle = "game-over";
  }
  return (
    <div className="modal-container">
      <div className={"modal "  + messageStyle}>
        <h2 className="message">{props.message}</h2>
        <div className="play-again" onClick={props.onAgainClick}>
          {props.gameOver ? 'Play Again' : '' }
        </div>
        <div className="cheese-container">
          <div className={
            props.correct.length === 6 && props.gameOver
            ? "cheese spin": "cheese"}>
            {cheeses}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Result;
