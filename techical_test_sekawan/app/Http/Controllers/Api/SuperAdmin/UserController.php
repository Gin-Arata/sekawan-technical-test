<?php

namespace App\Http\Controllers\Api\SuperAdmin;

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

    public function getStatistic() {
        Log::info('Fetching user statistics');
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

    public function store(Request $request) {
        $validated = $request->validate([
            'name' => 'required|string',
            'email'=> 'required|email',
            'password'=> 'required|string|min:8',
            'role_id'=> 'required',
        ]);

        $userDuplicate = UserModel::where('email', $validated['email'])->first();
        if ($userDuplicate) {
            Log::warning('Attempt to create duplicate user: ' . $validated['email']);
            return response()->json([
                'message' => 'Email already exists',
            ], 400);
        }

        $validated['password'] = bcrypt($validated['password']);

        $user = UserModel::create($validated);
        Log::info('User created: ' . $user->name);

        $userArray = $user->toArray();
        $excludeKeys = ['password', 'created_at', 'updated_at'];
        $filteredUser = array_diff_key($userArray, array_flip($excludeKeys));

        return new ResponseResource(true, 'Created User' ,$filteredUser);
    }

    public function update(Request $request, $id) {
        $validated = $request->validate([
            'name' => 'string',
            'email'=> 'email',
            'password'=> 'string|min:8',
            'role_id'=> 'required',
        ]);

        $user = UserModel::find($id);

        if ($user) {
            $user->name = $validated['name'];
            $user->email = $validated['email'];
            if (!empty($validated['password'])) {
                $user->password = bcrypt($validated['password']);
            }
            $user->role_id = $validated['role_id'];
            $user->save();
            Log::info('User updated: ' . $user->name);

            $userArray = $user->toArray();
            $excludeKeys = ['password', 'created_at', 'updated_at'];
            $filteredUser = array_diff_key($userArray, array_flip($excludeKeys));

            return new ResponseResource(200, 'Updated User', $filteredUser);
        }

        Log::warning('Attempt to update non-existent user with id: ' . $id);
        return response()->json([
            'message' => 'User not found',
        ], 404);
    }

    public function destroy($id) {
        $user = UserModel::find($id);

        if (!$user) {
            Log::warning('Attempt to delete non-existent user with id: ' . $id);
            return response()->json([
                'message' => 'User not found',
            ], 404);
        }

        $user->delete();
        Log::info('User deleted: ' . $user->name);

        return new ResponseResource(200, 'User Has Been Deleted', []);
    }
}
