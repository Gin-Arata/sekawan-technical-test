<?php

namespace App\Http\Controllers\Api\SuperAdmin;

use App\Http\Resources\ResponseResource;
use App\Models\RoleModel;
use Illuminate\Http\Request;

class RoleController
{
    public function index() {
        $roles = RoleModel::all();

        return new ResponseResource(200, 'List data role', $roles);
    }

    public function store(Request $request) {
        $validated = $request->validate([
            'name' => 'required|string',
        ]);

        $roleDuplicated = RoleModel::where('name', $validated['name'])->first();
        if ($roleDuplicated) {
            return response()->json([
                'message' => 'Role already exists',
            ], 400);
        }

        $role = RoleModel::create($validated);

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

            return new ResponseResource(200,'Data role was updated', $role);
        }

        return response()->json([
            'message'=> 'Role not found',
        ], 404);
    }

    public function destroy($id) {
        $role = RoleModel::find($id);

        if (!$role) {
            return response()->json([
                'message'=> 'Role not found',
            ], 404);
        }

        $role->delete();

        return new ResponseResource(200,'Data role was deleted', []);
    }
}
