<?php
require_once(dirname(__DIR__, 1) . "/vendor/autoload.php");
use Ramsey\Uuid\UuidInterface;
use Ramsey\Uuid\UuidFactory;
use Ramsey\Uuid\Codec\StringCodec;

/**
 * generates an optimized uuid v4 for efficient msSQL storage and indexing
 *
 * @return UuidInterface resulting uuid
 *
 * @author John Johnson-Rodgers <John@johnthe.dev>
 * @package JOHNTHEDEV\PersonalWebsite\Uuid
 * @throws Exception
 */
function generateUuidV4() : UuidInterface {
    try {
        $factory = new UuidFactory();
        $codec = new StringCodec($factory->getUuidBuilder());
        $factory->setCodec($codec);
        $uuid = $factory->uuid4();
        return($uuid);
    } catch(Exception $exception) {
        $exceptionType = get_class($exception);
        throw(new $exceptionType($exception->getMessage(), 0, $exception));
    }
}