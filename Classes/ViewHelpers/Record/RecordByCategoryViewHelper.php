<?php

namespace DirkPersky\Theme\ViewHelpers\Record;

use Closure;

use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3Fluid\Fluid\Core\Rendering\RenderingContextInterface;
use TYPO3Fluid\Fluid\Core\ViewHelper\AbstractViewHelper;
use TYPO3Fluid\Fluid\Core\ViewHelper\Traits\CompileWithRenderStatic;

use TYPO3\CMS\Core\Database\ConnectionPool;

/**
 * ViewHelper to access database data
 */
class RecordByCategoryViewHelper extends AbstractViewHelper {
    use CompileWithRenderStatic;

    /**
     * Arguments initialization
     */
    public function initializeArguments()
    {
        $this->registerArgument('uid', 'string', 'UID', true);
        $this->registerArgument('table', 'string', 'Table', true);
        $this->registerArgument('orderBy', 'string', 'Order', true);
        $this->registerArgument('group', 'string', 'Group', false);
    }

    /**
     * @param array $arguments
     * @param Closure $renderChildrenClosure
     * @param RenderingContextInterface $renderingContext
     * @return void
     */
    public static function renderStatic(array $arguments, Closure $renderChildrenClosure, RenderingContextInterface $renderingContext)
    {
        $queryBuilder = GeneralUtility::makeInstance(ConnectionPool::class)->getQueryBuilderForTable('sys_category_record_mm');
        $queryBuilder->select('uid_foreign as uid')
            ->from('sys_category_record_mm')
            ->where(
                $queryBuilder->expr()->eq('uid_local', $arguments['uid']),
                $queryBuilder->expr()->eq('tablenames', $queryBuilder->createNamedParameter($arguments['table'])),
            );

        $statement = $queryBuilder->execute();
        $theList=[];
        while ($row = $statement->fetchAssociative()) {
            $theList[] = $row['uid'];
        }


        $queryBuilder = GeneralUtility::makeInstance(ConnectionPool::class)->getQueryBuilderForTable($arguments['table']);
        $queryBuilder->select('*')
            ->from($arguments['table'])
            ->where(
                $queryBuilder->expr()->in('uid', $theList),
                $queryBuilder->expr()->eq('hidden', 0),
                $queryBuilder->expr()->eq('deleted', 0),

            )
            ->orderBy($arguments['orderBy']);

        $statement = $queryBuilder->execute();
        $records=[];
        while ($row = $statement->fetchAssociative()) {
            if($arguments['group']) {
                $pid = $row[$arguments['group']];
                if(!isset($records[$pid])) $records[$pid] = [];
                $records[$pid][] = $row;
            } else  $records[] = $row;
        }

		return $records;
	}

}