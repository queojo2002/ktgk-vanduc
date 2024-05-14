//import liraries
import React, { Component, useEffect } from 'react';
import { View, ScrollView, Text, FlatList } from "react-native";
import firestore from '@react-native-firebase/firestore';
import { Appbar, TextInput, Button } from "react-native-paper";
import Todo from '../api/Todo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logoutUser } from '../api/auth-api';
import { useMyContextProvider } from '../store';
import { CommonActions } from '@react-navigation/native';


// create a component
const HomeScreen = ({ navigation}) => {

    const [controller, dispatch] = useMyContextProvider();
    const { userLogin, jobs } = controller;

    const [todos, setTodos] = React.useState([]);
    const [todo, setTodo] = React.useState('');
    const ref = firestore().collection('todos');
    
    async function addTodo() {
        const userEmail = userLogin ? userLogin.email : null;
        if (todo.trim() !== '' && userEmail) { // Validate todo is not empty and userLogin is not null
            await ref.add({
                title: todo,
                complete: false,
                email: userEmail, // Add user's email to todo
            });
            setTodo('');
        }
    }

    const [loading, setLoading] = React.useState(true);
    React.useEffect(() => {
        navigation.setOptions({
            headerShown: false
        });

        const userEmail = userLogin ? userLogin.email : null;
        if (userEmail) { // Load todos only if userLogin is not null
            const unsubscribe = ref.where('email', '==', userEmail).onSnapshot(querySnapshot => {
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

            return () => unsubscribe();
        } else {
            setLoading(false);
        }
    }, [userLogin]);

    if (loading) {
        return null;
    }

    const handleLogout = () => {
        logoutUser().then(async () => {
            await AsyncStorage.removeItem('user');
            dispatch({ type: 'LOGOUT' });
            navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: 'LoginScreen' }],
                })
              );
          });
    };

    return (
        <View style={{ flex: 1 }}>
            <Appbar>
                <Appbar.Content title={userLogin?.email} />
                <Appbar.Action icon="logout" onPress={() => handleLogout()} />
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
