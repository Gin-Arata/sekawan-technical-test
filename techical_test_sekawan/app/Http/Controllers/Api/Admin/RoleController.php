<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Resources\ResponseResource;
use App\Models\RoleModel;
use Illuminate\Support\Facades\Log;

class RoleController
{
    public function index() {
        Log::info('Fetching all role data');
        $roles = RoleModel::all();

        return new ResponseResource(200, 'List data role', $roles);
    }
}
