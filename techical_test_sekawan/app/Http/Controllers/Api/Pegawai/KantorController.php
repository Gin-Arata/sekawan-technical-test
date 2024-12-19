<?php

namespace App\Http\Controllers\Api\Pegawai;

use App\Http\Resources\ResponseResource;
use App\Models\KantorModel;
use Illuminate\Support\Facades\Log;

class KantorController
{
    public function index() {
        Log::info('Fetching all kantor');
        $kantor = KantorModel::all();

        return new ResponseResource(200, 'List data kantor', $kantor);
    }
}
