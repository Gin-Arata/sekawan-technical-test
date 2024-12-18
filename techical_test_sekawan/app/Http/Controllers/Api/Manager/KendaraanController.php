<?php

namespace App\Http\Controllers\Api\Manager;

use Illuminate\Http\Request;
use App\Models\KendaraanModel;
use App\Http\Resources\ResponseResource;

class KendaraanController
{
    public function index() {
        $kendaraan = KendaraanModel::all();

        return new ResponseResource(200, 'List data kendaraan', $kendaraan);
    }
}
