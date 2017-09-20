import {
    ADD_DATA ,
    QUIZ_START,
    QUIZ_STOP,
    QUIZ_RESET
} from '../constants/ActionTypes';

export function addLogData (data) {
    return {
        type: ADD_DATA,
        data
    };
}

export function quizStart () {
    return { type: QUIZ_START };
}

export function quizStop () {
    return { type: QUIZ_STOP };
}
