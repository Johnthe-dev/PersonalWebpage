<?php

require_once dirname(__DIR__, 3) . "/vendor/autoload.php";
require_once dirname(__DIR__, 3) . "/Classes/autoload.php";
require_once(dirname(__DIR__, 6) . "/apache/Secrets.php");
require_once dirname(__DIR__, 3) . "/lib/xsrf.php";
require_once dirname(__DIR__, 3) . "/lib/uuid.php";

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
    $secrets = new \Secrets("var/www/apache/secret/johnTheDev.ini");
    $pdo = $secrets->getPdoObject();

    //determine which HTTP method was used
    $method = $_SERVER["HTTP_X_HTTP_METHOD"] ?? $_SERVER["REQUEST_METHOD"];
//sanitize search parameters
    $firstPost = filter_input(INPUT_GET, "firstPost", FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);
    $secondPost = filter_input(INPUT_GET, "secondPost", FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);
    $relationshipsId = filter_input(INPUT_GET, "relationshipsId", FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);

    if($method === "GET") {
        //set XSRF cookie
        setXsrfCookie();

        //get relationships
        if (empty($secondPost) !== true && empty($firstPost) !== true) {
            $reply->data = Relationships::getRelationshipByRelationshipsFirstPostAndRelationshipsSecondPost($pdo, $firstPost, $secondPost);
        } elseif(empty($relationshipsId) !== true) {
            $reply->data = Relationships::getRelationshipByRelationshipsId($pdo, $relationshipsId)->toArray();
        } else {
            throw (new InvalidArgumentException("incorrect search parameters", 404));
        }
    } elseif ($method === "POST" || $method === "PUT") {
        //decode the response from the front end
        $requestContent = file_get_contents("php://input");
        $requestObject = json_decode($requestContent);

        //get password from secret creds and make sure correct password was supplied
        $password = $secrets->getInsertPassword();
        if(password_verify($requestObject->postPassword, $password) === false) {
            throw(new \InvalidArgumentException("Password is incorrect.", 401));
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

        if($method === "POST") {
            //enforce that the end user has a XSRF token.
            verifyXsrf();

            $useful = new Relationships($requestObject->firstPost, $requestObject->secondPost);
            $useful->insert($pdo);
            $reply->message = "Relationship created";
        } elseif($method === "PUT") {
            //enforce the end user has a XSRF token.
            verifyXsrf();

            //get relationship to delete by composite id
            $relationship = Relationships::getRelationshipByRelationshipsFirstPostAndRelationshipsSecondPost($pdo, $requestObject->firstPost, $requestObject->secondPost);
            if($relationship === null) {
                throw (new RuntimeException("Relationship Does Not Exist", 404));
            }

            //delete relationship
            $relationship->delete($pdo);

            //update message
            $reply->message = "Relationship has been deleted.";
        }
        // if any other HTTP request is sent throw an exception
    } else {
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