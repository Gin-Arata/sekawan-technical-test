<?php

namespace App\Http\Controllers\Api\Manager;

use App\Models\UserModel;
use Illuminate\Http\Request;
use App\Http\Resources\ResponseResource;

class UserController
{
    public function index() {
        $users = UserModel::all();

        $userArray = $users->toArray();
        $excludeKeys = ['password'];
        $filteredUsers = array_diff_key($userArray, array_flip($excludeKeys));

        return new ResponseResource(true, 'List data user', $filteredUsers);
    }
}
