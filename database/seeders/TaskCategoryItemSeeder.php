<?php

namespace Database\Seeders;

use App\Models\TaskCategory;
use App\Models\TaskCategoryItem;
use Illuminate\Database\Seeder;

class TaskCategoryItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $taskCategories = TaskCategory::all();
        if (count($taskCategories)) {
            foreach ($taskCategories as $category) {
                if ($category->title === 'steam') {
                    TaskCategoryItem::create(['task_category_id' => $category->id, 'title' => 'Add game to wishlist']);
                    TaskCategoryItem::create(['task_category_id' => $category->id, 'title' => 'Join to the grou']);
                    TaskCategoryItem::create(['task_category_id' => $category->id, 'title' => 'Follow group']);
                }
                if ($category->title === 'twitter') {
                    TaskCategoryItem::create(['task_category_id' => $category->id, 'title' => 'follow']);
                    TaskCategoryItem::create(['task_category_id' => $category->id, 'title' => 'Like']);
                    TaskCategoryItem::create(['task_category_id' => $category->id, 'title' => 'repost']);
                    TaskCategoryItem::create(['task_category_id' => $category->id, 'title' => 'post']);
                    TaskCategoryItem::create(['task_category_id' => $category->id, 'title' => 'view post']);
                }
                if ($category->title === 'youtube') {
                    TaskCategoryItem::create(['task_category_id' => $category->id, 'title' => 'Watch the vide']);
                    TaskCategoryItem::create(['task_category_id' => $category->id, 'title' => 'Like']);
                    TaskCategoryItem::create(['task_category_id' => $category->id, 'title' => 'comment']);
                    TaskCategoryItem::create(['task_category_id' => $category->id, 'title' => 'Subscribe']);
                }
                if ($category->title === 'discord')
                    TaskCategoryItem::create(['task_category_id' => $category->id, 'title' => 'Join the server']);

                if ($category->title === 'facebook') {
                    TaskCategoryItem::create(['task_category_id' => $category->id, 'title' => 'Like post']);
                    TaskCategoryItem::create(['task_category_id' => $category->id, 'title' => 'Share post']);
                    TaskCategoryItem::create(['task_category_id' => $category->id, 'title' => 'Like fanpage']);
                    TaskCategoryItem::create(['task_category_id' => $category->id, 'title' => 'comment post']);
                }
                if ($category->title === 'instagram') {
                    TaskCategoryItem::create(['task_category_id' => $category->id, 'title' => 'Like photo']);
                    TaskCategoryItem::create(['task_category_id' => $category->id, 'title' => 'comment']);
                    TaskCategoryItem::create(['task_category_id' => $category->id, 'title' => 'share']);
                }
                if ($category->title === 'reddit') {
                    TaskCategoryItem::create(['task_category_id' => $category->id, 'title' => 'join group']);
                    TaskCategoryItem::create(['task_category_id' => $category->id, 'title' => 'Give upvote']);
                }
                if ($category->title === 'website')
                    TaskCategoryItem::create(['task_category_id' => $category->id, 'title' => 'Check website']);
            }
        }
    }
}
