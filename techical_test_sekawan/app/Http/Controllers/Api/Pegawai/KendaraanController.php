<?php

namespace App\Http\Controllers\Api\Pegawai;

use App\Models\KendaraanModel;
use App\Http\Resources\ResponseResource;
use Illuminate\Support\Facades\Log;

class KendaraanController
{
    public function index() {
        Log::info('Fetching all kendaraan');
        $kendaraan = KendaraanModel::all();

        return new ResponseResource(200, 'List data kendaraan', $kendaraan);
    }
}
