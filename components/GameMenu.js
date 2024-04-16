import React, { useRef } from "react";
import { StyleSheet, Text, Image, TouchableWithoutFeedback, FlatList, SafeAreaView, View, Animated } from "react-native";
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
    // fadeAnim will be used as the value for opacity. Initial Value: 1
    const fadeAnim = useRef(new Animated.Value(1)).current;

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
            props.updateTimeLimit(60);
            // Set time limit so that the timer starts
            setTimeLeft(60);
            // console.log("Setting timer to ", 5);
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
                    <Image source={require('../assets/mole.png')} style={styles.mole} ></Image>
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
        // minWidth: 80,
        // minHeight: 80,
        margin: 8,
        // backgroundColor: 'transparent',
        width: '8rem',
        height: '8rem',
        resizeMode: 'contain'

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