import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, TouchableOpacity, Image } from "react-native";
import { connect } from "react-redux";
import { addScore } from "../redux";
import colors from "./colors";

const image_mole = require("../assets/mole.png");
const image_ground = require("../assets/ground.png");

const Square = (props) => {
    const { timeLeft } = props;
    // 0: mole is not active, 1: mole is active, 2: mole is hit
    const [moleActive, setMoleActive] = useState(0);
    // This is the square's own GameOver state
    const [isGameOver, setGameOver] = useState(false);
    const [molePopUpTime, setMolePopUpTime] = useState(1000);
    const [moleIntervalTime, setMoleIntervalTime] = useState(40000);

    // Persist timer IDs and state refs
    const intervalRef = useRef();
    const timeoutRef = useRef();
    const moleActiveRef = useRef(moleActive);
    const isGameOverRef = useRef(isGameOver);

    // Keep refs in sync with state
    useEffect(() => {
        moleActiveRef.current = moleActive;
    }, [moleActive]);
    useEffect(() => {
        isGameOverRef.current = isGameOver;
    }, [isGameOver]);

    useEffect(() => {
        const randomTime = Math.floor(Math.random() * moleIntervalTime);
        intervalRef.current = setInterval(() => {
            // console.log("Will check again in ", randomTime)
            // If the mole is already active, do nothing
            if (moleActiveRef.current === 1 || moleActiveRef.current === 2)
                return;
            // If the game is over, do nothing
            if (isGameOverRef.current) return;
            setMoleActive(1);

            // Set a timeout to deactivate the mole
            setTimeout(() => {
                setMoleActive(0);
            }, molePopUpTime);
        }, randomTime);

        // Set a timeout to end the game
        // setTimeout(endGame, props.timeLimit * 1000);
        timeoutRef.current = setTimeout(() => {
            // console.log("Ending game after timeout");
            endGame();
        }, props.timeLimit * 1000);
        return () => {
            clearInterval(intervalRef.current);
            clearTimeout(timeoutRef.current);
        };
    }, [molePopUpTime, moleIntervalTime, props.timeLimit]);

    useEffect(() => {
        if (timeLeft / props.timeLimit === 0.25) {
            setMolePopUpTime(500);
            console.log("Time left changed", timeLeft);
            setMoleIntervalTime(80000);
        }
    }, [timeLeft]);

    function endGame() {
        clearInterval(intervalRef.current);
        clearTimeout(timeoutRef.current);
        setGameOver(true);
    }

    function hitMole() {
        // console.log("Mole hit");
        setMoleActive(2);
        props.addScore();
    }

    const handlePress = () => {
        if (moleActive == 1) {
            hitMole();
            // Set a timeout to deactivate the mole
            setTimeout(() => {
                setMoleActive(0);
            }, 1500);
        }
    };

    return (
        <TouchableOpacity onPress={handlePress}>
            {moleActive === 0 && (
                <Image source={image_ground} style={styles.square} />
            )}
            {moleActive === 1 && (
                <Image source={image_mole} style={styles.mole} />
            )}
            {moleActive === 2 && (
                <Image source={image_ground} style={styles.hit} />
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    hit: {
        backgroundColor: colors.brown,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        flex: 1,
        height: "auto",
        margin: 8,
        minHeight: 10,
        minWidth: 80,
        width: "75%"
    },
    mole: {
        flex: 1,
        height: "75%",
        margin: 8,
        minHeight: 80,
        minWidth: 80,
        resizeMode: "contain",
        width: "75%"
    },
    square: {
        borderRadius: 40,
        flex: 1,
        height: "75%",
        margin: 10,
        minHeight: 80,
        minWidth: 80,
        overflow: "hidden",
        resizeMode: "contain",
        width: "75%"
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
        addScore: () => dispatch(addScore())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Square);
