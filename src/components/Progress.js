import React from 'react';

function Progress(props) {
    return (
        <h6>
            Question {props.current} of {props.total}
        </h6>
    );
}

export default Progress;
