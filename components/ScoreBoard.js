import React from "react";
import { FlatList, View, StyleSheet, Text, SafeAreaView } from "react-native";
import colors from "./colors";

const ScoreBoard = ({ topScores }) => {
    // TODO: Use props or utils.getTopScores() ?

    const renderEntry = ({ item }) => (
        <View>
            <Text style={styles.scoreEntry}>
                {item.date} - {item.score}
            </Text>
        </View>
    );
    return (
        <SafeAreaView>
            <Text style={styles.header}>Top Scores</Text>
            <FlatList
                data={topScores}
                renderItem={renderEntry}
                style={styles.scoresContainer}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    header: {
        fontFamily: "monospace",
        fontSize: 54,
        fontWeight: "bold",
        justifyContent: "center",
        marginTop: 24, //"2rem",
        textAlign: "center",
        borderStyle: "solid",
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        borderTopColor: colors.skyBlue,
        borderTopWidth: 5,
        color: colors.skyBlue
    },
    scoreEntry: {
        borderLeftColor: colors.skyBlue,
        borderLeftWidth: 3,
        color: colors.white,
        fontFamily: "monospace",
        fontSize: 16,
        fontWeight: "bold",
        marginHorizontal: 12,
        marginVertical: 2,
        paddingHorizontal: 12
    },
    scoresContainer: {
        borderBottomColor: colors.skyBlue,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        borderBottomWidth: 5,
        borderStyle: "solid",
        flexGrow: 0,
        marginTop: 2, //"2rem",
        marginHorizontal: 20, //"2rem",
        paddingHorizontal: 24, //"2rem",
        paddingBottom: 10,
        marginBottom: 8
    }
});

export default ScoreBoard;
