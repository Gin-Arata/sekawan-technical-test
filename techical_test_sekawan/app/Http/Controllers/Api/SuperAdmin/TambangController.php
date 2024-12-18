<?php

namespace App\Http\Controllers\Api\SuperAdmin;

use App\Http\Resources\ResponseResource;
use App\Models\TambangModel;
use Illuminate\Http\Request;

class TambangController
{
    public function index() {
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
            return response()->json([
                'message' => 'Mine code already exists',
            ], 400);
        }

        $tambang = TambangModel::create($validated);

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

            return new ResponseResource(200,'Data tambang was updated', $tambang);
        }

        return response()->json([
            'message'=> 'Data tambang not found',
        ], 404);
    }

    public function destroy($id) {
        $tambang = TambangModel::find($id);

        if (!$tambang) {
            return response()->json([
                'message'=> 'Data tambang not found',
            ], 404);
        }

        $tambang->delete();

        return new ResponseResource(200,'Tambang was deleted', []);
    }
}
