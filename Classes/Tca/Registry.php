<?php

declare(strict_types=1);

namespace DirkPersky\Theme\Tca;

class Registry extends \B13\Container\Tca\Registry
{
    /**
     * @param ContainerConfiguration $containerConfiguration
     */
    public function configureContainer($containerConfiguration): void
    {
        parent::configureContainer($containerConfiguration);
        // Overwrite Flexform Config
        if ($containerConfiguration->getFlexformDS() !== '') {
            $GLOBALS['TCA']['tt_content']['types'][$containerConfiguration->getCType()]['showitem'] = '
                --div--;LLL:EXT:core/Resources/Private/Language/Form/locallang_tabs.xlf:general,
                    --palette--;;general,
                    --palette--;;headers, pi_flexform,
                --div--;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:tabs.appearance,
                    --palette--;;frames,
                    --palette--;;appearanceLinks,
                --div--;LLL:EXT:core/Resources/Private/Language/Form/locallang_tabs.xlf:language,
                    --palette--;;language,
                --div--;LLL:EXT:core/Resources/Private/Language/Form/locallang_tabs.xlf:access,
                    --palette--;;hidden,
                    --palette--;;access,
                --div--;LLL:EXT:core/Resources/Private/Language/Form/locallang_tabs.xlf:categories,
                    categories,
                --div--;LLL:EXT:core/Resources/Private/Language/Form/locallang_tabs.xlf:notes,
                    rowDescription,
                --div--;LLL:EXT:core/Resources/Private/Language/Form/locallang_tabs.xlf:extended,';

            $GLOBALS['TCA']['tt_content']['columns']['pi_flexform']['config']['ds']['*,' . $containerConfiguration->getCType()] = $containerConfiguration->getFlexformDS();
        }
    }
}
