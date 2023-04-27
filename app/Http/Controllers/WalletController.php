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
}
