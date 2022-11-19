import { DatePicker, Space } from 'antd';
import React, { useContext, useState } from 'react';
import moment from 'moment';
import QuizContext from '../context/QuizContext';
import { SET_CURRENT_ANSWER } from '../reducers/types.js';

const DateInput = (props) => {

    const { state } = useContext(QuizContext);
    const { currentQuestion, answers } = state;
    const [dateValue, setDateValue] = useState("");

    function dateChangeHandler(event) {

        let date = moment(event).format("DD-MM-YYYY");
        console.log(date);
        setDateValue(date);

        props.dispatch({
            type: SET_CURRENT_ANSWER,
            currentAnswer: date,
        });
        answers.push({ questionId: currentQuestion, answer: date });
        // let data = results.push()

    }

    console.log("logged outside", dateValue);

    return (
        <Space
            direction="vertical"
            style={{
                width: '20%',
            }}
        >
            <DatePicker
                status="error"
                style={{
                    width: '80%',
                }}
                onChange={dateChangeHandler}
                value={
                    dateValue ? moment(answers[currentQuestion]?.answer, "DD-MM-YYYY")
                        : answers[currentQuestion]?.answer && moment(answers[currentQuestion]?.answer, "DD-MM-YYYY")
                }

            />
        </Space>
    )

};

export default DateInput;