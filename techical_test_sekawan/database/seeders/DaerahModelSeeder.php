<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
// use Illuminate\Support\Facades\DB;

class DaerahModelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table("daerah")->insert(
            [
                [
                    'name' => 'Kota Malang'
                ],
                [
                    'name'=> 'Kabupaten Malang'
                ],
                [
                    'name'=> 'Surabaya'
                ]
            ]
        );
    }
}
