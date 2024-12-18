<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class KantorModelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table("kantor")->insert([
            [
                'name' => 'Kantor Sukabumi',
                'office_code' => 'SB21',
                'address' => 'Jalan Sukabumi No. 21',
                'city' => 'Malang',
                'office_type' => 'Kantor Cabang'
            ],
            [
                'name' => 'Kantor Majuindah',
                'office_code' => 'MJ31',
                'address' => 'Jalan Majuindah No. 31',
                'city' => 'Surabaya',
                'office_type' => 'Kantor Cabang'
            ],
            [
                'name' => 'Kantor Pertama Indah',
                'office_code' => 'PI1',
                'address' => 'Jalan Soekarno Hatta No. 1',
                'city' => 'Jakarta',
                'office_type' => 'Kantor Pusat'
            ]
        ]);
    }
}
