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

namespace DirkPersky\Theme\ViewHelpers;

use Closure;
use TYPO3\CMS\Core\Page\PageRenderer;
use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3\CMS\Core\Utility\PathUtility;
use TYPO3Fluid\Fluid\Core\Rendering\RenderingContextInterface;
use TYPO3Fluid\Fluid\Core\ViewHelper\AbstractViewHelper;
use TYPO3Fluid\Fluid\Core\ViewHelper\Traits\CompileWithRenderStatic;
use TYPO3\CMS\Core\MetaTag\MetaTagManagerRegistry;

class MetaViewHelper extends AbstractViewHelper
{

    use CompileWithRenderStatic;

    /**
     * Arguments initialization
     */
    public function initializeArguments()
    {
        $this->registerArgument('field', 'string', 'Meta Field', true);
    }

    /**
     * @param array $arguments
     * @param Closure $renderChildrenClosure
     * @param RenderingContextInterface $renderingContext
     * @return void
     */
    public static function renderStatic(array $arguments, Closure $renderChildrenClosure, RenderingContextInterface $renderingContext)
    {
        $option = null;
        // if path is set
        if ($arguments['field'] !== '') {
            // switch between options
            switch ($arguments['field']) {
                case 'url':
                    $request = $renderingContext->getRequest();
                    $option = $request->getRequestUri();
                    break;
                default:
                    // get Page Value
                    $option = $GLOBALS['TSFE']->page[$arguments['field']];
            }
        }
        // return options
        return $option;
    }

}