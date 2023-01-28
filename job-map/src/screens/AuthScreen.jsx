import React, { useEffect } from 'react'
import { View, Text } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { authUser } from '../redux/reducer/authReducer';
const AuthScreen = () => {
    const { token, isAuthorized } = useSelector((state) => state.authReducer);
    const dispatch = useDispatch()
    console.log('testing use Selector', token, isAuthorized)
    useEffect(() => {
        dispatch(authUser())
    }, [])

    return (
        <View>
            <Text>Auth Screen</Text>
        </View>
    )
}

export default AuthScreen