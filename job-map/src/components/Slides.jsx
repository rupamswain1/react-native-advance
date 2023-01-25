import React from 'react'
import { View, Text, StyleSheet, Dimensions, ScrollView, Button } from 'react-native';


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Slide = ({ data, lastSlideAction }) => {
    return (
        data.map(({ text, color }, index) => {
            return (
                <View style={[{ backgroundColor: color }, styles.slideView]}>
                    <Text style={styles.slideText}>{text}</Text>
                    {
                        index === data.length - 1 ?
                            <Button
                                title="Continue"
                                onPress={lastSlideAction}
                                raised={true}
                                color="#1f6342"

                            />
                            : null
                    }
                </View>
            )
        })
    )
}

const Slides = ({ data, lastSlideAction }) => {
    return (
        <ScrollView
            horizontal={true}
            pagingEnabled={true}
        >
            <Slide data={data} lastSlideAction={lastSlideAction} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    slideView: {
        height: height,
        width: width,
        justifyContent: 'center',
        alignItems: 'center'
    },
    slideText: {
        color: "#fff",
        fontSize: 30
    }
})
export default Slides