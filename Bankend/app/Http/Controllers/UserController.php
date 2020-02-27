<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Exceptions\JWTException;
use JWTAuth;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;


class UserController extends Controller
{

    public function index()
    {
        $users = User::all();
        return response()->json($users);

    }

    public function authenticate(Request $request)
    {
        //$credentials = $request->only('email', 'password');
        $credentials = json_decode(request()->getContent(), true);


        try {
            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->json(['result' => 100, 'error' => 'invalid_credentials'], 400);
            }
        } catch (JWTException $e) {
            return response()->json(['result' => 101, 'error' => 'could_not_create_token'], 500);
        }

        $user = JWTAuth::user();
        return response()->json(compact('user','token'));
    }

    public function getAuthenticatedUser()
    {
        try {
            if (!$user = JWTAuth::parseToken()->authenticate()) {
                return response()->json(['user_not_found'], 404);
            }
        } catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
            return response()->json(['token_expired'], $e->getStatusCode());
        } catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            return response()->json(['token_invalid'], $e->getStatusCode());
        } catch (Tymon\JWTAuth\Exceptions\JWTException $e) {
            return response()->json(['token_absent'], $e->getStatusCode());
        }

        return response()->json(compact('user'));
    }

    public function register(Request $request)
    {
        /*$validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);



        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }*/

        $credentials = json_decode(request()->getContent(), true);

        $name = $credentials['name'];
        $email = $credentials['email'];
        $password = $credentials['password'];

        $user = User::create([
            'name' => $name,
            'email' => $email,
            'password' => Hash::make($password),
        ]);

        $token = JWTAuth::fromUser($user);

        return response()->json(compact('user','token'),201);
    }

    public function store(Request $request)
    {

        $content = json_decode(request()->getContent(), true);

        $name = $content['name'];
        $email = $content['email'];
        $password = $content['password'];

        $user = new User();
        $user->name = $name;
        $user->email = $email;
        $user->password = Hash::make($password);

        $user->save();

        $result = is_null($user) ? '400' : '201';

        return response()->json(['result'=>$result,'car'=>$user], $result);



    }

    public function show(Request $request)
    {

        $content = json_decode(request()->getContent(), true);
        $id = $content['id'];
        $user = User::find($id);
        $user['password'] = '';
        $result = is_null($user) ? '401' : '200';
        return response()->json($user);
    }

    public function update(Request $request)
    {

        $content = json_decode(request()->getContent(), true);

        $id = $content['id'];
        $name = $content['name'];
        $email = $content['email'];
        $password = isset($content['password']) ? Hash::make($content['password']) : '' ;

        if (empty($password)){
            $getUser = DB::table('users')
                ->where('id', $id);
            $getUser->update(array('name' => $name, 'email' => $email));
        }else{
            $getUser = DB::table('users')
                ->where('id', $id);
            $getUser->update(array('name' => $name, 'email' => $email, 'password' => $password));
        }


        $result = is_null($getUser) ? '203' : '200';
        return response()->json(['result'=>$result], $result);

    }

    public function destroy(Request $request)
    {
        $content = json_decode(request()->getContent(), true);

        $user = DB::table('users')
            ->where('id', $content['id']);

        if (!is_null($user)) {
            $user->delete();
            $result= '200';
        }else{
            $result = '204';
        }

        return response()->json(['result'=>$result], $result);
    }




}
