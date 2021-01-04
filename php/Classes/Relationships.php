
<?php

namespace VeteranResource\Resource;

use phpDocumentor\Reflection\Types\Integer;
use Ramsey\Uuid\Uuid;

require_once(dirname(__DIR__) . "/vendor/autoload.php");

/**
 * Creating class Relationships, this ia an analog to "likes" that will apply to resources
 * @package VeteranResource\Resource
 *
 * Description: this class will be used to store information on "Relationshipss" for the WebApp.
 *
 * @author John Johnson-Rodgers
 */
class Relationships implements \JsonSerializable {
    use ValidateUuid;
    /**
     * firstPost, Foreign key that relates to postId, one of two foreign keys, Not Null
     * @var string $firstPost
     */
    private string $firstPost;

    /**
     * secondPost, Foreign key that relates to postId, one of two foreign keys, Not Null
     * @var string $secondPost
     */
    private string $secondPost;

    /**
     * Relationships constructor.
     * @param string $firstPost Id for post that is part of relationship
     * @param string $secondPost Id for post that is part of relationship
     */
    public function __construct(string $firstPost, string $secondPost) {
        try {
            $this->setRelationshipsFirstPost($firstPost);
            $this->setRelationshipsSecondPost($secondPost);
        } catch(\InvalidArgumentException | \RangeException | \Exception | \TypeError $exception) {
            $exceptionType = get_class($exception);
            throw(new $exceptionType($exception->getMessage(), 0, $exception));
        }
    }

    /**
     * Accessor for relationshipsResourceId Not Null
     * foreign key
     *
     * @return Uuid Foreign Key relationshipsResourceId
     */
    public function getRelationshipsResourceId(): Uuid {
        return $this->relationshipsResourceId;
    }

    /**
     * Mutator for relationshipsResourceId Not Null
     * Foreign Key
     *
     * @param string | Uuid $newFirstPost Refers to resourceId, is a foreign key
     * @throws \Exception if $newFirstPost is an invalid argument, an invalid range, a type error, or another type of exception
     */
    public function setRelationshipsResourceId($newFirstPost): void {
        //convert to Uuid or throw exception
        try {
            $uuid = self::validateUuid($newFirstPost);
        } catch(\InvalidArgumentException | \RangeException | \Exception | \TypeError $exception) {
            $exceptionType = get_class($exception);
            throw(new $exceptionType($exception->getMessage(), 0, $exception));
        }
        //store relationshipsResourceId
        $this->relationshipsResourceId = $uuid;
    }

    /**
     * Accessor for relationshipsUserId Not Null
     * foreign key
     *
     * @return Uuid Foreign Key relationshipsUserId
     */
    public function getRelationshipsUserId(): Uuid {
        return $this->relationshipsUserId;
    }

    /**
     * Mutator for relationshipsUserId Not Null
     * Foreign Key
     *
     * @param string|Uuid $newSecondPost refers to userId, is a foreign key
     * @throws \Exception if $newSecondPost is an invalid argument, an invalid range, a type error, or another type of exception
     */
    public function setRelationshipsUserId($newSecondPost): void {
        //convert to Uuid or throw exception
        try {
            $uuid = self::validateUuid($newSecondPost);
        } catch(\InvalidArgumentException | \RangeException | \Exception | \TypeError $exception) {
            $exceptionType = get_class($exception);
            throw(new $exceptionType($exception->getMessage(), 0, $exception));
        }
        //store relationshipsUserId
        $this->relationshipsUserId = $uuid;
    }


    /**
     * inserts this Relationships into mySQL
     *
     * @param \PDO $pdo PDO connection Object
     * @throws \PDOException when mySQL related errors occur
     * @throws \TypeError if $pdo is not a PDO connection object
     */
    public function insert(\PDO $pdo): void {
        //create query template
        $query = "INSERT INTO relationships(relationshipsResourceId, relationshipsUserId) VALUES(:relationshipsResourceId, :relationshipsUserId)";
        $statement = $pdo->prepare($query);

        //bind the member variables to the place holders in the template
        $parameters = ["relationshipsResourceId" => $this->relationshipsResourceId->getBytes(), "relationshipsUserId" => $this->relationshipsUserId->getBytes()];
        $statement->execute($parameters);
    }

    /**
     * deletes this Relationships from mySQL
     *
     * @param \PDO $pdo PDO connection object
     * @throws \PDOException when mySQL related errors occur
     * @throws \TypeError if $pdo is not a PDO connection object
     **/
    public function delete(\PDO $pdo): void {
        //create query template
        $query = "DELETE FROM relationships WHERE relationshipsResourceId = :relationshipsResourceId AND relationshipsUserId = :relationshipsUserId";
        $statement = $pdo->prepare($query);

        //bind the member variables to the placeholder in the template
        $parameters = ["relationshipsResourceId" => $this->relationshipsResourceId->getBytes(), "relationshipsUserId" => $this->relationshipsUserId->getBytes()];
        $statement->execute($parameters);
    }