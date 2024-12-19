<?php

namespace App\Http\Controllers\Api\SuperAdmin;

use App\Http\Resources\ResponseResource;
use App\Models\JenisKendaraanModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class JenisKendaraanController
{
    public function index() {
        Log::info('Fetching all jenis kendaraan');
        $jenisKendaraan = JenisKendaraanModel::all();

        return new ResponseResource(200, 'List data jenis kendaraan', $jenisKendaraan);
    }

    public function store(Request $request) {
        $validated = $request->validate([
            'name' => 'required|string',
        ]);

        $jenisKendaraan = JenisKendaraanModel::create($validated);
        Log::info('Jenis kendaraan created: ' . $jenisKendaraan->name);

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
            Log::info('Jenis kendaraan updated: ' . $jenisKendaraan->name);

            return new ResponseResource(200,'Data jenis kendaraan was updated', $jenisKendaraan);
        }

        Log::warning('Attempt to update non-existent jenis kendaraan with id: ' . $id);
        return response()->json([
            'message' => 'Data jenis kendaraan not found',
        ], 404);
    }

    public function destroy($id) {
        $jenisKendaraan = JenisKendaraanModel::find($id);

        if (!$jenisKendaraan) {
            Log::warning('Attempt to delete non-existent jenis kendaraan with id: ' . $id);
            return response()->json([
                'message' => 'Data jenis kendaraan not found',
            ], 404);
        }

        $jenisKendaraan->delete();
        Log::info('Jenis kendaraan deleted: ' . $jenisKendaraan->name);

        return new ResponseResource(200,'Data jenis kendaran was deleted', []);
    }
}
