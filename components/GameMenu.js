import React, { useRef } from "react";
import { StyleSheet, Text, Image, TouchableWithoutFeedback, FlatList, SafeAreaView, View, Animated, Easing } from "react-native";
import { Instructions } from "./instructions.json"
import { connect } from "react-redux";
import { updateTimeLimit } from '../redux'

const ListItem = ({ title }) => (
    <View style={styles.item}>
        <Text style={styles.content}>{title}</Text>
    </View>
);


const GameMenu = (props,) => {
    const { setGameOver, setTimeLeft } = props;
    const gameTime = 25;

    // fadeAnim will be used as the value for opacity. Initial Value: 1
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const spinValue = useRef(new Animated.Value(0.5)).current;
    // First set up animation 
    Animated.loop(
        Animated.sequence([
            Animated.timing(
                spinValue,
                {
                    toValue: 0,
                    duration: 1500,
                    easing: Easing.linear, // Easing is an additional import from react-native
                    useNativeDriver: true  // To make use of native driver for performance
                }
            ),
            Animated.timing(
                spinValue,
                {
                    toValue: 1,
                    duration: 3000,
                    easing: Easing.linear, // Easing is an additional import from react-native
                    useNativeDriver: true  // To make use of native driver for performance
                }
            ),
            Animated.timing(
                spinValue,
                {
                    toValue: 0.5,
                    duration: 1500,
                    easing: Easing.linear, // Easing is an additional import from react-native
                    useNativeDriver: true  // To make use of native driver for performance
                }
            )

        ])).start()

    // Next, interpolate beginning and end values (in this case 0 and 1)
    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['55deg', '-55deg']
    })

    // const fadeIn = () => {
    //     // Will change fadeAnim value to 1 in 5 seconds
    //     Animated.timing(fadeAnim, {
    //         toValue: 1,
    //         duration: 5000,
    //         useNativeDriver: true,
    //     }).start();
    // };

    const fadeOut = () => {
        // Will change fadeAnim value to 0 in 500ms
        Animated.timing(fadeAnim, {
            toValue: 0.1,
            duration: 500,
            useNativeDriver: true,
        }).start(() => {
            console.log("Game started");
            setGameOver(false);
            // TODO: Find a better way to handle this.
            // Update the time limit in the store so that the moles start popping
            props.updateTimeLimit(gameTime);
            // Set time limit so that the timer starts
            setTimeLeft(gameTime);
            console.log("Setting timer to ", gameTime);
        });
    };

    return (
        // <TouchableOpacity style={styles.container} onPress={fadeOut}>
        <TouchableWithoutFeedback style={styles.container} onPress={fadeOut}>
            <Animated.View style={[
                styles.container,
                {
                    // Bind opacity to animated value
                    opacity: fadeAnim,
                },
            ]}>

                <Text style={styles.header}>Whack-a-mole</Text>
                <SafeAreaView>
                    <FlatList
                        data={Instructions}
                        renderItem={({ item }) => <ListItem title={item.title} />}
                        keyExtractor={item => item.id}
                    />
                </SafeAreaView>
                <SafeAreaView>
                    <Animated.Image
                        source={require('../assets/mole.png')}
                        style={[
                            styles.mole,
                            {
                                transform: [{ rotate: spin }]
                            }
                        ]} />

                    {/* </Animated.Image> */}
                </SafeAreaView>

                <Text style={styles.footer}>Click/Tap to play</Text>
            </Animated.View>
        </TouchableWithoutFeedback>
        // </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        backgroundColor: '#246580',
        alignItems: 'center',
        maxWidth: '100%',

        //   marginTop: 100
        //   justifyContent: 'center',
    },
    header: {
        fontWeight: 'bold',
        fontSize: '5rem',
        justifyContent: 'center',
        marginTop: '2rem',
        // marginLeft: 30,
        textAlign: 'center',
        color: '#fff'
    },
    content: {
        fontSize: '1rem',
        color: '#fff',
        // fontSize: 20,
        // alignItems: 'center',
        textAlign: 'left',
        // fontStyle: 'italic'
    },
    item: {
        padding: '0.1rem',
        marginLeft: '2.5rem',
        marginVertical: '1rem',
    },
    bottom: {
        flex: 1,
        // flex:3,
        paddingTop: 225,
    },
    footer: {
        display: 'flex',
        fontSize: '5rem',
        color: '#fff',
        fontStyle: 'italic',
        textAlign: 'center',
        marginTop: '1rem'
        // fontSize: '2rem',
        // color: 'blue'
    },
    mole: {
        flex: 1,
        margin: 8,
        backgroundColor: '#87ceeb',
        width: '8rem',
        height: '8rem',
        resizeMode: 'contain',
        borderRadius: '50%'
    },
});
// export default GameMenu;

const mapStateToProps = (state) => {
    return {
        timeLimit: state.timeLimit,
        // ownProps
        // setGameOver: ownProps.setGameOver,
        // setTimeLeft: ownProps.setTimeLeft
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateTimeLimit: (value) => dispatch(updateTimeLimit(value))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameMenu)