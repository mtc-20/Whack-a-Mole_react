import { ADD_SCORE, UPDATE_TIME_LIMIT } from './actionTypes'


export const addScore = () => {
    return {
        type: ADD_SCORE
    }
}

export const updateTimeLimit = (timeLimit) => {
    return {
        type: UPDATE_TIME_LIMIT,
        payload: timeLimit
    }
}