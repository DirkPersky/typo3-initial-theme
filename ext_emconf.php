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
            'typo3' => '12.4.7-12.99.99',
            'ws_scss' => '12.0.3-12.9.99',
            'vhs' => '7.0.0-7.9.99',
            'mask' => '8.3.7-8.9.99',
            'rte_ckeditor_fontawesome' => '12.1.0-12.9.99',
            'dp_cookieconsent' => '12.0.0-12.9.99',
            'news' => '11.2.0-11.9.99',
            'container' => '2.3.1-3.0.0',
            'cs_seo' => '8.1.0-8.9.99',
            'min' => '3.0.1-3.9.99',
            'schema' => "3.4.0-3.9.99",
        ],
        'conflicts' => [
        ],
        'suggests' => [
            'http2' => '2.0.0-2.9.99',
            'ai_seo_helper' => '0.6.0-0.9.99',
            'content_defender' => '3.4.1-3.9.9',
            'eventnews ' => '5.0.0-5.9.99',
            'typo3_console' => '7.1.2-7.9.99',
            'charts' => '3.0.0-3.9.99',
            'spreadsheets' => '4.0.0-4.9.99',
            'ke_search ' => '5.1.2-5.9.99',
            'mask_kesearch_indexer ' => '3.0.2-3.9.99'
        ],
    ],
];