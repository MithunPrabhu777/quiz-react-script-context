import React, { useContext } from 'react';
import QuizContext from '../context/QuizContext';
import { SET_CURRENT_ANSWER, SET_ERROR, SET_CURRENT_QUESTION } from '../reducers/types.js';

function Answer(props) {
    let classes = ['answer'];

    // const { state } = useContext(QuizContext);
    // const { currentQuestion } = state;

    // props.dispatch({
    //     type: SET_CURRENT_QUESTION,
    //     currentQuestion: currentQuestion + 1,
    // });

    const handleClick = e => {
        props.dispatch({
            type: SET_CURRENT_ANSWER,
            currentAnswer: e.target.value,
        });
        props.dispatch({ type: SET_ERROR, error: '' });
    };

    if (props.selected) {
        classes.push('selected');
    }
    return (
        <button
            style={{ height: "80px", width: '500px' }}
            value={props.letter}
            className={classes.join(' ')}
            onClick={handleClick}>
            <h6 className="letter">{props.letter}.</h6><h6>{props.answer}</h6>
        </button>
    );
}

export default Answer;