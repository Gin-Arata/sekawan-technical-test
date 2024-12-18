<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Resources\ResponseResource;
use App\Models\KantorModel;
use Illuminate\Http\Request;

class KantorController
{
    public function index() {
        $kantor = KantorModel::all();

        return new ResponseResource(200, 'List data kantor', $kantor);
    }
}
