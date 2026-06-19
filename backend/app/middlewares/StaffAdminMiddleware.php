<?php

class StaffAdminMiddleware
{
    public static function handle($decoded)
    {
        if (
            $decoded->role_id != 1 &&
            $decoded->role_id != 2
        ) {

            http_response_code(403);

            echo json_encode([
                "success" => false,
                "message" =>
                    "Access Denied. Admin or Staff Only"
            ]);

            exit;
        }
    }
}