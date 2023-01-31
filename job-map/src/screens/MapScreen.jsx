import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import MapView from 'react-native-maps';
import { searchJobs } from '../redux/reducer/jobReducer';
const MapScreen = () => {
    const [region, setRegion] = useState({
        longitude: -122,
        latitude: 37,
        longitudeDelta: 0.04,
        latitudeDelta: 0.09
    })
    const [mapLoaded, setMapLoaded] = useState(false)
    useEffect(() => {
        setMapLoaded(true)
    }, []);
    const dispatch = useDispatch();
    const updateRegion = (location) => {
        console.log(location)
        setRegion(location)
    }
    return (
        <View style={StyleSheet.container}>
            <Text>Map Screen</Text>
            {
                mapLoaded ?
                    <>
                        <MapView style={styles.mapStyle}
                            region={region}
                            onRegionChangeComplete={updateRegion}
                        />
                        <Button
                            title="Set Search Location"
                            onPress={() => dispatch(searchJobs(region))}
                        />
                    </>
                    :

                    <ActivityIndicator size="large" />
            }

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%"
    },
    mapStyle: {
        width: "100%",
        height: "90%"
    }
})

export default MapScreen 