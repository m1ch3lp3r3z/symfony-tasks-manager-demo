<?php

namespace ApiBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;

use ApiBundle\Repository\TaskRepository;

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
