<?php

namespace App\Http\Controllers;

use App\Car;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use JWTAuth;

class CarController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $cars = Car::paginate(5);

        $result = is_null($cars) ? '204' : '200';
        return response()->json($cars);

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $content = json_decode(request()->getContent(), true);

        $title = $content['title'];
        $description = $content['description'];
        $price = $content['price'];

        $car = new Car();
        $car->title = $title;
        $car->price = $price;
        $car->description = $description;
        $car->user_id = Auth::user()->id;

        $car->save();

        $result = is_null($car) ? '400' : '201';

        return response()->json(['result'=>$result,'car'=>$car], $result);



    }

    /**
     * Display the specified resource.
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {

        $content = json_decode(request()->getContent(), true);
        $id = $content['id'];
        $car = Car::find($id);
        $result = is_null($car) ? '401' : '200';
        return response()->json($car);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {

        $content = json_decode(request()->getContent(), true);

        $id = $content['id'];
        $title = $content['title'];
        $description = $content['description'];
        $price = $content['price'];

        $getCar = DB::table('cars')
            ->where('id', $id);
        $getCar->update(array('title' => $title, 'description' => $description, 'price' => $price));

        $result = is_null($getCar) ? '203' : '200';
        return response()->json(['result'=>$result], $result);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $content = json_decode(request()->getContent(), true);

        $car = DB::table('cars')
            ->where('id', $content['id']);

        if (!is_null($car)) {
            $car->delete();
            $result= '200';
        }else{
            $result = '204';
        }

        return response()->json(['result'=>$result], $result);
    }
}
