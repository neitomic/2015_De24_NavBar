@extends('layout')

@section('title')
    Ltweb2015 - Register Success
@stop

@section('custom-styles')
    <link rel="stylesheet" href="{{asset('css/register_style.css')}}">
@stop

@section('content')
    <div id="register">
        <?php echo "<strong>User $username registered success!</strong>\n" ?>
        <p>Redirect to login page! If it does not redirect automaticaly, {{ HTML::linkAction('AuthController@getLogin', 'click here') }}!</p>
    </div>
@stop

@section('custom-scripts')
    <script src='http://codepen.io/assets/libs/fullpage/jquery.js'></script>
    <script type="text/javascript">
        $(document).ready(function () {
            // Handler for .ready() called.
            window.setTimeout(function () {
            location.href = <?php echo "\"$link\"" ?>
            }, 5000);
        });
    </script>
@stop