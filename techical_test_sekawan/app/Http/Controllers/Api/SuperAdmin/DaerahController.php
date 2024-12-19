<?php

namespace App\Http\Controllers\Api\SuperAdmin;

use App\Http\Resources\ResponseResource;
use App\Models\DaerahModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class DaerahController
{
    public function index() {
        Log::info('Fetching all daerah');
        $daerah = DaerahModel::all();

        return new ResponseResource(200, 'List data daerah', $daerah);
    }

    public function store(Request $request) {
        $validated = $request->validate([
            'name' => 'required|string',
        ]);

        $daerahDuplicated = DaerahModel::where('name', $validated['name'])->first();
        if ($daerahDuplicated) {
            Log::warning('Attempt to create duplicate daerah: ' . $validated['name']);
            return response()->json([
                'message' => 'Nama Daerah already exists',
            ], 400);
        }

        $daerah = DaerahModel::create($validated);
        Log::info('Daerah created: ' . $daerah->name);

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
            Log::info('Daerah updated: ' . $daerah->name);

            return new ResponseResource(200,'Daerah was updated', $daerah);
        }

        Log::warning('Attempt to update non-existent daerah with id: ' . $id);
        return response()->json([
            'message'=> 'Daerah not found',
        ], 404);
    }

    public function destroy($id) {
        $daerah = DaerahModel::find($id);

        if ($daerah) {
            $daerah->delete();
            Log::info('Daerah deleted: ' . $daerah->name);

            return new ResponseResource(200, 'Daerah was deleted', []);
        }

        Log::warning('Attempt to delete non-existent daerah with id: ' . $id);
        return response()->json([
            'message'=> 'Daerah not found',
        ], 404);
    }
}
