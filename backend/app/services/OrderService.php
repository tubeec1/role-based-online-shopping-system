<?php

require_once __DIR__ . '/../models/Order.php';
require_once __DIR__ . '/../models/OrderItem.php';
require_once __DIR__ . '/../models/Product.php';
require_once __DIR__ . '/../models/User.php';

class OrderService
{
    private $orderModel;
    private $orderItemModel;
    private $productModel;
    private $userModel;

    public function __construct()
    {
        $this->orderModel =
            new Order();

        $this->orderItemModel =
            new OrderItem();

        $this->productModel =
            new Product();

        $this->userModel =
            new User();
    }

    public function create($email, $data)
    {
        if (empty($data['phone'])) {

            return [
                "success" => false,
                "message" => "Phone is required"
            ];
        }

        if (empty($data['address'])) {

            return [
                "success" => false,
                "message" => "Address is required"
            ];
        }

        if (
            empty($data['items']) ||
            !is_array($data['items'])
        ) {

            return [
                "success" => false,
                "message" => "Order items are required"
            ];
        }

        $user =
            $this->userModel
                 ->findByEmail($email);

        if (!$user) {

            return [
                "success" => false,
                "message" => "User not found"
            ];
        }

        $totalAmount = 0;

        foreach ($data['items'] as $item) {

            if (
                empty($item['product_id']) ||
                empty($item['quantity'])
            ) {

                return [
                    "success" => false,
                    "message" =>
                        "Product ID and quantity are required"
                ];
            }

            $product =
                $this->productModel
                     ->findProductById(
                         $item['product_id']
                     );

            if (!$product) {

                return [
                    "success" => false,
                    "message" =>
                        "Product not found"
                ];
            }

            if (
                $product['stock']
                < $item['quantity']
            ) {

                return [
                    "success" => false,
                    "message" =>
                        $product['name']
                        . " stock not available"
                ];
            }

            $totalAmount +=
                (
                    $product['price']
                    * $item['quantity']
                );
        }

        $orderId =
            $this->orderModel
                 ->create([

                    "user_id" =>
                        $user['id'],

                    "phone" =>
                        $data['phone'],

                    "address" =>
                        $data['address'],

                    "total_amount" =>
                        $totalAmount
                 ]);

        foreach ($data['items'] as $item) {

            $product =
                $this->productModel
                     ->findProductById(
                         $item['product_id']
                     );

            $this->orderItemModel
                 ->create([

                    "order_id" =>
                        $orderId,

                    "product_id" =>
                        $item['product_id'],

                    "quantity" =>
                        $item['quantity'],

                    "price" =>
                        $product['price']
                 ]);
        }

        return [

            "success" => true,

            "message" =>
                "Order created successfully",

            "data" => [

                "order_id" =>
                    $orderId,

                "status" =>
                    "pending",

                "total_amount" =>
                    $totalAmount,

                "payment_number" =>
                    "618994037",

                "payment_method" =>
                    "EVC Plus",

                "note" =>
                    "Send payment screenshot to WhatsApp 618994037"
            ]
        ];
    }

    public function myOrders($email)
    {
        $user =
            $this->userModel
                 ->findByEmail($email);

        if (!$user) {

            return [
                "success" => false,
                "message" => "User not found"
            ];
        }

        $orders =
            $this->orderModel
                 ->getOrdersByUserId(
                     $user['id']
                 );

        foreach ($orders as &$order) {

            $order['order_id'] =
                $order['id'];

            unset($order['id']);
            unset($order['user_id']);

            $items =
                $this->orderItemModel
                     ->getOrderItems(
                         $order['order_id']
                     );

            $totalItems = 0;

            foreach ($items as &$item) {

                $item['subtotal'] =
                    $item['price']
                    * $item['quantity'];

                $totalItems +=
                    $item['quantity'];
            }

            $order['total_items'] =
                $totalItems;

            $order['items'] =
                $items;
        }

        return [

            "success" => true,

            "message" =>
                "My Orders Retrieved Successfully",

            "data" =>
                $orders
        ];
    }


