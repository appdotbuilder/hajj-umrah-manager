<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Airline
 *
 * @property int $id
 * @property string $name
 * @property string $code
 * @property string $country
 * @property string|null $contact_email
 * @property string|null $contact_phone
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Airline newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Airline newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Airline query()
 * @method static \Illuminate\Database\Eloquent\Builder|Airline whereCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Airline whereContactEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Airline whereContactPhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Airline whereCountry($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Airline whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Airline whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Airline whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Airline whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Airline whereUpdatedAt($value)
 * @method static \Database\Factories\AirlineFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Airline extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'code',
        'country',
        'contact_email',
        'contact_phone',
        'status',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
}