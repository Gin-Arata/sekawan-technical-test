<?php

namespace App\Http\Controllers\Api\Manager;

use App\Models\JenisKendaraanModel;
use App\Http\Resources\ResponseResource;
use Illuminate\Support\Facades\Log;

class JenisKendaraanController
{
    public function index() {
        Log::info('Fetching all jenis kendaraan');
        $jenisKendaraan = JenisKendaraanModel::all();

        return new ResponseResource(200, 'List data jenis kendaraan', $jenisKendaraan);
    }
}
