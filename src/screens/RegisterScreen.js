import React, { useState } from 'react'
import { Alert, View, Text, TextInput, Button, ImageBackground, StyleSheet, Image, Touchable, TouchableOpacity } from 'react-native';
import { signUpUser } from '../api/auth-api'


export default function RegisterScreen({ navigation }) {
    const [firstname, setFirstname] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState()

    const handleLogin = async () => {
        if (username === "") {
            Alert.alert('Thất bại !!!', 'Vui lòng nhập EMAIL');
        } else if (password === ""){
            Alert.alert('Thất bại !!!', 'Vui lòng nhập PASSWORD');
        }else if (password !== confirmpassword){
            Alert.alert('Thất bại !!!', 'CONFIRM PASSWORD phai giong voi PASSWORD');
        }else {

            setLoading(true)
            const response = await signUpUser({
                name: firstname,
                email: username,
                password: password,
            })
            if (response.error) {
                Alert.alert('Thất bại !!!', response.error);
            }else {
                navigation.navigate("LoginScreen")
            }
            setLoading(false)





        }

    };



    return (
        <ImageBackground source={require('../assets/background.png')} style={styles.background}>

            <View style={styles.cardIMG}>
                <Image
                    style={styles.tinyLogo}
                    source={require('../assets/naruto_background.jpg')}
                />
            </View>


            <View style={styles.registerContainer}>

            </View>


            <View style={styles.card}>
                <TextInput
                    style={styles.input}
                    placeholder="FIRST NAME"
                    onChangeText={text => setFirstname(text)}
                    value={firstname}
                />
                <TextInput
                    style={styles.input}
                    placeholder="EMAIL"
                    onChangeText={text => setUsername(text)}
                    value={username}
                />
                <TextInput
                    style={styles.input}
                    placeholder="PASSWORD"
                    onChangeText={text => setPassword(text)}
                    value={password}
                    secureTextEntry
                />

                <TextInput
                    style={styles.input}
                    placeholder="CONFIRM PASSWORD"
                    onChangeText={text => setConfirmPassword(text)}
                    value={confirmpassword}
                    secureTextEntry
                />

                <TouchableOpacity
                    style={{
                        backgroundColor: 'blue',
                        height: 45,
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 10,
                    }}
                    onPress={handleLogin}>
                    <Text style={{ color: 'white', fontSize: 18 }}>{ loading ? "Registration in progress":"Registration"}</Text>

                </TouchableOpacity>


                <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <Text>Already have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                        <Text>Sign in</Text>
                    </TouchableOpacity>
                </View>


            </View>




        </ImageBackground>
    );
}


const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        alignItems: "center",
    },
    tinyLogo: {
        width: '100%',
        height: '100%',
    },
    cardIMG: {
        borderRadius: 10,
        padding: 15,
        width: '80%',
        height: '40%',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 5,
        elevation: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },

    card: {
        borderRadius: 10,
        backgroundColor: '#fff',
        padding: 15,
        width: '80%',
        height: 'auto',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 5,
        elevation: 5,
        alignItems: 'center',
        justifyContent: 'center',

    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#0D48CF',
    },
    input: {
        height: 40,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 10,
        paddingHorizontal: 10,
        backgroundColor: 'white',
    },
    welcomeText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
    registerContainer: {
        alignItems: 'flex-end',
        width: '80%',
        marginRight: '1%',
    },
    registerText: {
        fontStyle: "italic",
        fontSize: 16,
        color: 'black',
        textAlign: 'right',
    },

});