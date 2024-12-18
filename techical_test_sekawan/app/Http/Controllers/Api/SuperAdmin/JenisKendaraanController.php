<?php

namespace App\Http\Controllers\Api\SuperAdmin;

use App\Http\Resources\ResponseResource;
use App\Models\JenisKendaraanModel;
use Illuminate\Http\Request;

class JenisKendaraanController
{
    public function index() {
        $jenisKendaraan = JenisKendaraanModel::all();

        return new ResponseResource(200, 'List data jenis kendaraan', $jenisKendaraan);
    }

    public function store(Request $request) {
        $validated = $request->validate([
            'name' => 'required|string',
        ]);

        $jenisKendaraan = JenisKendaraanModel::create($validated);

        return new ResponseResource(200,'Data jenis kendaraan was created', $jenisKendaraan);
    }

    public function update(Request $request, $id) {
        $validated = $request->validate([
            'name'=> 'string',
        ]);

        $jenisKendaraan = JenisKendaraanModel::find($id);

        if ($jenisKendaraan) {
            $jenisKendaraan->name = $validated['name'];

            $jenisKendaraan->save();

            return new ResponseResource(200,'Data jenis kendaraan was updated', $jenisKendaraan);
        }

        return response()->json([
            'message' => 'Data jenis kendaraan not found',
        ], 404);
    }

    public function destroy($id) {
        $jenisKendaraan = JenisKendaraanModel::find($id);

        if (!$jenisKendaraan) {
            return response()->json([
                'message' => 'Data jenis kendaraan not found',
            ], 404);
        }

        $jenisKendaraan->delete();

        return new ResponseResource(200,'Data jenis kendaran was deleted', []);
    }
}
