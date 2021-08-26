<?php

require_once dirname(__DIR__, 3) . "/vendor/autoload.php";
require_once dirname(__DIR__, 3) . "/Classes/autoload.php";
require_once("/etc/apache2/JohnTheDev/Secrets.php");
require_once dirname(__DIR__, 3) . "/lib/xsrf.php";
require_once dirname(__DIR__, 3) . "/lib/jwt.php";

use JOHNTHEDEV\PersonalWebsite\{Post, Relationships};

/**
 * API Post for my personal website project.
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
    $secrets = new \Secrets("var/www/apache/secret/JohnTheDev.ini");
    $pdo = $secrets->getPdoObject();
    //determine which HTTP method was used
    $method = $_SERVER["HTTP_X_HTTP_METHOD"] ?? $_SERVER["REQUEST_METHOD"];

    //sanitize input
    $postId = filter_input(INPUT_GET, "postId", FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);
    $postPassword = filter_input(INPUT_GET, "postPassword", FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);
    $postOrigin = filter_input(INPUT_GET, "postOrigin", FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);
    $postSearchTerms = filter_input(INPUT_GET, "postSearchTerms", FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);

    //check if postId is empty and method is delete or put
    if(($method === "DELETE" || $method === "PUT") && (empty($postId) === true)) {
        throw(new InvalidArgumentException("postId can not be empty when deleting of changing", 400));
    }
    if($method === "GET") {
        //set xsrf cookie
        setXsrfCookie();
        if(isset($postId) === true) {
            //get post by postId
            $queryData = Post::getPostAndChildPostsAndParentPosts($pdo, $postId);
            $reply->data = (object)array('post'=>$queryData['post'], 'children'=>$queryData['children'], 'parents'=>$queryData['parents'], 'related'=>$queryData['related']);
        } else if(isset($postOrigin) === true) {
            //get post by originated post
            $reply->data = Post::getPostByOriginatedPost($pdo, $postOrigin);
        } else if(isset($postSearchTerms) === true) {
            //get post by search terms
            $reply->data = Post::getPostByPostContentAndTitle($pdo, $postSearchTerms);
        } else {
            //get all posts
            $reply->data = Post::getAllPosts($pdo);
        }
    } elseif($method === "POST" || $method === "PUT") {
        validateVerifyJwt();
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

        if($method === "POST") {
            if(isset($requestObject->postTitle) !== true) {
                throw(new \InvalidArgumentException("There is no title.", 400));
            }
            if(empty($requestObject->postId)){
                $postId = 'john';
                $post = Post::getPostByPostId($pdo, $postId);
                if($post !== null){
                    throw(new \InvalidArgumentException("Original post already corrected", 400));
                };
            } else {
                $exists = true;
                while ($exists) {
                    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
                    $randstring = '';
                    for ($i = 0; $i < 4; $i++) {
                        $randstring .= $characters[rand(0, strlen($characters))];
                    }
                    $postId = $requestObject->postId.$randstring;
                    $post = Post::getPostByPostId($pdo, $postId);
                    if($post === null){
                        $exists = false;
                    }
                }
            }

            $postDate = null;
            //create new post and insert it into the database
            $post = new Post($postId, $requestObject->postContent, null, $requestObject->postTitle);
            $post->insert($pdo);
            //update reply
            $reply->message = "A new Post has been created.";
            $reply->data = $postId;

//            stopping point
        } elseif($method === "PUT") {

            //makes sure required fields are available
            if(empty($postId) === true) {
                throw(new \InvalidArgumentException("The Post Id field is empty.", 400));
            }

            //retrieve the post to update
            $post = Post::getPostByPostId($pdo, $postId);

            //make sure it exists
            if($post === null) {
                throw (new RuntimeException("Post to be edited does not exist", 404));
            }
            if(isset($requestObject->postContent) !== true) {
                $postContent = $post->getPostContent();
            } else {
                $postContent = $requestObject->postContent;
            }
            if(isset($requestObject->postTitle) !== true) {
                $postTitle = $post->getPostTitle();
            } else {
                $postTitle = $requestObject->postTitle;
            }
            //change post immediately if Admin.
            $post->setPostTitle($postTitle);
            $post->setPostContent($postContent);
            $post->update($pdo);
            //update reply
            $reply->message = "Post updated";
        }
    } elseif($method === "DELETE") {
        validateVerifyJwt();
        //retrieve the post to be deleted
        $post = Post::getPostByPostId($pdo, $postId);

        //make sure it exists
        if($post === null) {
            throw (new RuntimeException("Post to be deleted does not exist", 404));
        }
        if(!empty(Post::getPostByOriginatedPost($pdo, $postId))){
            throw (new RuntimeException("Post to be deleted has children, you monster!", 404));
        }

        //check if post has relationships
        $relationships = Relationships::getRelationshipByPostId($pdo, $postId);
            foreach ($relationships as $relationship){
                $relationship->delete($pdo);
            }
        //delete post
        $post->delete($pdo);
        //update reply
        $reply->message = "Post deleted";

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