<?php

namespace ApiBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\FixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

use ApiBundle\Entity\Task;

class LoadTaskData implements FixtureInterface
{
    public function load(ObjectManager $manager)
    {
        $task = new Task();
        $task->setTitle('Implement API endpoint to create tasks');
        $task->setDescription('Implement API endpoint to create tasks');
        $task->setStatus(Task::STATUS_DONE);
        $manager->persist($task);


        $task = new Task();
        $task->setTitle('Implement API endpoint to update tasks');
        $task->setDescription('Implement API endpoint to update tasks');
        $task->setStatus(Task::STATUS_DONE);
        $manager->persist($task);

        $task = new Task();
        $task->setTitle('Implement API endpoint to list tasks');
        $task->setDescription('Implement API endpoint to list tasks');
        $task->setStatus(Task::STATUS_DONE);
        $manager->persist($task);

        $task = new Task();
        $task->setTitle('Implement API endpoint to delete tasks');
        $task->setDescription('Implement API endpoint to delete tasks');
        $task->setStatus(Task::STATUS_DONE);
        $manager->persist($task);

        $task = new Task();
        $task->setTitle('Implement UI to manage tasks');
        $task->setDescription('Implement UI to manage tasks');
        $task->setStatus(Task::STATUS_DONE);
        $manager->persist($task);

        $task = new Task();
        $task->setTitle('Implement more tests to increase converage');
        $task->setDescription('Implement more tests to increase coverage');
        $task->setStatus(Task::STATUS_PENDING);
        $manager->persist($task);

        $manager->flush();
    }
}
