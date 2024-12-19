<?php

namespace App\Http\Controllers\Api\Pegawai;

use Illuminate\Http\Request;
use App\Models\HistoryPenyewaanModel;
use App\Http\Resources\ResponseResource;
use App\Models\KendaraanModel;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class HistoryPenyewaanController
{
    public function index() {
        Log::info('Fetching history penyewaan for user: ' . Auth::user()->id);
        $histories = HistoryPenyewaanModel::where('user_id', Auth::user()->id)->get();

        if ($histories->isEmpty()) {
            Log::warning('No history penyewaan found for user: ' . Auth::user()->id);
            return response()->json([
                'message' => 'Data history penyewaan is empty',
            ], 404);
        }

        return new ResponseResource(200, 'List data histories', $histories);
    }

    public function getStatistic() {
        Log::info('Fetching statistics for history penyewaan for user: ' . Auth::user()->id);
        $histories = HistoryPenyewaanModel::where('user_id', Auth::user()->id)->get();
        $totalHistories = $histories->count();

        $pendingHistories = HistoryPenyewaanModel::where('status', 'Pending')->where('user_id', Auth::user()->id)->get();
        $totalPendingHistories = $pendingHistories->count();

        $approvedHistories = HistoryPenyewaanModel::where('status', 'Approved')->where('user_id', Auth::user()->id)->get();
        $totalApprovedHistories = $approvedHistories->count();

        $rejectedHistories = HistoryPenyewaanModel::where('status', 'Rejected')->where('user_id', Auth::user()->id)->get();
        $totalRejectedHistories = $rejectedHistories->count();

        return response()->json([
            'total_histories' => $totalHistories,
            'total_pending_histories' => $totalPendingHistories,
            'total_approved_histories' => $totalApprovedHistories,
            'total_rejected_histories' => $totalRejectedHistories,
        ], 200);
    }

    public function store(Request $request) {
        $validated = $request->validate([
            'user_id' => 'required|integer',
            'tambang_tujuan_id' => 'required|integer',
            'kendaraan_id' => 'required|integer',
            'tanggal_sewa' => 'required',
            'tanggal_kembali' => 'required',
            'status' => 'required|string',
        ]);

        $history = HistoryPenyewaanModel::create($validated);
        Log::info('History penyewaan created: ' . $history->id);

        $kendaraan = KendaraanModel::find($validated['kendaraan_id']);

        if ($kendaraan) {
            $kendaraan->last_used = $validated['tanggal_kembali'];
            $kendaraan->save();
            Log::info('Kendaraan updated with last used date: ' . $kendaraan->last_used);
        }

        return new ResponseResource(200,'Data history penyewaan was created', $validated);
    }
}
