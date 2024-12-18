<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Resources\ResponseResource;
use App\Models\RoleModel;
use Illuminate\Http\Request;

class RoleController
{
    public function index() {
        $roles = RoleModel::all();

        return new ResponseResource(200, 'List data role', $roles);
    }
}
