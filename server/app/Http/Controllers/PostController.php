<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    public function index()
    {
        $userId = Auth::id();
        return Post::with('user')
            ->withCount([
                'likes',
                'comments'
            ])
            ->withExists([
                'likes as is_liked' => function ($query) use ($userId) {
                    $query->where('users.id', $userId);
                }
            ])
            ->latest()
            ->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'caption' => ['nullable', 'string'],
            'image' => ['required', 'image', 'max:4096'],
        ]);

        $image = $request->file('image')
            ->store('posts', 'public');

        $post = Post::create([
            'user_id' => Auth::id(),
            'caption' => $request->caption,
            'image' => $image,
        ]);

        return response()->json($post, 201);
    }

    public function show(Request $request, Post $post)
    {
        $userId = $request->user()?->id;

        $post->load('user')
            ->loadCount([
                'likes',
                'comments'
            ]);

        $post->is_liked = $userId
            ? $post->likes()->where('users.id', $userId)->exists()
            : false;

        return response()->json($post);
    }

    public function update(Request $request, Post $post)
    {
        $request->validate([
            'caption' => ['nullable', 'string'],
        ]);

        $post->update([
            'caption' => $request->caption,
        ]);

        return response()->json($post);
    }

    public function destroy(Post $post)
    {
        Storage::disk('public')->delete($post->image);

        $post->delete();

        return response()->json([
            'message' => 'Post deleted.'
        ]);
    }

    public function posts(string $username)
    {
        $user = User::where('username', $username)->firstOrFail();

        return $user->posts()
            ->latest()
            ->get();
    }
}
