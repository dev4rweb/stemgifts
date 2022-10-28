<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'game_id',
        'task_category_item_id',
        'url'
    ];

    protected $appends = [
        'task',
        'users'
    ];

    public function getTaskAttribute()
    {
        $taskCatItem = TaskCategoryItem::find($this->task_category_item_id);
        if ($taskCatItem) return $taskCatItem->title;
        return 'task not found';
    }

    public function getUsersAttribute()
    {
        return UserTask::where('task_id', $this->id)->get();
    }

}
