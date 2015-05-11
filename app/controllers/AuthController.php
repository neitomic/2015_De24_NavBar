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
        return View::make('login');
    }

    public function getLogout()
    {
        Auth::logout();
        return Redirect::guest('login');
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

    public function getRegister()
    {
        return View::make('register', array('username' => ''));
    }

    public function postRegister()
    {

        $errors = array();
        $data = Input::only(['username', 'password', 're-password']);
        $username = $data['username'];
        if(empty($data['username'])){
            $error = "User name is empty!";
            array_push($errors, $error);
        }else{

            $user = User::where('username', '=', $data['username'])->first();

            if($user !== null) {
                
                $error1 = "User $username already exists!";
                array_push($errors, $error1);
            }
        }
        if(empty($data['password'])) {
            $error2 = "Password is empty!";
            array_push($errors, $error2);
        }

        if($data['password'] != $data['re-password']){
            $error3 = "Password miss match!";
            array_push($errors, $error3);
        }

        if(sizeof($errors) > 0) {
            return View::make('register', array('errors' => $errors, 'username' => $username));
        }else{
            $user1 = new User;
            $user1->username = $data['username'];
            $user1->password = $data['password'];
            $user1 -> save();
            return View::make('login');
        }

    }
}