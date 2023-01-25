import React, { useEffect } from 'react'
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
const ReviewScreen = ({ navigation }) => {
    useEffect(() => {
        navigation.setOptions({
            title: "Review Jobs",
            headerTitleAlign: 'center',
            headerRight: ({ navigate }) => {
                return <Button title="Settings"
                    onPress={() => navigation.navigate("Setting")}
                    containerStyle={{ backgroundColor: "#fff" }}
                    style={{ backgroundColor: "#fff" }}
                    color="rgba(0,122,255,1"
                />
            },
            headerStyle: {
                backgroundColor: '#dfdfdf'
            }
        })
    }, [])
    return (
        <View>
            <Text>Review Screen</Text>
        </View>
    )
}

export default ReviewScreen