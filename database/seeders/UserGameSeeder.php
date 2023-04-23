<?php

namespace Database\Seeders;

use App\Models\UserGame;
use Illuminate\Database\Seeder;

class UserGameSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        UserGame::factory(300)->create();
    }
}
