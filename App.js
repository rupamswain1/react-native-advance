import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image } from 'react-native';
import Ball from './src/components/Ball/Ball';
import Deck from './src/components/Deck/Deck';
import {Card,Button} from 'react-native-elements'
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

  const renderCards=(item)=>{
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

  return (
    <View style={styles.container}>
      <Deck
        data={data}
        renderCard={renderCards}
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
