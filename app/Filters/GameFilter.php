<?php


namespace App\Filters;


use App\Models\Game;
use App\Filters\QueryFilter;

class GameFilter extends QueryFilter
{
    public function category($category = 'all')
    {
        $is_competition = $category == 10;
        if ($category != 'all')
            return $this->builder->where('is_competition', $is_competition);
        return Game::all();
    }

    public function favorite($favorite = 'all')
    {
        $is_favorite = $favorite == 10;
        if ($favorite != 'all')
            return $this->builder->where('is_favorite', $is_favorite);
        return Game::all();
    }

    public function search($search = '')
    {
        return $this->builder->when($search, function ($query) use ($search){
            $query->where('name', 'LIKE', '%' . $search . '%');
//                ->orWhere('description', 'LIKE', '%' . $search . '%');
        });
    }
}
