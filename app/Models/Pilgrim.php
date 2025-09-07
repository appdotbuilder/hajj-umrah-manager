<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Pilgrim
 *
 * @property int $id
 * @property string $name
 * @property string $email
 * @property string $phone
 * @property string $address
 * @property string $passport_number
 * @property \Illuminate\Support\Carbon $passport_expiry
 * @property \Illuminate\Support\Carbon $birth_date
 * @property string $gender
 * @property string $emergency_contact_name
 * @property string $emergency_contact_phone
 * @property string|null $medical_conditions
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Booking> $bookings
 * @property-read int|null $bookings_count
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Pilgrim newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Pilgrim newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Pilgrim query()
 * @method static \Illuminate\Database\Eloquent\Builder|Pilgrim whereAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Pilgrim whereBirthDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Pilgrim whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Pilgrim whereEmergencyContactName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Pilgrim whereEmergencyContactPhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Pilgrim whereGender($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Pilgrim whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Pilgrim whereMedicalConditions($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Pilgrim whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Pilgrim wherePassportExpiry($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Pilgrim wherePassportNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Pilgrim wherePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Pilgrim whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Pilgrim whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Pilgrim whereUpdatedAt($value)
 * @method static \Database\Factories\PilgrimFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Pilgrim extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'phone',
        'address',
        'passport_number',
        'passport_expiry',
        'birth_date',
        'gender',
        'emergency_contact_name',
        'emergency_contact_phone',
        'medical_conditions',
        'status',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'passport_expiry' => 'date',
        'birth_date' => 'date',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the bookings for the pilgrim.
     */
    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class);
    }
}