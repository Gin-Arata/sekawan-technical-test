<?php

namespace App\Http\Controllers\Api\Manager;

use App\Models\DaerahModel;
use Illuminate\Http\Request;
use App\Http\Resources\ResponseResource;

class DaerahController
{
    public function index() {
        $daerah = DaerahModel::all();

        return new ResponseResource(200, 'List data daerah', $daerah);
    }
}
