<?php

namespace Database\Factories;

use App\Models\Game;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class GiftFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'gift_key' => $this->faker->creditCardNumber(null, true, '-'),
            'game_id' => Game::all()->random()->id,
            'user_id' => User::all()->random()->id
        ];
    }
}
