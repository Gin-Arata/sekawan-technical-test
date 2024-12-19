<?php

namespace App\Http\Controllers\Api\Manager;

use Illuminate\Http\Request;
use App\Models\HistoryPenyewaanModel;
use App\Http\Resources\ResponseResource;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class HistoryPenyewaanController
{
    public function index() {
        Log::info('Fetching all history penyewaan with driver');
        $histories = HistoryPenyewaanModel::whereNotNull('driver_id')->get();

        return new ResponseResource(200, 'List data histories', $histories);
    }

    public function getStatistic() {
        Log::info('Fetching statistics for history penyewaan');
        $histories = HistoryPenyewaanModel::all();
        $totalHistories = $histories->count();

        $pendingHistories = HistoryPenyewaanModel::where('status', 'Pending')->whereNotNull('driver_id')->get();
        $totalPendingHistories = $pendingHistories->count();

        $approvedHistories = HistoryPenyewaanModel::where('status', 'Approved')->whereNotNull('driver_id')->get();
        $totalApprovedHistories = $approvedHistories->count();

        $rejectedHistories = HistoryPenyewaanModel::where('status', 'Rejected')->whereNotNull('driver_id')->get();
        $totalRejectedHistories = $rejectedHistories->count();

        return response()->json([
            'total_histories' => $totalHistories,
            'total_pending_histories' => $totalPendingHistories,
            'total_approved_histories' => $totalApprovedHistories,
            'total_rejected_histories' => $totalRejectedHistories,
        ], 200);
    }

    public function getPendingHistory() {
        Log::info('Fetching pending history penyewaan with driver');
        $histories = HistoryPenyewaanModel::where('status', 'Pending')->whereNotNull('driver_id')->get();

        if ($histories->isEmpty()) {
            Log::warning('No pending history penyewaan found');
            return response()->json([
                'message' => 'Data history penyewaan is empty',
            ], 200);
        }

        return new ResponseResource(200, 'List data histories', $histories);
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

    public function update(Request $request, $id) {
        $validated = $request->validate([
            'status' => 'string',
        ]);

        $history = HistoryPenyewaanModel::find($id);

        if ($history) {
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
}
