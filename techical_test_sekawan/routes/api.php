<?php

use App\Http\Controllers\Api\Admin\DaerahController as AdminDaerahController;
use App\Http\Controllers\Api\Admin\HistoryPenyewaanController as AdminHistoryPenyewaanController;
use App\Http\Controllers\Api\Admin\JenisKendaraanController as AdminJenisKendaraanController;
use App\Http\Controllers\Api\Admin\KendaraanController as AdminKendaraanController;
use App\Http\Controllers\Api\Admin\TambangController as AdminTambangController;
use \App\Http\Controllers\Api\Admin\KantorController as AdminKantorController;
use App\Http\Controllers\Api\Admin\RoleController as AdminRoleController;
use App\Http\Controllers\Api\Admin\UserController as AdminUserController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\Manager\JenisKendaraanController as ManagerJenisKendaraanController;
use App\Http\Controllers\Api\Manager\DaerahController as ManagerDaerahController;
use App\Http\Controllers\Api\Manager\HistoryPenyewaanController as ManagerHistoryPenyewaanController;
use App\Http\Controllers\Api\Manager\KantorController as ManagerKantorController;
use App\Http\Controllers\Api\Manager\KendaraanController as ManagerKendaraanController;
use App\Http\Controllers\Api\Manager\TambangController as ManagerTambangController;
use App\Http\Controllers\Api\Manager\UserController as ManagerUserController;
use App\Http\Controllers\Api\Pegawai\HistoryPenyewaanController as PegawaiHistoryPenyewaanController;
use App\Http\Controllers\Api\Pegawai\JenisKendaraanController as PegawaiJenisKendaraanController;
use App\Http\Controllers\Api\Pegawai\KantorController as PegawaiKantorController;
use App\Http\Controllers\Api\Pegawai\KendaraanController as PegawaiKendaraanController;
use App\Http\Controllers\Api\Pegawai\TambangController as PegawaiTambangController;
use App\Http\Controllers\Api\Pegawai\UserController as PegawaiUserController;
use App\Http\Controllers\Api\SuperAdmin\DaerahController;
use App\Http\Controllers\Api\SuperAdmin\HistoryPenyewaanController;
use App\Http\Controllers\Api\SuperAdmin\JenisKendaraanController;
use App\Http\Controllers\Api\SuperAdmin\KantorController;
use App\Http\Controllers\Api\SuperAdmin\KendaraanController;
use App\Http\Controllers\Api\SuperAdmin\RoleController;
use App\Http\Controllers\Api\SuperAdmin\TambangController;
use App\Http\Controllers\Api\SuperAdmin\UserController;
use App\Http\Middleware\RoleMiddleware;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login']);
Route::get('/logout', [AuthController::class, 'logout']);

// Route get user current
Route::get('/user/current', [AuthController::class, 'userCurrent']);

// Route Super Admin
Route::middleware(['auth:sanctum', RoleMiddleware::class.':Super Admin'])->prefix('super-admin')->group(function () {
    // Route crud user | super admin
    Route::apiResource('/user', UserController::class);

    // Route crud daerah | super admin
    Route::apiResource('/daerah', DaerahController::class);

    // Route crud tambang | super admin
    Route::apiResource('/tambang', TambangController::class);

    // Route crud kantor | super admin
    Route::apiResource('/kantor', KantorController::class);

    // Route crud Jenis Kendaraan | super admin
    Route::apiResource('/jenis-kendaraan', JenisKendaraanController::class);

    // Route crud kendaraan | super admin
    Route::apiResource('/kendaraan', KendaraanController::class);

    // Route crud role | super admin
    Route::apiResource('/role', RoleController::class);

    // Route crud history penyewaan | super admin
    Route::apiResource('/history-penyewaan', HistoryPenyewaanController::class);

    // Route get stastic data user | super admin
    Route::get('/statistic/user', [UserController::class, 'getStatistic']);

    // Route get stastic data penyewaan | super admin
    Route::get('/statistic/penyewaan', [HistoryPenyewaanController::class, 'getStatistic']);

    // Route get history to count rental per month | super admin
    Route::get('/statistic/history-per-month', [HistoryPenyewaanController::class, 'getHistoryPerMonth']);
});

