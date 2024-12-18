<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class DaerahModel extends Model
{
    protected $table = "daerah";

    protected $primaryKey = "id";

    protected $fillable = [
        "name",
    ];

    public function tambang(): HasMany {
        return $this->hasMany(TambangModel::class, 'daerah_id', 'id');
    }
}
