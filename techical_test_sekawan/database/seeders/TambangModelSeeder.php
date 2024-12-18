<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TambangModelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table("tambang")->insert([
            [
                'name' => 'Tambang Nikel Ngoro',
                'mine_code' => 'NNG1',
                'daerah_id' => 3,
            ],
            [
                'name' => 'Tambang Nikel Lawang',
                'mine_code' => 'NLA1',
                'daerah_id' => 2,
            ],
            [
                'name' => 'Tambang Nikel Kepanjen',
                'mine_code' => 'NKE2',
                'daerah_id' => 2,
            ],
            [
                'name' => 'Tambang Nikel Kepanjen',
                'mine_code' => 'NKE1',
                'daerah_id' => 2,
            ],
            [
                'name' => 'Tambang Nikel Dinoyo',
                'mine_code' => 'NDI1',
                'daerah_id' => 1,
            ],
            [
                'name' => 'Tambang Nikel Surabaya',
                'mine_code' => 'NSU1',
                'daerah_id' => 3,
            ],
        ]);
    }
}
