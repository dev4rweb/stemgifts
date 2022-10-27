<?php

namespace Database\Seeders;

use App\Models\TaskCategory;
use Illuminate\Database\Seeder;

class TaskCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        TaskCategory::create(['title' => 'steam']);
        TaskCategory::create(['title' => 'twitter']);
        TaskCategory::create(['title' => 'youtube']);
        TaskCategory::create(['title' => 'discord']);
        TaskCategory::create(['title' => 'facebook']);
        TaskCategory::create(['title' => 'instagram']);
        TaskCategory::create(['title' => 'reddit']);
        TaskCategory::create(['title' => 'website']);
    }
}
