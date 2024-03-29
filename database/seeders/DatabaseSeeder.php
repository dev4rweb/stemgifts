<?php

namespace Database\Seeders;

use App\Models\Game;
use App\Models\User;
use Carbon\Carbon;
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
            'is_admin' => false,
            'email' => 'user@gmail.com',
            'password' => \bcrypt('password'),
        ]);
        User::factory(10)->create();
        $this->call(GameSeeder::class);
        $this->call(TaskCategorySeeder::class);
        $this->call(TaskCategoryItemSeeder::class);
        $this->call(TaskSeeder::class);
        $this->call(UserTaskSeeder::class);
        $this->call(UserGameSeeder::class);
        $this->call(GiftSeeder::class);
        $this->call(WalletSeeder::class);
    }
}
