<?php
declare(strict_types=1);

namespace DirkPersky\Theme\EventListener;

use Brotkrueml\Schema\Event\RegisterAdditionalTypePropertiesEvent;
use Brotkrueml\Schema\Model\Type\Person;

final class AdditionalPropertiesForSearch
{
    public function __invoke(RegisterAdditionalTypePropertiesEvent $event): void
    {
        if ($event->getType() === SearchAction::class) {
            $event->registerAdditionalProperty('query-input');
        }
    }
}