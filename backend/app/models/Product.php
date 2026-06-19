<?php

require_once __DIR__ . '/../../config/Database.php';

class Product
{
    private $db;

    public function __construct()
    {
        $this->db =
            Database::connect();
    }

    public function create($data)
    {
        $stmt =
            $this->db->prepare(
                "INSERT INTO products
                (
                    category_id,
                    name,
                    description,
                    price,
                    stock,
                    image
                )
                VALUES
                (
                    ?,?,?,?,?,?
                )"
            );

        return $stmt->execute([
            $data['category_id'],
            $data['name'],
            $data['description'],
            $data['price'],
            $data['stock'],
            $data['image']
        ]);
    }

    public function getAll()
{
    $stmt = $this->db->prepare(
        "SELECT

            p.id,
            p.name,
            p.description,
            p.price,
            p.stock,
            p.image,
            p.created_at,

            c.id AS category_id,
            c.name AS category_name,
            c.description AS category_description,
            c.image AS category_image

        FROM products p

        INNER JOIN categories c
        ON p.category_id = c.id

        ORDER BY p.id DESC"
    );

    $stmt->execute();

    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

public function findById($id)
{
    $stmt = $this->db->prepare(
        "SELECT

            p.id,
            p.category_id,
            p.name,
            p.description,
            p.price,
            p.stock,
            p.image,
            p.created_at,

            c.name AS category_name,
            c.description AS category_description,
            c.image AS category_image

        FROM products p

        INNER JOIN categories c
        ON p.category_id = c.id

        WHERE p.id = ?"
    );

    $stmt->execute([$id]);

    return $stmt->fetch(PDO::FETCH_ASSOC);
}

public function update($id, $data)
{
    $stmt = $this->db->prepare(
        "UPDATE products
         SET
            category_id = ?,
            name = ?,
            description = ?,
            price = ?,
            stock = ?,
            image = ?
         WHERE id = ?"
    );

    return $stmt->execute([
        $data['category_id'],
        $data['name'],
        $data['description'],
        $data['price'],
        $data['stock'],
        $data['image'],
        $id
    ]);
}
public function delete($id)
{
    $stmt = $this->db->prepare(
        "DELETE FROM products
         WHERE id = ?"
    );

    return $stmt->execute([$id]);
}
}