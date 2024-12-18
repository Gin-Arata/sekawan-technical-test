<?php

namespace App\Http\Controllers\Api\SuperAdmin;

use App\Http\Resources\ResponseResource;
use App\Models\KendaraanModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class KendaraanController
{
    public function index() {
        $kendaraan = KendaraanModel::all();

        return new ResponseResource(200, 'List data kendaraan', $kendaraan);
    }

    public function store(Request $request) {
        $validated = $request->validate([
            'name'=> 'required|string',
            'license_plate'=> 'required|string',
            'fuel_consumption' => 'required|integer',
            'jenis_kendaraan_id' => 'required|integer',
            'lokasi_penyimpanan_id' => 'required|integer',
            'service_date' => 'date',
            'last_used' => 'date',
        ]);

        $kendaraanDuplicated = KendaraanModel::where('license_plate', $validated['license_plate'])->first();
        if ($kendaraanDuplicated) {
            return response()->json([
                'message' => 'License plate already exist',
            ], 400);
        }

        $kendaraan = KendaraanModel::create($validated);

        return new ResponseResource(200,'Data kendaraan was created', $kendaraan);
    }

    public function update(Request $request, $id) {
        $validated = $request->validate([
            'name'=> 'string',
            'license_plate'=> 'string',
            'fuel_consumption' => 'integer',
            'jenis_kendaraan_id' => 'integer',
            'lokasi_penyimpanan_id' => 'integer',
            'service_date' => 'date',
            'last_used' => 'date',
        ]);

        $kendaraan = KendaraanModel::find($id);

        if ($kendaraan) {
            $kendaraan->name = $validated['name'];
            $kendaraan->license_plate = $validated['license_plate'];
            $kendaraan->fuel_consumption = $validated['fuel_consumption'];
            $kendaraan->jenis_kendaraan_id = $validated['jenis_kendaraan_id'];
            $kendaraan->lokasi_penyimpanan_id = $validated['lokasi_penyimpanan_id'];
            $kendaraan->service_date = $validated['service_date'];
            $kendaraan->last_used = $validated['last_used'];

            $kendaraan->save();

            return new ResponseResource(200, 'Data kendaraan was updated', $kendaraan);
        }

        return response()->json([
            'message'=> 'Kendaraan not found',
        ], 404);
    }

    public function destroy($id) {
        $kendaraan = KendaraanModel::find($id);

        if (!$kendaraan) {
            return response()->json([
                'message'=> 'Kendaraan not found',
            ], 404);
        }

        $kendaraan->delete();

        return new ResponseResource(200,'Data kendaraas was deleted', []);
    }
}
