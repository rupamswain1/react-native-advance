import {
  View,
  Text,
  StyleSheet,
  Animated,
  PanResponder,
  Image,
  Dimensions,
} from 'react-native';
import {Card,Button} from 'react-native-elements'

import React, { useState,useEffect,memo } from 'react';
const Deck = ({ data, onSwipeRight, onSwipeLeft }) => {

  const [swipableCard,setSwipableCard]=useState(0);
  console.log('***',swipableCard)
  useEffect(()=>{
    console.log('**update**')
    return ()=>{
      console.log('reset**')
    }
  },[])
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
    console.log('swipable card before swap',swipableCard)
    const item=data[swipableCard]
    direction==='right'?onSwipeRight?onSwipeRight():()=>{}:onSwipeLeft?onSwipeLeft():()=>{};
    position.setValue({x:0,y:0});
    const update=swipableCard+1
   
    setSwipableCard(prevValue=>prevValue+1)
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
  const CardComponent=(item)=>{
    return(
     <Card
     >
      <Card.Title>{item.text}</Card.Title>
      <Card.Divider/>
      <Image source={{uri:item.uri}} style={{width: 350, height: 200}}/>
      <Text style={{marginBottom:10}}>
        This is a customizable card
      </Text>
      <Button
        icon={{name:'code'}}
        backgroundColor="#03A9F4"
        title="View Now!"
      />
     
     </Card>
    )
  }
  const renderCards = () => {
    return data.map((item, index) => {
      if (index<swipableCard){ return null };
      console.log(swipableCard)
      return index === swipableCard ? (
        <Animated.View
          key={index}
          style={getCartdStyle()}
          {...panResponder.panHandlers}
        >
          {CardComponent(item)}
        </Animated.View>
      ) : (
        <>{CardComponent(item)}</>
      );
    });
  };

  return( <View>{renderCards()}</View>);
};

export default memo(Deck);
