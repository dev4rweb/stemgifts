<?php

namespace Database\Seeders;

use App\Models\Game;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        User::factory()->create([
            'name' => 'Nikodem',
            'is_admin' => true,
            'email' => 'admin@source-byte.com',
            'password' => \bcrypt('qa9h6`dNWNd{J#rd'),
        ]);
        User::factory()->create([
            'name' => 'Admin',
            'is_admin' => true,
            'email' => 'admin@gmail.com',
            'password' => \bcrypt('password'),
        ]);
        User::factory()->create([
            'name' => 'User',
            'is_admin' => true,
            'email' => 'user@gmail.com',
            'password' => \bcrypt('password'),
        ]);
        User::factory(100)->create();
        $this->call(GameSeeder::class);
    }
}
