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
            'ws_scss' => '1.2.0-1.2.99',
            'cs_seo' => '7.0.0-7.9.99',
            'dp_http2' => '2.0.3-3.0.0',
            'rte_ckeditor_fontawesome' => '11.5.0-12.0.0',
            'dp_cookieconsent' => '11.1.0-12.0.0',
            'vhs' => '6.0.5-6.99.99',
            'sourceopt' => '4.0.0-4.9.99',
            'container' => '1.4.2-2.0.0',
            'mask' => '7.0.29-7.9.99',
            'news' => '9.2.0-9.9.99'
        ],
        'conflicts' => [
        ],
        'suggests' => [
            'eventnews ' => '5.0.0-5.9.99',
            'typo3_console' => '7.0.0-7.9.99',
            'typoscript_rendering' => '2.3.1-2.9.99',
            'powermail' => '8.4.0-9.9.99',
            'scriptmerger' => '7.1.0-8.9.99',
            'charts' => '1.1.0-2.9.99',
            'spreadsheets' => '3.2.0-3.9.99',
        ],
    ],
];