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
