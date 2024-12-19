<?php

namespace App\Http\Controllers\Api\Admin;

use Illuminate\Http\Request;
use App\Models\JenisKendaraanModel;
use App\Http\Resources\ResponseResource;
use Illuminate\Support\Facades\Log;

class JenisKendaraanController
{
    public function index() {
        Log::info('Fetching all jenis kendaraan data');
        $jenisKendaraan = JenisKendaraanModel::all();

        return new ResponseResource(200, 'List data jenis kendaraan', $jenisKendaraan);
    }

    public function store(Request $request) {
        Log::info('Storing new jenis kendaraan data', ['request' => $request->all()]);
        $validated = $request->validate([
            'name' => 'required|string',
        ]);

        $jenisKendaraan = JenisKendaraanModel::create($validated);
        Log::info('Jenis kendaraan created successfully', ['jenisKendaraan' => $jenisKendaraan]);

        return new ResponseResource(200,'Data jenis kendaraan was created', $jenisKendaraan);
    }

    public function update(Request $request, $id) {
        Log::info('Updating jenis kendaraan data', ['id' => $id, 'request' => $request->all()]);
        $validated = $request->validate([
            'name'=> 'string',
        ]);

        $jenisKendaraan = JenisKendaraanModel::find($id);

        if ($jenisKendaraan) {
            $jenisKendaraan->name = $validated['name'];
            $jenisKendaraan->save();
            Log::info('Jenis kendaraan updated successfully', ['jenisKendaraan' => $jenisKendaraan]);

            return new ResponseResource(200,'Data jenis kendaraan was updated', $jenisKendaraan);
        }

        Log::warning('Jenis kendaraan not found', ['id' => $id]);
        return response()->json([
            'message' => 'Data jenis kendaraan not found',
        ], 404);
    }

    public function destroy($id) {
        Log::info('Deleting jenis kendaraan data', ['id' => $id]);
        $jenisKendaraan = JenisKendaraanModel::find($id);

        if (!$jenisKendaraan) {
            Log::warning('Jenis kendaraan not found', ['id' => $id]);
            return response()->json([
                'message' => 'Data jenis kendaraan not found',
            ], 404);
        }

        $jenisKendaraan->delete();
        Log::info('Jenis kendaraan deleted successfully', ['id' => $id]);

        return new ResponseResource(200,'Data jenis kendaran was deleted', []);
    }
}
