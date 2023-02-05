import React, { useEffect } from 'react'
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import {useSelector} from 'react-redux';
import { Card, Button } from 'react-native-elements';
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
    const {likedJobs} =useSelector((state)=>state.jobReducer)   ;

    return (
        <View>
            {
                likedJobs.map(({jobName,
                    postedOn,
                    jobDescription,
                    salary,
                    longitude,
                    latitude,
                    url,})=>{
                        return(
                            <Card.Title>{jobName}</Card.Title>
        <Card.Divider />
        <MapView
          style={{ height: 200, width: SCREEN_WIDTH * 0.8 }}
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
                        )
                    })
            }
        </View>
    )
}

export default ReviewScreen