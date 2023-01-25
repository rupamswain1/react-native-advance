import React from 'react'
import { View, Text } from 'react-native';
import Slides from '../components/Slides';
const Welcome = ({ navigation }) => {
    const slideData = [
        {
            text: "Slide1", color: "#fc6b03"
        },
        {
            text: "Slide2", color: "#1c86b8"
        },
        {
            text: "Slide3", color: "#b81c38"
        }
    ]
    const lastSlideAction = () => {
        navigation.navigate("auth")
    }
    return (
        <View>
            <Slides data={slideData} lastSlideAction={lastSlideAction} />
        </View>
    )
}

export default Welcome