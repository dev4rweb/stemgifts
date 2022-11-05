<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\Task;
use App\Models\TaskCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GameController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    public function store(Request $request)
    {
        try {
            $game = Game::create($request->all());
            if (isset($request['tasks']) && count($request['tasks'])) {
                foreach ($request['tasks'] as $task)
                Task::create([
                   'game_id' => $game->id,
                   'task_category_item_id' => $task['task_category_item_id'],
                   'url' => $task['url'],
                ]);
            }
            $message = 'Game created';
        } catch (\Exception $exception) {
            $message = $exception->getMessage();
        }

        return redirect('/admin-competitions')->withErrors(['error' => $message]);
    }


    public function show($id)
    {
        try {
            $game = Game::with('tasks')
                ->with('gifts')->findOrFail($id);
            $categories = TaskCategory::with('taskCategoryItems')->get();
            return Inertia::render('admin/AdminEditCompetition', [
                'item' => $game,
                'categories' => $categories
            ]);
        } catch (\Exception $exception) {
            return redirect('/')->withErrors(['error' => 'Page not found']);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $game = Game::findOrFail($id);
            $game->update($request->all());
            if (isset($request['tasks']) || isset($request['tasks_new'])){
                $old_tasks = array();
                $response['tasks'] = $request['tasks'];
                $response['tasks_new'] = $request['tasks_new'];

                if (count($request['tasks_new'])) {
                    foreach ($request['tasks_new'] as $task) {
                        if (isset($task['id'])) array_push($old_tasks, $task);
                        else Task::create([
                            'game_id' => $game['id'],
                            'task_category_item_id' => $task['task_category_item_id'],
                            'url' => $task['url'],
                        ]);
                    }
                }
                // Remove old tasks
                if (count($request['tasks'])) {
                    foreach ($request['tasks'] as $task) {
                        $is_remove = true;
                        foreach ($old_tasks as $old_task) {
                            if ($task['id'] == $old_task['id']) $is_remove = false;
                        }
                        if ($is_remove == true) {
                            $item = Task::where('id', $task['id'])->first();
                            $item->delete();
                        }
                    }
                }
            }
            $message = 'Game updated';
        } catch (\Exception $exception) {
            $message = $exception->getMessage();
        }

        return redirect('/admin-competitions')->withErrors(['error' => $message]);
    }

    public function destroy($id)
    {
        try {
            $game = Game::findOrFail($id);
            $game->delete();
            $message = 'Game removed';
        } catch (\Exception $exception) {
            $message = $exception->getMessage();
        }
        return redirect()->back()->withErrors(['error' => $message]);
    }
}
