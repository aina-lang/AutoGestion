<?php

namespace App\Http\Controllers;

abstract class Controller
{
    //
    public  function jaccardSimilarity($str1, $str2)
    {
        $set1 = str_split($str1);
        $set2 = str_split($str2);

        // Calculer l'intersection des ensembles
        $intersection = array_intersect($set1, $set2);

        // Calculer l'union des ensembles
        $union = array_unique(array_merge($set1, $set2));

        // Calculer le coefficient de Jaccard
        return count($intersection) / count($union);
    }
}
