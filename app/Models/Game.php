<?php

namespace App\Models;

use App\Filters\QueryFilter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    use HasFactory;

    const STATUS_ACTIVE = 0;
    const STATUS_FINISHED = 1;
    const STATUS_MODERATE = 2;
    const STATUS_DELETED = 3;

    protected $fillable = [
        'name',
        'description',
        'is_competition',
        'status',
        'start_date',
        'end_date',
        'main_image',
        'secondary_image',
        'left_image',
        'right_image',
        'is_favorite',
        'is_sponsored',
    ];

    protected $casts = [
        'start_date' => 'datetime:d-m-Y',
        'end_date' => 'datetime:d-m-Y',
        'is_competition' => 'boolean',
        'is_favorite' => 'boolean',
        'is_sponsored' => 'boolean',
    ];

    public function gifts()
    {
        return $this->hasMany(Gift::class);
    }

    public function tasks()
    {
        return $this->hasMany(Task::class);
    }

    public function users()
    {
        return $this->hasMany(UserGame::class);
    }

    public function persons()
    {
        return $this->hasManyThrough(User::class, UserGame::class, 'game_id', 'id', 'id', 'user_id');
    }

    public function scopeFilter(Builder $builder, QueryFilter $filter)
    {
        return $filter->apply($builder);
    }
}
