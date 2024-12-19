<?php

namespace App\Http\Controllers\Api\Admin;

use App\Models\DaerahModel;
use Illuminate\Http\Request;
use App\Http\Resources\ResponseResource;
use Illuminate\Support\Facades\Log;

class DaerahController
{
    public function index() {
        Log::info('Fetching all daerah data');
        $daerah = DaerahModel::all();

        return new ResponseResource(200, 'List data daerah', $daerah);
    }

    public function store(Request $request) {
        Log::info('Storing new daerah data', ['request' => $request->all()]);
        $validated = $request->validate([
            'name' => 'required|string',
        ]);

        $daerahDuplicated = DaerahModel::where('name', $validated['name'])->first();
        if ($daerahDuplicated) {
            Log::warning('Nama Daerah already exists', ['name' => $validated['name']]);
            return response()->json([
                'message' => 'Nama Daerah already exists',
            ], 400);
        }

        $daerah = DaerahModel::create($validated);
        Log::info('Daerah created successfully', ['daerah' => $daerah]);

        return new ResponseResource(200, 'Daerah was created', $daerah);
    }

    public function update(Request $request, $id) {
        Log::info('Updating daerah data', ['id' => $id, 'request' => $request->all()]);
        $validated = $request->validate([
            'name'=> 'string',
        ]);

        $daerah = DaerahModel::find($id);

        if ($daerah) {
            $daerah->name = $validated['name'];
            $daerah->save();
            Log::info('Daerah updated successfully', ['daerah' => $daerah]);

            return new ResponseResource(200,'Daerah was updated', $daerah);
        }

        Log::warning('Daerah not found', ['id' => $id]);
        return response()->json([
            'message'=> 'Daerah not found',
        ], 404);
    }

    public function destroy($id) {
        Log::info('Deleting daerah data', ['id' => $id]);
        $daerah = DaerahModel::find($id);

        if ($daerah) {
            $daerah->delete();
            Log::info('Daerah deleted successfully', ['id' => $id]);

            return new ResponseResource(200, 'Daerah was deleted', []);
        }

        Log::warning('Daerah not found', ['id' => $id]);
        return response()->json([
            'message'=> 'Daerah not found',
        ], 404);
    }
}
