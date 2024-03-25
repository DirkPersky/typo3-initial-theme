<?php
/*
 * Copyright (c) 2022
 *
 * @copyright  2022 Dirk Persky (https://github.com/DirkPersky)
 * @author     Dirk Persky <dirk.persky@gmail.com>
 * @license    AGPL v3
 */

namespace DirkPersky\Theme\Flexfrom;

class GridClasses
{
    // Holder Array
    protected array $colClasses = [];
    // Number of Grid Cols
    protected int $gridCols = 12;
    // breakpoint config
    protected array $breakPoints = [[null, 'Mobile'], ['sm', 'Mobile Quer'], ['md', 'Tablet'], ['lg', 'Tablet Quer'], ['xl', 'Desktop'], ['xxl', 'Desktop Groß']];

    /**
     * Get Row visibility
     * @param $fConfig
     * @return void
     */
    public function getVisibilityClasses(&$fConfig)
    {

        $visibilityClasses = [
            ['none', 'Versteckt ab'],
            ['block', 'Sichtbar ab'],
        ];

        foreach ($visibilityClasses as $visibility) {
            foreach ($this->breakPoints as $point) {
                $class = 'd-' . ($point[0] ? $point[0] . '-' : '') . $visibility[0];
                $fConfig['items'][] = [
                    sprintf('%1$s %2$s', $visibility[1], $point[1]), $class
                ];
            }
        }
    }
    /**
     * Get Animation Classes
     * @param $fConfig
     * @return void
     */
    public function getAnimationClasses(&$fConfig)
    {

        $visibilityClasses = [
            ['fadeIn', 'Animation (FadeIn)'],
            ['fadeInUp', 'Animation (FadeInUp)'],
            ['fadeInLeft', 'Animation (fadeInLeft)'],
            ['fadeInRight', 'Animation (fadeInRight)'],
            ['bounceIn', 'Animation (BounceIn)'],
            ['bounceInTop', 'Animation (BounceInTop)'],
            ['bounceInLeft', 'Animation (BounceInLeft)'],
            ['bounceInRight', 'Animation (BounceInRight)'],
            ['textBounceLeft', 'Animation (TextBounceLeft)'],
            ['textBounceRight', 'Animation (TextBounceRight)'],
        ];

        foreach ($visibilityClasses as $visibility) {
            $fConfig['items'][] = [
                $visibility[1], 'animate-' . $visibility[0]
            ];
        }
    }

    /**
     * Get Row Class for Alignment
     * @param $fConfig
     * @return void
     */
    public function getAlignClasses(&$fConfig)
    {
        $options = [
            'Vertical' => [
                ['align-items-start', 'Start'],
                ['align-items-center', 'Center'],
                ['align-items-end', 'End'],
                ['align-items-stretch', 'Stretch'],
            ],

            'Horizontal' => [
                ['justify-content-start', 'Left'],
                ['justify-content-center', 'Center'],
                ['justify-content-end', 'Right'],
                ['justify-content-between', 'Space between'],
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

    /**
     * Get Col Classes for ROW Container
     * @param $fConfig
     * @return void
     */
    public function getColClasses(&$fConfig)
    {
        $this->createGridColClasses($this->colClasses, $fConfig);

        foreach ($this->colClasses as $class) {
            $fConfig['items'][] = $class;
        }
    }

    /**
     * Create Label and Col Size
     * @param array $target
     * @return void
     */
    private function createGridColClasses(array &$target, $config)
    {
        if (!isset($config['config']) || empty($config['config']['default'])) {
            $target[] = ['Nicht definiert', ''];
        }

        for ($i = 1; $i <= $this->gridCols; $i++) {
            $target[] = [$i . '/' . $this->gridCols, $i];
        }
    }
}
