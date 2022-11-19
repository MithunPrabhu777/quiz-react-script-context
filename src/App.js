import React, { useReducer, useState } from 'react';
import Progress from './components/Progress';
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
                'Hooks are 100% backwards-compatible and can be used side by side with classes',
            answer_b: 'Hooks are still in beta and not available yet',
            answer_c:
                "Hooks are completely opt-in, there's no need to rewrite existing code",
            answer_d: 'All of the above',
            correct_answer: 'b',
        },
        {
            id: 2,
            question: 'Do you want a bike',
            questiontype: "Radio",
            answer_a: 'useState()',
            answer_b: 'useConst()',
            answer_c: 'useReducer()',
            answer_d: 'All of the above',
            correct_answer: 'b',
        },
        {
            id: 3,
            question: 'Date & Time Slot',
            questiontype: "Date",
            answer_a: 'useDataFetching()',
            answer_b: 'useApi()',
            answer_c: 'useEffect()',
            answer_d: 'useRequest()',
            correct_answer: 'c',
        },
        {
            id: 4,
            question: 'package selection test',
            questiontype: "Radio",
            answer_a: 'useDataFetching()',
            answer_b: 'useApi()',
            answer_c: 'useEffect()',
            answer_d: 'useRequest()',
            correct_answer: 'c',
        },
        {
            id: 5,
            question: 'Enter Your exprience details',
            questiontype: "Textarea",
            answer_a: 'useDataFetching()',
            answer_b: 'useApi()',
            answer_c: 'useEffect()',
            answer_d: 'useRequest()',
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

    // const renderError = () => {
    //     if (!error) {
    //         return;
    //     }

    //     return <div className="error">{error}</div>;
    // };

    // const renderResultMark = (question, answer) => {
    //     if (question.correct_answer === answer.answer) {
    //         return <span className="correct">Correct</span>;
    //     }

    //     return <span className="failed">Failed</span>;
    // };

    const renderResultsData = () => {
        return answers.map(answer => {
            const question = questions.find(
                question => question.id === answer.questionId
            );
            console.log("question", question);
            console.log("answer", answer);

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

        // if (!currentAnswer) {
        //     dispatch({ type: SET_ERROR, error: 'Please select an option' });
        //     return;
        // }
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

        // if (!currentAnswer) {
        //     dispatch({ type: SET_ERROR, error: 'Please select an option' });
        //     return;
        // }

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

    console.log(state);


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
                    {/* <Progress
                        total={questions.length}
                        current={currentQuestion + 1}
                    /> */}
                    <div style={{ display: 'flex', justifyContent: "center", alignItems: "center", width: "500px" }}>
                        {state.currentQuestion > 0 &&
                            <img src="https://cdn.iconscout.com/icon/free/png-256/left-arrow-1485722-1258943.png" alt="backarrow" onClick={previous} style={{ height: "25px", width: "25px", cursor: "pointer" }} />

                        }

                        <Question />
                    </div>
                    {/* {renderError()} */}
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
