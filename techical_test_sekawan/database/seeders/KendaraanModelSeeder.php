<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class KendaraanModelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table("kendaraan")->insert([
            [
                'name' => 'Dump Truck',
                'license_plate' => 'IJ2301',
                'fuel_consumption' => 10.1,
                'image' => 'dump-truck-sucofindo.jpg',
                'jenis_kendaraan_id'=> 2,
                'lokasi_penyimpanan_id' => 3,
                'service_date' => '2024-12-31',
                'last_used' => '2024-10-01',
            ],
            [
                'name' => 'Underground Rock Drill',
                'license_plate' => 'UR1209',
                'fuel_consumption' => 9.5,
                'image' => 'Underground-Rock-Drill-Vehicle-sucofindo.jpg',
                'jenis_kendaraan_id'=> 2,
                'lokasi_penyimpanan_id' => 3,
                'service_date' => '2025-09-10',
                'last_used' => '2024-12-01',
            ],
            [
                'name' => 'Scraper',
                'license_plate' => 'SC2303',
                'fuel_consumption' => 14.3,
                'image' => 'Bucket-Wheel-Excavator-sucofindo.jpg',
                'jenis_kendaraan_id'=> 2,
                'lokasi_penyimpanan_id' => 3,
                'service_date' => '2024-12-27',
                'last_used' => '2024-10-01',
            ],
            [
                'name' => 'Bus Scania K360IB',
                'license_plate' => 'SK1232',
                'fuel_consumption' => 14.3,
                'image' => 'scania_k360ib.png',
                'jenis_kendaraan_id'=> 1,
                'lokasi_penyimpanan_id' => 1,
                'service_date' => '2024-12-27',
                'last_used' => '2024-10-01',
            ],
        ]);
    }
}
