<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Customer>
 */
class CustomerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $companyNames = [
            'Acme Corporation',
            'Globex Ltd.',
            'Initech Solutions',
            'Hooli Enterprises',
            'Umbrella Group',
            'Stark Systems',
            'Wayne Technologies',
            'Monarch Logistics',
            'Papertrail Co.',
            'Zenith Dynamics',
        ];
        return [
            'user_id' => 1,
            'name' => fake()->name,
            'email' => fake()->unique()->email(),
            'company' => $companyNames=array_rand($companyNames),
            'notes' => fake()->sentence()
        ];

    }
}
