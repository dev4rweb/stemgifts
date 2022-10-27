<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TaskCategory extends Model
{
    use HasFactory;

    protected $fillable = ['title'];

    public function taskCategoryItems()
    {
        return $this->hasMany(TaskCategoryItem::class);
    }
}
