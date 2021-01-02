<?php


namespace JOHNTHEDEV\PersonalWebsite;

require_once(dirname(__DIR__) . "/Classes/autoload.php");
require_once(dirname(__DIR__, 2) . "/vendor/autoload.php");


/*
 * Class postLog for NM SAVIN
 * @package JohnTheDev
 *
 * Description: This class will create objects that detail information regarding previous posts sent via text and email
 *
 * @author John Johnson-Rogers <john@johnthe.dev>
 */

class postLog implements \JsonSerializable
{
    use ValidateDate;

    /**
     * id for post; Primary key - Not null
     * @var string $postId
     */
    private string $postId;

    /**
     * Case Stage for post class - not null, <=50
     * @var string $postTitle
     */
    private string $postTitle;

    /**
     *contact data for this post, contains email or phone number - not null, <=250
     * @var \DateTime $postDate
     */
    private \DateTime $postDate;

    /**
     * Contact Id for this post - Foreign Key, -nullable,
     * @var string $postContent
     */
    private string $postContent;



    /**
     * converts DateTime and \Uuids to strings to serialize
     *
     * @return array converts DateTime and \Uuids to strings
     */
    public function jsonSerialize(): array {
        $fields = get_object_vars($this);
        if($this->postLogDateTimeSent !== null) {
            $fields["postLogDateTimeSent"] = $this->postLogDateTimeSent->format("Y-m-d H:i:s");
        }

        return ($fields);
    }
}