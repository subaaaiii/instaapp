<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {

    Route::get('/me', [AuthController::class, 'me']);

    Route::post('/logout', [AuthController::class, 'logout']);

    Route::post('/profile/image', [ProfileController::class, 'updateProfileImage']);

    // Route::get('/posts/users/{username}', [PostController::class, 'posts']);
    Route::get('/users/suggestions', [UserController::class, 'suggestions']);
    Route::get('/users/{username}', [UserController::class, 'show']);
    Route::get('/users/{username}/posts', [UserController::class, 'posts']);
    Route::apiResource('posts', PostController::class);
    Route::post('/posts/{post}/like', [LikeController::class, 'toggle']);
    Route::get('/posts/{post}/comments', [CommentController::class, 'index']);
    Route::post('/posts/{post}/comments', [CommentController::class, 'store']);
    Route::delete('/comments/{comment}', [CommentController::class, 'destroy']);
});


Route::get('/test', function () {
    return response()->json([
        'status' => 'ok',
        'message' => 'Backend connected!',
    ]);
});
