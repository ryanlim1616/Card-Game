import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Animated } from 'react-native';

import {WidthDimen, HeightDimen, fontDimen, GetWidth, GetHeight} from '../../UI/Dimensions'
import {MainColor, FontMainColor, FontSecondaryColor, FontThirdColor} from '../../UI/Color';

class Card extends Component {

    state = {
        clickable: false,
        id: 0,
    };

    constructor(props) {
        super(props);
        this.state.id = this.props.id;
        this.animatedValue = new Animated.Value(0);
        this.value = 0;
        this.animatedValue.addListener(({ value }) => { this.value = value });
    }

    componentDidMount() {
        this.props.onRef(this);
    }

    componentWillUnmount() {
        this.props.onRef(undefined);
    }

    //Update clickable state
    update_clickable = () => {
        this.setState(prevState => ({clickable: !prevState.clickable}));
    }

    frontCardStyle = () => {
        this.frontInterpolate = this.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['0deg', '180deg']
        });

        const frontAnimatedStyle = { transform: [ { rotateY: this.frontInterpolate }] };
        return frontAnimatedStyle;
    }

    backCardStyle = () => {
        this.backInterpolate = this.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['180deg', '360deg']
        });

        const backAnimatedStyle = { transform: [{ rotateY: this.backInterpolate }] };
        return backAnimatedStyle;
    }

    //Perform flip card animation
    flipCard = () => {
        if (this.value >= 90) {
            this.update_clickable();
            Animated.spring(this.animatedValue, {
                toValue: 0,
                friction: 8,
                tension: 10,
                useNativeDriver: true
            }).start();
        } else if (this.value < 90) {
            //call parent's function to update parent's state (Steps)
            this.props.update_steps();
            //call parent's function to check matching status
            this.props.onPress_select_card(this.state.id);
            this.update_clickable();
            Animated.spring(this.animatedValue, {
                toValue: 180,
                friction: 8,
                tension: 10,
                useNativeDriver: true
            }).start();
        }
    }

    
    render() {
        const {
            id,
            label
        } = this.props;

        return(
            <TouchableOpacity onPress={() => this.flipCard()} disabled={this.state.clickable}>
                <Animated.View style={[this.backCardStyle(), styles.container_front]}>
                    <Text style={styles.text_front}>{label}</Text>
                </Animated.View>
                <Animated.View style={[this.frontCardStyle(), styles.container_back, styles.flipCardBack]}>
                    <Text style={styles.text_back}>?</Text>
                </Animated.View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container_back: {
        width: 'auto', 
        height: HeightDimen(110), 
        aspectRatio: 1 / 1.2,
        backgroundColor: MainColor, 
        margin: WidthDimen(5),
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: fontDimen(5),
        borderColor: 'white',
        borderRadius: fontDimen(10),
        backfaceVisibility: 'hidden',
      
    },
    container_front: {
        width: 'auto', 
        height: HeightDimen(110), 
        aspectRatio: 1 / 1.2,
        backgroundColor: 'white', 
        margin: WidthDimen(5),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: fontDimen(10),
        backfaceVisibility: 'hidden',
      
    },
    text_back: {
        fontSize: fontDimen(30),
        color: FontThirdColor
    },
    text_front: {
        fontSize: fontDimen(30),
        color: FontMainColor
    },
    flipCardBack: {
        position: 'absolute',
    },
});


export default Card;