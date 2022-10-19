<?php

namespace App\Http\Controllers;

use App\Filters\GameFilter;
use App\Models\Game;
use Inertia\Inertia;

class PagesController extends Controller
{
    public function homePage(GameFilter $filter)
    {
        $limit = 12;
        if (isset($filter->request['limit'])) $limit = $filter->request['limit'];
        $games = Game::where('status', Game::STATUS_ACTIVE)
            ->where('is_sponsored', false)
            ->filter($filter)
            ->paginate($limit);
        $sponsor_game = Game::where('is_sponsored', true)->first();
        return Inertia::render('HomePage', [
            'games' => $games,
            'sponsorGame' => $sponsor_game
        ]);
    }

    public function adminPage()
    {
        return Inertia::render('admin/AdminPage');
    }

    public function userPage()
    {
        return Inertia::render('user/UserPage');
    }

    public function faqPage()
    {
        return Inertia::render('FaqPage');
    }

    public function affiliatePage()
    {
        return Inertia::render('AffiliatePage');
    }

    public function ContactsPage()
    {
        return Inertia::render('ContactsPage');
    }

    public function errorPage()
    {
        return Inertia::render('ErrorPage');
    }
}
