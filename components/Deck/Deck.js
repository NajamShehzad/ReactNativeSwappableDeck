import React, { Component } from 'react';
import _ from 'lodash';
import { View, Animated, PanResponder, Dimensions, StyleSheet, LayoutAnimation, UIManager } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPR_OUT_DURATION = 250;


class Deck extends Component {

    static defaultProps = {
        onSwipeLeft: () => { },
        onSwipeRight: () => { }
    }


    constructor(props) {
        super(props)

        const position = new Animated.ValueXY();
        const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (event, gesture) => {
                position.setValue({ x: gesture.dx, y: gesture.dy })
            },
            onPanResponderRelease: (event, gesture) => {
                if (gesture.dx > SWIPE_THRESHOLD) {
                    this.forceSwipe('right');
                } else if (gesture.dx < -SWIPE_THRESHOLD) {
                    this.forceSwipe('left');
                } else {
                    this.resetPosition();
                }
            }
        });
        this.state = {
            panResponder,
            position,
            index: 0
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data !== this.props.data) {
            this.setState({ index: 0 });
        }
    }

    componentWillUpdate() {
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        LayoutAnimation.spring();
    }


    forceSwipe(direction) {
        const x = direction === 'right' ? (SCREEN_WIDTH + 120) : (-SCREEN_WIDTH - 120);
        Animated.timing(this.state.position, {
            toValue: { x, y: 0 },
            duration: SWIPR_OUT_DURATION
        }).start(() => this.onSwipeCompleted(direction));
    }

    onSwipeCompleted(direction) {
        const { onSwipeLeft, onSwipeRight, data } = this.props;

        const item = data[this.state.index];

        direction == 'right' ? onSwipeRight(item) : onSwipeLeft(item);

        this.state.position.setValue({ x: 0, y: 0 });

        this.setState({ index: this.state.index + 1 });
    }

    resetPosition() {
        Animated.spring(this.state.position, {
            toValue: { x: 0, y: 0 }
        }).start();
    }

    getCardStyle() {
        const { position } = this.state;
        const rotate = position.x.interpolate({
            inputRange: [-SCREEN_WIDTH * 1.2, 0, SCREEN_WIDTH * 1.2],
            outputRange: ['-120deg', '0deg', '120deg']
        });

        return {
            ...position.getLayout(),
            transform: [{ rotate }]
        }
    }

    renderCards() {
        if (this.state.index >= this.props.data.length) {
            return this.props.renderNoMoreCards();
        }
        return this.props.data.map((item, i) => {


            if (i < this.state.index) { return null };
            if (i === this.state.index) {
                return (
                    <Animated.View
                        key={item.id}
                        style={[this.getCardStyle(), styles.cardStyle, { zIndex: 99 }]}
                        {...this.state.panResponder.panHandlers}
                    >
                        {this.props.renderCard(item)}
                    </Animated.View>
                )
            }


            return (
                <Animated.View key={item.id} style={[styles.cardStyle, { zIndex: 5 }]} >
                    {this.props.renderCard(item)}
                </Animated.View>
            )
        }).reverse();
    }

    render() {
        return (
            <View >
                {this.renderCards()}
            </View>
        )
    }
}


const styles = StyleSheet.create({
    cardStyle: {
        position: 'absolute',
        width: SCREEN_WIDTH
    }
})
export default Deck;