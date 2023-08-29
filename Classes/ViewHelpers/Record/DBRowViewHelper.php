<?php

namespace DirkPersky\Theme\ViewHelpers\Record;

use Closure;
use TYPO3\CMS\Core\Database\ConnectionPool;
use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3Fluid\Fluid\Core\Rendering\RenderingContextInterface;
use TYPO3Fluid\Fluid\Core\ViewHelper\AbstractViewHelper;
use TYPO3Fluid\Fluid\Core\ViewHelper\Traits\CompileWithRenderStatic;

/**
 * ViewHelper to access database data
 */
class DBRowViewHelper extends AbstractViewHelper {
    use CompileWithRenderStatic;

    /**
     * Arguments initialization
     */
    public function initializeArguments()
    {
        $this->registerArgument('table', 'string', 'Table', true);
        $this->registerArgument('field', 'string', 'Field', true);
        $this->registerArgument('condition', 'string', 'UID', false);
    }

    /**
     * @param array $arguments
     * @param Closure $renderChildrenClosure
     * @param RenderingContextInterface $renderingContext
     * @return void
     */
    public static function renderStatic(array $arguments, Closure $renderChildrenClosure, RenderingContextInterface $renderingContext)
    {
        $queryBuilder = GeneralUtility::makeInstance(ConnectionPool::class)->getQueryBuilderForTable($arguments['table']);
        $queryBuilder->select('*')
            ->from($arguments['table']);

        if($arguments['condition']){
            foreach($arguments['condition'] as $key=>$value){
                $queryBuilder->where(
                    $queryBuilder->expr()->eq($key, $queryBuilder->createNamedParameter($value)),
                );
            }
        }

        $statement = $queryBuilder->execute();
        $data=[];
        while ($row = $statement->fetchAssociative()) {
            $data[] = $row;
        }

        if($arguments['field']) return $data[0][$arguments['field']];
        else return $data;
	}
}