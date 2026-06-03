<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Review extends Model
{
    protected $table = 'review';

    protected $fillable = [
        'spotId',
        'userId',
        'rating',
        'reviewText',
    ];

    public function spot(): BelongsTo
    {
        return $this->belongsTo(Spot::class, 'spotId');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'userId');
    }
}
