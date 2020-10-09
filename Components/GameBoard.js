import React, { useEffect, useState } from  'react'
import  { StyleSheet, Text, View, Linking } from 'react-native'
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
      <View style={styles.bottom}>
      <Text style={styles.footer} onPress={() => Linking.openURL('https://github.com/mtc-20')}>Made by @mtc-20 </Text>
      <Text style={styles.footer} onPress={() => Linking.openURL('https://github.com/mtc-20/Whack-a-Mole_react')}> Github Source </Text>
      </View>
    </View>
    
    )

}

const styles = StyleSheet.create({
    container: {
      // flexDirection: 'column',
      flex: 1,
      backgroundColor: '#87ceeb',
      alignItems: 'center',
    //   marginTop: 100
    //   justifyContent: 'center',
    },
    game: {
      flex: 1,
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
        marginLeft: 30,
        textAlign: 'center'
    },
    content: {
        fontSize: 20,
        fontStyle: 'italic'
    }, 
    bottom: {
      flex: 1,
      // flex:3,
      paddingTop: 225,
    },
    footer: {
      margin: 10,
      textAlign: 'right',
      fontSize: 12, 
      color: 'blue'
    }
  });

  const mapStateToProps = state => {
      return {
          score: state.score,
          timeLimit: state.timeLimit
      }
  }
  

export default connect(mapStateToProps)(GameBoard) 