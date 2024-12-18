<?php

namespace App\Http\Controllers\Api\Admin;

use App\Models\DaerahModel;
use Illuminate\Http\Request;
use App\Http\Resources\ResponseResource;

class DaerahController
{
    public function index() {
        $daerah = DaerahModel::all();

        return new ResponseResource(200, 'List data daerah', $daerah);
    }

    public function store(Request $request) {
        $validated = $request->validate([
            'name' => 'required|string',
        ]);

        $daerahDuplicated = DaerahModel::where('name', $validated['name'])->first();
        if ($daerahDuplicated) {
            return response()->json([
                'message' => 'Nama Daerah already exists',
            ], 400);
        }

        $daerah = DaerahModel::create($validated);

        return new ResponseResource(200, 'Daerah was created', $daerah);
    }

    public function update(Request $request, $id) {
        $validated = $request->validate([
            'name'=> 'string',
        ]);

        $daerah = DaerahModel::find($id);

        if ($daerah) {
            $daerah->name = $validated['name'];

            $daerah->save();

            return new ResponseResource(200,'Daerah was updated', $daerah);
        }

        return response()->json([
            'message'=> 'Daerah not found',
        ], 404);
    }

    public function destroy($id) {
        $daerah = DaerahModel::find($id);

        if ($daerah) {
            $daerah->delete();

            return new ResponseResource(200, 'Daerah was deleted', []);
        }

        return response()->json([
            'message'=> 'Daerah not found',
        ], 404);
    }
}
