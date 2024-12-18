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
        Schema::create('tambang', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('mine_code', 10)->unique();
            $table->unsignedBigInteger('daerah_id');
            $table->timestamps();

            $table->foreign('daerah_id')->references('id')->on('daerah')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tambang');
    }
};
