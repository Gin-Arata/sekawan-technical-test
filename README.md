# Requirement Project

- Database : MySQL
- Database Version : 8.0.30
- PHP Version : ^8.3
- Node Version : 18.20.4
- Framework : 
    - Laravel (Backend)
    - NextJS/React (Frontend)

# How To Start Project
## Start Laravel
- Setelah melakukan cloning repo ini harap mengisi file `.env` terlebih dahulu. Hal yang diisi : 
```
DB_CONNECTION=mysql
// ganti menjadi nama host
DB_HOST=localhost 

//ganti port menyesuaikan port anda
DB_PORT=3306 

// bisa mengganti nama database jika ingin
DB_DATABASE=technical_test_sekawan 

// ganti username dan password menyesuaikan dengan username dan pw db anda
DB_USERNAME=root
DB_PASSWORD=
```
- Setelah mengubah `.env.example` selanjutnya harap melakukan migrate dan seeding pada database, dengan melakukan :
```
// jika baru pertama kali migrate
php artisan migrate --seed

// jika sudah melakukan migrate sebelumnya
php artisan migrate:fresh --seed
```
- Setelah melakukan migrate anda bisa mulai untuk menjalankan laravel, dengan melakukan : 
```
php artisan serve
```

## Start NextJS
- Setelah melakukan cloning repo harap mengubah file `.env.local.example` terlebih dahulu, dengan menambahkan : 
```
// untuk port dan host bisa diganti menyesuaikan local anda
NEXT_PUBLIC_API_URL : http://127.0.0.1:8000/api
```
- Setelah mengubah `.env.local.example` harap melakukan install package terlebih dahulu, dengan melakukan :
```
npm i 

atau

npm install
```
- Setelah melakukan install package anda bisa mulai untuk menjalankan aplikasi, dengan melakukan :
```
npm run dev
```

# Daftar Email & Password :
- Role : 
    - Super Admin :
        ```
        email: super@gmail.com
        password: super
        ```
    - Admin : 
        ```
        email: admin@gmail.com
        password: admin
        ```
    - Manager : 
        ```
        email: manager@gmail.com
        password: manager
        ```
    - Pegawai : 
        ```
        email: pegawai@gmail.com
        password: pegawai
        ```

# User Manual
- User Manual Super Admin : [User Manual](./doc/user-manual-superadmin.md)
- User Manual Admin : [User Manual](./doc/user-manual-admin.md)
- User Manual Manager : [User Manual](./doc/user-manual-manager.md)
- User Manual Pegawai : [User Manual](./doc/user-manual-pegawai.md)