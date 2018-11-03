import React, { Component } from 'react';
import { View, StyleSheet, Animated } from 'react-native';


class Ball extends Component {

    componentWillMount() {
        this.position = new Animated.ValueXY(0, 0);
        Animated.spring(this.position, {
            toValue: { x: 200, y: 400 }
        }).start();
    }

    render() {
        return (
            <Animated.View style={this.position.getLayout()} >
                <View style={style.ball} />
            </Animated.View>
        )
    }
}

const style = StyleSheet.create({
    ball: {
        width: 50,
        height: 50,
        borderRadius: 30,
        borderWidth: 30,
        borderColor: 'black',
    }
});

export default Ball;