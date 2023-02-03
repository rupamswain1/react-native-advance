import {
  View,
  Text,
  StyleSheet,
  Animated,
  PanResponder,
  Image,
  Dimensions,
  LayoutAnimation,
  UIManager,
  Alert,
  Linking,
} from 'react-native';
import { Card, Button } from 'react-native-elements';

import React, { useState, useEffect, memo } from 'react';
import MapView from 'react-native-maps';

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const Deck = ({ data, onSwipeRight, onSwipeLeft }) => {
  const [swipableCard, setSwipableCard] = useState(0);
  useEffect(() => {
    setSwipableCard(0);
  }, [data]);
  const SCREEN_WIDTH = Dimensions.get('window').width;
  const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
  const position = React.useRef(new Animated.ValueXY()).current;
  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (event, gesture) => {
        console.log(event);
        if (gesture.dx > SWIPE_THRESHOLD) {
          forcedSwipe('right');
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          forcedSwipe('left');
        } else {
          resetCardPosition();
        }
      },
    })
  ).current;

  const forcedSwipe = (direction) => {
    const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;
    Animated.spring(position, {
      toValue: { x, y: 0 },
      duration: 250,
    }).start(() => onSwipeComplete(direction));
  };

  const onSwipeComplete = (direction) => {
    const item = data[swipableCard];
    LayoutAnimation.spring();
    direction === 'right'
      ? onSwipeRight
        ? onSwipeRight(data[swipableCard])
        : () => {}
      : onSwipeLeft
      ? onSwipeLeft()
      : () => {};
    position.setValue({ x: 0, y: 0 });
    setSwipableCard((prevValue) => prevValue + 1);
  };

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
  const handleApply = async (url) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  };
  const CardComponent = ({
    jobName,
    postedOn,
    jobDescription,
    salary,
    longitude,
    latitude,
    url,
  }) => {
    const region = {
      latitude,
      longitude,
      longitudeDelta: 0.04,
      latitudeDelta: 0.09,
    };
    return (
      <Card>
        <Card.Title>{jobName}</Card.Title>
        <Card.Divider />
        <MapView
          style={{ height: 250, width: SCREEN_WIDTH * 0.8 }}
          region={region}
          scrollEnabled={false}
        />
        <View style={{}}>
          <View style={styles.salaryAndPostView}>
            <Text>{salary}</Text>
            <Text>{postedOn}</Text>
          </View>
          <View>
            <Text>{jobDescription}</Text>
          </View>
        </View>
        <Button
          backgroundColor="#03A9F4"
          title="Apply Now!"
          onPress={() => handleApply(url)}
        />
      </Card>
    );
  };
  const noMoreCard = () => {
    return (
      <Card>
        <Card.Title>OOPs!! You have run out of cards</Card.Title>
        <Card.Divider />
        <Text>
          There are no cards available on your deck, click on below button to
          load more cards
        </Text>
        <Button backgroundColor="#03A9F4" title="Load More" />
      </Card>
    );
  };
  const renderCards = () => {
    if (swipableCard >= data.length) {
      return noMoreCard();
    }
    return data
      .map((item, index) => {
        if (index < swipableCard) {
          return null;
        }

        return index === swipableCard ? (
          <Animated.View
            key={index}
            style={[getCartdStyle(), styles.deckStyle]}
            {...panResponder.panHandlers}
          >
            {CardComponent(item)}
          </Animated.View>
        ) : (
          <Animated.View
            style={[styles.deckStyle, { top: 10 * (index - swipableCard) }]}
            key={index}
          >
            {CardComponent(item)}
          </Animated.View>
        );
      })
      .reverse();
  };

  return <View>{renderCards()}</View>;
};

const styles = StyleSheet.create({
  deckStyle: {
    marginLeft: 5,
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'black',
  },
  salaryAndPostView: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default memo(Deck);
