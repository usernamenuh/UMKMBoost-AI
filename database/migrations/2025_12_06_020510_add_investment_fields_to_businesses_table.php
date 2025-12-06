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
        Schema::table('businesses', function (Blueprint $table) {
              $table->decimal('initial_investment', 15, 2)->default(0)->after('description');
            $table->decimal('total_revenue', 15, 2)->default(0)->after('initial_investment');
            $table->decimal('total_expense', 15, 2)->default(0)->after('total_revenue');
            $table->decimal('net_profit', 15, 2)->default(0)->after('total_expense');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('businesses', function (Blueprint $table) {
            $table->dropColumn(['initial_investment', 'total_revenue', 'total_expense', 'net_profit']);
        });
    }
};
