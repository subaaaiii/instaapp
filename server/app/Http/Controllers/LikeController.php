<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class LikeController extends Controller
{
public function toggle(Request $request, Post $post)
{
    $user = $request->user();

    if ($post->likes()->where('user_id', $user->id)->exists()) {

        $post->likes()->detach($user->id);

        return response()->json([
            'liked' => false,
        ]);
    }

    $post->likes()->attach($user->id);

    return response()->json([
        'liked' => true,
    ]);
}
}
