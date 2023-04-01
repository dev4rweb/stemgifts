<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class SocialController extends Controller
{
    public function steamRedirect()
    {
        return Socialite::driver('steam')->redirect();
    }

    public function loginWithSteam()
    {
        try {
            $user = Socialite::driver('steam')->user();
            $response['success'] = true;
            $response['user'] = $user;
            /*$createUser = User::create([
                // all data
            ]);
            Auth::login($createUser);*/
//            $response['auth_user'] = Auth::user();
        } catch (\Exception $exception) {
            $response['success'] = false;
            $response['message'] = $exception->getMessage();
        }
        return response()->json($response);
    }
}
