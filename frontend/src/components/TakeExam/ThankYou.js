import React, { Component } from 'react'
import './index.css';

export default class ThankYou extends Component{
    state = {
        questions: [],
        currentQuestion: 0,
        showScore: false,
        score: 0
      };

    render(){
        return (
          <div className="exam-app-container">
            <div className="exam-app">
              <div className="score-section">
                Thank you for taking the exam! Wish you all the best!!
              </div>
            </div>
          </div>
        );
    }

}