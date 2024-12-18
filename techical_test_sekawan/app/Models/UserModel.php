<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class UserModel extends Authenticatable
{
    use HasFactory, HasApiTokens, Notifiable;

    protected $table = "user";

    protected $primaryKey = "id";

    protected $fillable = [
        "name",
        "email",
        "password",
        "role_id",
    ];

    public function role(): BelongsTo
    {
        return $this->belongsTo(RoleModel::class);
    }

    public function hasRole(string $role) {
        return $this->role->name === $role;
    }

    public function historyPenyewaan(): HasMany {
        return $this->hasMany(HistoryPenyewaanModel::class, 'user_id', 'id');
    }

    public function historyPenyewaanDriver(): HasMany {
        return $this->hasMany(HistoryPenyewaanModel::class, 'driver_id', 'id');
    }
}
