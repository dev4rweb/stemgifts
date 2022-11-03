<?php

namespace App\Http\Controllers;

use App\Models\UserGame;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserGameController extends Controller
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

    public function store(Request $request)
    {
        try {
            $user = Auth::user();
            if ($user) {
                UserGame::create([
                    'user_id' => $user->id,
                    'game_id' => $request['game_id'],
                ]);
                $message = 'You joined';
            } else $message = 'User not found';
        } catch (\Exception $exception) {
            $message = $exception->getMessage();
        }
        return redirect()->back()->withErrors(['error' => $message]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\UserGame  $userGame
     * @return \Illuminate\Http\Response
     */
    public function show(UserGame $userGame)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\UserGame  $userGame
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, UserGame $userGame)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\UserGame  $userGame
     * @return \Illuminate\Http\Response
     */
    public function destroy(UserGame $userGame)
    {
        //
    }
}
