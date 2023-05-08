<?php

namespace App\Http\Controllers;

use App\Models\Wallet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class WalletController extends Controller
{
    public function resetAllWallets()
    {
        $user = Auth::user();
        if ($user && $user['is_admin']){
            $wallets = Wallet::all();
            if (count($wallets)) foreach ($wallets as $wallet) $wallet->update(['points' => 0]);
            return redirect()->back()->withErrors(['error' => 'All wallets updated']);
        }
        return redirect()->back()->withErrors(['error' => 'wrong request']);
    }

    public function addPoints(Request $request)
    {
        $user_id = Auth::id();
        $points = $request['points'];
        if ($user_id) {
            $wallet = Wallet::query()->where('user_id', $user_id)->first();
            if ($wallet) {
                $wallet['points'] += $points;
                $wallet->save();
                $message = "Added $points points";
            } else $message = "Something was wrong with user_id = $user_id";
        } else $message = "User not found";
        redirect()->back()->withErrors(['error' => $message]);
    }

    public function addPointsForGameTask(Request $request)
    {
        $user_id = Auth::id();
        $points = $request['points'];
        if ($user_id) {

            $wallet = Wallet::query()->where('user_id', $user_id)->first();
            if ($wallet) {
                $wallet['points'] += $points;
                $wallet->save();
                $message = "Added $points points";
            } else $message = "Something was wrong with user_id = $user_id";
        } else $message = "User not found";
        redirect()->back()->withErrors(['error' => $message]);
    }
}
