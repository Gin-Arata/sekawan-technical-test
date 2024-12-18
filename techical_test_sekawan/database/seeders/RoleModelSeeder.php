<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoleModelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table("role")->insert([
            [
                'name' => 'Pegawai'
            ],
            [
                'name' => 'Admin'
            ],
            [
                'name' => 'Manager'
            ],
            [
                'name' => 'Super Admin'
            ],
            [
                'name'=> 'Driver'
            ]
        ]);
    }
}
