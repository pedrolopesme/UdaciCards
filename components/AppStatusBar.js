import React from 'react';
import { Constants } from 'expo';
import { StatusBar, View, StyleSheet } from 'react-native';
import Colors from '@utils/colors';

const AppStatusBar = () => {
    return (
        <View style={styles.Bg}>
            <StatusBar backgroundColor={styles.Bg.backgroundColor} barStyle="light-content" />
        </View>
    );
}

const styles = StyleSheet.create({
    Bg: {
        backgroundColor: Colors.DarkPurple, 
        height: Constants.statusBarHeight,
    },
});

export default AppStatusBar;