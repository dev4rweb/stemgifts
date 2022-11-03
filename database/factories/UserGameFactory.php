<?php

namespace Database\Factories;

use App\Models\Game;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class UserGameFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'user_id' => User::where('is_admin', 0)->get()->random()->id,
            'game_id' => Game::where('is_competition', 0)->get()->random()->id
        ];
    }
}
