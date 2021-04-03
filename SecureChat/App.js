import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, TextInput, TouchableOpacity, StatusBar } from 'react-native';

const LoginView = () => {
	const [emailValue, setEmailValue] = useState('');
	const [passwordValue, setPasswordValue] = useState('');
	
	const onPressConnexion = () => {
		fetch('https://securechat.pac.center/api/authentication.php', {
			method: 'POST',
			headers: {
				Accept: 'application/json', 
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: {emailValue},
				password: {passwordValue}
			})
		})
		.then((response) => response.json())
		.then((json) => {
			return json.success;
		})
		.catch((error) => {
			console.error(error);
		});
	};
	
	return (
		<View style={styles.container}>
			<StatusBar
				backgroundColor='#FFFFFF'
				barStyle='dark-content'
			/>
			<Image source={require('./logo.png')} />
			<View style={styles.form}>
				<TextInput
					style={[styles.input, { marginBottom: 15 }]}
					placeholder='E-mail'
					onChangeText={emailValue => setEmailValue(emailValue)}
					value={emailValue}
				/>
				<TextInput
					style={styles.input}
					placeholder='Mot de passe'
					secureTextEntry={true}
					onChangeText={passwordValue => setPasswordValue(passwordValue)}
					value={passwordValue}
				/>
				<TouchableOpacity style={styles.button} onPress={onPressConnexion}>
					<Text style={styles.buttonText}>Connexion</Text>
				</TouchableOpacity>
			</View>
			<Text style={styles.link}>Inscription</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#FFFFFF",
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	form: {
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	input: {
		width: '90%',
		backgroundColor: '#D9D9D9',
		borderRadius: 10,
		fontSize: 20,
		padding: 15,
	},
	button: {
		width: '90%',
		backgroundColor: '#284B63',
		borderRadius: 10,
		padding: 15,
		alignItems: 'center',
		marginTop: 30,
	},
	buttonText: {
		color: '#FFFFFF',
		fontSize: 20,
	},
	link: {
		color: '#353535',
		fontSize: 20,
		marginBottom: 20,
	}
});

export default LoginView;
