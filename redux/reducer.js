import {ADD_SCORE} from './actionTypes'

const initialState = {
    score: 0,
    timeLimit: 11
}

const scoreReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_SCORE: return {
            ...state,
            score: state.score + 1
        }
        default: return state
    }
}

export default scoreReducer