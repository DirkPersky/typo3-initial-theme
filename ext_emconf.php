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

$EM_CONF[$_EXTKEY] = [
    'title' => 'DP Theme',
    'description' => 'New Theme Layout',
    'category' => 'templates',
    'author' => 'Dirk Persky',
    'author_email' => 'infoy@dp-wired.de',
    'state' => 'beta',
    'clearCacheOnLoad' => true,
    'version' => '0.0.1',
    'constraints' => [
        'depends' => [
            'typo3' => '12.4.3-12.99.99',
            'ws_scss' => '12.0.3-12.9.99',
            'vhs' => '6.1.3-6.9.99',
            'mask' => '8.3.3-8.9.99',
            'dp_cookieconsent' => '12.0.0-12.9.99',
            'news' => '11.2.0-11.9.99',
            'container' => '2.2.5-3.0.0',
            'cs_seo' => '8.1.0-8.9.99',
            'min' => '3.0.0-3.9.99',
            'http2' => '2.0.0-2.9.99',
        ],
        'conflicts' => [
        ],
        'suggests' => [
            'dp_http2' => '3.0.0-3.9.99',
            'rte_ckeditor_fontawesome' => '11.5.6-12.0.0',
            'content_defender' => '3.2.3-3.9.9',
            'sourceopt' => '5.0.0-5.9.99',
            'scriptmerger' => '8.0.3-8.9.99',
            'eventnews ' => '5.0.0-5.9.99',
            'typo3_console' => '7.1.2-7.9.99',
            'typoscript_rendering' => '2.4.0-2.9.99',
            'powermail' => '10.4.3-11.9.99',
            'charts' => '2.0.6-3.9.99',
            'spreadsheets' => '3.3.0-3.9.99',
        ],
    ],
];