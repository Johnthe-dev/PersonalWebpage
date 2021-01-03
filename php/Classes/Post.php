<?php


namespace JOHNTHEDEV\PersonalWebsite;

require_once(dirname(__DIR__) . "/Classes/autoload.php");
require_once(dirname(__DIR__, 2) . "/vendor/autoload.php");


/*
 * Class postLog for NM SAVIN
 * @package JohnTheDev
 *
 * Description: This class will hold the posts for JohnThe.dev.
 *
 * @author John Johnson-Rogers <john@johnthe.dev>
 */

class post implements \JsonSerializable
{
    use ValidateDate;

    /**
     * id for post; Primary key - Not null, <=250
     * @var string $postId
     */
    private string $postId;

    /**
     * Content for this post held in markdown-like form -not null, TEXT
     * @var string $postContent
     */
    private string $postContent;

    /**
     * date Post was created - not null, \DateTime
     * @var \DateTime $postDate
     */
    private \DateTime $postDate;

    /**
     * Title for post - not null, <=200
     * @var string $postTitle
     */
    private string $postTitle;

    /***
     *       _____    ____    _   _    _____   _______   _____    _    _    _____   _______    ____    _____
     *      / ____|  / __ \  | \ | |  / ____| |__   __| |  __ \  | |  | |  / ____| |__   __|  / __ \  |  __ \
     *     | |      | |  | | |  \| | | (___      | |    | |__) | | |  | | | |         | |    | |  | | | |__) |
     *     | |      | |  | | | . ` |  \___ \     | |    |  _  /  | |  | | | |         | |    | |  | | |  _  /
     *     | |____  | |__| | | |\  |  ____) |    | |    | | \ \  | |__| | | |____     | |    | |__| | | | \ \
     *      \_____|  \____/  |_| \_| |_____/     |_|    |_|  \_\  \____/   \_____|    |_|     \____/  |_|  \_\
     */

    /**
     * Post constructor.
     * @param string $postId
     * @param string $postContent
     * @param \DateTime | string $postDate
     * @param string $postTitle
     * @throws \InvalidArgumentException | \RangeException | \TypeError | \Exception if setters do not work
     */
    public function __construct(string $postId, string $postContent, \DateTime|string $postDate, string $postTitle) {
        try {
            $this->setPostId($postId);
            $this->setPostContent($postContent);
            $this->setPostDate($postDate);
            $this->setPostTitle($postTitle);
        } catch(\InvalidArgumentException | \RangeException | \TypeError | \Exception $exception) {
            $exceptionType = get_class($exception);
            throw(new $exceptionType($exception->getMessage(), 0, $exception));
        }
    }
    
    /***
     *       _____   ______   _______   _______   ______   _____     _____       __   _____   ______   _______   _______   ______   _____     _____
     *      / ____| |  ____| |__   __| |__   __| |  ____| |  __ \   / ____|     / /  / ____| |  ____| |__   __| |__   __| |  ____| |  __ \   / ____|
     *     | |  __  | |__       | |       | |    | |__    | |__) | | (___      / /  | (___   | |__       | |       | |    | |__    | |__) | | (___
     *     | | |_ | |  __|      | |       | |    |  __|   |  _  /   \___ \    / /    \___ \  |  __|      | |       | |    |  __|   |  _  /   \___ \
     *     | |__| | | |____     | |       | |    | |____  | | \ \   ____) |  / /     ____) | | |____     | |       | |    | |____  | | \ \   ____) |
     *      \_____| |______|    |_|       |_|    |______| |_|  \_\ |_____/  /_/     |_____/  |______|    |_|       |_|    |______| |_|  \_\ |_____/
     */

    /**
     * Accessor for postId, Not Null
     * Primary Key
     *
     * @return string
     */
    public function getPostId(): string {
        return ($this->postId);
    }

    /**
     *Mutator Method for postId, Not Null
     *Primary Key
     *
     * @param string $postId
     * @throws \Exception if $postId is an invalid argument, out of range, has a type error, or has another exception.
     */
    public function setPostId(string $postId): void {
        //trim and filter out invalid input
        $postId = trim($postId);
        $postId = filter_var($postId, FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);

        //checks if string length is appropriate
        if(strlen($postId) > 250) {
            throw (new \RangeException("post Class Exception: postId is too long"));
        }
        $this->postId = $postId;
    }

    /**
     * Accessor Method for postContent
     *
     * @return string
     */
    public function getPostContent(): string {
        return ($this->postContent);
    }

    /**
     * Mutator Method for postContent
     *
     * @param string $newPostContent
     * @throws \Exception if $newPostContent is an invalid argument, out of range, has a type error, or has another exception.
     */
    public function setPostContent(string $newPostContent): void {
        //trim and filter out invalid input
        $newPostContent = trim($newPostContent);
        $newPostContent = filter_var($newPostContent, FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);

        //checks if string length is appropriate
        if(strlen($newPostContent) > 60000) {
            throw (new \RangeException("Post Class Exception: PostContent is too long"));
        }
        $this->postContent = $newPostContent;
    }

