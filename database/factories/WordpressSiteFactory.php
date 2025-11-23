<?php

declare(strict_types=1);

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\WordpressSite>
 */
class WordpressSiteFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->sentence(),
            'domain' => fake()->domainName(),
            'server_ip' => '127.0.0.1',
            'ssh_port' => 22,
            'ssh_user' => 'root',
            'ssh_password' => '123456',
            'status' => config('common.status.stopped'),
        ];
    }
}
