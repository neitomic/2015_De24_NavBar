<?php
/**
 * Created by PhpStorm.
 * User: Prozacs
 * Date: 09/05/2015
 * Time: 9:11 PM
 */

class MenuController extends Controller
{
    public function getMenu()
    {
        $user = Auth::user();
        if ($user->menu_html == null)
        {
            $user->menu_html = file_get_contents('../app/default/html');
            $user->save();
        }
        return $user->menu_html;
    }

    public function updateMenu()
    {
        $updated_menu = Input::get('updated_menu');
        $user = Auth::user();
        $user->menu_html = $updated_menu;
        $user->save();
    }

    public function getMenuStyle()
    {
        $user = Auth::user();
        if ($user->css_properties == null)
        {
            $user->css_properties = file_get_contents('../app/default/css');
            $user->save();
        }
        return Response::make($user->css_properties, 200, ['Content-type' => 'application/json']);
    }

    public function updateMenuStyle()
    {
        $updated_style = Input::get('updated_style');
        $user = Auth::user();
        $user->css_properties = $updated_style;
        $user->save();
    }
}