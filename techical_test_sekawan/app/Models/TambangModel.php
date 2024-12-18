<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TambangModel extends Model
{
    protected $table = "tambang";

    protected $primaryKey = "id";

    protected $fillable = [
        "name",
        "mine_code",
        "daerah_id"
    ];

    public function daerah(): BelongsTo {
        return $this->belongsTo(DaerahModel::class, 'daerah_id');
    }

    public function historyPenyewaan(): HasMany {
        return $this->hasMany(HistoryPenyewaanModel::class,'tambang_tujuan_id', 'id');
    }
}
