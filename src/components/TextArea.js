import { Input } from 'antd';
import React, { useContext, useState } from 'react';
import QuizContext from '../context/QuizContext';
import { SET_CURRENT_ANSWER } from '../reducers/types.js';

const { TextArea } = Input;

function TextInput(props) {

    const { state } = useContext(QuizContext);
    const { currentQuestion } = state;
    let { answers } = state;
    const [textValue, setTextValue] = useState("");

    const onChange = (e) => {
        console.log("value", e.target.value + "currentquestion" + currentQuestion);
        setTextValue(e.target.value);

        props.dispatch({
            type: SET_CURRENT_ANSWER,
            currentAnswer: e.target.value,
        });
        answers[currentQuestion - 1].questionId = currentQuestion;
        answers[currentQuestion - 1].answer = e.target.value;
    };

    return (
        <div>
            <TextArea
                style={{
                    height: "120px",
                    width: "200px"
                }}
                value={textValue ? textValue : answers[currentQuestion + 1]?.answer && answers[currentQuestion + 1]?.answer}
                onChange={onChange}
            />
        </div>
    )

};

export default TextInput;