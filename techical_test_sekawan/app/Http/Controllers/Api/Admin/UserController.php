<?php

namespace App\Http\Controllers\Api\Admin;

use App\Models\UserModel;
use App\Http\Resources\ResponseResource;
use Illuminate\Support\Facades\Log;

class UserController
{
    public function index() {
        Log::info('Fetching all user data');
        $users = UserModel::with('role')->get();

        $userArray = $users->toArray();
        $excludeKeys = ['password'];
        $filteredUsers = array_diff_key($userArray, array_flip($excludeKeys));

        Log::info('User data fetched successfully', ['users' => $filteredUsers]);
        return new ResponseResource(true, 'List data user', $filteredUsers);
    }

    public function getStatistic() {
        Log::info('Fetching user statistics');
        $users = UserModel::all();
        $totalUsers = $users->count();

        $roles = UserModel::select('role_id')->distinct()->get();
        $roleArray = $roles->toArray();
        $roleCount = count($roleArray);

        Log::info('User statistics fetched successfully', [
            'total_users' => $totalUsers,
            'total_roles' => $roleCount,
        ]);

        return response()->json([
            'total_users' => $totalUsers,
            'total_roles' => $roleCount,
        ], 200);
    }
}
