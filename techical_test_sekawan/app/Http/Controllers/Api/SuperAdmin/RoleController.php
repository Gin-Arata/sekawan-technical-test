<?php

namespace App\Http\Controllers\Api\SuperAdmin;

use App\Http\Resources\ResponseResource;
use App\Models\RoleModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class RoleController
{
    public function index() {
        Log::info('Fetching all roles');
        $roles = RoleModel::all();

        return new ResponseResource(200, 'List data role', $roles);
    }

    public function store(Request $request) {
        $validated = $request->validate([
            'name' => 'required|string',
        ]);

        $roleDuplicated = RoleModel::where('name', $validated['name'])->first();
        if ($roleDuplicated) {
            Log::warning('Attempt to create duplicate role: ' . $validated['name']);
            return response()->json([
                'message' => 'Role already exists',
            ], 400);
        }

        $role = RoleModel::create($validated);
        Log::info('Role created: ' . $role->name);

        return new ResponseResource(200,'Data role was created', $role);
    }

    public function update(Request $request, $id) {
        $validated = $request->validate([
            'name'=> 'string',
        ]);

        $role = RoleModel::find($id);

        if ($role) {
            $role->name = $validated['name'];
            $role->save();
            Log::info('Role updated: ' . $role->name);

            return new ResponseResource(200,'Data role was updated', $role);
        }

        Log::warning('Attempt to update non-existent role with id: ' . $id);
        return response()->json([
            'message'=> 'Role not found',
        ], 404);
    }

    public function destroy($id) {
        $role = RoleModel::find($id);

        if (!$role) {
            Log::warning('Attempt to delete non-existent role with id: ' . $id);
            return response()->json([
                'message'=> 'Role not found',
            ], 404);
        }

        $role->delete();
        Log::info('Role deleted: ' . $role->name);

        return new ResponseResource(200,'Data role was deleted', []);
    }
}
