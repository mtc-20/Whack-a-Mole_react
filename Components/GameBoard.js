import React, { useEffect, useState } from  'react'
import  { StyleSheet, Text, View } from 'react-native'
import Square from './Square.js'
import { connect} from 'react-redux'


const GameBoard = (props) => {
    let timeLimit = 11
    const [timeLeft, setTimeLeft] = useState(timeLimit)

    useEffect(() => {
        if(!timeLeft) return
        const timerID = setInterval(() => {
            // Happens every 1000ms
            setTimeLeft(timeLeft-1)
        }, 1000)
        return () => clearInterval(timerID)
    }, [timeLeft])

    return(
        <View style={styles.container}>
      <Text>Mtc's Whack-a-mole App !</Text>
      <Text>Remaining Time: {timeLeft}</Text>
      <Text>{props.score} Moles whacked !</Text>
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
    </View>
    )

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      marginTop: 100
    //   justifyContent: 'center',
    },
    game: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      width: 300,
      paddingTop: 20,
    }
  });

  const mapStateToProps = state => {
      return {
          score: state.score
      }
  }
  

export default connect(mapStateToProps)(GameBoard) 