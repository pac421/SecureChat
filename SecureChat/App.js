import * as React from 'react';
import { View, Image, Text, StyleSheet, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const LoginScreen = ({ navigation }) => {
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [error, setError] = React.useState('');
	
	const onPressLogin = () => {
		console.log('email : '+email);
		console.log('password : '+password);
		
		if(email == ''){
			setError('Veuillez saisir une adresse email.');
			return;
		}
		
		if(password == ''){
			setError('Veuillez saisir un mot de passe.');
			return;
		}
		
		let url = 'https://securechat.pac.center/api/login.php';
		console.log('url : ', url);
		
		let data = new FormData();
		data.append('email', email);
		data.append('password', password);
		console.log('data : ', data);
		
		fetch(url, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'multipart/form-data',
			},
			body:data
		})
		.then((response) => response.json())
		.then((json) => {
			console.log('response : ', json);
			
			if(json.success){
				navigation.navigate('Contact')
			} else {
				setError(json.error_msg);
			}
		})
		.catch((error) => {
			console.error(error);
		});
	};
	
	return (
		<View style={styles.page}>
			<StatusBar
				backgroundColor='#FFFFFF'
				barStyle='dark-content'
			/>
			<View style={styles.header}>
				<Image source={require('./logo.png')} style={styles.logo} />
				<Text 
					style={styles.title} 
					adjustsFontSizeToFit={true} 
					numberOfLines={1}>
						SecureChat
				</Text>
				<Text style={styles.label}>By PAC</Text>
			</View>
			<View style={styles.form}>
				<Text style={styles.error}>{error}</Text>
				<TextInput
					style={styles.input}
					placeholder='E-mail'
					onChangeText={email => setEmail(email)}
					value={email}
				/>
				<TextInput
					style={styles.input}
					placeholder='Mot de passe'
					secureTextEntry={true}
					onChangeText={password => setPassword(password)}
					value={password}
				/>
				<TouchableOpacity style={styles.button} onPress={onPressLogin}>
					<Text style={styles.buttonText}>Connexion</Text>
				</TouchableOpacity>
			</View>
			<Text 
				style={styles.link}
				onPress={() => navigation.navigate('Register')}
			>Inscription</Text>
		</View>
	);
};

const RegisterScreen = ({ navigation }) => {
	const [firstname, setFirstname] = React.useState('');
	const [lastname, setLastname] = React.useState('');
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [error, setError] = React.useState('');
	
	const onPressRegister = () => {
		console.log('firstname : '+firstname);
		console.log('lastname : '+lastname);
		console.log('email : '+email);
		console.log('password : '+password);
		
		if(firstname == ''){
			setError('Veuillez saisir un prénom.');
			return;
		}
		
		if(lastname == ''){
			setError('Veuillez saisir un nom.');
			return;
		}
		
		if(email == ''){
			setError('Veuillez saisir une adresse email.');
			return;
		}
		
		if(password == ''){
			setError('Veuillez saisir un mot de passe.');
			return;
		}
		
		let url = 'https://securechat.pac.center/api/register.php';
		console.log('url : ', url);
		
		let data = new FormData();
		data.append('firstname', firstname);
		data.append('lastname', lastname);
		data.append('email', email);
		data.append('password', password);
		console.log('data : ', data);
		
		fetch(url, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'multipart/form-data',
			},
			body:data
		})
		.then((response) => response.json())
		.then((json) => {
			console.log('response : ', json);
			
			if(json.success){
				navigation.navigate('Contact')
			} else {
				setError(json.error_msg);
			}
		})
		.catch((error) => {
			console.error(error);
		});
	};
	
	return (
		<View style={styles.page}>
			<StatusBar
				backgroundColor='#FFFFFF'
				barStyle='dark-content'
			/>
			<View style={styles.header}>
				<Image source={require('./logo.png')} style={styles.logo} />
				<Text style={styles.title}>SecureChat</Text>
				<Text style={styles.label}>By PAC</Text>
			</View>
			<View style={styles.form}>
				<Text style={styles.error}>{error}</Text>
				<TextInput
					style={styles.input}
					placeholder='Prénom'
					onChangeText={firstname => setFirstname(firstname)}
					value={firstname}
				/>
				<TextInput
					style={styles.input}
					placeholder='Nom'
					onChangeText={lastname => setLastname(lastname)}
					value={lastname}
				/>
				<TextInput
					style={styles.input}
					placeholder='E-mail'
					onChangeText={email => setEmail(email)}
					value={email}
				/>
				<TextInput
					style={styles.input}
					placeholder='Mot de passe'
					secureTextEntry={true}
					onChangeText={password => setPassword(password)}
					value={password}
				/>
				<TouchableOpacity style={styles.button} onPress={onPressRegister}>
					<Text style={styles.buttonText}>Inscription</Text>
				</TouchableOpacity>
			</View>
			<Text 
				style={styles.link}
				onPress={() => navigation.navigate('Login')}
			>Connexion</Text>
		</View>
	);
};

const ContactScreen = ({ navigation }) => {
	return (
		<Text>
			Hello World !
		</Text>
	);
};

const styles = StyleSheet.create({
	page: {
		backgroundColor: '#FFFFFF',
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	header: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		width: '90%',
	},
	logo: {
		marginTop: 20,
		height: 200,
		width: 200,
	},
	title: {
		fontFamily: 'audiowide',
		fontSize: 50,
		color: '#353535'
	},
	label: {
		color: '#D9D9D9',
		fontSize: 15
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
		marginBottom: 15,
	},
	button: {
		width: '90%',
		backgroundColor: '#284B63',
		borderRadius: 10,
		padding: 15,
		alignItems: 'center',
		marginTop: 15,
	},
	buttonText: {
		color: '#FFFFFF',
		fontSize: 20,
	},
	link: {
		color: '#353535',
		fontSize: 20,
		marginBottom: 20,
	},
	error: {
		width: '90%',
		color: '#BB4430',
		marginBottom: 20,
	}
});

const Stack = createStackNavigator();

const App = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName='Login' screenOptions={{headerShown: false}}>
				<Stack.Screen name='Login' component={LoginScreen} />
				<Stack.Screen name='Register' component={RegisterScreen} />
				<Stack.Screen name='Contact' component={ContactScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default App;
