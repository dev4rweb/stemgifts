<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserGame extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'game_id',
    ];

    protected $appends = [
        'is_giveaway'
    ];

    public function getIsGiveawayAttribute()
    {
        $game = Game::where('id', $this->game_id)->where('is_competition', 0)->first();
        if ($game) return true;
        return false;
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
