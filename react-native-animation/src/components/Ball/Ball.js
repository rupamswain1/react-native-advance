import {View,Text,StyleSheet, Animated} from 'react-native';
import {useEffect} from 'react';
const Ball=()=>{
    const position=new Animated.ValueXY(0,0);
    useEffect(() => {
      Animated.spring(position,{
        toValue:{x:100,y:500}
      }).start()
    }, [])
    return(
        <Animated.View style={position.getLayout()}>
            <View style={style.ballStyle}/>
        </Animated.View>
      
    )
}

const style=StyleSheet.create({
    ballStyle:{
        height:65,
        width:65,
        borderWidth:50,
        borderRadius:50,
        borderColor:'black',
    }
})

export default Ball;