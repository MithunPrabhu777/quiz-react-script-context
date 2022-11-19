import React, { useReducer, useState } from 'react';
import Question from './components/Question';
import Answers from './components/Answers';
import QuizContext from './context/QuizContext';
import {
    SET_ANSWERS,
    SET_CURRENT_QUESTION,
    SET_CURRENT_ANSWER,
    SET_ERROR,
    SET_SHOW_RESULTS,
    RESET_QUIZ,
    QUESTION_TYPE,
} from './reducers/types.js';
import quizReducer from './reducers/QuizReducer';
import "antd/dist/antd.css";

import './App.css';

function App() {

    const questions = [
        {
            id: 1,
            question: 'Select your data',
            questiontype: "Radio",
            answer_a:
                'Like programming',
            answer_b: 'Like development',
            answer_c:
                "Like DS and Algorithms",
            answer_d: 'All of the above',
            correct_answer: 'b',
        },
        {
            id: 2,
            question: 'Do you want a bike',
            questiontype: "Radio",
            answer_a: 'Yes',
            answer_b: 'No',
            answer_c: 'Not confirm',
            answer_d: 'Do not want to disclose',
            correct_answer: 'b',
        },
        {
            id: 3,
            question: 'Date & Time Slot',
            questiontype: "Date",
            correct_answer: 'c',
        },
        {
            id: 4,
            question: 'package selection test',
            questiontype: "Radio",
            answer_a: 'below 2 lakhs',
            answer_b: 'below 10 lakhs',
            answer_c: 'below 50 lakhs',
            answer_d: 'below 4 crore',
            correct_answer: 'c',
        },
        {
            id: 5,
            question: 'Enter Your exprience details',
            questiontype: "Textarea",
            correct_answer: 'c',
        }
    ];

    const initialState = {
        questions,
        currentQuestion: 0,
        currentAnswer: '',
        answers: [],
        showResults: false,
        error: ''
    };

    initialState.questiontype = questions[initialState.currentQuestion].questiontype.toLowerCase();

    const [state, dispatch] = useReducer(quizReducer, initialState);
    const { currentQuestion, currentAnswer, answers, showResults, error } = state;

    const question = questions[currentQuestion];

    const renderResultsData = () => {
        return answers.map(answer => {
            const question = questions.find(
                question => question.id === answer.questionId
            );
            return (
                <div key={question.id}>
                    {question.question + "-" + (answer.answer ? answer.answer : "No data updated")}
                </div>
            );
        });
    };

    const restart = () => {
        dispatch({ type: RESET_QUIZ });
    };

    const next = () => {
        const answer = { questionId: question.id, answer: currentAnswer };

        let equal = answers.find(checkEquality);

        function checkEquality(item) {
            if (item.questionId === answer.questionId) {
                if (item.answer !== "") {
                    item.questionId = item.questionId;
                    item.answer = item.answer;
                    return true;
                } else {
                    item.questionId = answer.questionId;
                    item.answer = answer.answer;
                    return true;
                }
            }

        }

        if (!equal) {
            answers.push(answer);
        }

        if (questions.length !== currentQuestion + 1) {
            dispatch({ type: QUESTION_TYPE, questiontype: questions[currentQuestion + 1].questiontype })
        }

        dispatch({ type: SET_ANSWERS, answers });
        dispatch({ type: SET_CURRENT_ANSWER, currentAnswer: '' });

        if (currentQuestion + 1 < questions.length) {
            dispatch({
                type: SET_CURRENT_QUESTION,
                currentQuestion: currentQuestion + 1,
            });
            return;
        }

        dispatch({ type: SET_SHOW_RESULTS, showResults: true });
    };

    const previous = () => {
        const answer = { questionId: question.id, answer: currentAnswer };

        let equal = answers.find(checkEquality);

        function checkEquality(item) {

            if (item.questionId === answer.questionId) {
                if (item.answer !== "") {
                    item.questionId = item.questionId;
                    item.answer = item.answer;
                    return true;
                } else {
                    item.questionId = answer.questionId;
                    item.answer = answer.answer;
                    return true;
                }
            }

        }

        if (!equal) {
            answers.push(answer);
        }


        if (questions.length !== currentQuestion + 1) {
            dispatch({ type: QUESTION_TYPE, questiontype: questions[currentQuestion - 1].questiontype })
        }

        dispatch({ type: SET_ANSWERS, answers });
        dispatch({ type: SET_CURRENT_ANSWER, currentAnswer: '' });

        if (currentQuestion - 1 < questions.length) {
            dispatch({
                type: SET_CURRENT_QUESTION,
                currentQuestion: currentQuestion - 1,
            });
            return;
        }

        dispatch({ type: SET_SHOW_RESULTS, showResults: true });
    };

    if (showResults) {
        return (
            <div className="container results">
                <h2>Results</h2>
                <ul>{renderResultsData()}</ul>
                <button className="btn btn-primary" onClick={restart}>
                    Restart
                </button>
            </div>
        );
    } else {
        return (
            <QuizContext.Provider value={{ state, dispatch }}>
                <div className="container">

                    <div style={{ display: 'flex', justifyContent: "center", alignItems: "center", width: "500px" }}>
                        {state.currentQuestion > 0 &&
                            <img src="https://cdn.iconscout.com/icon/free/png-256/left-arrow-1485722-1258943.png" alt="backarrow" onClick={previous} style={{ height: "25px", width: "25px", cursor: "pointer" }} />

                        }

                        <Question />
                    </div>

                    <Answers />
                    {state.currentQuestion + 1 === questions.length ?
                        <button className="btn btn-primary" onClick={next} style={{ border: "none", backgroundColor: "green", color: "white" }}>
                            Submit
                        </button> : <button className="btn btn-primary" onClick={next} style={{ border: "none", backgroundColor: "red" }}>
                            Next
                        </button>
                    }

                </div>
            </QuizContext.Provider>
        );
    }
}

export default App;
