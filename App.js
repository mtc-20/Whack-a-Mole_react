import React, { useEffect, useState } from "react";
import GameBoard from "./components/GameBoard";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Asset } from "expo-asset";
import { ActivityIndicator, View } from "react-native";

const imageAssets = [
    require("./assets/mole.png"),
    require("./assets/ground.png"),
    require("./assets/favicon-32x32.png")
];

const audioAssets = [require("./assets/whack04-105536.mp3")];

export default function App() {
    const [assetsLoaded, setAssetsLoaded] = useState(false);

    useEffect(() => {
        async function loadAssets() {
            // Preload images
            await Promise.all(
                imageAssets.map((image) => Asset.loadAsync(image))
            );
            // Preload audio
            await Promise.all(
                audioAssets.map((audio) => Asset.loadAsync(audio))
            );
            setAssetsLoaded(true);
        }

        loadAssets();
    }, []);

    if (!assetsLoaded) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <Provider store={store}>
            <GameBoard />
        </Provider>
    );
}
