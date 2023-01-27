import React, { useEffect } from 'react'
import { View, Text } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';

const AuthScreen = () => {
    const { token, isAuthorized } = useSelector((state) => state.authReducer);
    console.log('testing use Selector', token, isAuthorized)
    useEffect(() => {

    }, [])

    return (
        <View>
            <Text>Auth Screen</Text>
        </View>
    )
}

export default AuthScreen