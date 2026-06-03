<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Spot extends Model
{
    protected $table = 'spot';

    protected $fillable = [
        'userId',
        'name',
        'latitude',
        'longitude',
        'description',
        'jenis_air',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'userId');
    }

    public function photos(): HasMany
    {
        return $this->hasMany(SpotPhoto::class, 'spotId');
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class, 'spotId');
    }
}
