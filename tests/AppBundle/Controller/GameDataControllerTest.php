<?php

namespace tests\AppBundle\Controller;


use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class GameDataControllerTest extends WebTestCase
{
    public function testGetMapData()
    {
        $client = static::createClient();
        $client->request('GET', '/api/getMapData', array('lat' => '52.3702160', 'lng' => '4.8951680'), array(), array('HTTP_X-Requested-With' => 'XMLHttpRequest'));
        $response = $client->getResponse();
        $this->assertSame(200, $response->getStatusCode());
        $this->assertSame('application/json', $response->headers->get('Content-Type'));
        $this->assertNotEmpty($response->getContent());
        // dump($response->getContent());
    }
}