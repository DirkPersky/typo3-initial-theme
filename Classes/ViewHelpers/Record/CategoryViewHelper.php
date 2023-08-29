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
class CategoryViewHelper extends AbstractViewHelper {
    use CompileWithRenderStatic;


    /**
     * Arguments initialization
     */
    public function initializeArguments()
    {
        $this->registerArgument('uid', 'string', 'UID', true);
        $this->registerArgument('table', 'string', 'Table', true);
    }


    /**
     * @param array $arguments
     * @param Closure $renderChildrenClosure
     * @param RenderingContextInterface $renderingContext
     * @return void
     */
    public static function renderStatic(array $arguments, Closure $renderChildrenClosure, RenderingContextInterface $renderingContext)
    {
        $arguments['fieldname'] = 'categories';
        $uidForeign = $arguments['uid'];

        $queryBuilder = GeneralUtility::makeInstance(ConnectionPool::class)->getQueryBuilderForTable('sys_category_record_mm');
        $queryBuilder->select('uid_local')
            ->from('sys_category_record_mm')
            ->where(
                $queryBuilder->expr()->eq('fieldname', $queryBuilder->createNamedParameter($arguments['fieldname'])),
                $queryBuilder->expr()->eq('uid_foreign', $arguments['uid']),
                $queryBuilder->expr()->eq('tablenames', $queryBuilder->createNamedParameter($arguments['table'])),
            );

        $statement = $queryBuilder->execute();
        $theList=[];
        while ($row = $statement->fetchAssociative()) {
            $theList[] = $row['uid_local'];
        }
        return $theList;
    }
}