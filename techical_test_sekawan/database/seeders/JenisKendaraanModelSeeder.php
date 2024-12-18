<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class JenisKendaraanModelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table("jenis_kendaraan")->insert([
            [
                'name' => 'Angkutan Orang'
            ],
            [
                'name' => 'Angkutan Barang'
            ]
        ]);
    }
}
