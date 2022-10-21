<?php

use App\Http\Controllers\PagesController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

/*Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');*/
//Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
Auth::routes();
Route::get('/', [PagesController::class, 'homePage']);
Route::get('/faq', [PagesController::class, 'faqPage']);
Route::get('/affiliate-program', [PagesController::class, 'affiliatePage']);
Route::get('/contacts', [PagesController::class, 'ContactsPage']);

Route::get('/admin-panel', [PagesController::class, 'adminPage']);
Route::get('/admin-competitions', [PagesController::class, 'adminCompetitions']);
Route::get('/admin-users', [PagesController::class, 'adminUsers']);
Route::get('/admin-category', [PagesController::class, 'adminCategoryTasks']);
Route::get('/admin-create-competition', [PagesController::class, 'adminCreateCompetition']);

Route::get('/user-panel', [PagesController::class, 'userPage']);

Route::resources([
    'admin-user' => UserController::class
]);

Route::fallback([PagesController::class, 'errorPage']);
