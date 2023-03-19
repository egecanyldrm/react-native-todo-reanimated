import { StyleSheet, TextInput, View } from 'react-native'
import React, { memo } from 'react'
import { ITask } from '../types'
import Checkbox from './Checkbox'
import Animated, { FadeIn, Layout, runOnJS, SlideInRight, SlideOutLeft, Transition, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { PanGestureHandler } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/EvilIcons'

type Props = {
    task: ITask,
    handleTextChange: (text: string, id: string) => void,
    handleRemoveTask: (id: string) => void,
    handleChangeCheckbox: (id: string) => void
}

const TaskItem = ({ task, handleTextChange, handleRemoveTask, handleChangeCheckbox }: Props) => {

    const translateX = useSharedValue<number>(0);
    const trashOpacity = useSharedValue<number>(0);
    const gestureHandler = useAnimatedGestureHandler({
        onActive: (event) => {
            if (event.translationX > 17) return
            if (event.translationX < -140) runOnJS(handleRemoveTask)(task.id);
            translateX.value = event.translationX
            trashOpacity.value = withTiming(parseInt((event.translationX * -0.02).toFixed(1)))
        },
        onEnd: (event) => {
            translateX.value = withTiming(0);
            trashOpacity.value = withTiming(0)
        }
    })
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{
                translateX: translateX.value
            }]
        };
    });
    const removeButtonStyle = useAnimatedStyle(() => {
        return {
            opacity: trashOpacity.value
        }
    })
    return (
        <View>
            <PanGestureHandler onGestureEvent={gestureHandler}>
                <Animated.View
                    entering={SlideInRight}
                    exiting={SlideOutLeft.duration(700)}
                    layout={Layout.springify()}
                    key={task.id}
                    style={[animatedStyle, styles.container]}
                >

                    <Checkbox id={task.id} status={task.isChecked} onPress={handleChangeCheckbox} />
                    <TextInput
                        multiline
                        textAlignVertical='center'
                        textAlign='left'
                        autoFocus={task.isNewOne ?? false}
                        style={[styles.input, { color: task.isChecked ? 'grey' : 'black' }]}
                        value={task.text}
                        onChangeText={(value) => handleTextChange(value, task.id)}
                    />
                </Animated.View>
            </PanGestureHandler>
            <Animated.View style={[removeButtonStyle, styles.removeButton]}><Icon name='trash' color='white' size={30} /></Animated.View>
        </View>
    )
}

export default memo(TaskItem)

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: 'flex-start',
    }, input: {
        paddingRight: 40,
        paddingTop: 0,
        width: '92%',
        backgroundColor: 'white',
        height: 30,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey'

    },
    removeButton: {
        backgroundColor: 'red',
        position: 'absolute',
        right: 0,
        zIndex: -10,
        height: 30,
        width: 130,
        justifyContent: 'center',
        alignItems: 'center'
    }
})