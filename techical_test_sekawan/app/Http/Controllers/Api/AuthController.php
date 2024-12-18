<?php

namespace App\Http\Controllers\Api;

use App\Models\UserModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\PersonalAccessToken;

class AuthController
{
    public function login(Request $request) {
        $request->validate([
            'email' => 'required|email',
            'password'=> 'required|string'
        ]);

        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'message' => 'Email or password wrong',
            ], 400);
        }

        $user = UserModel::with('role')->where('email', $request->email)->first();
        $token = $user->createToken('auth_token')->plainTextToken;

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

            return response()->json([
                'user' => $user,
                'role' => $user->role->name,
            ], 200);
        } else {
            return response()->json([
                'message' => 'Token not found',
            ], 404);
        }
    }
}
