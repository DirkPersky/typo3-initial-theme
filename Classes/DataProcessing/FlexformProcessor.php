<?php

namespace DirkPersky\Theme\DataProcessing;

use B13\Container\Domain\Factory\PageView\Frontend\ContainerFactory;
use TYPO3\CMS\Core\Service\FlexFormService;
use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3\CMS\Frontend\ContentObject\ContentDataProcessor;
use TYPO3\CMS\Frontend\ContentObject\ContentObjectRenderer;
use TYPO3\CMS\Frontend\ContentObject\DataProcessorInterface;

class FlexformProcessor implements DataProcessorInterface
{

    /**
     * @var ContainerFactory
     */
    protected $containerFactory;

    /**
     * @var ContentDataProcessor
     */
    protected $contentDataProcessor;

    public function __construct(ContainerFactory $containerFactory = null, ContentDataProcessor $contentDataProcessor = null)
    {
        $this->containerFactory = $containerFactory ?? GeneralUtility::makeInstance(ContainerFactory::class);
        $this->contentDataProcessor = $contentDataProcessor ?? GeneralUtility::makeInstance(ContentDataProcessor::class);
    }

    /**
     * @param ContentObjectRenderer $cObj
     * @param array $contentObjectConfiguration
     * @param array $processorConfiguration
     * @param array $processedData
     * @return array
     */
    public function process(
        ContentObjectRenderer $cObj,
        array                 $contentObjectConfiguration,
        array                 $processorConfiguration,
        array                 $processedData
    )
    {
        $as = 'flexform';
        if ($processorConfiguration['as']) {
            $as = $processorConfiguration['as'];
        }
        $flexformString = $processedData['data']['pi_flexform'] ?? '';
        $flexform = null;
        if ($flexformString !== '') {
            $flexform = GeneralUtility::makeInstance(FlexFormService::class)->convertFlexFormContentToArray($flexformString);
        }
        $processedData[$as] = $flexform;
        return $processedData;
    }
}