<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
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
            $social_user = Socialite::driver('steam')->user();
            $response['success'] = true;
            $response['user'] = $social_user;
            if ($social_user) {
                $is_user = User::query()->where('steam_id', $social_user->id)->first();
                if ($is_user) Auth::login($is_user);
                else {
                    if (Auth::user()) { // Подкрепление аккаунта из личного кабинета
                        $auth_user = User::query()->findOrFail(Auth::id());
                        $auth_user['steam_id'] = $social_user->id;
                        $auth_user['name'] = $social_user->nickname;
                        $auth_user->save();
                        return redirect('/user-settings');
                    } else {
                        $user = User::create([
                            'name' => $social_user->nickname,
                            'steam_id' => $social_user->id,
                            'password' => Hash::make('password')
                        ]);
                        Auth::login($user);
                    }
                }
                return redirect('/');
            }
        } catch (\Exception $exception) {
            $response['success'] = false;
            $response['message'] = $exception->getMessage();
        }
        return response()->json($response);
    }
}
