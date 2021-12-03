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

defined('TYPO3_MODE') || die();

\TYPO3\CMS\Core\Utility\GeneralUtility::makeInstance(\B13\Container\Tca\Registry::class)->configureContainer(
    (new \DirkPersky\Theme\Tca\ContainerConfiguration(
        'bs3-grid2', // CType
        '2 Spalten Container', // label
        'Aufteilung des Inhaltsbereichs in 2 Spalten', // description
        [
            [
                ['name' => 'Spalte 1', 'colPos' => 201],
                ['name' => 'Spalte 2', 'colPos' => 202]
            ]
        ] // grid configuration
    ))->setFlexformDS('FILE:EXT:dp_theme/Configuration/FlexForms/bs3-grid-2.xml')
// set an optional icon configuration
//    ->setIcon('EXT:container_example/Resources/Public/Icons/b13-2cols-with-header-container.svg')
);

\TYPO3\CMS\Core\Utility\GeneralUtility::makeInstance(\B13\Container\Tca\Registry::class)->configureContainer(
    (new \DirkPersky\Theme\Tca\ContainerConfiguration(
        'bs3-grid3', // CType
        '3 Spalten Container', // label
        'Aufteilung des Inhaltsbereichs in 3 Spalten', // description
        [
            [
                ['name' => 'Spalte 1', 'colPos' => 201],
                ['name' => 'Spalte 2', 'colPos' => 202],
                ['name' => 'Spalte 3', 'colPos' => 203],
            ]
        ] // grid configuration
    ))->setFlexformDS('FILE:EXT:dp_theme/Configuration/FlexForms/bs3-grid-3.xml')
);

\TYPO3\CMS\Core\Utility\GeneralUtility::makeInstance(\B13\Container\Tca\Registry::class)->configureContainer(
    (new \DirkPersky\Theme\Tca\ContainerConfiguration(
        'bs3-grid4', // CType
        '4 Spalten Container', // label
        'Aufteilung des Inhaltsbereichs in 4 Spalten', // description
        [
            [
                ['name' => 'Spalte 1', 'colPos' => 201],
                ['name' => 'Spalte 2', 'colPos' => 202],
                ['name' => 'Spalte 3', 'colPos' => 203],
                ['name' => 'Spalte 4', 'colPos' => 204],
            ]
        ] // grid configuration
    ))->setFlexformDS('FILE:EXT:dp_theme/Configuration/FlexForms/bs3-grid-4.xml')
);

\TYPO3\CMS\Core\Utility\GeneralUtility::makeInstance(\B13\Container\Tca\Registry::class)->configureContainer(
    (new \DirkPersky\Theme\Tca\ContainerConfiguration(
        'bs3-grid6', // CType
        '6 Spalten Container', // label
        'Aufteilung des Inhaltsbereichs in 6 Spalten', // description
        [
            [
                ['name' => 'Spalte 1', 'colPos' => 201],
                ['name' => 'Spalte 2', 'colPos' => 202],
                ['name' => 'Spalte 3', 'colPos' => 203],
                ['name' => 'Spalte 4', 'colPos' => 204],
                ['name' => 'Spalte 5', 'colPos' => 205],
                ['name' => 'Spalte 6', 'colPos' => 206],
            ]
        ] // grid configuration
    ))->setFlexformDS('FILE:EXT:dp_theme/Configuration/FlexForms/bs3-grid-6.xml')
);

\TYPO3\CMS\Core\Utility\GeneralUtility::makeInstance(\B13\Container\Tca\Registry::class)->configureContainer(
    (new \DirkPersky\Theme\Tca\ContainerConfiguration(
        'dp-css', // CType
        'CSS-Element', // label
        '', // description
        [
            [
                ['name' => 'Content', 'colPos' => 201],
            ]
        ] // grid configuration
    ))->setFlexformDS('FILE:EXT:dp_theme/Configuration/FlexForms/css.xml')
);
