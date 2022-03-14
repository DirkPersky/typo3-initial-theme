<?php
namespace DirkPersky\Theme\Domain\Model;

/**
 * File Reference
 */
class FileReference extends \TYPO3\CMS\Extbase\Domain\Model\FileReference
{
    /**
     * @var int
     */
    protected $uidLocal;

    /**
     * @var string
     */
    protected $title;

    /**
     * @var string
     */
    protected $description;

    /**
     * @var string
     */
    protected $alternative;

    /**
     * @var string
     */
    protected $link;

    /**
     * @var string
     */
    protected $mimeType;

    /**
     * Set File uid
     *
     * @param int $fileUid
     */
    public function setFileUid($fileUid)
    {
        $this->uidLocal = $fileUid;
    }

    /**
     * Get File UID
     *
     * @return int
     */
    public function getFileUid()
    {
        return $this->uidLocal;
    }

    /**
     * Set alternative
     *
     * @param string $alternative
     */
    public function setAlternative($alternative)
    {
        $this->alternative = $alternative;
    }

    /**
     * Get alternative
     *
     * @return string
     */
    public function getAlternative()
    {
        return $this->alternative !== null ? $this->alternative : $this->getOriginalResource()->getAlternative();
    }

    /**
     * Set description
     *
     * @param string $description
     */
    public function setDescription($description)
    {
        $this->description = $description;
    }

    /**
     * Get description
     *
     * @return string
     */
    public function getDescription()
    {
        return $this->description !== null ? $this->description : $this->getOriginalResource()->getDescription();
    }

    /**
     * Set link
     *
     * @param string $link
     */
    public function setLink($link)
    {
        $this->link = $link;
    }

    /**
     * Get link
     *
     * @return mixed
     */
    public function getLink()
    {
        return $this->link !== null ? $this->link : $this->getOriginalResource()->getLink();
    }

    /**
     * Set title
     *
     * @param string $title
     */
    public function setTitle($title)
    {
        $this->title = $title;
    }

    /**
     * Get title
     *
     * @return string
     */
    public function getTitle()
    {
        return $this->title !== null ? $this->title : $this->getOriginalResource()->getTitle();
    }

    /**
     * Get title
     *
     * @return string
     */
    public function getMimeType()
    {
        return $this->mimeType !== null ? $this->mimeType : $this->getOriginalResource()->getMimeType();
    }
}
