<?php

namespace Database\Factories;

use App\Models\Game;
use App\Models\TaskCategoryItem;
use Illuminate\Database\Eloquent\Factories\Factory;

class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'game_id' => Game::where('is_competition', 1)->get()->random()->id,
            'task_category_item_id' => TaskCategoryItem::all()->random()->id,
            'url' => $this->faker->url
        ];
    }
}
