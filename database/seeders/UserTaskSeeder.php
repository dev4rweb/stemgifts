<?php

namespace Database\Seeders;

use App\Models\UserTask;
use Illuminate\Database\Seeder;

class UserTaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        UserTask::factory(150)->create();
    }
}
