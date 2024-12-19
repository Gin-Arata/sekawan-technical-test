<?php

namespace App\Http\Controllers\Api;

use App\Models\UserModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Laravel\Sanctum\PersonalAccessToken;

class AuthController
{
    public function login(Request $request) {
        $request->validate([
            'email' => 'required|email',
            'password'=> 'required|string'
        ]);

        if (!Auth::attempt($request->only('email', 'password'))) {
            Log::warning('Failed login attempt for email: ' . $request->email);
            return response()->json([
                'message' => 'Email or password wrong',
            ], 400);
        }

        $user = UserModel::with('role')->where('email', $request->email)->first();
        $token = $user->createToken('auth_token')->plainTextToken;

        Log::info('User logged in: ' . $user->email);

        return response()->json([
            'token' => $token,
            'role' => $user->role->name,
            'token_type' => 'Bearer'
        ]);
    }

    public function logout(Request $request) {
        $user = $request->user();

        if ($user) {
            $user->currentAccessToken()->delete();
            Log::info('User logged out: ' . $user->email);

            return response()->json(['message' => 'Logout success'], 200);
        }

        return response()->json([
            'message'=> 'Logout success',
        ], 200);
    }

    public function userCurrent(Request $request) {
        $token = $request->bearerToken();

        $accessToken = PersonalAccessToken::findToken($token);

        if ($accessToken) {
            $user = UserModel::with('role')->where('id', $accessToken->tokenable_id)->first();
            Log::info('Fetched current user: ' . $user->email);

            return response()->json([
                'user' => $user,
                'role' => $user->role->name,
            ], 200);
        } else {
            Log::warning('Token not found for current user request');
            return response()->json([
                'message' => 'Token not found',
            ], 404);
        }
    }
}
