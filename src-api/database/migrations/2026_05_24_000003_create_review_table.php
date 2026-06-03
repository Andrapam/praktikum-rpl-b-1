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
        Schema::create('review', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('spotId');
            $table->unsignedBigInteger('userId');
            $table->unsignedTinyInteger('rating');
            $table->text('reviewText')->nullable();
            $table->timestamps();

            $table->foreign('spotId')->references('id')->on('spot')->onDelete('cascade');
            $table->foreign('userId')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('review');
    }
};
