<?php

namespace App\Http\Controllers\Api\SuperAdmin;

use App\Http\Resources\ResponseResource;
use App\Models\HistoryPenyewaanModel;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class HistoryPenyewaanController
{
    public function index() {
        Log::info('Fetching all history penyewaan');
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

    public function getHistoryPerMonth() {
        Log::info('Fetching history penyewaan per month');
        $currentYear = Carbon::now()->year;
        $histories = HistoryPenyewaanModel::whereYear('created_at', $currentYear)->get();

        $historiesPerMonth = $histories->groupBy(function($date) {
            return Carbon::parse($date->created_at)->format('F');
        });

        $historiesPerMonthCount = [];
        foreach ($historiesPerMonth as $key => $value) {
            $historiesPerMonthCount[$key] = count($value);
        }

        return response()->json([
            'histories_per_month_and_year' => $historiesPerMonthCount,
        ], 200);
    }

    public function store(Request $request) {
        $validated = $request->validate([
            'user_id' => 'required|integer',
            'tambang_tujuan_id' => 'required|integer',
            'kendaraan_id' => 'required|integer',
            'driver_id' => 'required|integer',
            'status' => 'required|string',
        ]);

        $history = HistoryPenyewaanModel::create($validated);
        Log::info('History penyewaan created: ' . $history->id);

        return new ResponseResource(200,'Data history penyewaan was created', $validated);
    }

    public function update(Request $request, $id) {
        $validated = $request->validate([
            'user_id' => 'integer',
            'tambang_tujuan_id' => 'integer',
            'kendaraan_id' => 'integer',
            'driver_id' => 'integer',
            'status' => 'string',
        ]);

        $history = HistoryPenyewaanModel::find($id);

        if ($history) {
            $history->user_id = $validated['user_id'];
            $history->tambang_tujuan_id = $validated['tambang_tujuan_id'];
            $history->kendaraan_id = $validated['kendaraan_id'];
            $history->driver_id = $validated['driver_id'];
            $history->status = $validated['status'];
            $history->save();
            Log::info('History penyewaan updated: ' . $history->id);

            return new ResponseResource(200,'Data history penyewaan was updated', $history);
        }

        Log::warning('Attempt to update non-existent history penyewaan with id: ' . $id);
        return response()->json([
            'message' => 'Data history penyewaan not found'
        ], 404);
    }

    public function destroy($id) {
        $history = HistoryPenyewaanModel::find($id);

        if (!$history) {
            Log::warning('Attempt to delete non-existent history penyewaan with id: ' . $id);
            return response()->json([
                'message' => 'Data history penyewaan not found'
            ], 404);
        }

        $history->delete();
        Log::info('History penyewaan deleted: ' . $history->id);

        return new ResponseResource(200,'Data history was deleted', []);
    }
}
