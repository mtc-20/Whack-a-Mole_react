import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Linking } from "react-native";
import Square from "./Square";
import { connect } from "react-redux";
import GameMenu from "./GameMenu";
import { resetGame } from "../redux";
import { FlatList } from "react-native-web";
import colors from "./colors";

const GameBoard = (props) => {
    const [timeLeft, setTimeLeft] = useState(props.timeLimit);
    const [isGameOver, setGameOver] = useState(true);
    const [displayScore, setDisplayScore] = useState(false);
    // console.log(props.timeLimit)

    // Functions for FlatList (grid)
    const renderSquare = ({ item }) => (
        <Square key={item.id} timeLeft={timeLeft} />
    );
    const renderData = [...Array(12)].map((_, index) => ({
        key: String(index),
        id: index
    }));

    useEffect(() => {
        console.log(timeLeft);
        if (timeLeft === undefined) return;
        if (timeLeft < 0) {
            console.log("Game Over");
            setDisplayScore(true);

            console.log("Setting displayScore to true");
            setTimeout(() => {
                setGameOver(true);
                props.resetGame();
                console.log("Resetting game", props.score);
                setDisplayScore(false);
            }, 5000);
            return;
        }
        const timerID = setInterval(() => {
            // Happens every 1000ms
            setTimeLeft(timeLeft - 1);
        }, 1000);
        return () => {
            clearInterval(timerID);
        };
    }, [timeLeft]);

    return isGameOver ? (
        <GameMenu setGameOver={setGameOver} setTimeLeft={setTimeLeft} />
    ) : displayScore ? (
        <View style={styles.scoreContainer}>
            <Text style={styles.scoreHeader}>GAME OVER</Text>
            <Text style={styles.scoreContent}>You scored {props.score} !</Text>
            <Text style={styles.scoreFooter}>
                This will return to the title section in a couple of seconds.
            </Text>
        </View>
    ) : (
        <View style={styles.container}>
            <Text style={styles.header}>Mtc's Whack-a-mole App !</Text>
            <Text style={styles.content}>{timeLeft} s left</Text>
            <Text style={styles.content}>{props.score} Moles whacked !</Text>

            <View style={styles.game}>
                {/* Generate a 4x3 grid */}
                <FlatList
                    data={renderData}
                    renderItem={renderSquare}
                    keyExtractor={(item) => item.key}
                    numColumns={3}
                    scrollEnabled={false} // Disable scrolling
                    columnWrapperStyle={styles.row} // Specify the style for each row
                />
            </View>
            <View style={styles.bottomSpacer}></View>
            <View style={styles.footer}>
                <Text
                    style={styles.footerCenter}
                    onPress={() => Linking.openURL("https://github.com/mtc-20")}
                >
                    Made by @mtc-20{" "}
                </Text>
                <Text
                    style={styles.footerRight}
                    onPress={() =>
                        Linking.openURL(
                            "https://github.com/mtc-20/Whack-a-Mole_react"
                        )
                    }
                >
                    {" "}
                    Github Source{" "}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: colors.skyBlue,
        flex: 1,
        maxHeight: "100vh",
        overflow: "hidden"
    },
    game: {
        justifyContent: "space-between",
        marginHorizontal: "auto",
        maxHeight: "80vh",
        maxWidth: "98%",
        width: 500
    },
    row: {
        justifyContent: "space-around"
    },
    header: {
        fontSize: 32,
        fontWeight: "bold",
        justifyContent: "center",
        marginLeft: 30,
        marginTop: 30,
        textAlign: "center"
    },
    content: {
        fontSize: 20,
        fontStyle: "italic"
    },
    // FOOTER //
    bottomSpacer: {
        minHeight: "1rem",
        width: "100%"
    },
    footer: {
        alignItems: "center",
        bottom: 0,
        display: "flex",
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: "auto",
        position: "absolute"
    },
    footerCenter: {
        color: colors.blue,
        fontSize: 12,
        margin: 10,
        textAlign: "left"
    },
    footerRight: {
        color: colors.blue,
        fontSize: 12,
        justifyContent: "flex-end",
        margin: 10,
        // position: "absolute",
        right: 0,
        textAlign: "right"
    },
    // SCORE DISPLAY //
    scoreContainer: {
        alignContent: "center",
        alignItems: "center",
        backgroundColor: colors.darkBlue,
        flex: 1,
        flexDirection: "column",
        marginHorizontal: "auto",
        width: "95%"
    },
    scoreHeader: {
        fontSize: "4rem",
        fontWeight: "bold",
        justifyContent: "center",
        marginTop: "10%",
        // marginLeft: 30,
        textAlign: "center"
    },
    scoreContent: {
        color: colors.white,
        fontSize: "1.5rem",
        fontWeight: "bold",
        marginTop: "2rem",
        textAlign: "center"
    },
    scoreFooter: {
        fontSize: "1rem",
        fontStyle: "italic",
        marginTop: "7.5rem",
        textAlign: "center"
    }
});

const mapStateToProps = (state) => {
    return {
        score: state.score,
        timeLimit: state.timeLimit
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        resetGame: () => dispatch(resetGame())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GameBoard);
