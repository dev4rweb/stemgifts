<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UserTask;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserTaskController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }


    public function store(Request $request)
    {
        try {
            if (!Auth::id()) {
                $response['success'] = false;
                $response['message'] = 'User not found';
            } elseif (!isset($request['task_id']) || !$request['task_id']) {
                $response['success'] = false;
                $response['message'] = 'task_id not defined';
            } else {
                UserTask::create([
                    'user_id' => Auth::id(),
                    'task_id' => $request['task_id']
                ]);
                $response['success'] = true;
                $response['message'] = 'UserTask created';
            }
        } catch (\Exception $exception) {
            $response['success'] = false;
            $response['message'] = $exception->getMessage();
        }

        return response()->json($response);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }


    public function update(Request $request, $id)
    {
        try {
            $ut = UserTask::query()->findOrFail($id);
            $ut->update($request->all());
            $response['success'] = true;
            $response['message'] = 'task is done';
        } catch (\Exception $exception) {
            $response['success'] = false;
            $response['message'] = $exception->getMessage();
        }
        return response()->json($response);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
