import React, { useEffect, useRef } from "react";
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

const image_mole = require("../assets/mole.png");

const ListItem = ({ title }) => (
    <View style={styles.listItem}>
        <Text style={styles.listText}>{`\u29BF  ${title}`}</Text>
    </View>
);

// Constants
const GAME_TIME = 60;
// Max screen width to handle small screens
const SMALL_SCREEN_WIDTH = 600;

// Check the width of the window
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const GameMenu = (props) => {
    const { setGameOver, setTimeLeft } = props;

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
        ])
    ).start();

    // Blinking text animation
    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(opacityValue, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true
                }),
                Animated.timing(opacityValue, {
                    toValue: 1,
                    duration: 750,
                    useNativeDriver: true
                })
            ])
        ).start();
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
            props.updateTimeLimit(GAME_TIME);
            // Set time limit so that the timer starts
            setTimeLeft(GAME_TIME);
            console.log("Setting timer to ", GAME_TIME);
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
                <Text style={styles.header}>Wh-a-m!</Text>
                <Text style={styles.subHeader}>Whack-A-Mole!!</Text>
                <FlatList
                    data={Instructions}
                    renderItem={({ item }) => <ListItem title={item.title} />}
                    keyExtractor={(item) => item.id}
                    style={styles.listContainer}
                />
                <SafeAreaView>
                    <Animated.Image
                        source={image_mole}
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
        maxHeight: "100%",
        maxWidth: "100%"
    },
    footer: {
        bottom: 0,
        color: colors.white,
        display: "flex",
        fontSize: 16,
        fontStyle: "italic",
        margin: 8, //".25rem",
        position: "absolute",
        textAlign: "center"
    },
    footerIcon: {
        height: 32,
        marginRight: ".2rem",
        resizeMode: "contain",
        width: 32
    },
    footerText: {
        marginLeft: ".2rem"
    },
    header: {
        color: colors.white,
        fontSize: 72,
        fontWeight: "bold",
        justifyContent: "center",
        marginTop: "2rem",
        textAlign: "center",
        width: "100%"
    },
    infoBox: {
        color: colors.white,
        display: "flex",
        fontSize: "5rem",
        fontStyle: "italic",
        marginTop: 16,
        textAlign: "center"
    },
    infoBoxSmall: {
        color: colors.white,
        display: "flex",
        fontSize: 40, //"2rem",
        fontStyle: "italic",
        marginTop: 16,
        textAlign: "center"
    },
    listContainer: {
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        borderColor: colors.skyBlue,
        borderStyle: "solid",
        borderWidth: 5,
        height: "auto",
        marginVertical: 16,
        maxHeight: "15%",
        padding: 0,
        paddingRight: "1.5rem"
    },
    listItem: {
        height: "auto",
        marginHorizontal: 10, //"1.5rem",
        marginVertical: 1, //"0.5rem",
        padding: "0.1rem"
    },
    listText: {
        color: colors.white,
        fontSize: 16,
        textAlign: "left"
    },
    mole: {
        backgroundColor: colors.skyBlue,
        borderRadius: Math.round(windowWidth + windowHeight) / 2, //"50%",
        height: Math.round(windowHeight) / 4, //"8rem",
        margin: 0,
        resizeMode: "contain",
        width: Math.round(windowHeight) / 4 //"8rem"
    },
    subHeader: {
        color: colors.skyBlue,
        fontSize: 36, //"2.5rem",
        fontWeight: "bold",
        justifyContent: "center",
        marginTop: 12,
        textAlign: "center",
        width: "100%"
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
