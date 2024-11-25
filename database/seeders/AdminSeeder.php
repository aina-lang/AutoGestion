<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
       
        $admin =  User::create([
            'nom' => "admin",
            'email' => "karenbulen@gmail.com",
            'password' => Hash::make("admin"),
            'type' => 1,
        ]);

        $admin->forceFill([
            'email_verified_at' => $admin->freshTimestamp(),
        ])->save();
    }
}
