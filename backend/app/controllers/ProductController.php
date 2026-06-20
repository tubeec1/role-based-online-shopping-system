<?php

require_once __DIR__ . '/../services/ProductService.php';
require_once __DIR__ . '/../middlewares/AuthMiddleware.php';
require_once __DIR__ . '/../middlewares/StaffAdminMiddleware.php';

class ProductController
{
    private $productService;

    public function __construct()
    {
        $this->productService =
            new ProductService();
    }

    public function create()
    {
        $decoded =
            AuthMiddleware::handle();

        StaffAdminMiddleware::handle(
            $decoded
        );

        $result =
            $this->productService
                 ->create();

        echo json_encode(
            $result
        );
    }

    public function getAll()
{
    $result =
        $this->productService
             ->getAll();

    echo json_encode(
        $result
    );
}

public function show($id)
{
    $result =
        $this->productService
             ->show($id);

    echo json_encode(
        $result
    );
}

public function update($id)
{
    $decoded =
        AuthMiddleware::handle();

    StaffAdminMiddleware::handle(
        $decoded
    );

    $result =
        $this->productService
             ->update($id);

    echo json_encode(
        $result
    );
}
public function delete($id)
{
    $decoded =
        AuthMiddleware::handle();

    StaffAdminMiddleware::handle(
        $decoded
    );

    $result =
        $this->productService
             ->delete($id);

    echo json_encode(
        $result
    );
}

public function search()
{
    $result =
        $this->productService
             ->searchProducts();

    echo json_encode(
        $result
    );
}
public function getByCategory($categoryName)
{
    $result =
        $this->productService
             ->getProductsByCategoryName(
                 $categoryName
             );

    echo json_encode(
        $result
    );
}

public function latest()
{
    $result =
        $this->productService
             ->latestProducts();

    echo json_encode(
        $result
    );
}

public function lowStock()
{
    $decoded =
        AuthMiddleware::handle();

    if (
        !in_array(
            $decoded->role_id,
            [1, 2]
        )
    ) {

        http_response_code(403);

        echo json_encode([
            "success" => false,
            "message" => "Access Denied"
        ]);

        return;
    }

    $result =
        $this->productService
             ->lowStockProducts();

    echo json_encode(
        $result
    );
}
}