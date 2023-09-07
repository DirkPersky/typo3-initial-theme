<?php
namespace DirkPersky\Theme\ViewHelpers\Data;

use Closure;
use TYPO3\CMS\Core\Page\AssetCollector;
use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3Fluid\Fluid\Core\Rendering\RenderingContextInterface;
use TYPO3Fluid\Fluid\Core\ViewHelper\AbstractViewHelper;
use TYPO3Fluid\Fluid\Core\ViewHelper\Traits\CompileWithRenderStatic;

/**
 * ViewHelper to access GP data
 */
class ImageViewHelper extends AbstractViewHelper {

    use CompileWithRenderStatic;

    /**
     * Arguments initialization
     */
    public function initializeArguments()
    {
        parent::initializeArguments();
        $this->registerArgument('property', 'string', 'either width or height', true);
        $this->registerArgument('image', 'string', 'generated image', true);
    }

    /**
     * @param array $arguments
     * @param Closure $renderChildrenClosure
     * @param RenderingContextInterface $renderingContext
     * @return void
     */
    public static function renderStatic(array $arguments, Closure $renderChildrenClosure, RenderingContextInterface $renderingContext)
    {
        if($arguments['image'] instanceof \TYPO3\CMS\Core\Resource\FileReference) {
            $data = $arguments['image']->toArray();
            if(isset($data[$arguments['property']])) return $data[$arguments['property']];
        } else {
            return '';
        }
    }

}