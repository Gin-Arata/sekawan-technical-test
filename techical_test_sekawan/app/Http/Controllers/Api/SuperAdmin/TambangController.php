<?php

namespace App\Http\Controllers\Api\SuperAdmin;

use App\Http\Resources\ResponseResource;
use App\Models\TambangModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class TambangController
{
    public function index() {
        Log::info('Fetching all tambang');
        $tambang = TambangModel::all();

        return new ResponseResource(200, 'List data tambang', $tambang);
    }

    public function store(Request $request) {
        $validated = $request->validate([
            'name' => 'required|string',
            'daerah_id' => 'required',
            'mine_code' => 'required|string|max:10',
        ]);

        $tambangDuplicated = TambangModel::where('mine_code', $validated['mine_code'])->first();

        if ($tambangDuplicated) {
            Log::warning('Attempt to create duplicate tambang: ' . $validated['mine_code']);
            return response()->json([
                'message' => 'Mine code already exists',
            ], 400);
        }

        $tambang = TambangModel::create($validated);
        Log::info('Tambang created: ' . $tambang->name);

        return new ResponseResource(200,'New data tambang was created', $tambang);
    }

    public function update(Request $request, $id) {
        $validated = $request->validate([
            'name' => 'string',
            'daerah_id' => 'integer',
            'mine_code' => 'string|max:10',
        ]);

        $tambang = TambangModel::find($id);

        if ($tambang) {
            $tambang->name = $validated['name'];
            $tambang->daerah_id = $validated['daerah_id'];
            $tambang->mine_code = $validated['mine_code'];
            $tambang->save();
            Log::info('Tambang updated: ' . $tambang->name);

            return new ResponseResource(200,'Data tambang was updated', $tambang);
        }

        Log::warning('Attempt to update non-existent tambang with id: ' . $id);
        return response()->json([
            'message'=> 'Data tambang not found',
        ], 404);
    }

    public function destroy($id) {
        $tambang = TambangModel::find($id);

        if (!$tambang) {
            Log::warning('Attempt to delete non-existent tambang with id: ' . $id);
            return response()->json([
                'message'=> 'Data tambang not found',
            ], 404);
        }

        $tambang->delete();
        Log::info('Tambang deleted: ' . $tambang->name);

        return new ResponseResource(200,'Tambang was deleted', []);
    }
}
