<?php

require_once dirname(__DIR__, 3) . "/vendor/autoload.php";
require_once dirname(__DIR__, 3) . "/Classes/autoload.php";
require_once(dirname(__DIR__, 6) . "/apache/Secrets.php");
require_once dirname(__DIR__, 3) . "/lib/xsrf.php";
require_once dirname(__DIR__, 3) . "/lib/jwt.php";
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
    $secrets = new \Secrets("var/www/apache/secret/personalWebsite.ini");
    $pdo = $secrets->getPdoObject();

    //determine which HTTP method was used
    $method = $_SERVER["HTTP_X_HTTP_METHOD"] ?? $_SERVER["REQUEST_METHOD"];
//sanitize search parameters
    $firstPost = filter_input(INPUT_GET, "firstPost", FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);
    $secondPost = filter_input(INPUT_GET, "secondPost", FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);

    if($method === "GET") {
        //set XSRF cookie
        setXsrfCookie();

        //get a count of usefuls on resource by secondPost
        if ($secondPost !== null) {
            $useful = Relationships::getRelationshipsBySecondPost($pdo, $secondPost)->toArray();

            //return count
            if($useful !== null) {
                $reply->data = $useful;
            }

            //if search parameters aren't met scream at user
        } elseif(empty($secondPost) !== true) {
            throw (new InvalidArgumentException("incorrect search parameters", 404));
        }
    } elseif ($method === "POST" || $method === "PUT") {

        //decode the response from the front end
        $requestContent = file_get_contents("php://input");
        $requestObject = json_decode($requestContent);

        if(empty($requestObject->firstPost) === true) {
            throw (new \InvalidArgumentException("No User for this Relationships", 405));
        }

        if(empty($requestObject->secondPost) === true) {
            throw (new \InvalidArgumentException("No Resource for this Relationships", 405));
        }

        if($method === "POST") {
            //enforce that the end user has a XSRF token.
            verifyXsrf();

            // enforce the user is signed in
            if(empty($_SESSION["user"]) === true) {
                throw(new \InvalidArgumentException("you must be logged in to useful resources", 403));
            }

            validateJwtHeader();

            $useful = new Relationships($requestObject->secondPost, $_SESSION["user"]->getUserId());
            $useful->insert($pdo);
            $reply->message = "Resource has been Relationships'd";
        } elseif($method === "PUT") {
            //enforce the end user has a XSRF token.
            verifyXsrf();

            //enforce the end user has a JWT token
            validateJwtHeader();


            //get useful to delete by composite id
            $useful = Relationships::($pdo, $requestObject->secondPost, $requestObject->firstPost);
            if($useful === null) {
                throw (new RuntimeException("Relationships Does Not Exist", 404));
            }

            //USER NEEDS TO BE SIGNED IN
            if(empty($_SESSION["user"]) === true || $_SESSION["user"]->getUserId()->toString() !== $requestObject->firstPost) {
                throw(new \InvalidArgumentException("You must be signed in to delete your useful", 401));
            }

            //delete useful
            $useful->delete($pdo);

            //update message
            $reply->message = "Relationships has been deleted.";
        }
        // if any other HTTP request is sent throw an exception
    } else {
        throw new \InvalidArgumentException("invalid http request", 405);
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
© 2021 GitHub, Inc.