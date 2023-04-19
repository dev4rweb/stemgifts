<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserTask extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'task_id',
        'is_done',
    ];

    public function task()
    {
        return $this->belongsTo(Task::class);
    }
}
