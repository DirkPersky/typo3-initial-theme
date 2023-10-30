<?php
namespace DirkPersky\Theme\ViewHelpers\Media;

use Closure;
use TYPO3\CMS\Core\Page\AssetCollector;
use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3Fluid\Fluid\Core\Rendering\RenderingContextInterface;
use TYPO3Fluid\Fluid\Core\ViewHelper\AbstractViewHelper;
use TYPO3Fluid\Fluid\Core\ViewHelper\Traits\CompileWithRenderStatic;

/**
 * ViewHelper to access GP data
 */
class MasonryViewHelper extends AbstractViewHelper {

    use CompileWithRenderStatic;

    /**
     * Arguments initialization
     */
    public function initializeArguments()
    {
        parent::initializeArguments();
        $this->registerArgument('src', 'string', 'generated image', true);
    }

    /**
     * @param array $arguments
     * @param Closure $renderChildrenClosure
     * @param RenderingContextInterface $renderingContext
     * @return void
     */
    public static function renderStatic(array $arguments, Closure $renderChildrenClosure, RenderingContextInterface $renderingContext)
    {
        if(isset($arguments['src'])) {
            list($width, $height, $type, $attr) = getimagesize($arguments['src']);

            $ratio = $width/$height;

            switch ($ratio){
                case ($ratio > 2):
                    return 'wide';
                    break;
                case ($ratio <= 0.75):
                    return 'tall';
                    break;
                case ($ratio <= 1.1 and $ratio >= 0.9):
                    return 'big';
                    break;
                default:
                    return 'asd-'.$ratio;
            }


        } else {
            return '';
        }
    }

}