<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class HistoryPenyewaanModel extends Model
{
    protected $table = "history_penyewaan";

    protected $primaryKey = "id";

    protected $fillable = [
        "user_id",
        "kantor_asal_id",
        "tambang_tujuan_id",
        "kendaraan_id",
        "driver_id",
        "status",
        "tanggal_sewa",
        "tanggal_kembali",
    ];

    public function user()
    {
        return $this->belongsTo(UserModel::class, "user_id", "id");
    }

    public function kantor()
    {
        return $this->belongsTo(KantorModel::class, "kantor_asal_id", "id");
    }

    public function tambang(): BelongsTo {
        return $this->belongsTo(TambangModel::class,"tambang_tujuan_id", "id");
    }

    public function kendaraan(): BelongsTo {
        return $this->belongsTo(KendaraanModel::class,"kendaraan_id", "id");
    }

    public function driver(): BelongsTo {
        return $this->belongsTo(UserModel::class,"driver_id", "id");
    }
}
