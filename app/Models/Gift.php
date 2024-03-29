<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Gift extends Model
{
    use HasFactory;

    protected $fillable = [
        'gift_key',
        'game_id',
        'user_id',
    ];

    public function game()
    {
        return $this->belongsTo(Game::class);
    }
}
