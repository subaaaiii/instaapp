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
        return Post::with('user')
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

    public function show(Post $post)
    {
        return $post->load('user');
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
