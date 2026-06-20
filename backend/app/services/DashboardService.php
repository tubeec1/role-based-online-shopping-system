<?php

require_once __DIR__ . '/../models/Dashboard.php';

class DashboardService
{
    private $dashboardModel;

    public function __construct()
    {
        $this->dashboardModel =
            new Dashboard();
    }

    public function stats($decoded)
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

        return [

            "success" => true,

            "message" =>
                "Dashboard Statistics Retrieved Successfully",

            "data" => [

                "total_users" =>
                    $this->dashboardModel
                         ->totalUsers(),

                "total_categories" =>
                    $this->dashboardModel
                         ->totalCategories(),

                "total_products" =>
                    $this->dashboardModel
                         ->totalProducts(),

                "total_orders" =>
                    $this->dashboardModel
                         ->totalOrders(),

                "pending_orders" =>
                    $this->dashboardModel
                         ->countOrdersByStatus(
                             'pending'
                         ),

                "paid_orders" =>
                    $this->dashboardModel
                         ->countOrdersByStatus(
                             'paid'
                         ),

                "processing_orders" =>
                    $this->dashboardModel
                         ->countOrdersByStatus(
                             'processing'
                         ),

                "delivered_orders" =>
                    $this->dashboardModel
                         ->countOrdersByStatus(
                             'delivered'
                         ),

                "cancelled_orders" =>
                    $this->dashboardModel
                         ->countOrdersByStatus(
                             'cancelled'
                         ),

                "total_revenue" =>
                    $this->dashboardModel
                         ->totalRevenue()
            ]
        ];
    }
}