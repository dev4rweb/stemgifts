<?php

namespace Database\Seeders;

use App\Models\Game;
use Illuminate\Database\Seeder;

class GameSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Game::factory(200)->create();
        Game::factory()->count(1)->create([
            'is_sponsored' => true,
            'main_image' => '/images/sponsor-game.png'
        ]);
    }
}
