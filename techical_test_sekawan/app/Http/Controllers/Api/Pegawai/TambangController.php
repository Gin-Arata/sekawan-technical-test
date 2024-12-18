<?php

namespace App\Http\Controllers\Api\Pegawai;

use App\Models\TambangModel;
use Illuminate\Http\Request;
use App\Http\Resources\ResponseResource;

class TambangController
{
    public function index() {
        $tambang = TambangModel::all();

        return new ResponseResource(200, 'List data tambang', $tambang);
    }
}
