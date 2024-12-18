<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RoleModel extends Model
{
    protected $table = "role";

    protected $primaryKey = "id";

    protected $fillable = [
        "name",
    ];

    public function user()
    {
        return $this->hasMany(UserModel::class, "role_id", "id");
    }
}
