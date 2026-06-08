<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SpotPhoto extends Model
{
    protected $table = 'spot_photos';

    protected $fillable = [
        'spotId',
        'imageUrl',
    ];

    public function spot(): BelongsTo
    {
        return $this->belongsTo(Spot::class, 'spotId');
    }

    public function getImageUrlAttribute($value): ?string
    {
        if (!$value) {
            return $value;
        }

        if (str_starts_with($value, 'http://') || str_starts_with($value, 'https://')) {
            return $value;
        }
        return $value;
    }
}
