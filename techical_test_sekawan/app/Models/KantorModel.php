<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class KantorModel extends Model
{
    protected $table = "kantor";

    protected $primaryKey = "id";

    protected $fillable = [
        "name",
        "office_code",
        "address",
        "city",
        "office_type"
    ];

    public function kendaraan(): HasMany {
        return $this->hasMany(KantorModel::class, 'lokasi_penyimpanan_id', 'id');
    }
}
