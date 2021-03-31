<?php
require('config.php');

class DbConnect
{
    private static $serveur='mysql:host='.DBHOST;
    private static $port='port='.DBPORT;
    private static $bdd='dbname='.DBNAME;
    private static $user=DBUSER ;
    private static $mdp=DBPWD ;
    private static $pdo;
    private static $pdoGeneral=null;

    private function __construct(){
        try {
            DbConnect::$pdo = new PDO(DbConnect::$serveur.';'.DbConnect::$bdd.';'.DbConnect::$port, DbConnect::$user, DbConnect::$mdp);
            DbConnect::$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            DbConnect::$pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
            DbConnect::$pdo->query("SET CHARACTER SET utf8");
        } catch (Exception $e) {
            throw new Exception("Erreur lors de la connexion à la base de données.\n" . $e->getMessage());
        }
    }

    public function _destruct() {
        DbConnect::$pdo = null;
    }

    public static function getDbConnect() {
        if (DbConnect::$pdoGeneral==null) {
            DbConnect::$pdoGeneral = new DbConnect();
        }
        return DbConnect::$pdoGeneral;
    }
    
    public function getUserByEmail($email) {
		try {
            $req="SELECT * FROM USER WHERE email=:email";
            $prep = DbConnect::$pdo->prepare($req);
            $prep -> bindValue(':email', $email, PDO::PARAM_STR);
            $prep -> execute();
            $result = $prep->fetch(PDO::FETCH_ASSOC);
        } catch (Exception $e) {
            throw new Exception("Erreur lors de l'exécution de la fonction getUserByEmail().' \n".$e->getMessage());
        }
        return $result;
	}
}
