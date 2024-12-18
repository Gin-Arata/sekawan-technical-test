<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class KendaraanModel extends Model
{
    protected $table = "kendaraan";

    protected $primaryKey = "id";

    protected $fillable = [
        "name",
        "license_plate",
        "fuel_consumption",
        "image",
        "jenis_kendaraan_id",
        "lokasi_penyimpanan_id",
        "service_date",
        "last_used"
    ];

    public function kantor(): BelongsTo {
        return $this->belongsTo(KantorModel::class, 'lokasi_penyimpanan_id', 'id');
    }

    public function jenisKendaraan(): BelongsTo {
        return $this->belongsTo(JenisKendaraanModel::class, 'jenis_kendaraan_id', 'id');
    }

    public function historyPenyewaan(): HasMany {
        return $this->hasMany(HistoryPenyewaanModel::class, 'kendaraan_id', 'id');
    }
}
