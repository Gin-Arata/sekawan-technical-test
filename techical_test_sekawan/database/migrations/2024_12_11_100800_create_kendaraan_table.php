<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('kendaraan', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('license_plate')->unique();
            $table->double('fuel_consumption');
            $table->unsignedBigInteger('jenis_kendaraan_id');
            $table->unsignedBigInteger('lokasi_penyimpanan_id');
            $table->date('service_date')->nullable();
            $table->date('last_used')->nullable();
            $table->timestamps();

            $table->foreign('jenis_kendaraan_id')->references('id')->on('jenis_kendaraan')->onDelete('cascade');
            $table->foreign('lokasi_penyimpanan_id')->references('id')->on('kantor')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kendaraan');
    }
};