    /**
     * Accessor Method for postDate
     *
     * @return \DateTime
     */
    public function getPostDate(): \DateTime {
        return ($this->postDate);
    }

    /**
     * Mutator Method for postDate
     *
     * @param /DateTime | string $newPostDate
     * @throws \Exception if $newPostDate is an invalid argument, out of range, has a type error, or has another exception.
     */
    public function setPostDate($newPostDate = null): void {
        //checks if $newPostDate is null, if so set to current DateTime
        if($newPostDate === null) {
            $newPostDate = new \DateTime();
        }

        try {
            $newPostDate = self::validateDateTime($newPostDate);
        } catch(\InvalidArgumentException | \RangeException | \Exception | \TypeError $exception) {
            $exceptionType = get_class($exception);
            throw(new $exceptionType("LoginAttempt Class Exception: setPostDate: " . $exception->getMessage(), 0, $exception));
        }
        $this->postDate = $newPostDate;
    }

    /**
     * Accessor Method for postTitle
     *
     * @return string
     */
    public function getPostTitle(): string {
        return ($this->postTitle);
    }

    /**
     * Mutator Method for postTitle
     *
     * @param string $newPostTitle
     * @throws \Exception if $newPostTitle is an invalid argument, out of range, has a type error, or has another exception.
     */
    public function setPostTitle(string $newPostTitle): void {
        //trim and filter out invalid input
        $newPostTitle = trim($newPostTitle);
        $newPostTitle = filter_var($newPostTitle, FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);

        //checks if string length is appropriate
        if(strlen($newPostTitle) > 200) {
            throw (new \RangeException("Post Class Exception: PostTitle is too long"));
        }
        $this->postTitle = $newPostTitle;
    }

    /***
     *      __  __   ______   _______   _    _    ____    _____     _____
     *     |  \/  | |  ____| |__   __| | |  | |  / __ \  |  __ \   / ____|
     *     | \  / | | |__       | |    | |__| | | |  | | | |  | | | (___
     *     | |\/| | |  __|      | |    |  __  | | |  | | | |  | |  \___ \
     *     | |  | | | |____     | |    | |  | | | |__| | | |__| |  ____) |
     *     |_|  |_| |______|    |_|    |_|  |_|  \____/  |_____/  |_____/
     */

    /**
     * INSERT
     * Inserts Post into MySQL
     *
     * @param \PDO $pdo PDO connection object
     * @throws \PDOException if MySQL errors occur
     * @throws \TypeError if $PDO is not a PDO connection object
     */
    public function insert(\PDO $pdo): void {
        //create query template
        $query = "INSERT INTO post(postId, postContent, postDate, postTitle) VALUES(:postId, :postContent, :postDate, :postTitle)";
        $statement = $pdo->prepare($query);
        //create parameters for query
        $parameters = [
            "postId" => $this->postId,
            "postContent" => $this->postContent,
            "postDate" => $this->postDate->format("Y-m-d H:i:s"),
            "postTitle" => $this->postTitle
        ];
        $statement->execute($parameters);
    }

    /**
     * UPDATE
     * updates Post in MySQL database
     *
     * @param \PDO $pdo PDO connection object
     * @throws \PDOException when MySQL related error occurs
     * @throws \TypeError if $pdo is not pdo connection object
     */
    public function update(\PDO $pdo): void {
        //create query template
        $query = "UPDATE post SET postContent=:postContent, postDate=:postDate, postTitle =:postTitle WHERE postId = :postId";
        $statement = $pdo->prepare($query);
        // set parameters to execute query
        $parameters = [
            "postId" => $this->postId,
            "postContent" => $this->postContent,
            "postDate" => $this->postDate->format("Y-m-d H:i:s"),
            "postTitle" => $this->postTitle
        ];
        $statement->execute($parameters);
    }

    /**
     * DELETE
     * deletes Post from MySQL database
     *
     * @param \PDO $pdo PDO connection object
     * @throws \PDOException when mysql related errors occur
     * @throws \TypeError when $pdo is not a PDO object
     */
    public function delete(\PDO $pdo): void {
        //create query template
        $query = "DELETE FROM post WHERE postId = :postId";
        $statement = $pdo->prepare($query);
        //set parameters to execute query
        $parameters = ["loginAttemptId" => $this->postId];
        $statement->execute($parameters);
    }



    /**
     * converts DateTime to string to serialize
     *
     * @return array converts DateTime to strings
     */
    public function jsonSerialize(): array {
        $fields = get_object_vars($this);
        if($this->postDate !== null) {
            $fields["postDate"] = $this->postDate->format("Y-m-d H:i:s");
        }

        return ($fields);
    }
}