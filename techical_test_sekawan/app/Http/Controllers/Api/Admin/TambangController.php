<?php

namespace App\Http\Controllers\Api\Admin;

use App\Models\TambangModel;
use Illuminate\Http\Request;
use App\Http\Resources\ResponseResource;
use Illuminate\Support\Facades\Log;

class TambangController
{
    public function index() {
        Log::info('Fetching all tambang data');
        $tambang = TambangModel::all();

        return new ResponseResource(200, 'List data tambang', $tambang);
    }

    public function store(Request $request) {
        Log::info('Storing new tambang data', ['request' => $request->all()]);
        $validated = $request->validate([
            'name' => 'required|string',
            'daerah_id' => 'required',
            'mine_code' => 'required|string|max:10',
        ]);

        $tambangDuplicated = TambangModel::where('mine_code', $validated['mine_code'])->first();

        if ($tambangDuplicated) {
            Log::warning('Mine code already exists', ['mine_code' => $validated['mine_code']]);
            return response()->json([
                'message' => 'Mine code already exists',
            ], 400);
        }

        $tambang = TambangModel::create($validated);
        Log::info('Tambang created successfully', ['tambang' => $tambang]);

        return new ResponseResource(200,'New data tambang was created', $tambang);
    }

    public function update(Request $request, $id) {
        Log::info('Updating tambang data', ['id' => $id, 'request' => $request->all()]);
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
            Log::info('Tambang updated successfully', ['tambang' => $tambang]);

            return new ResponseResource(200,'Data tambang was updated', $tambang);
        }

        Log::warning('Tambang not found', ['id' => $id]);
        return response()->json([
            'message'=> 'Data tambang not found',
        ], 404);
    }

    public function destroy($id) {
        Log::info('Deleting tambang data', ['id' => $id]);
        $tambang = TambangModel::find($id);

        if (!$tambang) {
            Log::warning('Tambang not found', ['id' => $id]);
            return response()->json([
                'message'=> 'Data tambang not found',
            ], 404);
        }

        $tambang->delete();
        Log::info('Tambang deleted successfully', ['id' => $id]);

        return new ResponseResource(200,'Tambang was deleted', []);
    }
}
