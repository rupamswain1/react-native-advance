import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image } from 'react-native';
import Ball from './src/components/Ball/Ball';
import Deck from './src/components/Deck/Deck';

export default function App() {
  const data=[
    {id:1,text:'Card #1',uri:'https://source.unsplash.com/featured/300x201'},
    {id:2,text:'Card #2',uri:'https://source.unsplash.com/featured/300x201'},
    {id:3,text:'Card #3',uri:'https://source.unsplash.com/featured/300x201'},
    {id:4,text:'Card #4',uri:'https://source.unsplash.com/featured/300x201'},
    {id:5,text:'Card #5',uri:'https://source.unsplash.com/featured/300x201'},
    {id:6,text:'Card #6',uri:'https://source.unsplash.com/featured/300x201'},
    {id:7,text:'Card #7',uri:'https://source.unsplash.com/featured/300x201'},
    {id:8,text:'Card #8',uri:'https://source.unsplash.com/featured/300x201'},
  ]

  console.log('app is rendering')

  return (
    <View style={styles.container}>
      <Deck
        data={data}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
});
