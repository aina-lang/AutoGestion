#!/usr/bin/env bash
cd /var/www/html || exit

echo "Installing project dependencies..."
composer install --no-dev --optimize-autoloader

echo "Running composer global dependencies..."
composer global require hirak/prestissimo



echo "Installing additional packages..."
composer require tightenco/ziggy

echo "Generating application key..."
php artisan key:generate --show

echo "Caching configuration..."
php artisan config:cache

echo "Caching routes..."
php artisan route:cache

echo "Creating symbolic link for storage..."
php artisan storage:link || echo "Storage link already exists or failed to create"

echo "Running database migrations..."
php artisan migrate --force
