<?php

namespace App\Http\Controllers;

use App\Filters\GameFilter;
use App\Models\Game;
use App\Models\Gift;
use App\Models\TaskCategory;
use App\Models\User;
use App\Models\UserGame;
use App\Models\UserTask;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class PagesController extends Controller
{
    public function homePage(GameFilter $filter)
    {
// https://store.steampowered.com/wishlist/profiles/76561199127510163/#sort=order  - me
        // https://store.steampowered.com/wishlist/profiles/76561198076460039/#sort=order - Nikodem

        $limit = 12;
        $user_tasks = null;
        if (Auth::id()) $user_tasks = UserTask::query()
            ->with('task')
            ->where('user_id', Auth::id())->get();
        if (isset($filter->request['limit'])) $limit = $filter->request['limit'];
        $games = Game::with('tasks')
            ->with('users')
            ->where('status', Game::STATUS_ACTIVE)
            ->where('is_sponsored', false)
            ->filter($filter)
            ->paginate($limit);
        $sponsor_game = Game::where('is_sponsored', true)->first();
        return Inertia::render('HomePage', [
            'games' => $games,
            'sponsorGame' => $sponsor_game,
            'userTasks' => $user_tasks,
        ]);
    }

    public function adminPage()
    {
        $users = User::where('is_admin', 0)
            ->get();
        $activeGames = Game::where('is_sponsored', false)
            ->where('status', Game::STATUS_ACTIVE)
            ->get();
        $moderationGames = Game::where('is_sponsored', false)
            ->where('status', Game::STATUS_MODERATE)
            ->get();
        return Inertia::render('admin/AdminPage', [
            'countUsers' => count($users),
            'activeGames' => count($activeGames),
            'moderationGames' => count($moderationGames),
        ]);
    }

    public function adminCompetitions()
    {
        $games = Game::with('gifts', 'persons.wallet', 'persons.userTasks')
            ->orderBy('status')
            ->orderBy('end_date')
            ->paginate(30);
        return Inertia::render('admin/AdminCompetitions', [
            'games' => $games
        ]);
    }

    public function adminUsers()
    {
        $users = User::withCount('games')
            ->with('games')
            ->with('wallet')
            ->where('is_admin', 0)
            ->orderBy('created_at', 'desc')
            ->paginate(30);
        return Inertia::render('admin/AdminUsers', [
            'users' => $users
        ]);
    }

    public function adminCategoryTasks()
    {
        return Inertia::render('admin/AdminCategoryTasks');
    }

    public function adminCreateCompetition()
    {
        $categories = TaskCategory::with('taskCategoryItems')->get();
        return Inertia::render('admin/AdminCreateCompetition', [
            'categories' => $categories
        ]);
    }

    public function adminTestPage()
    {
        return Inertia::render('admin/AdminTestPage');
    }

    public function userPage()
    {
        $user = Auth::user();
        $ownGames = array();
        $gifts = Gift::where('user_id', $user->id)->get();
        if ($user) {
            $games = Game::with('users')->get();
            if (count($games)) {
                foreach ($games as $game) {
                    if (count($game->users))
                        foreach ($game->users as $userGame) {
                            if ($userGame->user_id == $user->id)
                                array_push($ownGames, $game);
                        }
                }
            }
//            return $ownGames;
        }
        return Inertia::render('user/UserPage', [
            'games' => $ownGames,
            'gifts' => $gifts
        ]);
    }

    public function userSettings()
    {
        return Inertia::render('user/UserSettings');
    }

    public function userAchievements()
    {
        $user = Auth::user();
        $gifts = Gift::where('user_id', $user->id)->get();
        return Inertia::render('user/UserAchievements', [
            'gifts' => $gifts
        ]);
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

    public function privacyPolicyPage()
    {
        return Inertia::render('PrivacyPolicy');
    }

    public function termsPage()
    {
        return Inertia::render('TermsPage');
    }

    public function errorPage()
    {
        return Inertia::render('ErrorPage');
    }
}
