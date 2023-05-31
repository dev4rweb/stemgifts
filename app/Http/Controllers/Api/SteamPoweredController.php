<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class SteamPoweredController extends Controller
{
    const api_key = '4280EC36D1A4C1670BB67C1B48633AC9';
    const url = 'http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/';
    const calc_url = 'https://steamwishlistcalculator.com/php/main.php';
    const calc_alternative = 'https://steamwishlistcalculator.com/php/main.php';

    public function getSteamUserData(Request $request)
    {
        try {
            // Http::withHeaders(self::HEADERS)
            //                ->post(self::BASE_URL, self::COMMAND_GET_TOKEN);
            $data = Http::get(self::url . '?key='.self::api_key.'&steamids=' . $request['steam_id']);
            $response['data'] = $data->json();
            $response['success'] = true;
        } catch (\Exception $exception) {
            $response['success'] = false;
            $response['message'] = $exception->getMessage();
        }

        return response()->json($response);
    }

    public function getGameList(Request $request)
    {
        // LordTV
        try {
//            $data = Http::get(self::calc_url . '?urlType=id&profileId=' . $request['profile_id'] . '&pageNumber=0&cc=US&switch=true');
//            $data = Http::get(self::calc_url . '?urlType=profiles&profileId=' . $request['profile_id'] . '&pageNumber=0&cc=US&switch=true');
            $data = Http::get(self::calc_url . '?urlType=profiles&profileId=' . $request['profile_id'] . '&pageNumber=0&cc=&switch=true');
            $response['data'] = $data->json();
            $response['success'] = true;
        } catch (\Exception $exception) {
            $response['success'] = false;
            $response['message'] = $exception->getMessage();
        }

        return response()->json($response);
    }
}
