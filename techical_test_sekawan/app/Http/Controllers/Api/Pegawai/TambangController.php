<?php

namespace App\Http\Controllers\Api\Pegawai;

use App\Models\TambangModel;
use App\Http\Resources\ResponseResource;
use Illuminate\Support\Facades\Log;

class TambangController
{
    public function index() {
        Log::info('Fetching all tambang');
        $tambang = TambangModel::all();

        return new ResponseResource(200, 'List data tambang', $tambang);
    }
}
