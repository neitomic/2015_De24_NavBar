<?php

class MenuController extends \BaseController {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
        /*return '{ "menu" : [
            {
                "title" : "Menu 1",
                "link" : "",
                "sub_menu" : [
                    {
                        "title" : "Sub 1",
                        "link" : ""
                    },
                    {
                        "title" : "Sub 2",
                        "link" : ""
                    }
                ]
            },
            {
                "title" : "Menu 2",
                "link" : "http://google.com"
            }
        ] }';*/

        return Menu::where("parent_menu_id", "=", null)->with("sub_menu")->get();
	}


	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create()
	{
		//
	}


	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
		//
	}


	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		//
	}


	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
		//
	}


	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		//
	}


	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		//
	}


}
