import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Animated } from 'react-native';

import { getDeck } from '../utils/helpers';

export default class Deck extends Component {
  state = {
    bounceValue: new Animated.Value(1)
  }

  onPress() {
    const { bounceValue } = this.state;

    Animated.sequence([
      Animated.timing(bounceValue, { duration: 200, toValue: 1.10 }),
      Animated.spring(bounceValue, { toValue: 1, friction: 4 })
    ]).start();

    setTimeout(() => {
      this.props.navigation.navigate(
        'FlashcardDeckView',
        {title: this.props.title}
      )
    }, 500);
  }

  render() {
    const { bounceValue } = this.state;
    return (
      <TouchableOpacity
        onPress={this.onPress.bind(this)}>
        <Animated.View style={[styles.containerStyle, { transform: [{ scale: bounceValue}] }]}>
          <Text style={styles.titleStyle}>{this.props.title}</Text>
          <Text style={styles.cardNumberDesc}>{`${this.props.cardNumber} card(s)`}</Text>
        </Animated.View>
      </TouchableOpacity>
    )
  }
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    height: 150,
    shadowRadius: 6,
    shadowOpacity: 1,
    shadowColor: 'rgba(0,0,0,24)',
    shadowOffset: {
      width: 0,
      height: 3
    }
  },
  titleStyle: {
    fontSize: 30
  },
  cardNumberDesc: {
    fontSize: 20,
    color: '#BBB'
  }
});
