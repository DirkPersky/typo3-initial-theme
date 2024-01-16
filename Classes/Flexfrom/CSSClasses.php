<?php
/*
 * Copyright (c) 2022
 *
 * @copyright  2022 Dirk Persky (https://github.com/DirkPersky)
 * @author     Dirk Persky <dirk.persky@gmail.com>
 * @license    AGPL v3
 */

namespace DirkPersky\Theme\Flexfrom;

class CSSClasses {
    public function getCSSClasses(&$fConfig){

        $options = [
            'Background' => [
                ['bg-op', 'BG: Full Overlay'],
                ['bg-white', 'BG: Weiß'],
                ['bg-light', 'BG: Grau'],
                ['bg-dark', 'BG: Dark'],
                ['bg-success', 'BG: Success'],
                ['bg-primary', 'BG: Primary'],
                ['bg-dark', 'BG: Dark'],
                ['bg-repeat', 'BG: Repeat'],
                ['bg-gradient-css', 'BG: Farbverlauf']
            ],
            'Text' => [
                ['text-white', 'Text: Weiß'],
                ['text-dark', 'Text: Dark'],
                ['text-success', 'Text: Success'],
                ['text-primary', 'Text: Primary'],
            ],
            'Animation' => [
                ['animate-fadeIn', 'Animation (FadeIn)'],
                ['animate-fadeInUp', 'Animation (FadeInUp)'],
                ['animate-bounceIn', 'Animation (BounceIn)'],
                ['animate-bounceInTop', 'Animation (BounceInTop)'],
                ['animate-bounceInLeft', 'Animation (BounceInLeft)'],
                ['animate-bounceInRight', 'Animation (BounceInRight)'],
                ['animate-textBounceLeft', 'Animation (TextBounceLeft)'],
                ['animate-textBounceRight', 'Animation (TextBounceRight)'],



                ['jarallax', 'Parallax Effekt'],
            ]
        ];

        foreach ($options as $key => $grouop) {
            foreach ($grouop as $option) {
                $fConfig['items'][] = [
                    $option[1], $option[0],'', $key
                ];
            }
        }
    }
}