import { ADD_DATA, LINE_LIMIT } from '../constants/ActionTypes';

export default function logData(state = [], action) {
    let date = new Date();
    let seconds = (date.getSeconds() < 10) ? `0${date.getSeconds()}` : date.getSeconds();

    action.data && (action.data.time = `${date.getHours()}:${date.getMinutes()}:${seconds}`);

    switch (action.type) {

        case ADD_DATA:
            return (state.length + 1 > LINE_LIMIT) ?
                [...state.slice(1, state.length), action.data] :
                [...state, action.data];

        default:
            return state;
    }
}
