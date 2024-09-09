import React, { Component } from "react";
import "./index.css";
import axios from "axios";

export default class TakeExam extends Component {
  state = {
    questions: [],
    currentQuestion: 0,
    showScore: false,
    score: 0,
	open: true
  };

  handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      this.setState({ score: this.state.score + 1 });
    }

    const nextQuestion = this.state.currentQuestion + 1;
    if (nextQuestion < this.state.questions.length) {
      this.setState({ currentQuestion: nextQuestion });
    } else {
      this.setState({ showScore: true });
      //TODO: Submit the results
	  axios.post("http://localhost:5000/api/admin/submitExam", {
		invitationId: this.props.invitationId,
		emailId: this.props.emailId,
		score: this.state.score
	  }).then((resp) => {
		  if(resp.status === 500){
			  alert(resp.data.message);
		  }
	  })
    }
  };

  componentDidMount() {
    let invitationId = this.props.invitationId;
	let emailId = this.props.emailId;
    // invitationId = "fd61654d-0899-4928-86c1-96a4e4bb6e24"
    axios
      .post("http://localhost:5000/api/admin/takeExam", {
        invitationId: invitationId,
        emailId: emailId,
      })
      .then((resp) => {
        this.setState({ questions: resp.data.questions });
      });
  }

  render() {
    return (
      <div className="exam-app-container">
        <div className="exam-app">
          {this.state.showScore ? (
            <div className="score-section">
              {/* You scored {this.state.score} out of {this.state.questions.length} */}
              Thank you for taking the exam! Wish you all the best!!
            </div>
          ) : this.state.questions.length > 0 ? (
            <>
              <div className="question-section">
                <div className="question-count">
                  <span>Question {this.state.currentQuestion + 1}</span>/
                  {this.state.questions.length}
                </div>
                <div className="question-text">
                  {
                    this.state.questions[this.state.currentQuestion]
                      .questionText
                  }
                </div>
              </div>
              <div className="answer-section">
                {this.state.questions[
                  this.state.currentQuestion
                ].answerOptions.map((answerOption) => (
                  <button
                    onClick={() =>
                      this.handleAnswerOptionClick(answerOption.isCorrect)
                    }
                  >
                    {answerOption.answerText}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>Invalid Exam Details! Please contact Administrator</>
          )}
        </div>
      </div>
    );
  }
}
