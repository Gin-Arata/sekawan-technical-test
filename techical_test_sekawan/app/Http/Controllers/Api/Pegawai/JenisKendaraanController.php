<?php

namespace App\Http\Controllers\Api\Pegawai;

use Illuminate\Http\Request;
use App\Models\JenisKendaraanModel;
use App\Http\Resources\ResponseResource;

class JenisKendaraanController
{
    public function index() {
        $jenisKendaraan = JenisKendaraanModel::all();

        return new ResponseResource(200, 'List data jenis kendaraan', $jenisKendaraan);
    }
}
