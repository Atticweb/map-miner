<?php

namespace AppBundle\Controller\api;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class GameDataController extends Controller
{

    /**
     * @Route("api/getMapData", name="getMapData")
     * @Method("GET")
     */
    public function getMapData(Request $request){
        $body = $request->getContent();
        return new Response('test');
    }

}
