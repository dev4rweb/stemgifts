<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class GameFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->words(2, true),
            'description' => $this->faker->text(),
            'is_competition' => $this->faker->boolean,
            'status' => $this->faker->numberBetween(0, 3),
            'start_date' => $this->faker->dateTimeBetween('-1 years', '1 years'),
            'end_date' => $this->faker->dateTimeBetween('-1 years', '1 years'),
            'main_image' => $this->faker->imageUrl,
            'secondary_image' => $this->faker->imageUrl,
            'left_image' => $this->faker->imageUrl,
            'right_image' => $this->faker->imageUrl,
            'is_favorite' => $this->faker->boolean,
        ];
    }
}
