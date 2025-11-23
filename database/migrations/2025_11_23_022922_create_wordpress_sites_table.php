<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('wordpress_sites', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('domain')->unique();

            // Server connection info (encrypted)
            $table->string('server_ip');
            $table->integer('ssh_port')->default(22);
            $table->string('ssh_user');
            $table->string('ssh_password');

            $table->tinyInteger('status')->default(1)->comment('1: stopped, 2: deploying, 3: running, 4: failed');

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('wordpress_sites');
    }
};
