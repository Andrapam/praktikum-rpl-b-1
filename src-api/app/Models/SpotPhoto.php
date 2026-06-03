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
}
