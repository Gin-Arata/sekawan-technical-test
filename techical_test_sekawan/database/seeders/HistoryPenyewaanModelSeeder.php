<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class HistoryPenyewaanModelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table("history_penyewaan")->insert([
            [
                "user_id" => 1,
                "kendaraan_id" => 1,
                "tambang_tujuan_id" => 1,
                "driver_id" => 5,
                "tanggal_sewa" => "2022-12-12",
                "tanggal_kembali" => "2022-12-13",
                "status" => "Pending",
            ],
            [
                "user_id" => 1,
                "kendaraan_id" => 1,
                "tambang_tujuan_id" => 1,
                "driver_id" => 5,
                "tanggal_sewa" => "2022-12-12",
                "tanggal_kembali" => "2022-12-13",
                "status" => "Rejected",
            ],
            [
                "user_id" => 1,
                "kendaraan_id" => 1,
                "tambang_tujuan_id" => 1,
                "driver_id" => 5,
                "tanggal_sewa" => "2022-12-12",
                "tanggal_kembali" => "2022-12-13",
                "status" => "Approved",
            ],
        ]);
    }
}
