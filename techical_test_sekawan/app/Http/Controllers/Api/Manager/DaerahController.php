<?php

namespace App\Http\Controllers\Api\Manager;

use App\Models\DaerahModel;
use App\Http\Resources\ResponseResource;
use Illuminate\Support\Facades\Log;

class DaerahController
{
    public function index() {
        Log::info('Fetching all daerah');
        $daerah = DaerahModel::all();

        return new ResponseResource(200, 'List data daerah', $daerah);
    }
}
