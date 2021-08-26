<?php

require_once dirname(__DIR__, 3) . "/vendor/autoload.php";
require_once dirname(__DIR__, 3) . "/Classes/autoload.php";
require_once("/etc/apache2/JohnTheDev/Secrets.php");
require_once dirname(__DIR__, 3) . "/lib/xsrf.php";
require_once dirname(__DIR__, 3) . "/lib/jwt.php";
require_once dirname(__DIR__, 3) . "/lib/uuid.php";

/**
 * api for signing into my pwp project.
 * @package JOHNTHEDEV\PersonalWebsite\SignIn
 *
 * @author John Johnson-Rodgers <John@johnthe.dev>
 */

if(session_status() !== PHP_SESSION_ACTIVE) {
    session_start();
}

//prepare an empty reply
$reply = new stdClass();
$reply->status = 200;
$reply->data = null;

try {

    //grab the mySQL connection
    $secrets = new \Secrets("var/www/apache/secret/JohnTheDev.ini");
    $pdo = $secrets->getPdoObject();
    //determine which HTTP method is being used.
    $method = array_key_exists("HTTP_X_HTTP_METHOD", $_SERVER) ? $_SERVER["HTTP_X_HTTP_METHOD"] : $_SERVER["REQUEST_METHOD"];
    if(empty($SESSION["loginAttempts"])){
        $SESSION["loginAttempts"] = 1;
    }
    if($SESSION["loginAttempts"]>5){
        throw(new \InvalidArgumentException("Too many attempts, you have been blocked.", 429));
    }
    //if method is POST handle sign-in
    if($method === "POST") {

        if(empty($SESSION["loginAttempts"])){
            $SESSION["loginAttempts"] = 1;
        }
        //make sure the XSRF Token is valid
        verifyXsrf();
        //process the request content and decode the json object into a php object
        $requestContent = file_get_contents("php://input");
        $requestObject = json_decode($requestContent);

        //check to make sure the password is not empty.

        if(empty($requestObject->password) === true) {
            throw(new \InvalidArgumentException("Please enter a password", 401));
        }

        //get Current browsers IP address
        if(!empty($_SERVER['HTTP_CLIENT_IP'])) {
            $currentIpAddress = $_SERVER['HTTP_CLIENT_IP'];
        } //whether ip is from proxy
        elseif(!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            $currentIpAddress = $_SERVER['HTTP_X_FORWARDED_FOR'];
        } //whether ip is from remote address
        else {
            $currentIpAddress = $_SERVER['REMOTE_ADDR'];
        };

        //get password from secret creds and make sure correct password was supplied
        $password = $secrets->getInsertPassword();
        if(password_verify($requestObject->password, $password) === false) {
            $_SESSION["failedAttempt"] = $_SESSION["failedAttempt"]+1;
            throw(new \InvalidArgumentException("Password is incorrect.", 401));
        }

        //create authentication payload
        $authObject = (object)[
            "ipAddress" => $currentIpAddress
        ];

        //create JWT TOKEN
        setJwtAndAuthHeader("auth", $authObject);

        $reply->message = "Sign in was successful.";
    } else {
        throw(new \InvalidArgumentException("Invalid HTTP method request", 405));
    }
    //catch exceptions
} catch(\Exception | \TypeError | \InvalidArgumentException $exception) {
    $reply->message = $exception->getMessage();
    $reply->status = $exception->getCode();
}
header("Content-type: application/json");

echo json_encode($reply);