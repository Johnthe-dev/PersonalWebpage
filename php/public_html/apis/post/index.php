<?php

require_once dirname(__DIR__, 3) . "/vendor/autoload.php";
require_once dirname(__DIR__, 3) . "/Classes/autoload.php";
require_once(dirname(__DIR__, 6) . "/apache/Secrets.php");
require_once dirname(__DIR__, 3) . "/lib/xsrf.php";
require_once dirname(__DIR__, 3) . "/lib/jwt.php";
require_once dirname(__DIR__, 3) . "/lib/uuid.php";

use JOHNTHEDEV\PersonalWebsite\{Post};

/**
 * API Resource for my personal website project.
 * @package JOHNTHEDEV\PersonalWebsite\Post
 *
 * Description: This API will be used to access the methods of the post class
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

    //sanitize input
    $postId = filter_input(INPUT_GET, "postId", FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);
    $postOrigin = filter_input(INPUT_GET, "postOrigin", FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);
    $postSearchTerms = filter_input(INPUT_GET, "postSearchTerms", FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);
    $postPassword = filter_input(INPUT_GET, "postPassword", FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);

    //check if resourceId is empty and method is delete or put
    if(($method === "DELETE" || $method === "PUT") && (empty($postId) === true)) {
        throw(new InvalidArgumentException("postId can not be empty when deleting of changing", 400));
    }

    if($method === "GET") {
        //set xsrf cookie
        setXsrfCookie();

        if(isset($postId) === true) {
            //get post by postId
            $reply->data = Post::getPostByPostId($pdo, $postId);
        } else if(isset($postOrigin) === true) {
            //get post by originated post
            $reply->data = Post::getPostByOriginatedPost($pdo, $postOrigin)->toArray();
        } else if(isset($resourceDistrict) === true && isset($resourceType) === true) {
            //get post by search terms
            $reply->data = Post::getPostByPostContentAndTitle($pdo, $postSearchTerms)->toArray();
        } else {
            //get all posts
            $reply->data = Post::getAllPosts($pdo)->toArray();
        }

    } elseif($method === "POST" || $method === "PUT") {
        //enforce xsrf token
        verifyXsrf();

        //retrieves JSON package that was sent by the user and stores it in $requestContent using file_get_contents
        $requestContent = file_get_contents("php://input");

        //Decodes content and stores result in $requestObject
        $requestObject = json_decode($requestContent);

        if(empty($requestObject->postPassword) === true) {
            throw(new \InvalidArgumentException("The Password field is empty.", 400));
        }

        //get password from secret creds and make sure correct password was supplied
        $password = $secrets->getInsertPassword();
        if(password_verify($requestObject->postPassword, $password) === false) {
            throw(new \InvalidArgumentException("Password is incorrect.", 401));
        }

        if(isset($requestObject->postTitle) !== true) {
            throw(new \InvalidArgumentException("There is no title.", 400));
        }

        if($method === "POST") {
            $exists = true;
            while ($exists) {
                $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
                $randstring = '';
                for ($i = 0; $i < 4; $i++) {
                    $randstring = $characters[rand(0, strlen($characters))];
                }
                $postId = $requestObject->postId.$randstring;
                $post = Post::getPostByPostId($pdo, $postId);
                if($post === null){
                    $exists = false;
                }
            }
            $postDate = null;
            //create new post and insert it into the database
            $resource = new Post($postId, $requestObject->postContent, $postDate, $requestObject->postTitle);
            $resource->insert($pdo);
            //update reply
            $reply->message = "A new Post has been created.";

//            stopping point
        } elseif($method === "PUT") {

            //makes sure required fields are available
            if(empty($postId) === true) {
                throw(new \InvalidArgumentException("The Resource Id field is empty.", 400));
            }

            //retrieve the resource to update
            $resource = Resource::getResourceByResourceId($pdo, $postId);

            //make sure it exists
            if($resource === null) {
                throw (new RuntimeException("Resource to be edited does not exist", 404));
            }
            if(isset($requestObject->resourceChangedDate) !== true) {
                $resourceChangedDate = $resource->getResourceChangedDate();
            } else {
                $resourceChangedDate = $requestObject->resourceChangedDate;
            }
            if(isset($requestObject->resourceChangeType) !== true) {
                $resourceChangeType = $resource->getResourceChangeType();
            } else {
                $resourceChangeType = $requestObject->resourceChangeType;
            }
            if(isset($requestObject->resourceCountyName) !== true) {
                $resourceCountyName = $resource->getResourceCountyName();
            } else {
                $resourceCountyName = $requestObject->resourceCountyName;
            }
            if(isset($requestObject->resourceCreatedDate) !== true) {
                $resourceCreatedDate = $resource->getResourceCreatedDate();
            } else {
                $resourceCreatedDate = $requestObject->resourceCreatedDate;
            }
            if(isset($requestObject->resourceDistrict) !== true) {
                $resourceDistrict = $resource->getResourceDistrict();
            } else {
                $resourceDistrict = $requestObject->resourceDistrict;
            }

            if(isset($requestObject->resourceEmail) !== true) {
                $resourceEmail = $resource->getResourceEmail();
            } else {
                $resourceEmail = $requestObject->resourceEmail;
            }
            if(isset($requestObject->resourceFax) !== true) {
                $resourceFax = $resource->getResourceFax();
            } else {
                $resourceFax = $requestObject->resourceFax;
            }
            if(isset($requestObject->resourceMailingAddress) !== true) {
                $resourceMailingAddress = $resource->getResourceMailingAddress();
            } else {
                $resourceMailingAddress = $requestObject->resourceMailingAddress;
            }
            if(isset($requestObject->resourcePriorVersion) !== true) {
                $resourcePriorVersion = $resource->getResourcePriorVersion();
            } else {
                $resourcePriorVersion = $requestObject->resourcePriorVersion;
            }
            if(isset($requestObject->resourceStreetAddress) !== true) {
                $resourceStreetAddress = $resource->getResourceStreetAddress();
            } else {
                $resourceStreetAddress = $requestObject->resourceStreetAddress;
            }
            if(isset($requestObject->resourceTelephone) !== true) {
                $resourceTelephone = $resource->getResourceTelephone();
            } else {
                $resourceTelephone = $requestObject->resourceTelephone;
            }
            if(isset($requestObject->resourceTitle) !== true) {
                $resourceTitle = $resource->getResourceTitle();
            } else {
                $resourceTitle = $requestObject->resourceTitle;
            }
            if(isset($requestObject->resourceType) !== true) {
                $resourceType = $resource->getResourceType();
            } else {
                $resourceType = $requestObject->resourceType;
            }
            if(isset($requestObject->resourceUsersId) !== true) {
                $resourceUsersId = $_SESSION["email"];
            } else {
                $resourceUsersId = $_SESSION["email"];
            }
            if(isset($requestObject->resourceWebsite) !== true) {
                $resourceWebsite = $resource->getResourceWebsite();
            } else {
                $resourceWebsite = $requestObject->resourceWebsite;
            }
            $resourceChangedDate = null;
            $resourceCreatedDate = new \DateTime();
            $resourceChangeType = null;
            $resourcePriorVersion = null;
            //change resource immediately if Admin.
            $resource->setResourceChangedDate($resourceChangedDate);
            $resource->setResourceChangeType($resourceChangeType);
            $resource->setResourceCountyName($resourceCountyName);
            $resource->setResourceCreatedDate($resourceCreatedDate);
            $resource->setResourceDistrict($resourceDistrict);
            $resource->setResourceEmail($resourceEmail);
            $resource->setResourceFax($resourceFax);
            $resource->setResourceMailingAddress($resourceMailingAddress);
            $resource->setResourcePriorVersion($resourcePriorVersion);
            $resource->setResourceStreetAddress($resourceStreetAddress);
            $resource->setResourceTelephone($resourceTelephone);
            $resource->setResourceTitle($resourceTitle);
            $resource->setResourceType($resourceType);
            $resource->setResourceUsersId($resourceUsersId);
            $resource->setResourceWebsite($resourceWebsite);
            $resource->update($pdo);
            //update reply
            $reply->message = "Resource attributes updated";
        }
    } elseif($method === "DELETE") {

        if(empty($_SESSION["users"]) === true || $currentUsersClearanceLevel > 5) {
            throw(new \InvalidArgumentException("You must be logged into a victim  advocate or administrator account to delete resources", 401));
        }
        //retrieve the resource to be deleted
        $resource = Resource::getResourceByResourceId($pdo, $postId);

        //make sure it exists
        if($resource === null) {
            throw (new RuntimeException("Resource to be deleted does not exist", 404));
        }
        //delete resource
        $resource->delete($pdo);
        //update reply
        $reply->message = "Resource deleted";

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