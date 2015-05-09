<?php
/**
 * Created by PhpStorm.
 * User: Prozacs
 * Date: 09/05/2015
 * Time: 9:11 PM
 */

class MenuController extends \BaseController
{
    public function getMenuHtml()
    {
        $user = Auth::user();
        if ($user->menu_html == null)
        {
            $user->menu_html = file_get_contents('../app/default/default.html');
            $user->save();
        }
        return $user->menu_html;
    }
}