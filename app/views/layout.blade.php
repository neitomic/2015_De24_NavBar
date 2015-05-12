<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>@yield('title')</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">
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

    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
    @yield('custom-scripts')
</body>
</html>