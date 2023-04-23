<?php

use App\Http\Controllers\Api\UserTaskController;
use App\Http\Controllers\EmailController;
use App\Http\Controllers\FileUploaderController;
use App\Http\Controllers\GameController;
use App\Http\Controllers\GiftController;
use App\Http\Controllers\PagesController;
use App\Http\Controllers\SocialController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserGameController;
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
Route::get('/admin-test-page', [PagesController::class, 'adminTestPage']);

Route::get('/user-panel', [PagesController::class, 'userPage']);
Route::get('/user-settings', [PagesController::class, 'userSettings']);
Route::get('/user-achievements', [PagesController::class, 'userAchievements']);

Route::post('/file-upload', [FileUploaderController::class, 'uploadImage']);

// Socials
Route::get('/auth/steam', [SocialController::class, 'steamRedirect']);
Route::get('/auth/steam/callback', [SocialController::class, 'loginWithSteam']);
Route::get('/steam/add-wishlist', [SocialController::class, 'addToWishListSteam']);

// Emails
Route::get('/test-email', [EmailController::class, 'testEmail']);
Route::post('/send-email-winners', [EmailController::class, 'sendEmailWinner']);

Route::resources([
    'admin-user' => UserController::class,
    'admin-games' => GameController::class,
    'user-games' => UserGameController::class,
    'gifts' => GiftController::class
]);

Route::apiResources([
    'user-tasks' => UserTaskController::class,
]);

Route::fallback([PagesController::class, 'errorPage']);
