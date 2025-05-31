import AsyncStorage from "@react-native-async-storage/async-storage";

const SCORES_KEY = "TOP_SCORES";

export async function getTopScores() {
    try {
        const json = await AsyncStorage.getItem(SCORES_KEY);
        // If no scores are stored, return an empty array
        return json != null ? JSON.parse(json) : [];
    } catch (e) {
        console.error("Failed to load scores", e);
        return [];
    }
}

export async function saveScore(newScore) {
    try {
        const scores = await getTopScores();
        // If new score is 0, do not save it
        if (newScore <= 0) {
            console.log("Score is 0 or negative, not saving.");
            return scores;
        }

        const newEntry = {
            score: newScore,
            date: new Date().toLocaleDateString()
        };
        scores.push(newEntry);
        // Sort scores in descending order and keep only the top 5
        const top5 = scores.sort((a, b) => b.score - a.score).slice(0, 5);
        // console.log("Top 5 scores:", top5);
        await AsyncStorage.setItem(SCORES_KEY, JSON.stringify(top5));
        return top5;
    } catch (e) {
        console.error("Failed to save score", e);
        return [];
    }
}
