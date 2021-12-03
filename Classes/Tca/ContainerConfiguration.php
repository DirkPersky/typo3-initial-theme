<?php
/*
 * Copyright (c) 2021.
 *
 * @category TYPO3
 *
 * @copyright  2020 Dirk Persky (https://github.com/DirkPersky)
 * @author     Dirk Persky <dirk.persky@gmail.com>
 * @license    AGPL v3
 */

namespace DirkPersky\Theme\Tca;

class ContainerConfiguration extends \B13\Container\Tca\ContainerConfiguration
{
    /**
     * @var string
     */
    protected $flexformDS = '';

    /**
     * @param string $flexformDS
     * @return ContainerConfiguration
     */
    public function setFlexformDS(string $flexformDS): ContainerConfiguration
    {
        $this->flexformDS = $flexformDS;
        return $this;
    }

    /**
     * @return string
     */
    public function getFlexformDS(): string
    {
        return $this->flexformDS;
    }
}