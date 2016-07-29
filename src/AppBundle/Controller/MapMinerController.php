<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class MapMinerController extends Controller
{
    /**
     * @Route("/", name="home")
     */
    public function showAction()
    {
        return $this->render("map_miner/main.html.twig", []);
    }
}
