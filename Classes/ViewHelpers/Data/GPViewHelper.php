<?php
namespace DirkPersky\Theme\ViewHelpers\Data;

use Closure;
use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3Fluid\Fluid\Core\Rendering\RenderingContextInterface;
use TYPO3Fluid\Fluid\Core\ViewHelper\AbstractViewHelper;
use TYPO3Fluid\Fluid\Core\ViewHelper\Traits\CompileWithRenderStatic;

/**
 * ViewHelper to access GP data
 */
class GPViewHelper extends AbstractViewHelper {

    use CompileWithRenderStatic;

    /**
     * Arguments initialization
     */
    public function initializeArguments()
    {
        $this->registerArgument('gp', 'string', 'Query', false);
        $this->registerArgument('get', 'string', 'Query', false);
        $this->registerArgument('post', 'string', 'Query', false);
    }

    /**
     * @param array $arguments
     * @param Closure $renderChildrenClosure
     * @param RenderingContextInterface $renderingContext
     * @return void
     */
    public static function renderStatic(array $arguments, Closure $renderChildrenClosure, RenderingContextInterface $renderingContext)
    {
		if($arguments['gp']) return GeneralUtility::_GP($arguments['gp']);
		if($arguments['get']) return GeneralUtility::_GET($arguments['get']);
		if($arguments['post']) return GeneralUtility::_POST($arguments['post']);
		return "";
	}

}