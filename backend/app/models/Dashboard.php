<?php

require_once __DIR__ . '/../../config/Database.php';

class Dashboard
{
    private $db;

    public function __construct()
    {
        $database =
            new Database();

        $this->db =
            $database->connect();
    }

    public function totalUsers()
    {
        $stmt =
            $this->db->query(
                "SELECT COUNT(*) AS total
                 FROM users"
            );

        return $stmt->fetch(
            PDO::FETCH_ASSOC
        )['total'];
    }

    public function totalCategories()
    {
        $stmt =
            $this->db->query(
                "SELECT COUNT(*) AS total
                 FROM categories"
            );

        return $stmt->fetch(
            PDO::FETCH_ASSOC
        )['total'];
    }

    public function totalProducts()
    {
        $stmt =
            $this->db->query(
                "SELECT COUNT(*) AS total
                 FROM products"
            );

        return $stmt->fetch(
            PDO::FETCH_ASSOC
        )['total'];
    }

    public function totalOrders()
    {
        $stmt =
            $this->db->query(
                "SELECT COUNT(*) AS total
                 FROM orders"
            );

        return $stmt->fetch(
            PDO::FETCH_ASSOC
        )['total'];
    }

    public function countOrdersByStatus($status)
    {
        $stmt =
            $this->db->prepare(
                "SELECT COUNT(*) AS total
                 FROM orders
                 WHERE status = ?"
            );

        $stmt->execute([
            $status
        ]);

        return $stmt->fetch(
            PDO::FETCH_ASSOC
        )['total'];
    }

    public function totalRevenue()
    {
        $stmt =
            $this->db->query(
                "SELECT
                    COALESCE(
                        SUM(total_amount),
                        0
                    ) AS revenue
                 FROM orders
                 WHERE status = 'delivered'"
            );

        return $stmt->fetch(
            PDO::FETCH_ASSOC
        )['revenue'];
    }
}