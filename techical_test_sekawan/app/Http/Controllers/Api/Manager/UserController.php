<?php

namespace App\Http\Controllers\Api\Manager;

use App\Models\UserModel;
use Illuminate\Http\Request;
use App\Http\Resources\ResponseResource;
use Illuminate\Support\Facades\Log;

class UserController
{
    public function index() {
        Log::info('Fetching all users');
        $users = UserModel::all();

        $userArray = $users->toArray();
        $excludeKeys = ['password'];
        $filteredUsers = array_diff_key($userArray, array_flip($excludeKeys));

        return new ResponseResource(true, 'List data user', $filteredUsers);
    }
}
