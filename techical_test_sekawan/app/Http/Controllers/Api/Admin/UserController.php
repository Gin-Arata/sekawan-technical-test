<?php

namespace App\Http\Controllers\Api\Admin;

use App\Models\UserModel;
use Illuminate\Http\Request;
use App\Http\Resources\ResponseResource;

class UserController
{
    public function index() {
        $users = UserModel::with('role')->get();

        $userArray = $users->toArray();
        $excludeKeys = ['password'];
        $filteredUsers = array_diff_key($userArray, array_flip($excludeKeys));

        return new ResponseResource(true, 'List data user', $filteredUsers);
    }

    public function getStatistic() {
        $users = UserModel::all();
        $totalUsers = $users->count();

        $roles = UserModel::select('role_id')->distinct()->get();
        $roleArray = $roles->toArray();
        $roleCount = count($roleArray);

        return response()->json([
            'total_users' => $totalUsers,
            'total_roles' => $roleCount,
        ], 200);
    }
}
