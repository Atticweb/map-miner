<?php

namespace AppBundle\Service;


class MapFiller
{

    /**
     * Generates a daily random array with markers from the current location
     *
     * @param float $lat        Current latitude from where it builds up
     * @param float $lng        Current longitude from where it builds up
     * @param array $options    Optional additional options
     *
     * @return array            All the markers
     *
     * @throws \RuntimeException When an invalid option is provided
     */
    public function getMapData($lat, $lng, array $options = array())
    {
        $lat = round($lat, 3);
        $lng = round($lng, 3);

        // Merge and validate all options
        $defaultOptions = array(
            'units' => 25,
            'grid_offset' => array(
                'lat' => .00025, // can it be divided by 1
                'lng' => .0005, // can it be divided by 1
            ),
        );

        foreach ($options as $option) {
            if (!in_array($option, $defaultOptions)) {
                throw new \RuntimeException(sprintf('Wrong option "%s"', $option));
            }
        }

        $options = array_merge(
            $defaultOptions,
            $options
        );

//        if( 10 % $options['grid_offset']['lat'] !== 0 || 10 % $options['grid_offset']['lng'] !== 0 ) {
//            throw new \RuntimeException('Wrong value given as lat or lng, it must be dividable by 10');
//        }

        //Generate the actual data
        $returnData     = array();
        $unitsOffset    = $options['units']%2;
        $unitsStart     = - ($options['units'] + $unitsOffset) / 2;
        $unitsEnd       = $options['units'] / 2;
        for($i = $unitsStart; $i < $unitsEnd; $i++)
        {
            for($j = $unitsStart; $j < $unitsEnd; $j++)
            {
                $point = array(
                    'lat' => $lat + ( $i * $options['grid_offset']['lat'] ),
                    'lng' => $lng + ( $j * $options['grid_offset']['lng'] ),
                );
                $seed = preg_replace('/\D/', '', substr($point['lat'],3).substr($point['lng'],2)).date('jny');
                mt_srand($seed);
                $random = mt_rand(0,100);

                // TODO: Need to fix more types of stones

                if($random < 10) {
                    $returnData[] = $point;
                }
            }
        }
        return $returnData;
    }

}