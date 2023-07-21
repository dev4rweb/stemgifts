<?php

namespace App\Http\Controllers;

use Abraham\TwitterOAuth\TwitterOAuth;
use App\Models\SocialTwitter;
use App\Models\Task;
use App\Models\User;
use App\Models\UserTask;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class SocialTwitterController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\SocialTwitter $socialTwitter
     * @return \Illuminate\Http\Response
     */
    public function show(SocialTwitter $socialTwitter)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\SocialTwitter $socialTwitter
     * @return \Illuminate\Http\Response
     */
    public function edit(SocialTwitter $socialTwitter)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\SocialTwitter $socialTwitter
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, SocialTwitter $socialTwitter)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\SocialTwitter $socialTwitter
     * @return \Illuminate\Http\Response
     */
    public function destroy(SocialTwitter $socialTwitter)
    {
        //
    }

    public function twitterRedirect()
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

    public function twitterLogin(Request $request)
    {
        try {
            $oauth_token = $request->oauth_token;
            $oauth_verifier = $request->oauth_verifier;

            // Retrieve the request token and secret from the session (or database)
            $requestToken = session('oauth_token');
            $requestTokenSecret = session('oauth_token_secret');

            $connection = new TwitterOAuth(
                config('twitter.consumer_key'),
                config('twitter.consumer_secret'),
                $requestToken,
                $requestTokenSecret
            );
            $token = $connection->oauth('oauth/access_token', ['oauth_verifier' => $oauth_verifier]);
            if ($token) {
                $user_id = $token['user_id'] ?? null;
                if ($user_id) {
                    session(['twitter_id' => $user_id]);
                    $social_twitter = SocialTwitter::query()->where('tweeter_id', $user_id)->first();
                    if (Auth::user()) { // Авторизация или регистрация с помощью Twitter
                        if ($social_twitter) { // Авторизация у Twitter для дальнейших действий (создание поста и т.д.)
                            $social_twitter->update([
                                'user_id' => Auth::id(),
                                'tweeter_id' => $user_id,
                                'screen_name' => $token['screen_name'],
                                'oauth_token' => $token['oauth_token'],
                                'oauth_token_secret' => $token['oauth_token_secret'],
                            ]);
                        } else { // Создание новой записи в SocialTwitter и возможные дальнейшие действия (создание поста и т.д.)

                            $social_twitter = SocialTwitter::query()->create([
                                'user_id' => Auth::id(),
                                'tweeter_id' => $user_id,
                                'screen_name' => $token['screen_name'],
                                'oauth_token' => $token['oauth_token'],
                                'oauth_token_secret' => $token['oauth_token_secret'],
                            ]);

                            /*$response['success'] = true;
                            $response['message'] = 'Twitter Created!';
                            $response['model'] = $social_twitter;
                            return response()->json($response);*/
                        }
                    } else { // Подключение аккаунта Twitter или Авторизация с помощью Twitter
                        if ($social_twitter) {
                            $social_twitter->update([
                                'tweeter_id' => $user_id,
                                'screen_name' => $token['screen_name'],
                                'oauth_token' => $token['oauth_token'],
                                'oauth_token_secret' => $token['oauth_token_secret'],
                            ]);
                        } else {
                            $user = User::query()->create([
                                'name' => $token['screen_name'],
                                'password' => Hash::make('password')
                            ]);
                            $social_twitter = SocialTwitter::query()->create([
                                'user_id' => $user->id,
                                'tweeter_id' => $user_id,
                                'screen_name' => $token['screen_name'],
                                'oauth_token' => $token['oauth_token'],
                                'oauth_token_secret' => $token['oauth_token_secret'],
                            ]);
                        }

                        $user = User::query()->find($social_twitter->user_id);
                        Auth::login($user);
                    }
                    return redirect('/');
                }
                return redirect('/')->withErrors(['error' => 'Something was wrong']);
            }
        } catch (\Exception $exception) {
            $response['success'] = false;
            $response['message'] = $exception->getMessage();
            return response()->json($response);
        }
    }

    public function postTwitter(Request $request)
    {
        try {
            $message = $request['message'];
            $task_id = $request['task_id'];
            if (Auth::user() && session('twitter_id') && $message) {
                $socialTwitter = SocialTwitter::query()->where('user_id', Auth::id())->first();
                if ($socialTwitter) {
                    $twitter = new TwitterOAuth(
                        config('twitter.consumer_key'),
                        config('twitter.consumer_secret'),
                        $socialTwitter['oauth_token'],
                        $socialTwitter['oauth_token_secret']
                    );
                    $twitter->setApiVersion('2');
                    $response = $twitter->post('tweets', [
                        'text' => $message
                    ], true);
//                    return $response;
                    if ($response){
                        if (Auth::user() && $task_id) {
                            UserTask::create([
                                'user_id' => Auth::id(),
                                'task_id' => $task_id,
                                'is_done' => 1
                            ]);
                            $message = 'Post created ';
                        }
                    }
                    else return $response;
                } else $message = 'SocialTwitter data not found';
            } else {
                $message = 'Need auth';
            }
        } catch (\Exception $exception) {
            $message = $exception->getMessage();
        }
        return redirect('/')->withErrors(['error' => $message]);
    }

    public function getCreatedPost(Request $request)
    {
        try {
            $task = Task::query()->find($request['task_id']);
            $response['success'] = false;
            if (!Auth::user()) {
                $response['message'] = 'Need auth';
                return response()->json($response);
            }
            if (!$task) {
                $response['message'] = 'Task not found';
                return response()->json($response);
            }

            $socialTwitter = SocialTwitter::query()->where('user_id', Auth::id())->first();
            if (!$socialTwitter) {
                $response['message'] = 'SocialTwitter data not found';
                return response()->json($response);
            }
            $twitter = new TwitterOAuth(
                config('twitter.consumer_key'),
                config('twitter.consumer_secret'),
                $socialTwitter['oauth_token'],
                $socialTwitter['oauth_token_secret']
            );
            $resp = $twitter->get("account/verify_credentials"); // full info about user
            if (!isset($resp->status)) {
                $response['message'] = 'verify_credentials status is invalid';
                $response['data'] = $resp;
                return $response;
            }
            if (!isset($resp->status->text)) {
                $response['message'] = 'verify_credentials status -> text is invalid';
                $response['data'] = $resp;
                return $response;
            }
            if (strpos(strtolower($resp->status->text), strtolower($task['url'])) !== false) {

                UserTask::create([
                    'user_id' => Auth::id(),
                    'task_id' => $request['task_id'],
                    'is_done' => true
                ]);

                $response['success'] = true;
                $response['message'] = 'Task is done';
                $response['data'] = $resp;
                return $response;
            } else {
                $response['message'] = 'tweet not found';
                $response['data'] = $resp;
                return $response;
            }
            // https://steam.dev4rweb.com/twitter/created-post?message=123&task_id=555
        } catch (\Exception $exception) {
            $message = $exception->getMessage();
        }
        return $message;
    }
}
