<?php

namespace Database\Seeders;

use App\Models\Task;
use Illuminate\Database\Seeder;

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Task::factory(200)->create();
        Task::factory()->count(1)->create([
            'game_id' => 22,
            'task_category_item_id' => 1,
            'url' => 'https://store.steampowered.com/app/397540/Borderlands_3/',
        ]);
    }
}
