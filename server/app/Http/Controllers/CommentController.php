<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    public function index(Post $post)
    {
        return $post->comments()
            ->with('user')
            ->latest()
            ->get();
    }
    public function store(Request $request, Post $post)
    {
        $request->validate([
            'content' => ['required', 'max:500'],
        ]);

        $comment = $post->comments()->create([
            'user_id' => $request->user()->id,
            'content' => $request->content,
        ]);

        return $comment->load('user');
    }
    public function destroy(Comment $comment)
    {

        $comment->delete();

        return response()->json([
            'message' => 'Deleted'
        ]);
    }
}
