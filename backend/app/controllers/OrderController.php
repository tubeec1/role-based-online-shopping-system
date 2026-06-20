<?php

require_once __DIR__ . '/../services/OrderService.php';
require_once __DIR__ . '/../middlewares/AuthMiddleware.php';

class OrderController
{
    private $orderService;

    public function __construct()
    {
        $this->orderService =
            new OrderService();
    }

    public function create()
    {
        $decoded =
            AuthMiddleware::handle();

        $data =
            json_decode(
                file_get_contents(
                    "php://input"
                ),
                true
            );

        $result =
            $this->orderService
                 ->create(
                     $decoded->email,
                     $data
                 );

        echo json_encode(
            $result
        );
    }
    public function myOrders()
{
    $decoded =
        AuthMiddleware::handle();

    $result =
        $this->orderService
             ->myOrders(
                 $decoded->email
             );

    echo json_encode(
        $result
    );
}

public function show($id)
{
    $decoded =
        AuthMiddleware::handle();

    $result =
        $this->orderService
             ->show(
                 $decoded->email,
                 $id
             );

    echo json_encode(
        $result
    );
}

public function getAll()
{
    $decoded =
        AuthMiddleware::handle();

    $result =
        $this->orderService
             ->getAllOrders(
                 $decoded
             );

    echo json_encode(
        $result
    );
}

public function updateStatus($id)
{
    $decoded =
        AuthMiddleware::handle();

    $result =
        $this->orderService
             ->updateStatus(
                 $decoded,
                 $id
             );

    echo json_encode(
        $result
    );
}
}