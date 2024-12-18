<?php

namespace App\Http\Controllers\Api\Admin;

use Illuminate\Http\Request;
use App\Models\HistoryPenyewaanModel;
use App\Http\Resources\ResponseResource;

class HistoryPenyewaanController
{
    public function index() {
        $histories = HistoryPenyewaanModel::all();

        return new ResponseResource(200, 'List data histories', $histories);
    }

    public function getStatistic() {
        $histories = HistoryPenyewaanModel::all();
        $totalHistories = $histories->count();

        return response()->json([
            'total_sewa' => $totalHistories,
        ], 200);
    }

    public function getPendingHistory() {
        $histories = HistoryPenyewaanModel::where('status', 'Pending')->whereNull('driver_id')->get();

        if ($histories->isEmpty()) {
            return response()->json([
                'message' => 'Data history penyewaan is empty',
            ], 200);
        }

        return new ResponseResource(200, 'List data histories', $histories);
    }

    public function update(Request $request, $id) {
        $validated = $request->validate([
            'driver_id' => 'integer',
        ]);

        $history = HistoryPenyewaanModel::find($id);

        if ($history) {
            $history->driver_id = $validated['driver_id'];
            $history->save();

            return new ResponseResource(200,'Data history penyewaan was updated', $history);
        }

        return response()->json([
            'message' => 'Data history penyewaan not found'
        ], 404);
    }
}
