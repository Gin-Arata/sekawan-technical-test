<?php

namespace App\Http\Controllers\Api\Manager;

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
