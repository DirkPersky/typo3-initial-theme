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
            'typo3' => '8.7.0-11.99.99',
            'ws_scss' => '11.0.1-11.9.99',
            'cs_seo' => '7.3.0-7.9.99',
            'dp_http2' => '3.0.0-3.9.99',
            'rte_ckeditor_fontawesome' => '11.5.5-12.0.0',
            'dp_cookieconsent' => '11.6.3-12.0.0',
            'vhs' => '6.1.2-6.9.99',
            'sourceopt' => '4.0.04-4.9.99',
            'container' => '2.0.5-3.0.0',
            'mask' => '7.2.12-7.9.99',
            'news' => '10.0.1-10.9.99',
            'content_defender' => '3.2.3-3.9.9',
            'scriptmerger' => '8.0.3-8.9.99',
        ],
        'conflicts' => [
        ],
        'suggests' => [
            'eventnews ' => '5.0.0-5.9.99',
            'typo3_console' => '7.1.2-7.9.99',
            'typoscript_rendering' => '2.4.0-2.9.99',
            'powermail' => '10.4.3-10.9.99',
            'charts' => '2.0.6-2.9.99',
            'spreadsheets' => '3.3.0-3.9.99',
        ],
    ],
];