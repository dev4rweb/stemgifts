<?php

namespace Database\Seeders;

use App\Models\Game;
use App\Models\Gift;
use App\Models\User;
use Illuminate\Database\Seeder;

class GiftSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Gift::factory(50)->create();
        Gift::factory(70)->create([
            'user_id' => null
        ]);
    }
}
