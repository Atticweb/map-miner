<?php

namespace tests\AppBundle\Service;

use AppBundle\Service\MapFiller;
use Symfony\Component\HttpFoundation\JsonResponse;

class MapFilterTest extends \PHPUnit_Framework_TestCase
{
    public function testGetMapData(){
        $mapFiller = new MapFiller();
        return new JsonResponse($mapFiller->getMapData(52.3702160, 4.8951680));
    }
}