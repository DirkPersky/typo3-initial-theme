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
     * Get Row Class for Alignment
     * @param $fConfig
     * @return void
     */
    public function getAlignClasses(&$fConfig)
    {
        $verticalAlignClasses = [
            ['align-items-start', 'Start'],
            ['align-items-center', 'Center'],
            ['align-items-end', 'End'],
        ];

        $horizontalAlignClasses = [
            ['justify-content-start', 'Left'],
            ['justify-content-center', 'Center'],
            ['justify-content-end', 'Right'],
            ['justify-content-between', 'Space between'],
        ];
        foreach ($verticalAlignClasses as $class) {
            $_temp = [];
            $_temp[0] = $class[1];
            $_temp[1] = $class[0];
            $_temp[2] = '';
            $_temp[3] = 'group1';
            $fConfig['items'][] = $_temp;
        }

        foreach ($horizontalAlignClasses as $class) {
            $_temp = [];
            $_temp[0] = $class[1];
            $_temp[1] = $class[0];
            $_temp[2] = '';
            $_temp[3] = 'group2';
            $fConfig['items'][] = $_temp;
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
