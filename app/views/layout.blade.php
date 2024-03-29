<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>@yield('title')</title>
    <link rel="stylesheet" href="{{ asset('css/lib/bootstrap.min.css') }}">
    @yield('custom-styles')
</head>
<body>
    <nav class="navbar navbar-default" role="navigation" style="margin-bottom: 0">
        <div class="navbar-header">
            <a class="navbar-brand" href="">Lập trình web 2015</a>
        </div>
        @if (Auth::check())
            <div class="pull-right">
                <p class="navbar-text">Logged in as <b>{{ Auth::user()->username }}</b></p>
                <a class="navbar-btn btn btn-primary" href="logout" style="margin-right:20px;">Logout</a>
            </div>
        @endif
    </nav>

    <div class="wrapper container-fluid">
        @yield('content')
    </div>

    @yield('custom-scripts')
</body>
</html>