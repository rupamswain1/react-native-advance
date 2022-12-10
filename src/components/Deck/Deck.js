import {
  View,
  Text,
  StyleSheet,
  Animated,
  PanResponder,
  Dimensions,
} from 'react-native';

import React, { useState } from 'react';
const Deck = ({ data, renderCard, onSwipeRight, onSwipeLeft }) => {
  const [swipableCard,setSwipableCard]=useState(0);
  const SCREEN_WIDTH = Dimensions.get('window').width;
  const SWIPE_THRESHOLD=0.25*SCREEN_WIDTH;
  const position = React.useRef(new Animated.ValueXY()).current;
  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (event,gesture) => {
        if(gesture.dx>SWIPE_THRESHOLD){
          forcedSwipe('right')
        }
        else if(gesture.dx<-SWIPE_THRESHOLD){
          forcedSwipe('left')
        }
        else{
          resetCardPosition();
        }
        
      },
    })
  ).current;

  const forcedSwipe=(direction)=>{
    const x=direction==='right'?SCREEN_WIDTH:-SCREEN_WIDTH;
    Animated.spring(position,{
      toValue:{x,y:0},
      duration:250
    }).start(()=>onSwipeComplete(direction));
  }

  const onSwipeComplete=(direction)=>{
    const item=data[swipableCard]
    direction==='right'?onSwipeRight():onSwipeLeft();
  }

  const resetCardPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
    }).start();
  };
  const getCartdStyle = () => {
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ['-120deg', '0deg', '120deg'],
    });
    return {
      ...position.getLayout(),
      transform: [{ rotate }],
    };
  };
  const renderCards = () => {
    return data.map((item, index) => {
      return index == 0 ? (
        <Animated.View
          key={index}
          style={getCartdStyle()}
          {...panResponder.panHandlers}
        >
          {renderCard(item)}
        </Animated.View>
      ) : (
        <>{renderCard(item)}</>
      );
    });
  };

  return <View>{renderCards()}</View>;
};

export default Deck;
