<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{
    public function updateProfileImage(Request $request)
    {
        $request->validate([
            'profile_image' => [
                'required',
                'image',
                'mimes:jpg,jpeg,png,webp',
                'max:4096',
            ],
        ]);

        /** @var User $user */
        $user = Auth::user();

        // Hapus foto lama jika ada
        if ($user->profile_image) {
            Storage::disk('public')->delete($user->profile_image);
        }

        $image = $request->file('profile_image')
            ->store('profiles', 'public');

        $user->update([
            'profile_image' => $image,
        ]);

        return response()->json([
            'message' => 'Profile image updated successfully.',
            'profile_image' => $image,
            'profile_image_url' => asset("storage/{$image}"),
        ]);
    }
}
