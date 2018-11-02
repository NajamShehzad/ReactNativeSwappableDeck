import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';


class Ball extends Component {
    render() {
        return (
            <View style={style.ball} />
        )
    }
}

const style = StyleSheet.create({
    ball: {
        width: 50,
        height: 50,
        borderRadius: 30,
        borderWidth: 30,
        borderColor: 'black'
    }
});

export default Ball;