<?php

namespace AppBundle\Controller\api;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class GameDataController extends Controller
{

    /**
     * @Route("api/getMapData", name="getMapData")
     * @Method("GET")
     */
    public function getMapData(Request $request){
        if( !$request->isXmlHttpRequest() ) {
            throw $this->createNotFoundException('There is something wrong here');
        }
        $lat = floatval($request->query->get('lat'));
        $lng = floatval($request->query->get('lng'));
        $mapFiller = $this->get('app.mapfiller');
        if( !isset($lat) || !isset($lng) ) {
            throw $this->createNotFoundException('There is something wrong here');
        }
        return new JsonResponse($mapFiller->getMapData($lat, $lng));
    }

}
