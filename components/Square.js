import React, { useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux'
import { addScore } from '../redux'


const Square = (props) => {
    const { timeLeft } = props;
    const [moleActive, setMoleActive] = useState(false)
    // This is the square's own GameOver state
    const [isGameOver, setGameOver] = useState(false)
    const [molePopUpTime, setMolePopUpTime] = useState(1000)
    const [moleIntervalTime, setMoleIntervalTime] = useState(40000)

    const randomTime = Math.floor(Math.random() * moleIntervalTime)
    let timerID
    useEffect(() => {
        // console.log("Square timeL", props.timeLimit)
        timerID = setInterval(() => {
            console.log("Will check again in ", randomTime)
            // If the mole is already active, do nothing
            if (moleActive) return
            // If the game is over, do nothing
            if (isGameOver) return

            setMoleActive(true)
            // Set a timeout to deactivate the mole
            setTimeout(() => { setMoleActive(false) }, molePopUpTime)
        }, randomTime)

        // Set a timeout to end the game
        setTimeout(endGame, props.timeLimit * 1000)
    }, [])

    useEffect(() => {
        if (timeLeft / props.timeLimit === 0.2) {
            setMolePopUpTime(500)
            console.log("Time left changed", timeLeft)
            setMoleIntervalTime(80000)
        }
    }, [timeLeft])

    function endGame() {
        clearInterval(timerID)
        setGameOver(true)
    }

    function hitMole() {
        console.log("Mole hit")
        setMoleActive(false)
        props.addScore()
    }

    return (
        <TouchableOpacity onPress={moleActive ? hitMole : null}>
            <Image source={moleActive ? require('../assets/mole.png') : require('./../assets/ground.png')} style={moleActive ? styles.mole : styles.square} ></Image>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    square: {
        flex: 1,
        minWidth: 80,
        minHeight: 80,
        margin: 10,
        // backgroundColor: 'white',
        borderRadius: 40,
        overflow: 'hidden',
        width: '75%',
        height: '75%',
        resizeMode: 'contain'
    },
    mole: {
        flex: 1,
        minWidth: 80,
        minHeight: 80,
        margin: 8,
        // backgroundColor: 'transparent',
        width: '75%',
        height: '75%',
        resizeMode: 'contain'

    },
})

const mapStateToProps = state => {
    return {
        score: state.score,
        timeLimit: state.timeLimit
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addScore: () => dispatch(addScore())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Square)