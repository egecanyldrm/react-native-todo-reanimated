import 'react-native-get-random-values';
import { Keyboard, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { v4 as uuidV4 } from 'uuid'
import Icon from 'react-native-vector-icons/AntDesign';
import { ITask } from '../types';
import TaskItem from './TaskItem';
import { ScrollView } from 'react-native-gesture-handler';

type Props = {}


const Tasks = (props: Props) => {

    // ** States 
    const [tasks, setTasks] = useState<ITask[]>([
        { id: uuidV4(), text: 'Write Something', isChecked: false, isNewOne: false },
        { id: uuidV4(), text: 'Use Typescript every project', isChecked: false, isNewOne: false },
    ]);

    // ** Handler Functions
    const handleAddTask = useCallback(() => {
        setTasks(prevTasks => [...prevTasks,
        { id: uuidV4(), text: '', isChecked: false, isNewOne: true }])
    }, []);

    const handleTextChange = useCallback((text: string, id: string): void => {
        setTasks(prevTasks => prevTasks.map(task => {
            if (task.id === id) return { ...task, text: text }
            else return task
        }))
    }, []);

    const handleRemoveTask = useCallback((id: string) => {
        setTasks(prevTasks => prevTasks.filter((task) => task.id !== id))
    }, []);

    const handleChangeCheckbox = useCallback((id: string) => {
        setTasks(prevTasks => prevTasks.map(task => {
            if (task.id === id) return { ...task, isChecked: !task.isChecked }
            else return task
        }))
    }, [])

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView style={styles.flex}>
                    {
                        tasks.map(task => {
                            return (
                                <TaskItem
                                    key={task.id}
                                    task={task}
                                    handleChangeCheckbox={handleChangeCheckbox}
                                    handleRemoveTask={handleRemoveTask}
                                    handleTextChange={handleTextChange}
                                />
                            )
                        })
                    }
                </ScrollView>
            </TouchableWithoutFeedback>

            <View style={styles.addButton}>
                <TouchableOpacity onPress={handleAddTask}>
                    <Text>
                        <Icon name="plus" size={25} color="#FFFFFF" />
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Tasks

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    flex: {
        flex: 1
    },
    addButton: {
        position: 'absolute',
        bottom: '10%',
        right: '5%',
        backgroundColor: 'rgb(0,106,216)',
        padding: 14,
        borderRadius: 50
    }
})