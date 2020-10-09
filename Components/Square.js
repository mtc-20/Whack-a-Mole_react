import React, { useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux'
import { addScore } from './../redux'


const Square = (props) => {
    const [moleActive, setMoleActive] = useState(false)
    const [isGameOver, setGameOver] = useState(false)
    
    const randomTime = Math.random() * 20000
    let timerID
    useEffect(() => {
        timerID = setInterval(() => {
            setMoleActive(true)
            setTimeout(() => {setMoleActive(false)}, 800)
        }, randomTime)
        setTimeout(endGame, props.timeLimit*1000)
    }, [])

    function endGame() {
        clearInterval(timerID)
        setGameOver(true)
    }

    return (
        <TouchableOpacity onPress={moleActive? props.addScore : null}>
           <Image source={moleActive? require('./../assets/mole.png') : require('./../assets/ground.png')} style={moleActive? styles.mole : styles.square} ></Image>
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
        margin: 10,
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