<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserModelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table("user")->insert([
            [
                'name' => 'Pegawai',
                'email'=> 'pegawai@gmail.com',
                'password'=> bcrypt('pegawai'),
                'role_id' => 1
            ],
            [
                'name' => 'Admin',
                'email'=> 'admin@gmail.com',
                'password'=> bcrypt('admin'),
                'role_id' => 2,
            ],
            [
                'name' => 'Manager',
                'email'=> 'manager@gmail.com',
                'password'=> bcrypt('manager'),
                'role_id' => 3,
            ],
            [
                'name' => 'Super Admin',
                'email'=> 'super@gmail.com',
                'password'=> bcrypt('super'),
                'role_id' => 4,
            ],
            [
                'name'=> 'Driver',
                'email' => 'driver@gmail.com',
                'password'=> bcrypt('driver'),
                'role_id' => 5
            ]
        ]);
    }
}
