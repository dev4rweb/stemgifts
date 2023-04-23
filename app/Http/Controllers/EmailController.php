<?php

namespace App\Http\Controllers;

use App\Mail\WinnerCompetition;
use App\Models\Game;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class EmailController extends Controller
{

    public function testEmail(Request $request)
    {
        try {
            $users = User::query()->inRandomOrder()->limit(3)->get();
            $game = Game::query()->with('gifts')->inRandomOrder()->first();
            if (count($game->gifts)) foreach ($game->gifts as $gift) $gift->update(['user_id' => 1]);
//            return $game;
            foreach ($users as $user) Mail::to($user)->send(new WinnerCompetition($user, $game));
            return 'Mail sent';
        } catch (\Exception $exception) {
            return $exception->getMessage();
        }
    }

    public function sendEmailWinner(Request $request)
    {
        try {
            $users = User::query()->whereIn('id', $request['persons'])->get();
//            return count($users);
            $game = Game::query()->with('gifts')->findOrFail($request['game_id']);
//            return count($game->gifts);
            if (!count($users)) return redirect()->back()->withErrors(['error' => 'Users not found']);
            if (!$game) return redirect()->back()->withErrors(['error' => 'Game not found']);
            if (count($users) !== count($game->gifts))
                return redirect()->back()
                    ->withErrors(['error' => 'Amount of gifts not equal users - ' . count($users) . '/' . count($game->gifts)]);
            foreach ($game->gifts as $key => $gift) {
                $gift->update(['user_id' => $users[$key]['id']]);
                $users[$key]['key'] = $gift['gift_key'];
            }
//            return $users;
            foreach ($users as $user) if ($user->email) Mail::to($user)->send(new WinnerCompetition($user, $game));
            $game->status = Game::STATUS_FINISHED;
            $game->save();
            return redirect()->back()->withErrors(['error' => 'Mails sent']);;
        } catch (\Exception $exception) {
            return redirect()->back()->withErrors(['error' => $exception->getMessage()]);
        }
    }
}
