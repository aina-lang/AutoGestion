<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title inertia>{{ config('app.name', 'VezoTours') }}</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

    <!-- Scripts -->
    @routes
    @viteReactRefresh
    @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
    @inertiaHead
</head>

<body class="font-sans antialiased">
    {{-- <div class="loader">
        <div class="flex space-x-5">
            <div class="dot bg-[#EF476F] delay-0 animate-bounce "></div>
            <div class="dot bg-[#FFD166] delay-75 animate-bounce"></div>
            <div class="dot bg-[#06D6A0] delay-150 animate-bounce"></div>
        </div>
    </div> --}}
    @inertia
</body>

</html>
