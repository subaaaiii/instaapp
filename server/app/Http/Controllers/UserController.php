<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function show(string $username)
    {
        $user = User::withCount('posts')
            ->where('username', $username)
            ->firstOrFail();

        return response()->json($user);
    }

    public function posts(string $username)
    {
        $user = User::where('username', $username)
            ->firstOrFail();

        return response()->json(
            $user->posts()
                ->latest()
                ->get()
        );
    }

    public function suggestions(Request $request)
    {
        $query = User::withCount('posts');

        if ($request->user()) {
            $query->where('id', '!=', $request->user()->id);
        }

        $users = $query
            ->latest()
            ->take(5)
            ->get([
                'id',
                'name',
                'username',
                'profile_image',
            ]);

        return response()->json($users);
    }
}
