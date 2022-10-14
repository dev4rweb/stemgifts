<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PagesController extends Controller
{
    public function homePage()
    {
        return Inertia::render('HomePage');
    }

    public function adminPage()
    {
        return Inertia::render('admin/AdminPage');
    }

    public function userPage()
    {
        return Inertia::render('user/UserPage');
    }
}
