<?php

require_once dirname(__DIR__, 3) . "/vendor/autoload.php";
require_once dirname(__DIR__, 3) . "/Classes/autoload.php";
require_once("/etc/apache2/JohnTheDev/Secrets.php");
require_once dirname(__DIR__, 3) . "/lib/xsrf.php";

use JOHNTHEDEV\PersonalWebsite\{Relationships, Post};

/**
 * API Relationships for my personal website project.
 * @package JOHNTHEDEV\PersonalWebsite\Relationships
 *
 * Description: This API will be used to access the methods of the Relationships class
 *
 * @author John Johnson-Rodgers <John@johnthe.dev>
 * @version 1.0.0
 */
//verify the session, start if inactive
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
    $password = $secrets->getInsertPassword();

    //determine which HTTP method was used
    $method = $_SERVER["HTTP_X_HTTP_METHOD"] ?? $_SERVER["REQUEST_METHOD"];
//sanitize search parameters
    $firstPost = filter_input(INPUT_GET, "firstPost", FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);
    $secondPost = filter_input(INPUT_GET, "secondPost", FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);
    $postId = filter_input(INPUT_GET, "postId", FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);
    $postPassword = filter_input(INPUT_GET, "postPassword", FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);

    if($method === "GET") {
        //set XSRF cookie
        setXsrfCookie();

        //get relationships
        if (empty($secondPost) !== true && empty($firstPost) !== true) {
            $reply->data = Relationships::getRelationshipByRelationshipsFirstPostAndRelationshipsSecondPost($pdo, $firstPost, $secondPost);
        } elseif(empty($postId) !== true) {
            $reply->data = Relationships::getRelationshipByPostId($pdo, $postId);
        } else {
            throw (new InvalidArgumentException("incorrect search parameters", 404));
        }
    } elseif ($method === "POST") {
        //decode the response from the front end
        $requestContent = file_get_contents("php://input");
        $requestObject = json_decode($requestContent);

        //get password from secret creds and make sure correct password was supplied
        if(password_verify($requestObject->postPassword, $password) === false) {
            throw(new \InvalidArgumentException("Password is incorrect. ".$password, 401));
        }

        if(empty($requestObject->firstPost) === true) {
            throw (new \InvalidArgumentException("No first post for this Relationship", 405));
        }

        if(empty($requestObject->secondPost) === true) {
            throw (new \InvalidArgumentException("No second post for this Relationship", 405));
        }

        if(Post::getPostByPostId($pdo, $requestObject->firstPost) === null) {
            throw (new \InvalidArgumentException("The first post for this Relationship doesn't exist", 405));
        }

        if(Post::getPostByPostId($pdo, $requestObject->secondPost) === null) {
            throw (new \InvalidArgumentException("The second post for this Relationship doesn't exist", 405));
        }
            //enforce that the end user has a XSRF token.
            verifyXsrf();
            $relationship = Relationships::getRelationshipByRelationshipsFirstPostAndRelationshipsSecondPost($pdo, $requestObject->firstPost, $requestObject->secondPost);
            if($relationship===null){
                $useful = new Relationships($requestObject->firstPost, $requestObject->secondPost);
                $useful->insert($pdo);
                $reply->message = "Relationship created";
            } else {
                throw (new \InvalidArgumentException("This relationship already exists", 404));
            }
        } elseif($method === "DELETE") {
            //enforce the end user has a XSRF token.
            verifyXsrf();
        if(password_verify($postPassword, $password) === false) {
            throw(new \InvalidArgumentException("Password is incorrect.", 401));
        }
            //get relationship to delete by composite id
            $relationship = Relationships::getRelationshipByRelationshipsFirstPostAndRelationshipsSecondPost($pdo, $firstPost, $secondPost);
            if($relationship === null) {
                throw (new RuntimeException("Relationship Does Not Exist", 404));
            }

            //delete relationship
            $relationship->delete($pdo);

            //update message
            $reply->message = "Relationship has been deleted.";
        } else {
         // if any other HTTP request is sent throw an exception
        throw new \InvalidArgumentException("Invalid http request", 405);
    }
    //catch any exceptions that is thrown and update the reply status and message
} catch(\Exception | \TypeError $exception) {
    $reply->status = $exception->getCode();
    $reply->message = $exception->getMessage();
}
header("Content-type: application/json");
if($reply->data === null) {
    unset($reply->data);
}
// encode and return reply to front end caller
echo json_encode($reply);