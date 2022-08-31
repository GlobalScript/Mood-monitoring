<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSlicesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('slices', function (Blueprint $table) {
            $table->id();
            $table->integer('health')->nullable();
            $table->integer('job')->nullable();
            $table->integer('environment')->nullable();
            $table->integer('relationships')->nullable();
            $table->integer('rest')->nullable();
            $table->integer('development')->nullable();
            $table->integer('realization')->nullable();
            $table->integer('spirituality')->nullable();
            $table->unsignedBigInteger('user_id')->nullable();
            $table->string('create_date')->nullable();
            $table->timestamps();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('slices');
    }
}
