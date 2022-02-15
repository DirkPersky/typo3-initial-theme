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

namespace DirkPersky\Theme\ViewHelpers\Media;

use Closure;
use TYPO3\CMS\Core\Page\PageRenderer;
use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3\CMS\Core\Utility\PathUtility;
use TYPO3Fluid\Fluid\Core\Rendering\RenderingContextInterface;
use TYPO3Fluid\Fluid\Core\ViewHelper\AbstractViewHelper;
use TYPO3Fluid\Fluid\Core\ViewHelper\Traits\CompileWithRenderStatic;
use TYPO3\CMS\Core\MetaTag\MetaTagManagerRegistry;

class CropViewHelper extends AbstractViewHelper
{

    use CompileWithRenderStatic;

    /**
     * Arguments initialization
     */
    public function initializeArguments()
    {
        $this->registerArgument('image', 'mixed', 'FILE Referenze Object', true);
    }

    /**
     * @param array $arguments
     * @param Closure $renderChildrenClosure
     * @param RenderingContextInterface $renderingContext
     * @return void
     */
    public static function renderStatic(array $arguments, Closure $renderChildrenClosure, RenderingContextInterface $renderingContext)
    {
        if($arguments['image'] instanceof \TYPO3\CMS\Core\Resource\FileReference){
            $image = $arguments['image'];
            // get crop
            $crop = $image->getReferenceProperty('crop');
            // return as object
            return json_decode($crop);
        }
        // return options
        return null;
    }

}