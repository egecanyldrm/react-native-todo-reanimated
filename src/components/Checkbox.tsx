import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/AntDesign';

type Props = {
    status: boolean,
    onPress: (id: string) => void,
    id: string
}

const Checkbox = (props: Props) => {
    return (
        <TouchableOpacity
            onPress={() => props.onPress(props.id)}
            style={[styles.container, props.status ? styles.active : styles.deactive]}
        >
            {props.status ? <Icon name='check' size={20} color='white' /> : null}
        </TouchableOpacity>
    )
}

export default Checkbox

const styles = StyleSheet.create({
    container: {
        width: 20,
        height: 20,
        marginRight: 10,
        borderRadius: 5,
    },
    active: {
        backgroundColor: 'rgb(0,106,216)'
    },
    deactive: {
        borderWidth: 2,
        borderColor: 'lightgrey'
    }
})