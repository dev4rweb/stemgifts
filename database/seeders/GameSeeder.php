<?php

namespace Database\Seeders;

use App\Models\Game;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class GameSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Game::factory(20)->create();
        Game::factory()->count(1)->create([
            'is_sponsored' => true,
            'main_image' => '/images/sponsor-game.png'
        ]);
        Game::factory()->count(1)->create(
            [
                'name' => 'Steam game',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aspernatur beatae consectetur cupiditate eaque enim nobis repellendus tempore. Aperiam architecto hic illum magni odit porro quas quod sit voluptas voluptates. Aliquam consequatur dolorum enim esse id illo iste, quo ratione veritatis voluptatibus. Consequuntur ea eligendi eos, fugiat ipsam, itaque, laboriosam mollitia natus nesciunt obcaecati perferendis praesentium provident quaerat quas quo recusandae saepe tenetur vero. Consequatur delectus fuga ipsa magni numquam sit voluptas voluptates? Amet animi cupiditate dignissimos dolores ea error, harum impedit ipsam molestiae, nam, neque nisi numquam odit optio qui quis quod recusandae reiciendis repudiandae sed suscipit tempora voluptas!',
                'is_competition' => true,
                'status' => Game::STATUS_ACTIVE,
                'start_date' => Carbon::yesterday(),
                'end_date' => Carbon::tomorrow(),
                'main_image' => 'https://picsum.photos/200/300',
                'secondary_image' => 'https://picsum.photos/200/300',
                'left_image' => 'https://picsum.photos/200/300',
                'right_image' => 'https://picsum.photos/200/300',
                'is_favorite' => true,
                'is_sponsored' => false,
            ]
        );
    }
}
