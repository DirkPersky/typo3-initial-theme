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
use Generator;
use RecursiveDirectoryIterator;
use RecursiveIteratorIterator;
use RegexIterator;
use RuntimeException;
use TYPO3\CMS\Core\Page\PageRenderer;
use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3\CMS\Core\Utility\PathUtility;
use TYPO3Fluid\Fluid\Core\Rendering\RenderingContextInterface;
use TYPO3Fluid\Fluid\Core\ViewHelper\AbstractViewHelper;
use TYPO3Fluid\Fluid\Core\ViewHelper\Traits\CompileWithRenderStatic;


class JavaScriptViewHelper extends AbstractViewHelper
{

    use CompileWithRenderStatic;

    /**
     * @param array $arguments
     * @param Closure $renderChildrenClosure
     * @param RenderingContextInterface $renderingContext
     * @return void
     */
    public static function renderStatic(array $arguments, Closure $renderChildrenClosure, RenderingContextInterface $renderingContext)
    {
        // if path is set
        if ($arguments['dir'] !== '') {
            // get Pagerender for adding js
            $pageRenderer = GeneralUtility::makeInstance(PageRenderer::class);
            // find files by URL
            $uri = PathUtility::getPublicResourceWebPath($arguments['dir']);
            // file Holder
            $files = [];
            // Loop Files
            foreach (static::getFiles(getcwd() . $uri, $arguments['files']) as $file) {
                $filePath = str_replace(getcwd(), '', $file->getPathname());
                // get file name
                $fileName = basename($filePath);
                $fileName = str_replace('.min.js', '', $fileName);
                // move jquery to first
                if (in_array($fileName, ['jquery', 'umbrella'])) {
                    $pageRenderer->addJsLibrary($fileName, $filePath);
                    continue;
                }
                // add to Holder
                $files[$fileName] = $filePath;
            }
            // sort files
            usort($files, function ($a, $b) {
                return (strlen(dirname($a)) >= strlen(dirname($b))) ? 1 : -1;
            });
            // loop files now
            foreach ($files as $filePath) {
                // set initial type
                $type = $arguments['files'];
                // has vendor path
                if (strpos($filePath, 'vendor') !== false) {
                    $type .= '-lib';
                }
                // case type rendering
                switch ($type) {
                    case 'js':
                        // add file
                        $pageRenderer->addJsFile($filePath);
                        break;
                    case 'js-lib':
                        $fileName = basename($filePath);
                        $fileName = str_replace(['.min.js','.js'], ['',''], $fileName);
                        // skip if jquery
                        if (!in_array($fileName, ['jquery', 'umbrella'])) {
                            // add files
                            $pageRenderer->addJsLibrary($fileName, $filePath);
                        }
                        break;
                }
            }
        }

    }

    /**
     * @param $path
     * @param $match
     * @return Generator
     */
    protected static function getFiles($path, $match): Generator
    {
        if (!is_dir($path)) {
            throw new RuntimeException("{$path} is not a directory ");
        }
        // regex Build
        $regex = '/\.' . $match . '$/';
        //
        $it = new RecursiveDirectoryIterator($path);
        $it = new RecursiveIteratorIterator($it);
        $it = new RegexIterator($it, $regex, RegexIterator::MATCH);

        yield from $it;
    }

    /**
     * Arguments initialization
     */
    public function initializeArguments()
    {
        $this->registerArgument('dir', 'string', 'Path to JS Files', true);
        $this->registerArgument('files', 'string', 'Matching File Extension', true);
    }

}