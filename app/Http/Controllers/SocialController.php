<?php

namespace App\Http\Controllers;

use Abraham\TwitterOAuth\TwitterOAuth;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Laravel\Socialite\Facades\Socialite;
use League\OAuth1\Client\Server\Twitter;

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

    // https://developer.twitter.com/en/portal/projects/1668255045245190144/apps/27298139/settings
    // https://socialiteproviders.com/Twitter/#installation-basic-usage
    // add like
    // https://developer.twitter.com/en/docs/twitter-api/tweets/likes/introduction
    // https://developer.twitter.com/en/docs/authentication/guides/v2-authentication-mapping
    // https://www.postman.com/twitter/workspace/twitter-s-public-workspace/request/9956214-fbf3547c-4aff-49f2-8995-c034ee1c3a51

    public function twitterRedirect()
    {
        return Socialite::driver('twitter')->redirect();
    }

    public function loginWithTwitter()
    {
        try {
            // Authenticate user with Twitter using Socialite
            $social_user = Socialite::driver('twitter')->user();
            if ($social_user) {
                $is_user = User::query()->where('twitter_id', $social_user->id)->first();
                if ($is_user) Auth::login($is_user);
                else {
                    if (Auth::user()) {  // Подкрепление аккаунта из личного кабинета
                        $auth_user = User::query()->findOrFail(Auth::id());
                        $auth_user['twitter_id'] = $social_user->getId();
                        $auth_user['name'] = $social_user->getNickname();
                        $auth_user->save();
                        return redirect('/user-settings');
                    } else {
                        $user = User::create([
                            'twitter_id' => $social_user->getId(),
                            'name' => $social_user->getNickname(),
                            'password' => Hash::make('password')
                        ]);
                        Auth::login($user);
                    }
                }
                //https://twitter.com/SourceByteGames/status/1664383713579343872
                // Get the tweet ID of the tweet you want to like
                $tweetId = '1664383713579343872'; // Replace with the actual tweet ID

                // Handle the response as needed

                // Redirect the user to a success page or perform other actions
                return redirect('/');
            }

            $response['success'] = true;
            $response['user'] = $social_user;
        } catch (\Exception $exception) {
            $response['success'] = false;
            $response['message'] = $exception->getMessage();
        }
        return response()->json($response);
    }

    public function redirectToProvider()
    {
        try {
            $connection = new TwitterOAuth(
                config('twitter.consumer_key'),
                config('twitter.consumer_secret'),
            );
            $request_token = $connection->oauth(
                'oauth/request_token',
                ['oauth_callback' => config('twitter.redirect_url')]
            );

            $oauth_token = $request_token['oauth_token'];

            session(['oauth_token' => $oauth_token]);
            session(['oauth_token_secret' => $request_token['oauth_token_secret']]);

            $url = $connection->url('oauth/authorize', ['oauth_token' => $oauth_token]);

            return redirect()->to($url);
        } catch (\Exception $exception) {
            $response['success'] = false;
            $response['message'] = $exception->getMessage();
            return response()->json($response);
        }
    }

    public function handleProviderCallback(Request $request)
    {
        try {

            $oauth_token = $request->oauth_token;
            $oauth_verifier = $request->oauth_verifier;
            $response['$oauthToken'] = $oauth_token;
            $response['$oauthVerifier'] = $oauth_verifier;

            // Retrieve the request token and secret from the session (or database)
            $requestToken = session('oauth_token');
            $requestTokenSecret = session('oauth_token_secret');

            $response['$requestToken'] = $requestToken;
            $response['$requestTokenSecret'] = $requestTokenSecret;

            $connection = new TwitterOAuth(
                config('twitter.consumer_key'),
                config('twitter.consumer_secret'),
                $requestToken,
                $requestTokenSecret
            );
//            $connection->setApiVersion('1.1');
            $token = $connection->oauth('oauth/access_token', ['oauth_verifier' => $oauth_verifier]);
            $response['$accessToken'] = $token;// full info about user
//            return response()->json($response);
//            $response['post_tweet_one'] = $connection->post('statuses/update', ['status' => 'Hello, Twitter!']);

            $tweet = 'Hello, Twitter! This is my first tweet from Laravel using Twitter API v2.';
            $conTwo = new TwitterOAuth(
                config('twitter.consumer_key'),
                config('twitter.consumer_secret'),
                $token['oauth_token'],
                $token['oauth_token_secret']
            );
            $conTwo->setApiVersion('2');
            $response['$response'] = $conTwo->post('tweets', [
                'text' => $tweet
            ], true);
            /*
             * {
                    "$oauthToken": "bFyiXgAAAAABoIlbAAABiRXz7uw",
                    "$oauthVerifier": "mZsYUEkbW9HFy3o4vPOXL9T8Ftkm5fQr",
                    "$requestToken": "bFyiXgAAAAABoIlbAAABiRXz7uw",
                    "$requestTokenSecret": "rOigdThYQfxDwT4nt0fPTxFfbwsTPaWk",
                    "$accessToken": {
                        "oauth_token": "1667827169379090436-EdUwwMS6aXHQ1pmdmEEEqiaWlWnc2L",
                        "oauth_token_secret": "iOPjHxQI81oQIdvjbmpwdZPuGQRNuKyEvljBIJg2TYXLi",
                        "user_id": "1667827169379090436",
                        "screen_name": "aovramec95"
                    },
                    "$response": {
                        "data": {
                            "edit_history_tweet_ids": [
                                "1675437740865777665"
                            ],
                            "id": "1675437740865777665",
                            "text": "Hello, Twitter! This is my first tweet from Laravel using Twitter API v2."
                            }
                        }
                }
             * */
//            $conTwo->setTimeouts(10, 15);
//            $response['home_timeline'] = $conTwo->get("statuses/home_timeline", ["count" => 25, "exclude_replies" => true]);
//            $response['post_tweet'] = $conTwo->post('statuses/update', ['status' => 'Hello, Twitter!']);

            /*$response['get_tweets'] = $conTwo->get('statuses/user_timeline', [
                'screen_name' => $token['screen_name'],
                'count' => 10, // Number of tweets to retrieve
            ]);
            $response['verify'] = $conTwo->get("account/verify_credentials"); // full info about user*/

            /* $response['get_tweets_else'] =  $conTwo->get(
                 'search/tweets',
                 ['q' => 'news', 'count' => 10] // Retrieve 10 tweets containing 'news'
             );*/
            /* $tweet = 'Hello, Twitter! This is my first tweet from Laravel.';

             // Create a new TwitterOAuth instance
             $twitter = new TwitterOAuth(
                 config('twitter.consumer_key'),
                 config('twitter.consumer_secret'),
                 $token['oauth_token'],
                 $token['oauth_token_secret']
             );

             // Post the tweet
             $status = $twitter->post('statuses/update', ['status' => $tweet]);

             if ($twitter->getLastHttpCode() === 200) {
                 $response['success'] = 'Tweet posted successfully!';
             } else {
                 $response['error'] = 'Error posting tweet: ' . $status->errors[0]->message;
             }*/
        } catch (\Exception $exception) {
            $response['success'] = false;
            $response['message'] = $exception->getMessage();

        }
        return response()->json($response);
    }

    public function postMessageToTwitter($oauth_token, $oauth_token_secret)
    {
        $push = new TwitterOAuth(
            config('twitter.consumer_key'),
            config('twitter.consumer_secret'),
            $oauth_token,
            $oauth_token_secret
        );
        $push->setTimeouts(10, 15);
//        $push->post('statuses/update', ['status' => 'Hello, Twitter!']);
//        $response['tweet'] = $push->post('statuses/update', ['status' => 'Hello, Twitter Else!']);
        // add like
//        $response['tweet'] = $push->post('/favorites/create', ['id' => '1664383713579343872']);
//        $response['tweet'] = $push->post('/favorites/create', ['id' => '1664383713579343872']);
        // get tweets
        $response['tweet'] = $push->get('/statuses/home_timeline', ['count' => 20]);
        return response()->json($response);
    }

    public function getTwitterNews()
    {
        // Initialize TwitterOAuth with the API credentials
        $connection = new TwitterOAuth(
            config('twitter.consumer_key'),
            config('twitter.consumer_secret'),
            config('twitter.access_token'),
            config('twitter.access_token_secret')
        );

        // Retrieve the latest tweets (replace 'news' with the desired search query or handle)
        $tweets = $connection->get(
            'search/tweets',
            ['q' => 'news', 'count' => 10] // Retrieve 10 tweets containing 'news'
        );

        // Process the retrieved tweets as per your requirements
        // For example, you can return the tweets as JSON response
        return response()->json($tweets);
    }
}
