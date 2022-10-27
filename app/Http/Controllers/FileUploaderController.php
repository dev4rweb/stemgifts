<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FileUploaderController extends Controller
{
    public function uploadImage(Request $request)
    {
        try {
            if ($request->hasFile('image')) {
                $response['message'] = 'Has file';
                $file = $request->file('image');
                $exception = $file->getClientOriginalExtension();
                $picture = time() . '.' . $exception;
                $file->move(public_path('img'), $picture);
                if (strpos($_SERVER['SERVER_NAME'], '127.0.0.1') !== false)
                    $response['filepath'] = '/img/' . $picture;
                else $response['filepath'] = '/lsapp/public/img/' . $picture;
                $response['success'] = true;
            } else {
                $response['message'] = 'File not found';
                $response['success'] = false;
            }
        } catch (\Exception $exception) {
            $response['success'] = false;
            $response['message'] = $exception->getMessage();
        }
        return response()->json($response);
    }
}
