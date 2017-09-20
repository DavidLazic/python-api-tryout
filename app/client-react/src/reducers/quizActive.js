import { QUIZ_START, QUIZ_STOP } from '../constants/ActionTypes';

export default function activeQuiz(state = false, action) {
    switch (action.type) {
        case QUIZ_START:
            return true;

        case QUIZ_STOP:
            return false;

        default:
            return state;
    }
}
