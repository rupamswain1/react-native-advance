import { View, Text, StyleSheet, Animated, PanResponder, Dimensions } from 'react-native';

import React, { useState } from 'react';
const Deck = ({ data, renderCard }) => {
  const position = React.useRef(new Animated.ValueXY()).current;
  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: () => {},
    })
  ).current;
  const SCREEN_WIDTH=Dimensions.get('window').width;
 const getCartdStyle=()=>{
  const rotate=position.x.interpolate({
    inputRange:[-SCREEN_WIDTH*1.5,0,SCREEN_WIDTH*1.5],
    outputRange:['-120deg','0deg','120deg']
  })
  return {
    ...position.getLayout(),
    transform:[{rotate}]
  }
 }
  const renderCards = () => {
    return data.map((item, index) => {
      return (
        index==0?
        <Animated.View
          key={index}
          style={getCartdStyle()}
          {...panResponder.panHandlers}
        >
         { renderCard(item)}
        </Animated.View>
        :<>{renderCard(item)}</>
      );
    });
  };

  return <View>{renderCards()}</View>;
};

export default Deck;
