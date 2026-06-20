<?php

require_once __DIR__ . '/../../config/Database.php';

class Order
{
    private $db;

    public function __construct()
    {
        $this->db = Database::connect();
    }

    public function create($data)
    {
        $stmt = $this->db->prepare(
            "INSERT INTO orders
            (
                user_id,
                phone,
                address,
                total_amount
            )
            VALUES
            (
                ?,?,?,?
            )"
        );

        $stmt->execute([
            $data['user_id'],
            $data['phone'],
            $data['address'],
            $data['total_amount']
        ]);

        return $this->db->lastInsertId();
    }


    public function getOrdersByUserId($userId)
{
    $stmt = $this->db->prepare(
        "SELECT *
         FROM orders
         WHERE user_id = ?
         ORDER BY id DESC"
    );

    $stmt->execute([
        $userId
    ]);

    return $stmt->fetchAll(
        PDO::FETCH_ASSOC
    );
}

public function findById($orderId)
{
    $stmt = $this->db->prepare(
        "SELECT *
         FROM orders
         WHERE id = ?"
    );

    $stmt->execute([
        $orderId
    ]);

    return $stmt->fetch(
        PDO::FETCH_ASSOC
    );
}

public function getAll()
{
    $stmt = $this->db->prepare(
        "SELECT
            o.*,
            u.full_name,
            u.email
         FROM orders o
         INNER JOIN users u
            ON o.user_id = u.id
         ORDER BY o.id DESC"
    );

    $stmt->execute();

    return $stmt->fetchAll(
        PDO::FETCH_ASSOC
    );
}

public function updateStatus($orderId, $status)
{
    $stmt = $this->db->prepare(
        "UPDATE orders
         SET status = ?
         WHERE id = ?"
    );

    return $stmt->execute([
        $status,
        $orderId
    ]);
}

}