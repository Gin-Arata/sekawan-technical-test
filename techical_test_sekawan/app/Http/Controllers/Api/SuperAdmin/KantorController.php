<?php

namespace App\Http\Controllers\Api\SuperAdmin;

use App\Http\Resources\ResponseResource;
use App\Models\KantorModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class KantorController
{
    public function index() {
        Log::info('Fetching all kantor');
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
            Log::warning('Attempt to create duplicate kantor: ' . $validated['office_code']);
            return response()->json([
                'message' => 'Kode Kantor duplicated',
            ], 400);
        }

        $kantor = KantorModel::create($validated);
        Log::info('Kantor created: ' . $kantor->name);

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
            Log::info('Kantor updated: ' . $kantor->name);

            return new ResponseResource(200,'Data kantor was updated', $kantor);
        }

        Log::warning('Attempt to update non-existent kantor with id: ' . $id);
        return response()->json([
            'message'=> 'Data kantor not found',
        ], 404);
    }

    public function destroy($id) {
        $kantor = KantorModel::find($id);

        if (!$kantor) {
            Log::warning('Attempt to delete non-existent kantor with id: ' . $id);
            return response()->json([
                'message'=> 'Data kantor not found',
            ],404);
        }

        $kantor->delete();
        Log::info('Kantor deleted: ' . $kantor->name);

        return new ResponseResource(200,'Data kantor was deleted', []);
    }
}
