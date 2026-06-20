<?php

require_once __DIR__ . '/../../config/Database.php';

class OrderItem
{
    private $db;

    public function __construct()
    {
        $this->db = Database::connect();
    }

    public function create($data)
    {
        $stmt = $this->db->prepare(
            "INSERT INTO order_items
            (
                order_id,
                product_id,
                quantity,
                price
            )
            VALUES
            (
                ?,?,?,?
            )"
        );

        return $stmt->execute([
            $data['order_id'],
            $data['product_id'],
            $data['quantity'],
            $data['price']
        ]);
    }

    public function getOrderItems($orderId)
{
    $stmt = $this->db->prepare(
        "SELECT
            oi.id AS order_item_id,
            oi.product_id,
            oi.quantity,
            oi.price,
            p.name AS product_name,
            p.image AS product_image
         FROM order_items oi
         INNER JOIN products p
            ON oi.product_id = p.id
         WHERE oi.order_id = ?"
    );

    $stmt->execute([
        $orderId
    ]);

    return $stmt->fetchAll(
        PDO::FETCH_ASSOC
    );
}
}