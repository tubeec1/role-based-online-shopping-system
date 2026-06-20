<?php

require_once __DIR__ . '/../vendor/autoload.php';

header('Content-Type: application/json');

require_once __DIR__ . '/../routes/api.php';

$method =
    $_SERVER['REQUEST_METHOD'];

$uri =
    parse_url(
        $_SERVER['REQUEST_URI'],
        PHP_URL_PATH
    );

$uri =
    str_replace(
        '/online-shopping-system/backend',
        '',
        $uri
    );

/*
|--------------------------------------------------------------------------
| Exact Route Match
|--------------------------------------------------------------------------
*/

if (
    isset(
        $routes[$method][$uri]
    )
) {

    [$controller, $action] =
        $routes[$method][$uri];

    $instance =
        new $controller();

    $instance->$action();

    exit;
}

/*
|--------------------------------------------------------------------------
| Dynamic Route Match
|--------------------------------------------------------------------------
*/

$matched = false;

foreach (
    $routes[$method] ?? []
    as $route => $handler
) {

    $pattern =
        preg_replace(
            '/\{[a-zA-Z_]+\}/',
            '([^/]+)',
            $route
        );

    $pattern =
        "#^" .
        $pattern .
        "$#";

    if (
        preg_match(
            $pattern,
            $uri,
            $matches
        )
    ) {

        array_shift(
            $matches
        );

        [$controller, $action] =
            $handler;

        $instance =
            new $controller();

        call_user_func_array(
            [$instance, $action],
            $matches
        );

        $matched = true;

        break;
    }
}

/*
|--------------------------------------------------------------------------
| Route Not Found
|--------------------------------------------------------------------------
*/

if (!$matched) {

    http_response_code(
        404
    );

    echo json_encode([

        "success" => false,

        "message" =>
            "Route Not Found",

        "requested_uri" =>
            $uri
    ]);
}