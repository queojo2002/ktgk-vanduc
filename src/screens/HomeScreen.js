//import liraries
import React, { Component, useEffect } from 'react';
import { View, ScrollView, Text, FlatList } from "react-native";
import firestore from '@react-native-firebase/firestore';
import { Appbar, TextInput, Button } from "react-native-paper";
import Todo from '../api/Todo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logoutUser } from '../api/auth-api';


// create a component
const HomeScreen = ({ navigation, route }) => {



    const [todos, setTodos] = React.useState([]);
    const [todo, setTodo] = React.useState('');
    const ref = firestore().collection('todos');
    async function addTodo() {
        await ref.add({
            title: todo,
            complete: false,
        });
        setTodo('');
    }
    const [loading, setLoading] = React.useState(true);
    React.useEffect(() => {
        
        navigation.setOptions({
            headerShown: false
        })

        return ref.onSnapshot(querySnapshot => {
            const list = [];
            querySnapshot.forEach(doc => {
                const { title, complete } = doc.data();
                list.push({
                    id: doc.id,
                    title,
                    complete,
                });
            });

            setTodos(list);

            if (loading) {
                setLoading(false);
            }
        });
    }, []);
    if (loading) {
        return null;
    }

  
    return (
        <View style={{ flex: 1 }}>
            <Appbar>
                <Appbar.Content title={route.params.name} />
                <Appbar.Action icon="logout" onPress={() => logoutUser()} />
            </Appbar>

            <FlatList style={{ flex: 1 }}
                data={todos}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <Todo {...item} />}
            />
            <TextInput label={'New Todo'} value={todo} onChangeText={(text) => setTodo(text)} />
            <Button onPress={addTodo}>Add TODO</Button>
        </View>
    )

};

export default HomeScreen;
