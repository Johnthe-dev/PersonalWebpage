<?php

namespace JOHNTHEDEV\PersonalWebsite;

use JetBrains\PhpStorm\Pure;

require_once(dirname(__DIR__) . "/vendor/autoload.php");

/**
 * Creating class Relationships, this will allow posts to be linked together in the knowledge system
 * @package JohnTheDev
 *
 * Description: this class will be used to store connections between posts.
 *
 * @author John Johnson-Rodgers
 */
class Relationships implements \JsonSerializable
{

    /**
     * firstPost, Foreign key that relates to postId, one of two foreign keys, Not Null
     * @var string $firstPost
     */
    private string $relationshipsFirstPost;

    /**
     * secondPost, Foreign key that relates to postId, one of two foreign keys, Not Null
     * @var string $secondPost
     */
    private string $relationshipsSecondPost;

    /**
     * Relationships constructor.
     * @param string $firstPost Id for post that is part of relationship
     * @param string $secondPost Id for post that is part of relationship
     */
    public function __construct(string $firstPost, string $secondPost)
    {
        try {
            $this->setRelationshipsFirstPost($firstPost);
            $this->setRelationshipsSecondPost($secondPost);
        } catch (\InvalidArgumentException | \RangeException | \Exception | \TypeError $exception) {
            $exceptionType = get_class($exception);
            throw(new $exceptionType($exception->getMessage(), 0, $exception));
        }
    }

    /**
     * Accessor for relationshipsFirstPost Not Null
     * foreign key
     *
     * @return string Foreign Key relationshipsFirstPost
     */
    public function getRelationshipsFirstPost(): string
    {
        return $this->relationshipsFirstPost;
    }

    /**
     * Mutator for relationshipsFirstPost Not Null
     * Foreign Key
     *
     * @param string $newFirstPost Refers to postId, is a foreign key
     * @throws \Exception if $newFirstPost is an invalid argument, an invalid range, a type error, or another type of exception
     */
    public function setRelationshipsFirstPost(string $newFirstPost): void
    {
        //convert to string or throw exception
        $newFirstPost = trim($newFirstPost);
        $newFirstPost = filter_var($newFirstPost, FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);

        //checks if string length is appropriate
        if (strlen($newFirstPost) > 250) {
            throw (new \RangeException("relationships Class Exception: newFirstPost is too long"));
        }
        //store relationshipsFirstPost
        $this->relationshipsFirstPost = $newFirstPost;
    }

    /**
     * Accessor for relationshipsSecondPost Not Null
     * foreign key
     *
     * @return string Foreign Key relationshipsSecondPost
     */
    public function getRelationshipsSecondPost(): string
    {
        return $this->relationshipsSecondPost;
    }

    /**
     * Mutator for relationshipsSecondPost Not Null
     * Foreign Key
     *
     * @param string $newSecondPost refers to postId in a second post, is a foreign key
     * @throws \Exception if $newSecondPost is an invalid argument, an invalid range, a type error, or another type of exception
     */
    public function setRelationshipsSecondPost(string $newSecondPost): void
    {
        //convert to string or throw exception
        $newSecondPost = trim($newSecondPost);
        $newSecondPost = filter_var($newSecondPost, FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);

        //checks if string length is appropriate
        if (strlen($newSecondPost) > 250) {
            throw (new \RangeException("relationships Class Exception: newSecondPost is too long"));
        }
        //store relationshipsSecondPost
        $this->relationshipsSecondPost = $uuid;
    }


    /**
     * inserts this Relationships into mySQL
     *
     * @param \PDO $pdo PDO connection Object
     * @throws \PDOException when mySQL related errors occur
     * @throws \TypeError if $pdo is not a PDO connection object
     */
    public function insert(\PDO $pdo): void
    {
        //create query template
        $query = "INSERT INTO relationships(relationshipsFirstPost, relationshipsSecondPost) VALUES(:relationshipsFirstPost, :relationshipsSecondPost)";
        $statement = $pdo->prepare($query);

        //bind the member variables to the place holders in the template
        $parameters = ["relationshipsFirstPost" => $this->relationshipsFirstPost, "relationshipsSecondPost" => $this->relationshipsSecondPost];
        $statement->execute($parameters);
    }

    /**
     * deletes this Relationships from mySQL
     *
     * @param \PDO $pdo PDO connection object
     * @throws \PDOException when mySQL related errors occur
     * @throws \TypeError if $pdo is not a PDO connection object
     **/
    public function delete(\PDO $pdo): void
    {
        //create query template
        $query = "DELETE FROM relationships WHERE relationshipsFirstPost = :relationshipsFirstPost AND relationshipsSecondPost = :relationshipsSecondPost";
        $statement = $pdo->prepare($query);

        //bind the member variables to the placeholder in the template
        $parameters = ["relationshipsFirstPost" => $this->relationshipsFirstPost, "relationshipsSecondPost" => $this->relationshipsSecondPost];
        $statement->execute($parameters);
    }

    #[Pure] public function jsonSerialize(): array
    {
        $fields = get_object_vars($this);
        return ($fields);
    }
}