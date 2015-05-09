<?php
/**
 * Created by PhpStorm.
 * User: Prozacs
 * Date: 09/05/2015
 * Time: 5:53 PM
 */

class AuthController extends Controller
{
    public function getLogin()
    {
        return View::make("login");
    }

    public function getLogout()
    {

    }

    public function postLogin()
    {
        $data = Input::only(['username', 'password']);
        if (Auth::attempt(['username' => $data['username'], 'password' => $data['password']]))
        {
            return Redirect::to('/');
        }
        else
        {
            return Redirect::guest('login')->withInput();
        }
    }
}