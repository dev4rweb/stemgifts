<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TaskCategoryItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'task_category_id'
    ];
}