// Route Admin
Route::middleware(['auth:sanctum', RoleMiddleware::class.':Admin'])->prefix('admin')->group(function () {
    // Route crud daerah | admin
    Route::apiResource('/daerah', AdminDaerahController::class);

    // Route crud tambang | admin
    Route::apiResource('/tambang', AdminTambangController::class);

    // Route crud kendaraan | admin
    Route::apiResource('/kendaraan', AdminKendaraanController::class);

    // Route crud kantor | admin
    Route::apiResource('/kantor', AdminKantorController::class);

    // Route crud user | admin
    Route::apiResource('/user', AdminUserController::class);

    // Route crud role | admin
    Route::apiResource('/role', AdminRoleController::class);

    // Route crud jenis kendaraan | admin
    Route::apiResource('/jenis-kendaraan', AdminJenisKendaraanController::class);

    // Route update history penyewaan | admin
    Route::apiResource('/history-penyewaan', AdminHistoryPenyewaanController::class);

    // Route get stastic data user | admin
    Route::get('/statistic/user', [AdminUserController::class, 'getStatistic']);

    // Route get stastic data penyewaan | admin
    Route::get('/statistic/penyewaan', [AdminHistoryPenyewaanController::class, 'getStatistic']);

    // Route get history penyewaan status pending | admin
    Route::get('/pending-sewa', [AdminHistoryPenyewaanController::class, 'getPendingHistory']);
});

// Route Manager
Route::middleware(['auth:sanctum', RoleMiddleware::class.':Manager'])->prefix('manager')->group(function () {
    // Route read tambang | manager
    Route::apiResource('/tambang', ManagerTambangController::class);

    // Route read daerah | manager
    Route::apiResource('/daerah', ManagerDaerahController::class);

    // Route read kendaraan | manager
    Route::apiResource('/kendaraan', ManagerKendaraanController::class);

    // Route read jenis kendaraan | manager
    Route::apiResource('/jenis-kendaraan', ManagerJenisKendaraanController::class);

    // Route read kantor | manager
    Route::apiResource('/kantor', ManagerKantorController::class);

    // Route read user | manager
    Route::apiResource('/user', ManagerUserController::class);

    // Route read & update history penyewaan | manager
    Route::apiResource('/history-penyewaan', ManagerHistoryPenyewaanController::class);

    // Route get history penyewaan status pending | manager
    Route::get('/pending-sewa', [ManagerHistoryPenyewaanController::class, 'getPendingHistory']);

    // Route get statistic penyewaan | manager
    Route::get('/statistic/penyewaan', [ManagerHistoryPenyewaanController::class, 'getStatistic']);

    // Route get history to count rental per month | manager
    Route::get('/statistic/history-per-month', [ManagerHistoryPenyewaanController::class, 'getHistoryPerMonth']);
});

// Route Pegawai
Route::middleware(['auth:sanctum', RoleMiddleware::class.':Pegawai'])->prefix('pegawai')->group(function () {
    // Route read kendaraan | pegawai
    Route::apiResource('/kendaraan', PegawaiKendaraanController::class);

    // Route read tambang | pegawai
    Route::apiResource('/tambang', PegawaiTambangController::class);

    // Route read jenis kendaraan | pegawai
    Route::apiResource('/jenis-kendaraan', PegawaiJenisKendaraanController::class);

    // Route read kantor | pegawai
    Route::apiResource('/kantor', PegawaiKantorController::class);

    // Route read user | pegawai
    Route::apiResource('/user', PegawaiUserController::class);

    // Route create & read history penyewaan | pegawai
    Route::apiResource('/history-penyewaan', PegawaiHistoryPenyewaanController::class);

    // Route get statistic history penyewaan by user | pegawai
    Route::get('/statistic/penyewaan', [PegawaiHistoryPenyewaanController::class, 'getStatistic']);
});
