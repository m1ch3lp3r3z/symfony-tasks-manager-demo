<?php

namespace ApiBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;

use ApiBundle\Repository\TaskRepository;
use ApiBundle\Entity\Task;

class TaskController extends ApiController
{
    protected function getModel()
    {
        return 'Task';
    }

    /**
     * @Route("/task", name="list")
     * @Method({"GET"})
     */
    public function listAction()
    {
        return $this->list();
    }

    /**
     * @Route("/task/{id}", name="show")
     * @Method({"GET"})
     */
    public function showAction()
    {
        return parent::doList();
    }

    protected function validate(\ApiBundle\Entity\ApiEntityInterface $object)
    {
        if ($object->getStatus() && !in_array($object->getStatus(), [Task::STATUS_PENDING, Task::STATUS_DONE])) {
            throw new \UnexpectedValueException('Invalid value for Status field', Response::HTTP_BAD_REQUEST);
        }
    }

    /**
     * @Route("/task", name="create")
     * @Method({"POST"})
     */
    public function createAction()
    {
        return $this->create();
    }

    /**
     * @Route("/task/{id}", name="edit", requirements={
     *     "id": "\d+"
     * })
     * @Method({"PUT"})
     */
    public function editAction($id)
    {
        return $this->edit($id);
    }

    /**
     * @Route("/task/{id}", name="delete", requirements={
     *     "id": "\d+"
     * })
     * @Method({"DELETE"})
     */
    public function deleteAction($id)
    {
        return $this->delete($id);
    }
}
