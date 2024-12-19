<?php

namespace App\Http\Controllers\Api\Admin;

use Illuminate\Http\Request;
use App\Models\KendaraanModel;
use App\Http\Resources\ResponseResource;
use Illuminate\Support\Facades\Log;

class KendaraanController
{
    public function index() {
        Log::info('Fetching all kendaraan data');
        $kendaraan = KendaraanModel::all();

        return new ResponseResource(200, 'List data kendaraan', $kendaraan);
    }

    public function store(Request $request) {
        Log::info('Storing new kendaraan data', ['request' => $request->all()]);
        $validated = $request->validate([
            'name'=> 'required|string',
            'license_plate'=> 'required|string',
            'fuel_consumption' => 'required|double',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'jenis_kendaraan_id' => 'required|integer',
            'lokasi_penyimpanan_id' => 'required|integer',
            'service_date' => 'date',
            'last_used' => 'date',
        ]);

        $kendaraanDuplicated = KendaraanModel::where('license_plate', $validated['license_plate'])->first();
        if ($kendaraanDuplicated) {
            Log::warning('License plate already exists', ['license_plate' => $validated['license_plate']]);
            return response()->json([
                'message' => 'License plate already exist',
            ], 400);
        }

        $kendaraan = KendaraanModel::create($validated);
        Log::info('Kendaraan created successfully', ['kendaraan' => $kendaraan]);

        return new ResponseResource(200,'Data kendaraan was created', $kendaraan);
    }

    public function update(Request $request, $id) {
        Log::info('Updating kendaraan data', ['id' => $id, 'request' => $request->all()]);
        $validated = $request->validate([
            'name'=> 'string',
            'license_plate'=> 'string',
            'fuel_consumption' => 'double',
            'image' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
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
            $kendaraan->image = $validated['image'];
            $kendaraan->jenis_kendaraan_id = $validated['jenis_kendaraan_id'];
            $kendaraan->lokasi_penyimpanan_id = $validated['lokasi_penyimpanan_id'];
            $kendaraan->service_date = $validated['service_date'];
            $kendaraan->last_used = $validated['last_used'];
            $kendaraan->save();
            Log::info('Kendaraan updated successfully', ['kendaraan' => $kendaraan]);

            return new ResponseResource(200, 'Data kendaraan was updated', $kendaraan);
        }

        Log::warning('Kendaraan not found', ['id' => $id]);
        return response()->json([
            'message'=> 'Kendaraan not found',
        ], 404);
    }

    public function destroy($id) {
        Log::info('Deleting kendaraan data', ['id' => $id]);
        $kendaraan = KendaraanModel::find($id);

        if (!$kendaraan) {
            Log::warning('Kendaraan not found', ['id' => $id]);
            return response()->json([
                'message'=> 'Kendaraan not found',
            ], 404);
        }

        $kendaraan->delete();
        Log::info('Kendaraan deleted successfully', ['id' => $id]);

        return new ResponseResource(200,'Data kendaraan was deleted', []);
    }
}
