<?php
/**
 * Created by PhpStorm.
 * User: Prozacs
 * Date: 09/05/2015
 * Time: 11:55 AM
 */

class Menu extends Eloquent
{
    protected $table = "menu";
    protected $hidden = array("parent_menu_id");

    public function parent()
    {
        return $this->belongsTo('Menu', 'parent_menu_id', 'id');
    }

    public function sub_menu()
    {
        return $this->hasMany('Menu', 'parent_menu_id', 'id');
    }
}