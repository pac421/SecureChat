<?php
require_once('pdo.php');
session_start();
$pdo = DbConnect::getDbConnect();

header('Content-Type: application/json');

$error_msg = null;

$email = isset($_GET['email']) ? $_GET['email'] : null;
$password = isset($_GET['password']) ? $_GET['password'] : null;

if($email == null || $password == null)
	$error_msg = 'Une erreur est survenue, veuillez contacter votre administrateur.';
else {
	if($email == '')
		$error_msg = 'Veuillez entrez une adresse email.';
		
	if($password == '')
		$error_msg = 'Veuillez entrez un mot de passe.';
		
	if($email != '' && $password != ''){
		$user = $pdo->getUserByEmail($email);
	
		if(empty($user))
			$error_msg = 'Cette adresse email ne correspond à aucun utilisateur.';
		else {
			$hashed_password = $user['password'];
			$is_password_valid = password_verify($password, $hashed_password);

			if(!$is_password_valid)
				$error_msg = 'Le mot de passe est incorrecte.';
		}
	}
}

$output = [
	'success' => $error_msg == null,
	'error_msg' => $error_msg,
	'url_params' => [
		'email' => $email,
		'password' => $password
	]
];

echo json_encode($output, JSON_PRETTY_PRINT);
