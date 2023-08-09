<?php

use App\Http\Controllers\Api\UserTaskController;
use App\Http\Controllers\EmailController;
use App\Http\Controllers\FileUploaderController;
use App\Http\Controllers\GameController;
use App\Http\Controllers\GiftController;
use App\Http\Controllers\PagesController;
use App\Http\Controllers\SocialController;
use App\Http\Controllers\SocialTwitterController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserGameController;
use App\Http\Controllers\WalletController;
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
Route::get('/privacy-policy', [PagesController::class, 'privacyPolicyPage']);
Route::get('/terms', [PagesController::class, 'termsPage']);

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
// Steam
Route::get('/auth/steam', [SocialController::class, 'steamRedirect']);
Route::get('/auth/steam/callback', [SocialController::class, 'loginWithSteam']);
Route::get('/steam/add-wishlist', [SocialController::class, 'addToWishListSteam']);
// Twitter
//Route::get('/auth/twitter', [SocialController::class, 'twitterRedirect']);
//Route::get('/auth/twitter/callback', [SocialController::class, 'loginWithTwitter']);
//https://github.com/abraham/twitteroauth
//Route::get('/auth/twitter', [SocialController::class, 'redirectToProvider']);
//Route::get('/auth/twitter/callback', [SocialController::class, 'handleProviderCallback']);
Route::get('/auth/twitter', [SocialTwitterController::class, 'twitterRedirect']);
Route::get('/auth/twitter/callback', [SocialTwitterController::class, 'twitterLogin']);
Route::post('/twitter/created-post', [SocialTwitterController::class, 'getCreatedPost']);
Route::post('/twitter/liked-post', [SocialTwitterController::class, 'getLikedPost']);
Route::post('/twitter/followed-post', [SocialTwitterController::class, 'getFollowedPost']);
Route::get('/twitter/postTweet', [SocialTwitterController::class, 'postTwitter']);
Route::get('/twitter/getNews', [SocialController::class, 'getTwitterNews']);
Route::get('/twitter/like-post', [SocialTwitterController::class, 'likePost']);
Route::get('/twitter/follow-post', [SocialTwitterController::class, 'followPost']);
Route::get('/twitter/repost-post', [SocialTwitterController::class, 'repostPost']);
Route::get('/twitter/view-post', [SocialTwitterController::class, 'viewPost']);
Route::get('/twitter/check-twitter-user', [SocialTwitterController::class, 'checkTwitterUser']);
Route::post('/twitter/check-twitter-user', [SocialTwitterController::class, 'checkTwitterUser']);

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

Route::group(['middleware' => 'auth'], function (){
Route::get('/wallets/reset-all', [WalletController::class, 'resetAllWallets']);
Route::post('/wallets/add-points', [WalletController::class, 'addPoints']);
Route::post('/wallets/add-points-task', [WalletController::class, 'addPointsForGameTask']);
});

Route::fallback([PagesController::class, 'errorPage']);
