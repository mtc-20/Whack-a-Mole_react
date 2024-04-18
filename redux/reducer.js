import { ADD_SCORE, UPDATE_TIME_LIMIT, RESET_GAME } from './actionTypes'

const initialState = {
    score: 0,
    timeLimit: undefined
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_SCORE: return {
            ...state,
            score: state.score + 1
        }
        case UPDATE_TIME_LIMIT: return {
            ...state,
            timeLimit: action.payload
        }
        case RESET_GAME: return initialState
        default: return state
    }
}

export default appReducer;