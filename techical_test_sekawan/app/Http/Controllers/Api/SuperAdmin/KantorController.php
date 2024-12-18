<?php

namespace App\Http\Controllers\Api\SuperAdmin;

use App\Http\Resources\ResponseResource;
use App\Models\KantorModel;
use Illuminate\Http\Request;

class KantorController
{
    public function index() {
        $kantor = KantorModel::all();

        return new ResponseResource(200, 'List data kantor', $kantor);
    }

    public function store(Request $request) {
        $validated = $request->validate([
            'name'=> 'required|string',
            'office_code'=> 'required|string|max:10',
            'address'=> 'required|string',
            'city'=> 'required|string',
            'office_type'=> 'required|string',
        ]);

        $kantorDuplicated = KantorModel::where('office_code', $validated['office_code'])->first();

        if ($kantorDuplicated) {
            return response()->json([
                'message' => 'Kode Kantor duplicated',
            ], 400);
        }

        $kantor = KantorModel::create($validated);

        return new ResponseResource(200,'Data kantor was created', $kantor);
    }

    public function update(Request $request, $id) {
        $validated = $request->validate([
            'name'=> 'string',
            'office_code'=> 'string|max:10',
            'address'=> 'string',
            'city'=> 'string',
            'office_type'=> 'string',
        ]);

        $kantor = KantorModel::find($id);

        if ($kantor) {
            $kantor->name = $validated['name'];
            $kantor->address = $validated['address'];
            $kantor->city = $validated['city'];
            $kantor->office_type = $validated['office_type'];
            $kantor->office_code = $validated['office_code'];

            $kantor->save();

            return new ResponseResource(200,'Data kantor was updated', $kantor);
        }

        return response()->json([
            'message'=> 'Data kantor not found',
        ], 404);
    }

    public function destroy($id) {
        $kantor = KantorModel::find($id);

        if (!$kantor) {
            return response()->json([
                'message'=> 'Data kantor not found',
            ],404);
        }

        $kantor->delete();

        return new ResponseResource(200,'Data kantor was deleted', []);
    }
}
