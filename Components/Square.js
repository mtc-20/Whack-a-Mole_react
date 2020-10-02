import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
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
        setTimeout(endGame, 11*1000)
    }, [])

    function endGame() {
        clearInterval(timerID)
        setGameOver(true)
    }

    return (
        <TouchableOpacity onPress={moleActive? props.addScore : null}>
        <View style={moleActive? styles.mole : styles.square}>
            {isGameOver && <Text>'X'</Text>}
        </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    square: {
        flex: 1,
        minWidth: 80,
        minHeight: 80,
        margin: 10,
        backgroundColor: 'red',
    },
    mole: {
        flex: 1,
        minWidth: 80,
        minHeight: 80,
        margin: 10,
        backgroundColor: 'blue',
    },
})

const mapStateToProps = state => {
    return {
        score: state.score
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addScore: () => dispatch(addScore())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Square)