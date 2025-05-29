import React, { useEffect, useRef, useState } from "react";
import {
    StyleSheet,
    Text,
    Image,
    TouchableWithoutFeedback,
    FlatList,
    SafeAreaView,
    View,
    Animated,
    Easing,
    Dimensions
} from "react-native";
import { Instructions } from "./instructions.json";
import { connect } from "react-redux";
import { updateTimeLimit } from "../redux";
import colors from "./colors";

const ListItem = ({ title }) => (
    <View style={styles.listItem}>
        <Text style={styles.listText}>{title}</Text>
    </View>
);

// Constants for screen width to handle small screens
const SMALL_SCREEN_WIDTH = 400;
// Check the width of the window
const windowWidth = Dimensions.get("window").width;
// const windowHeight = Dimensions.get('window').height;

const GameMenu = (props) => {
    const { setGameOver, setTimeLeft } = props;
    const gameTime = 60;

    // fadeAnim will be used as the value for opacity. Initial Value: 1
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const spinValue = useRef(new Animated.Value(0.5)).current;
    const opacityValue = useRef(new Animated.Value(1)).current;

    // First set up animation
    Animated.loop(
        Animated.sequence([
            Animated.timing(spinValue, {
                toValue: 0,
                duration: 1500,
                easing: Easing.linear, // Easing is an additional import from react-native
                useNativeDriver: true // To make use of native driver for performance
            }),
            Animated.timing(spinValue, {
                toValue: 1,
                duration: 3000,
                easing: Easing.linear, // Easing is an additional import from react-native
                useNativeDriver: true // To make use of native driver for performance
            }),
            Animated.timing(spinValue, {
                toValue: 0.5,
                duration: 1500,
                easing: Easing.linear, // Easing is an additional import from react-native
                useNativeDriver: true // To make use of native driver for performance
            })
            // Animated.timing(opacityValue, {
            //     toValue: 0,
            //     duration: 1500,
            //     useNativeDriver: true
            // }),
            // Animated.timing(opacityValue, {
            //     toValue: 1,
            //     duration: 1500,
            //     useNativeDriver: true
            // })
        ])
    ).start();

    // Blinking text animation
    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(opacityValue, {
                    toValue: 0,
                    duration: 500
                    // useNativeDriver: true
                }),
                Animated.timing(opacityValue, {
                    toValue: 1,
                    duration: 750
                    // useNativeDriver: true
                })
            ])
        ).start();

        // return () => {
        //     opacityValue.stopAnimation();
        // };
    }, [opacityValue]);

    // Next, interpolate beginning and end values (in this case 0 and 1)
    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ["55deg", "-55deg"]
    });

    const fadeOut = () => {
        // Will change fadeAnim value to 0 in 500ms
        Animated.timing(fadeAnim, {
            toValue: 0.1,
            duration: 500,
            useNativeDriver: true
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
        <TouchableWithoutFeedback style={styles.container} onPress={fadeOut}>
            <Animated.View
                style={[
                    styles.container,
                    {
                        // Bind opacity to animated value
                        opacity: fadeAnim
                    }
                ]}
            >
                <Text style={styles.header}>Wha-a-m!</Text>
                <Text style={styles.subHeader}>Whack-A-Mole!!</Text>
                <SafeAreaView>
                    <FlatList
                        data={Instructions}
                        renderItem={({ item }) => (
                            <ListItem title={item.title} />
                        )}
                        keyExtractor={(item) => item.id}
                        style={styles.listContainer}
                    />
                </SafeAreaView>
                <SafeAreaView>
                    <Animated.Image
                        source={require("../assets/mole.png")}
                        style={[
                            styles.mole,
                            {
                                transform: [{ rotate: spin }]
                            }
                        ]}
                    />
                </SafeAreaView>
                <Text
                    style={
                        windowWidth < SMALL_SCREEN_WIDTH
                            ? styles.smallScreenBox
                            : styles.largeScreenBox
                    }
                ></Text>
                {windowWidth < SMALL_SCREEN_WIDTH ? (
                    <Animated.Text
                        style={[styles.infoBoxSmall, { opacity: opacityValue }]}
                    >
                        Tap to play
                    </Animated.Text>
                ) : (
                    <Animated.Text
                        style={[styles.infoBox, { opacity: opacityValue }]}
                    >
                        Click anywhere to play
                    </Animated.Text>
                )}
                <Text style={styles.footer}>
                    <Image
                        source={require("../public/favicon-32x32.png")}
                        style={styles.footerIcon}
                    />
                    <Text style={styles.footerText}>An Inkwolf production</Text>
                </Text>
            </Animated.View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: colors.darkBlue,
        display: "flex",
        flexDirection: "column",
        flex: 1,
        maxWidth: "100%"
    },
    footer: {
        bottom: 0,
        color: colors.white,
        display: "flex",
        fontSize: "1rem",
        fontStyle: "italic",
        margin: ".25rem",
        position: "absolute",
        textAlign: "center"
        // marginTop: '1rem'
    },
    footerIcon: {
        height: 32,
        marginRight: ".2rem",
        resizeMode: "contain",
        width: 32
    },
    footerText: {
        marginLeft: ".2rem"
        // marginTop: '1rem'
    },
    header: {
        color: colors.white,
        fontSize: "5rem",
        fontWeight: "bold",
        justifyContent: "center",
        marginTop: "2rem",
        textAlign: "center"
    },
    infoBox: {
        color: colors.white,
        display: "flex",
        fontSize: "5rem",
        fontStyle: "italic",
        marginTop: "1rem",
        textAlign: "center"
    },
    infoBoxSmall: {
        color: colors.white,
        display: "flex",
        fontSize: "2rem",
        fontStyle: "italic",
        marginTop: "1rem",
        textAlign: "center"
    },
    listContainer: {
        borderBottomLeftRadius: "1rem",
        borderBottomRightRadius: "1rem",
        borderColor: colors.skyBlue,
        borderStyle: "solid",
        borderWidth: 5,

        // backgroundColor: colors.skyBlue,
        // borderRadius: "1rem",
        marginVertical: "1rem",
        paddingRight: "1.5rem"
    },
    listItem: {
        marginLeft: "1.5rem",
        marginVertical: "0.5rem",
        padding: "0.1rem"
    },
    listText: {
        color: colors.white,
        fontSize: "1rem",
        textAlign: "left"
    },
    mole: {
        backgroundColor: colors.skyBlue,
        borderRadius: "50%",
        flex: 1,
        height: "8rem",
        margin: 8,
        resizeMode: "contain",
        width: "8rem"
    },
    subHeader: {
        color: colors.skyBlue,
        fontSize: "2.5rem",
        fontWeight: "bold",
        justifyContent: "center",
        marginTop: "1rem",
        textAlign: "center"
    }
});

const mapStateToProps = (state) => {
    return {
        timeLimit: state.timeLimit
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateTimeLimit: (value) => dispatch(updateTimeLimit(value))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GameMenu);
