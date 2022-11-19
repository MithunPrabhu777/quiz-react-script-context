import React, { useContext } from 'react';
import Answer from './Answer';
import QuizContext from '../context/QuizContext';
import DateInput from './Date';
import TextInput from './TextArea';

function Answers() {
    const { state, dispatch } = useContext(QuizContext);
    const { currentQuestion, questions, answers } = state;

    let { currentAnswer } = state;
    let { questiontype } = state;

    console.log(questiontype);

    const question = questions[currentQuestion];

    let colourGreen = answers.find(checkForSameQuestion);

    if (typeof colourGreen === 'object') {
        colourGreen = true;
    } else {
        colourGreen = false;
    }

    function checkForSameQuestion(item) {
        if (item.answer !== "" && item.questionId === currentQuestion + 1) {
            currentAnswer = item.answer;
        }
        return item.questionId === currentQuestion + 1;
    }


    return (
        questiontype.toLowerCase() === "radio" ?
            <>
                <Answer
                    letter="a"
                    answer={question.answer_a}
                    dispatch={dispatch}
                    selected={currentAnswer === 'a'}
                />
                <Answer
                    letter="b"
                    answer={question.answer_b}
                    dispatch={dispatch}
                    selected={currentAnswer === 'b'}
                />
                <Answer
                    letter="c"
                    answer={question.answer_c}
                    dispatch={dispatch}
                    selected={currentAnswer === 'c'}
                />
                <Answer
                    letter="d"
                    answer={question.answer_d}
                    dispatch={dispatch}
                    selected={currentAnswer === 'd'}
                />
            </> : questiontype.toLowerCase() === 'date' ?
                <>
                    <DateInput dispatch={dispatch} />
                </> : questiontype.toLowerCase() === 'textarea' &&
                <>
                    <TextInput dispatch={dispatch} />
                </>
    );
}

export default Answers;