    public function show($email, $orderId)
{
    $user =
        $this->userModel
             ->findByEmail($email);

    if (!$user) {

        return [
            "success" => false,
            "message" => "User not found"
        ];
    }

    $order =
        $this->orderModel
             ->findById(
                 $orderId
             );

    if (!$order) {

        return [
            "success" => false,
            "message" => "Order not found"
        ];
    }

    if (
        $order['user_id']
        != $user['id']
    ) {

        return [
            "success" => false,
            "message" => "Unauthorized access"
        ];
    }

    $items =
        $this->orderItemModel
             ->getOrderItems(
                 $orderId
             );

    $totalItems = 0;

    foreach ($items as &$item) {

        $item['subtotal'] =
            $item['price']
            * $item['quantity'];

        $totalItems +=
            $item['quantity'];
    }

    $response = [

        "order_id" =>
            $order['id'],

        "phone" =>
            $order['phone'],

        "address" =>
            $order['address'],

        "total_amount" =>
            $order['total_amount'],

        "status" =>
            $order['status'],

        "created_at" =>
            $order['created_at'],

        "total_items" =>
            $totalItems,

        "items" =>
            $items
    ];

    return [

        "success" => true,

        "message" =>
            "Order Retrieved Successfully",

        "data" =>
            $response
    ];
}

public function getAllOrders($decoded)
{
    if (
        $decoded->role_id != 1 &&
        $decoded->role_id != 2
    ) {

        return [
            "success" => false,
            "message" => "Access denied"
        ];
    }

    $orders =
        $this->orderModel
             ->getAll();

    foreach ($orders as &$order) {

        $order['order_id'] =
            $order['id'];

        unset($order['id']);

        $items =
            $this->orderItemModel
                 ->getOrderItems(
                     $order['order_id']
                 );

        $totalItems = 0;

        foreach ($items as &$item) {

            $item['subtotal'] =
                $item['price']
                * $item['quantity'];

            $totalItems +=
                $item['quantity'];
        }

        $order['total_items'] =
            $totalItems;

        $order['customer'] = [

            "id" =>
                $order['user_id'],

            "full_name" =>
                $order['full_name'],

            "email" =>
                $order['email']
        ];

        unset($order['full_name']);
        unset($order['email']);

        $order['items'] =
            $items;
    }

    return [

        "success" => true,

        "message" =>
            "Orders Retrieved Successfully",

        "data" =>
            $orders
    ];
}

public function updateStatus(
    $decoded,
    $orderId
)
{
    if (
        $decoded->role_id != 1 &&
        $decoded->role_id != 2
    ) {

        return [
            "success" => false,
            "message" => "Access denied"
        ];
    }

    $data =
        json_decode(
            file_get_contents(
                "php://input"
            ),
            true
        );

    $allowedStatuses = [

        'pending',
        'paid',
        'processing',
        'delivered',
        'cancelled'
    ];

    if (
        empty($data['status'])
    ) {

        return [
            "success" => false,
            "message" => "Status is required"
        ];
    }

    if (
        !in_array(
            $data['status'],
            $allowedStatuses
        )
    ) {

        return [
            "success" => false,
            "message" => "Invalid status"
        ];
    }

    $order =
        $this->orderModel
             ->findById(
                 $orderId
             );

    if (!$order) {

        return [
            "success" => false,
            "message" => "Order not found"
        ];
    }

    if (
        $order['status'] === 'delivered'
    ) {

        return [
            "success" => false,
            "message" =>
                "Order already delivered"
        ];
    }

    if (
        $data['status'] === 'delivered'
    ) {

        $items =
            $this->orderItemModel
                 ->getOrderItems(
                     $orderId
                 );

        foreach ($items as $item) {

            $product =
                $this->productModel
                     ->findProductById(
                         $item['product_id']
                     );

            $newStock =
                $product['stock']
                - $item['quantity'];

            $this->productModel
                 ->updateStock(
                     $item['product_id'],
                     $newStock
                 );
        }
    }

    $this->orderModel
         ->updateStatus(
             $orderId,
             $data['status']
         );

    return [

        "success" => true,

        "message" =>
            "Order status updated successfully",

        "data" => [

            "order_id" =>
                $orderId,

            "status" =>
                $data['status']
        ]
    ];
}
}