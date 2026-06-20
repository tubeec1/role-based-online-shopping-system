<?php

require_once __DIR__ . '/../services/DashboardService.php';
require_once __DIR__ . '/../middlewares/AuthMiddleware.php';

class DashboardController
{
    private $dashboardService;

    public function __construct()
    {
        $this->dashboardService =
            new DashboardService();
    }

    public function stats()
    {
        $decoded =
            AuthMiddleware::handle();

        $result =
            $this->dashboardService
                 ->stats(
                     $decoded
                 );

        echo json_encode(
            $result
        );
    }
}