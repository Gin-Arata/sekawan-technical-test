<?php

namespace App\Http\Controllers\Api\Admin;

use Illuminate\Http\Request;
use App\Models\HistoryPenyewaanModel;
use App\Http\Resources\ResponseResource;
use Illuminate\Support\Facades\Log;

class HistoryPenyewaanController
{
    public function index() {
        Log::info('Fetching all history penyewaan data');
        $histories = HistoryPenyewaanModel::all();

        return new ResponseResource(200, 'List data histories', $histories);
    }

    public function getStatistic() {
        Log::info('Fetching statistics for history penyewaan');
        $histories = HistoryPenyewaanModel::all();
        $totalHistories = $histories->count();

        return response()->json([
            'total_sewa' => $totalHistories,
        ], 200);
    }

    public function getPendingHistory() {
        Log::info('Fetching pending history penyewaan data');
        $histories = HistoryPenyewaanModel::where('status', 'Pending')->whereNull('driver_id')->get();

        if ($histories->isEmpty()) {
            Log::info('No pending history penyewaan data found');
            return response()->json([
                'message' => 'Data history penyewaan is empty',
            ], 200);
        }

        return new ResponseResource(200, 'List data histories', $histories);
    }

    public function update(Request $request, $id) {
        Log::info('Updating history penyewaan data', ['id' => $id, 'request' => $request->all()]);
        $validated = $request->validate([
            'driver_id' => 'integer',
        ]);

        $history = HistoryPenyewaanModel::find($id);

        if ($history) {
            $history->driver_id = $validated['driver_id'];
            $history->save();
            Log::info('History penyewaan updated successfully', ['history' => $history]);

            return new ResponseResource(200,'Data history penyewaan was updated', $history);
        }

        Log::warning('History penyewaan not found', ['id' => $id]);
        return response()->json([
            'message' => 'Data history penyewaan not found'
        ], 404);
    }
}
