<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class JenisKendaraanModel extends Model
{
    protected $table = "jenis_kendaraan";

    protected $primaryKey = "id";

    protected $fillable = [
        "name",
    ];

    public function kendaraan(): HasMany {
        return $this->hasMany(KendaraanModel::class, 'jenis_kendaraan_id', 'id');
    }
}
