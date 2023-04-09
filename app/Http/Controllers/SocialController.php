<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Invisnik\LaravelSteamAuth\SteamServiceProvider;
use Laravel\Socialite\Facades\Socialite;

class SocialController extends Controller
{
    public function steamRedirect()
    {
        return Socialite::driver('steam')->redirect();
    }

    public function loginWithSteam(Request $request)
    {
        try {
            // Authenticate user with Steam using Socialite
            $social_user = Socialite::driver('steam')->user();
            $response['success'] = true;
            $response['user'] = $social_user;

            /*if ($social_user) {
                // Get user's Steam session ID from cookies
                $sessionId = $request->cookie('sessionid');
                // Add game to user's wishlist using Steam API
                $appId = 269650; // replace with actual game ID
                $url = "https://store.steampowered.com/api/wishlist/add";
                $params = [
                    'sessionid' => $sessionId,
                    'appid' => $appId,
                ];
                $resp = Http::post($url, $params);
                // Handle any errors that may occur
                $response['result'] = $resp->json();
                $response['session_id'] = $sessionId;
                if ($resp->failed()) {
                    $errorMessage = $response->json()['error'];
                    // handle error message
                }
                return  $response;

            }*/

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

    public function addToWishListSteam()
    {
        try {
            // https://steamcommunity.com/
            $user = User::findOrFail(Auth::id());
            if (!$user) return 'Please login by Steam';
            if (!$user['steam_id']) return 'Steam ID not found!';
            $steam_id = $user['steam_id'];
            $app_id = 269650; // DEX
            $api_key = '4280EC36D1A4C1670BB67C1B48633AC9';

            $url = "https://store.steampowered.com/api/add_to_wishlist";

            // Set up the POST data
            $data = array(
                'appid' => $app_id,
                'sessionid' => '', // Optional, use this if you want to add the app to a specific user's wishlist
                'wishlist_name' => '', // Optional, use this if the user has multiple wishlists
                'priority' => 0 // Optional, use this to set the app's priority on the wishlist
            );

            // https://api.steampowered.com/ISteamUser/AddAppWishlistItem/v1/?key=YOUR_API_KEY&appid=APP_ID
//            $resp = Http::get('https://api.steampowered.com/ISteamUser/AddAppWishlistItem/v1/?key=4280EC36D1A4C1670BB67C1B48633AC9&appid=269650');
//            $resp = Http::get("https://api.steampowered.com/ISteamUser/AddAppWishlistItem/v1/?key={$api_key}&appid={$app_id}&steamid={$steam_id}");
            $resp = Http::get($url, $data);
            /*$resp = Http::post("https://store.steampowered.com/api/addtowishlist/v1/",
                [
                    'form_params' => [
                        'appid' => $app_id,
                        'sessionid' => '',
                        'steamid' => $steam_id
                    ]
                ]
            );*/
            /*if ($resp->status() == 200) {
                // Game added to wishlist
            } else {
                // Error adding game to wishlist
            }*/
            /*
                     * {
                        "result": "{\"success\":false,\"wishlistCount\":0}",
                        "success": true
                        }*/
            $response['result'] = $resp->body();
            $response['success'] = true;
        } catch (\Exception $exception) {
            $response['success'] = false;
            $response['message'] = $exception->getMessage();
        }
        return response()->json($response);
    }
}
