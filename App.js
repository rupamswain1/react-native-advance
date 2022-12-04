import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Ball from './src/components/Ball/Ball';
export default function App() {
  return (
    <View style={styles.container}>
      
      <Ball/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
});
