<?php

require_once __DIR__ . '/../models/Product.php';
require_once __DIR__ . '/../models/Category.php';

class ProductService
{
    private $productModel;
    private $categoryModel;

    public function __construct()
    {
        $this->productModel =
            new Product();

        $this->categoryModel =
            new Category();
    }

    public function create()
    {
        $category =
            $this->categoryModel
                 ->findById(
                     $_POST['category_id']
                 );

        if (!$category) {

            return [
                "success" => false,
                "message" =>
                    "Category not found"
            ];
        }

        $image = null;

        if (
            isset($_FILES['image']) &&
            $_FILES['image']['error'] === 0
        ) {

            $extension =
                pathinfo(
                    $_FILES['image']['name'],
                    PATHINFO_EXTENSION
                );

            $fileName =
                uniqid('product_')
                . time()
                . '.'
                . $extension;

            $uploadDirectory =
                __DIR__
                . '/../../public/storage/uploads/products/';

            if (
                !is_dir(
                    $uploadDirectory
                )
            ) {

                mkdir(
                    $uploadDirectory,
                    0777,
                    true
                );
            }

            $uploadPath =
                $uploadDirectory
                . $fileName;

            move_uploaded_file(
                $_FILES['image']['tmp_name'],
                $uploadPath
            );

            $image =
                'storage/uploads/products/'
                . $fileName;
        }

        $productData = [

            'category_id' =>
                $_POST['category_id'],

            'name' =>
                $_POST['name'],

            'description' =>
                $_POST['description'],

            'price' =>
                $_POST['price'],

            'stock' =>
                $_POST['stock'],

            'image' =>
                $image
        ];

        $this->productModel
             ->create(
                 $productData
             );

        return [

            "success" => true,

            "message" =>
                "Product created successfully"
        ];
    }

    public function getAll()
{
    $products =
        $this->productModel
             ->getAll();

    $formattedProducts = [];

    foreach ($products as $product) {

        $formattedProducts[] = [

            "id" =>
                $product['id'],

            "name" =>
                $product['name'],

            "description" =>
                $product['description'],

            "price" =>
                $product['price'],

            "stock" =>
                $product['stock'],

            "image" =>
                $product['image'],

            "created_at" =>
                $product['created_at'],

            "category" => [

                "id" =>
                    $product['category_id'],

                "name" =>
                    $product['category_name'],

                "description" =>
                    $product['category_description'],

                "image" =>
                    $product['category_image']
            ]
        ];
    }

    return [

        "success" => true,

        "message" =>
            "Products Retrieved Successfully",

        "data" =>
            $formattedProducts
    ];
}

public function show($id)
{
    $product =
        $this->productModel
             ->findById($id);

    if (!$product) {

        return [
            "success" => false,
            "message" => "Product not found"
        ];
    }

    return [

        "success" => true,

        "message" =>
            "Product Retrieved Successfully",

        "data" => [

            "id" =>
                $product['id'],

            "name" =>
                $product['name'],

            "description" =>
                $product['description'],

            "price" =>
                $product['price'],

            "stock" =>
                $product['stock'],

            "image" =>
                $product['image'],

            "created_at" =>
                $product['created_at'],

            "category" => [

                "id" =>
                    $product['category_id'],

                "name" =>
                    $product['category_name'],

                "description" =>
                    $product['category_description'],

                "image" =>
                    $product['category_image']
            ]
        ]
    ];
}

public function update($id)
{
    $product =
        $this->productModel
             ->findById($id);

    if (!$product) {

        return [
            "success" => false,
            "message" => "Product not found"
        ];
    }

    $categoryId =
        $_POST['category_id']
        ?? $product['category_id'];

    $category =
        $this->categoryModel
             ->findById($categoryId);

    if (!$category) {

        return [
            "success" => false,
            "message" => "Category not found"
        ];
    }

    $name =
        $_POST['name']
        ?? $product['name'];

    $description =
        $_POST['description']
        ?? $product['description'];

    $price =
        $_POST['price']
        ?? $product['price'];

    $stock =
        $_POST['stock']
        ?? $product['stock'];

    $image =
        $product['image'];

    if (
        isset($_FILES['image']) &&
        $_FILES['image']['error'] === 0
    ) {

        $extension =
            pathinfo(
                $_FILES['image']['name'],
                PATHINFO_EXTENSION
            );

        $fileName =
            uniqid('product_')
            . time()
            . '.'
            . $extension;

        $uploadDirectory =
            __DIR__
            . '/../../public/storage/uploads/products/';

        if (!is_dir($uploadDirectory)) {

            mkdir(
                $uploadDirectory,
                0777,
                true
            );
        }

        $uploadPath =
            $uploadDirectory
            . $fileName;

        move_uploaded_file(
            $_FILES['image']['tmp_name'],
            $uploadPath
        );

        $image =
            'storage/uploads/products/'
            . $fileName;
    }

    $productData = [

        'category_id' => $categoryId,
        'name' => $name,
        'description' => $description,
        'price' => $price,
        'stock' => $stock,
        'image' => $image
    ];

    $this->productModel
         ->update(
             $id,
             $productData
         );

    return [

        "success" => true,

        "message" =>
            "Product updated successfully",

        "data" =>
            $this->productModel
                 ->findById($id)
    ];
}
public function delete($id)
{
    $product =
        $this->productModel
             ->findById($id);

    if (!$product) {

        return [
            "success" => false,
            "message" => "Product not found"
        ];
    }

    if (
        !empty($product['image'])
    ) {

        $imagePath =
            __DIR__
            . '/../../public/'
            . $product['image'];

        if (file_exists($imagePath)) {

            unlink($imagePath);
        }
    }

    $this->productModel
         ->delete($id);

    return [
        "success" => true,
        "message" =>
            "Product deleted successfully"
    ];
}
}