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

namespace DirkPersky\Theme\DataProcessing\Charts\Library;

use Hoogi91\Charts\DataProcessing\Charts\LibraryInterface;
use Hoogi91\Charts\Domain\Model\ChartData;
use TYPO3\CMS\Core\Page\PageRenderer;

class ChartJs extends \Hoogi91\Charts\DataProcessing\Charts\Library\ChartJs
{

    protected function getJavascriptAssetsToLoad(): array
    {
        return [        ];
    }



    public function getEntityJavascript(
        string $chartIdentifier,
        string $chartType,
        ChartData $chartEntity,
        PageRenderer $pageRenderer = null
    ): string {
        // check if labels and datasets are not empty ;)
        $labels = $chartEntity->getLabelList();
        $datasets = $chartEntity->getDatasetList();
        if (empty($labels) || empty($datasets)) {
            return '';
        }

        // build datasets for current entity to insert in javascript below
        $datasets = $this->buildEntityDatasetsForJavascript($datasets, $chartEntity);

        // create standardized initialization and dataset/labels code
        $initCode = "";
        $initCode .= "window['Hoogi91.chartsData'] = window['Hoogi91.chartsData']  || {};";
        /** @psalm-suppress InternalMethod */
        $codeIdentifier = sprintf('chartsData%d', $chartEntity->getUid());
        $code = vsprintf(
            "window['Hoogi91.chartsData']['%s'] = {labels: %s, datasets: %s};",
            [
                $codeIdentifier,
                json_encode($labels, JSON_THROW_ON_ERROR),
                json_encode($datasets, JSON_THROW_ON_ERROR),
            ]
        );

        return $initCode . $code;
    }

}
