<?php

require_once dirname(__DIR__, 3) . "/vendor/autoload.php";
require_once dirname(__DIR__, 3) . "/Classes/autoload.php";
require_once("/etc/apache2/JohnTheDev/Secrets.php");
require_once dirname(__DIR__, 3) . "/lib/xsrf.php";
require_once dirname(__DIR__, 3) . "/lib/jwt.php";

use JOHNTHEDEV\PersonalWebsite\{Message};

/**
 * API Message for my personal website project.
 * @package JOHNTHEDEV\PersonalWebsite\Message
 *
 * Description: This API will be used to access the methods of the message class
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
    //determine which HTTP method was used
    $method = $_SERVER["HTTP_X_HTTP_METHOD"] ?? $_SERVER["REQUEST_METHOD"];
    validateVerifyJwt();

    //sanitize input
    $messageId = filter_input(INPUT_GET, "messageId", FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);

    //check if messageId is empty and method is delete or put
    if(($method === "DELETE") && (empty($messageId) === true)) {
        throw(new InvalidArgumentException("messageId can not be empty when deleting of changing", 400));
    }
    if($method === "GET") {
        //set xsrf cookie
        setXsrfCookie();
        //get all messages
        $reply->data = Message::getAllMessages($pdo);
    } elseif($method === "POST") {
        //retrieves JSON package that was sent by the user and stores it in $requestContent using file_get_contents
        $requestContent = file_get_contents("php://input");

        //Decodes content and stores result in $requestObject
        $requestObject = json_decode($requestContent);

        if(isset($requestObject->messageContent) !== true) {
            throw(new \InvalidArgumentException("There is no content.", 400));
        }
        $messageId=generateUuidV4();

        $messageDate = null;
        //create new message and insert it into the database
        $message = new Message($messageId, $requestObject->messageContent, null);
        $message->insert($pdo);
        //update reply
        $reply->message = "A new Message has been created.";
        $reply->data = $messageId;

//            stopping point

    } elseif($method === "DELETE") {
        validateVerifyJwt();
        //retrieve the message to be deleted
        $message = Message::getMessageByMessageId($pdo, $messageId);

        //make sure it exists
        if($message === null) {
            throw (new RuntimeException("Message to be deleted does not exist", 404));
        }

        //delete message
        $message->delete($pdo);
        //update reply
        $reply->message = "Message deleted";

    } else {
        throw (new InvalidArgumentException("Invalid HTTP method request", 405));
    }
    //update the $reply->status $reply->message
} catch(\Exception | \TypeError $exception) {
    $reply->status = $exception->getCode();
    $reply->message = $exception->getMessage();
}
header("Content-type: application/json");
echo json_encode($reply);