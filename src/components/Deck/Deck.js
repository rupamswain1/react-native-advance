import { View, Text, StyleSheet, Animated, PanResponder } from 'react-native';

import React, {useState} from 'react';
const Deck = ({data,renderCard}) => {

  const position=React.useRef(new Animated.ValueXY()).current;
  const panResponder=React.useRef(PanResponder.create({
    onStartShouldSetPanResponder:()=>true,
    onPanResponderMove:(event,gesture)=>{
      
      position.setValue({x:gesture.dx,y:gesture.dy})
    },
    onPanResponderRelease:()=>{}
  })).current;
 
  const renderCards=()=>{
    return data.map((item,index)=>{
      return(
        
        <Animated.View style={position.getLayout()} {...panResponder.panHandlers}>
        renderCard(item)
        </Animated.View>
)    })
  }

  return (
    <View>
      {
        renderCards()
      }
    </View>
  );
};

export default Deck;
