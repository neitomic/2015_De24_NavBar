<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Register</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">
    <link rel="stylesheet" href="{{asset('css/register_style.css')}}" media="screen" type="text/css" />
</head>
<body>

<?php echo "User $username registered success!\n" ?>

<p>Redirect to login page! If it does not redirect automaticaly, click here!</p>

<script src='http://codepen.io/assets/libs/fullpage/jquery.js'></script>
<script type="text/javascript">
    $(document).ready(function () {
        // Handler for .ready() called.
        window.setTimeout(function () {
            location.href = "/login";
        }, 5000);
    });
</script>
</body>
</html>