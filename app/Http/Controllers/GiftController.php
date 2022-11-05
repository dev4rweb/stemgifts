<?php

namespace App\Http\Controllers;

use App\Models\Gift;
use Illuminate\Http\Request;

class GiftController extends Controller
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
            Gift::create($request->all());
            $message = 'Gift created';
        } catch (\Exception $exception) {
            $message = $exception->getMessage();
        }

        return redirect()->back()->withErrors(['error' => $message]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Gift  $gift
     * @return \Illuminate\Http\Response
     */
    public function show(Gift $gift)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Gift  $gift
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Gift $gift)
    {
        //
    }


    public function destroy($id)
    {
        try {
            $gift = Gift::findOrFail($id);
            $gift->delete();
            $message = 'Key removed';
        } catch (\Exception $exception) {
            $message = $exception->getMessage();
        }
        return redirect()->back()->withErrors(['error' => $message]);
    }
}
