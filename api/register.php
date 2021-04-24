<?php
require_once('pdo.php');
session_start();
$pdo = DbConnect::getDbConnect();

header('Content-Type: application/json');

$error_msg = null;

$firstname = isset($_POST['firstname']) ? $_POST['firstname'] : null;
$lastname = isset($_POST['lastname']) ? $_POST['lastname'] : null;
$email = isset($_POST['email']) ? $_POST['email'] : null;
$password = isset($_POST['password']) ? $_POST['password'] : null;

if($firstname == null || $lastname == null || $email == null || $password == null)
	$error_msg = 'Une erreur est survenue, veuillez contacter votre administrateur.';
else {
	
	if (strlen($firstname) < 3) {
		$error_msg = 'Le prénom est trop court.';
	} elseif (strlen($firstname) > 32) {
		$error_msg = 'Le prénom est trop long.';
	} elseif (preg_match('/[^A-Za-z- ]/', $firstname)) {
		$error_msg = 'Le prénom ne doit contenir que des lettres, des espaces et certains caractères spéciaux.';
	} elseif (strlen($lastname) < 3) {
		$error_msg = 'Le nom est trop court.';
	} elseif (strlen($lastname) > 32) {
		$error_msg = 'Le nom est trop long.';
	} elseif (preg_match('/[^A-Za-z- ]/', $lastname)) {
		$error_msg = 'Le nom ne doit contenir que des lettres, des espaces et certains caractères spéciaux.';
	} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
		$error_msg = 'L\'adresse email est invalide.';
	} elseif (strlen($password) < 8) {
		$error_msg = 'Le mot de passe est trop court (minimum 8 caractères).';
	} elseif (strlen($password) > 255) {
		$error_msg = 'Le mot de passe est trop long (maximum 255 caractères).';
	} elseif (!preg_match('/[a-z]/', $password)) {
		$error_msg = 'Le mot de passe doit contenir au moins une lettre minuscule.';
	} elseif (!preg_match('/[A-Z]/', $password)) {
		$error_msg = 'Le mot de passe doit contenir au moins une lettre majuscule.';
	} elseif (!preg_match('/[0-9]/', $password)) {
		$error_msg = 'Le mot de passe doit contenir au moins un chiffre.';
	} else {
		$user = $pdo->getUserByEmail($email);
	
		if(!empty($user))
			$error_msg = 'Cette adresse email est déjà utilisé.';
		else {
			$has_succeed = $pdo->addUser($firstname, $lastname, $email, $password);
		
			if(!$has_succeed)
				$error_msg = 'Une erreur est survenue, veuillez contacter votre administrateur.';
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

