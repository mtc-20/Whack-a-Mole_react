import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, View, Linking, Animated, SafeAreaView } from 'react-native'
import Square from './Square'
import { connect } from 'react-redux'
import GameMenu from './GameMenu'


const GameBoard = (props) => {
    // let props.timeLimit = 11;
    const [timeLeft, setTimeLeft] = useState(props.timeLimit)
    const [isGameOver, setGameOver] = useState(true)
    const [displayScore, setDisplayScore] = useState(false)
    // console.log(props.timeLimit)
    // const fadeAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        console.log(timeLeft)
        if (timeLeft === undefined) return
        if (timeLeft < 0) {
            console.log("Game Over")
            setDisplayScore(true)
            console.log("Setting displayScore to true")
            setTimeout(() => {
                setGameOver(true)
            }, 5000)
            return
        }
        const timerID = setInterval(() => {
            // Happens every 1000ms
            setTimeLeft(timeLeft - 1)
        }, 1000)
        return () => {
            clearInterval(timerID)
        }
    }, [timeLeft])

    // const fadeIn = () => {
    //     // Will change fadeAnim value to 1 in 5 seconds
    //     Animated.timing(fadeAnim, {
    //         toValue: 1,
    //         duration: 5000,
    //         useNativeDriver: true,
    //     }).start(() => setGameOver(true));
    // };

    return (
        isGameOver ? (
            <GameMenu setGameOver={setGameOver} setTimeLeft={setTimeLeft} />
        ) :
            (
                displayScore ? (
                    <View style={styles.scoreContainer}>
                        <Text style={styles.scoreHeader}>
                            GAME OVER
                        </Text>
                        <Text style={styles.scoreContent}>
                            You scored {props.score} !
                        </Text>
                        <Text style={styles.scoreFooter}>
                            This will return to the title section in a couple of seconds.
                        </Text>
                    </View>
                ) :
                    (
                        <View style={styles.container}>
                            <Text style={styles.header}>Mtc's Whack-a-mole App !</Text>
                            <Text style={styles.content}>{timeLeft} s left</Text>
                            <Text style={styles.content}>{props.score} Moles whacked !</Text>
                            {/* <StatusBar style="auto" /> */}

                            <View style={styles.game}>
                                <Square ></Square>
                                <Square ></Square>
                                <Square ></Square>
                                <Square ></Square>
                                <Square ></Square>
                                <Square ></Square>
                                <Square ></Square>
                                <Square ></Square>
                                <Square ></Square>
                                <Square ></Square>
                                <Square ></Square>
                                <Square ></Square>
                            </View>
                            <View style={styles.bottomSpacer}>

                            </View>
                            <View style={styles.bottom}>
                                <Text style={styles.footer} onPress={() => Linking.openURL('https://github.com/mtc-20')}>Made by @mtc-20 </Text>
                                <Text style={styles.footer} onPress={() => Linking.openURL('https://github.com/mtc-20/Whack-a-Mole_react')}> Github Source </Text>
                            </View>
                        </View>
                    )
            )
    )

}

const styles = StyleSheet.create({
    menuContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#246580',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        // flexDirection: 'column',
        maxHeight: '100vh',
        flex: 1,
        backgroundColor: '#87ceeb',
        alignItems: 'center',
        overflow: 'hidden',
        //   marginTop: 100
        //   justifyContent: 'center',
    },
    game: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        // width: '95%',
        width: 500,
        maxWidth: '98%',
        marginHorizontal: 'auto',
        justifyContent: 'space-between',
        aspectRatio: 1,
        // paddingTop: 20,
        // borderWidth: 1,
        // borderBottomLeftRadius: 10,
        // borderBottomRightRadius: 10,
    },
    header: {
        fontWeight: 'bold',
        fontSize: 32,
        justifyContent: 'center',
        marginTop: 30,
        marginLeft: 30,
        textAlign: 'center'
    },
    content: {
        fontSize: 20,
        fontStyle: 'italic'
    },
    bottomSpacer: {
        width: '100%',
        minHeight: '1rem'
    },
    bottom: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // flex:3,
        // paddingTop: 225,
        marginTop: 'auto',
        position: 'absolute',
        bottom: 0
    },
    footer: {
        margin: 10,
        textAlign: 'right',
        fontSize: 12,
        color: 'blue'
    },
    scoreContainer: {
        flex: 1,
        width: '95%',
        flexDirection: 'column',
        alignItems: 'center',
        alignContent: 'center',
        marginHorizontal: 'auto',
        backgroundColor: '#246580',
    },
    scoreHeader: {
        fontWeight: 'bold',
        fontSize: '4rem',
        justifyContent: 'center',
        marginTop: '10%',
        // marginLeft: 30,
        textAlign: 'center',
    },
    scoreContent: {
        fontWeight: 'bold',
        fontSize: '1.5rem',
        color: '#fff',
        marginTop: '2rem',
        textAlign: 'center',
    },
    scoreFooter: {
        fontSize: '1rem',
        fontStyle: 'italic',
        marginTop: '7.5rem',
        textAlign: 'center',
    },

});

const mapStateToProps = state => {
    return {
        score: state.score,
        timeLimit: state.timeLimit
    }
}


export default connect(mapStateToProps)(GameBoard) 