# FishPoint - Setup Guide

## Backend (Laravel API)
1. cd src-api
2. composer install
3. cp .env.example .env
4. php artisan key:generate
5. Buat database MySQL bernama `fishpoint`
6. php artisan migrate --seed
7. php artisan serve  → jalan di http://localhost:8000

## Frontend (Next.js)
1. cd src
2. npm install
3. Buat file .env.local, isi:
   NEXT_PUBLIC_API_URL=http://localhost:8000
4. npm run dev  → jalan di http://localhost:3000
