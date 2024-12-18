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
        Schema::create('history_penyewaan', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('tambang_tujuan_id');
            $table->unsignedBigInteger('kendaraan_id');
            $table->unsignedBigInteger('driver_id')->nullable();
            $table->date('tanggal_sewa');
            $table->date('tanggal_kembali');
            $table->enum('status', ['Pending', 'Approved', 'Rejected']);
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('user')->onDelete('cascade');
            $table->foreign('tambang_tujuan_id')->references('id')->on('tambang')->onDelete('cascade');
            $table->foreign('driver_id')->references('id')->on('user')->onDelete('cascade');
            $table->foreign('kendaraan_id')->references('id')->on('kendaraan')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('history_penyewaan');
    }
};
