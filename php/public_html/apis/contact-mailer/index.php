<?php
//require dependencies
require_once("../../../vendor/autoload.php");
require_once dirname(__DIR__, 3) . "/lib/xsrf.php";
require_once("../../../../../../apache/mail-config.php"); //serves secret data

/**
 * API contact-mailer for my PWP web application project.
 * @package JOHNTHEDEV\PersonalWebsite\ContactMailer
 *
 * Description: This API will be used to send emails from the contact application.
 *
 * @author John Johnson-Rodgers <John@johnthe.dev>
 * @version 1.0.0
 */
//verify the session, start if inactive
if (session_status() !== PHP_SESSION_ACTIVE) {
    session_start();
}

//prepare an empty reply
$reply = new stdClass();
$reply->status = 200;
$reply->data = null;

try {

    //determine which HTTP method was used
    $method = $_SERVER["HTTP_X_HTTP_METHOD"] ?? $_SERVER["REQUEST_METHOD"];

    if ($method === "POST") {

        //retrieves JSON package that was sent by the user and stores it in $requestContent using file_get_contents
        $requestContent = file_get_contents("php://input");

        //Decodes content and stores result in $requestContent
        $requestObject = json_decode($requestContent);

        /**
         * Sanitize the inputs from our AJAX form.
         **/
        $content = filter_var($requestObject->content, FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);

        if (empty($content) === true) {
            throw(new \InvalidArgumentException("No content provided", 400));
        }

        /**
         * create transport object for connecting to SMTP
         * variables obtained from mail-config.php
         */
        $transport = new Swift_SmtpTransport($smtpAddress, $smtpPort, $smtpEncryption);
        $transport->setUsername($smtpUsername);
        $transport->setPassword($smtpPassword);


        // create new Swift_Mailer object
        $swiftMailer = new Swift_Mailer($transport);

        //create new Swift_Message object
        $swiftMessage = new Swift_Message();

        /**
         * add the $email and $name to the swiftmessage object
         * Swiftmailer uses a convoluted associative array where the email is the key for the name.
         **/
        $swiftMessage->setFrom(['contact@johnthe.dev' => 'PWP Contact Form']);


        /**
         * add $recipients to the Swift_Message object
         * recipients from mail-config.php
         **/
        $recipient = ['john@johnthe.dev' => 'John Johnson-Rodgers'];
        $swiftMessage->setTo($recipient);

        // add $subject to the Swift_Message object
        $swiftMessage->setSubject('Message from JohnThe.Dev');
        $emailTable = '';
        $items = explode("/newline/", $content);
        foreach ($items as $item) {
            $item = trim($item);
            if ($item[0] === 'P') {
                $emailTable = $emailTable . '<tr><td class="personMessage"><p>'.$item.'</p></td></tr>';
            } else {
                $emailTable = $emailTable . '<tr><td class="machineMessage"><p>'.$item.'</p></td></tr>';
            }
        }

        /**
         * add $body to the swift_message object
         *
         * add message in both HTML and plaintext for people who disable fun mode
         **/
        $body = '<html lang="en">
<head>
	<meta content="text/html; charset=UTF-8" http-equiv="content-type">
	<style type="text/css">
	
	table td, table th {
		padding: 0;
	}
	.personMessage {
		padding: .4em .4em .4em .4em;
		vertical-align: top;
		background-color: #d67600;
	}
	.machineMessage {
		padding: .4em .4em .4em .4em;
		vertical-align: top;
		background-color: #efefef;
	}
	.tableStyling {
		border-spacing: 0;
		border-collapse: collapse;
		width: 100%;
	}
	p {
		margin: 0;
		color: #000000;
		font-size:.9em ;
		font-family: georgia, sans-serif;
	}
	</style>
</head>
<body>
	<p>A new message has been received.</p>
	<p class="spacing"></p>
	<table class="tableStyling">
' . $emailTable . '
	</table>
	<p class="spacing"></p>
	<p>End Of Message</p>
</body>
</html>';


        $swiftMessage->setBody($body, "text/html");
        $swiftMessage->addPart(html_entity_decode($body), "text/plain");


        /*Send SwiftMessage via SwiftMailer*/
        $swiftMailer->send($swiftMessage);

        //update reply
        $reply->message = "County attributes updated";
    }

} catch (Exception $exception) {

    $reply->status = $exception->getCode();
    $reply->message = $exception->getMessage();
}
header("Content-type: application/json");
echo json_encode($reply);