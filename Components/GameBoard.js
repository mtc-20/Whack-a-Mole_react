import React, { useEffect, useState } from  'react'
import  { StyleSheet, Text, View } from 'react-native'
import Square from './Square.js'
import { connect} from 'react-redux'


const GameBoard = (props) => {
    // let props.timeLimit = 11;
    const [timeLeft, setTimeLeft] = useState(props.timeLimit)

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
    </View>
    )

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#87ceeb',
      alignItems: 'center',
    //   marginTop: 100
    //   justifyContent: 'center',
    },
    game: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      width: 300,
      paddingTop: 20,
    },
    header: {
        fontWeight: 'bold',
        fontSize: 32,
        justifyContent: 'center',
        marginTop: 30,
        marginLeft: 50,
        textAlign: 'center'
    },
    content: {
        fontSize: 20,
    }
  });

  const mapStateToProps = state => {
      return {
          score: state.score,
          timeLimit: state.timeLimit
      }
  }
  

export default connect(mapStateToProps)(GameBoard) 