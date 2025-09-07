<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\TravelSetting
 *
 * @property int $id
 * @property string $travel_name
 * @property string|null $travel_logo
 * @property string $travel_address
 * @property string $travel_email
 * @property string $travel_phone
 * @property string|null $license_number
 * @property string|null $terms_conditions
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|TravelSetting newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TravelSetting newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TravelSetting query()
 * @method static \Illuminate\Database\Eloquent\Builder|TravelSetting whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TravelSetting whereLicenseNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TravelSetting whereTermsConditions($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TravelSetting whereTravelAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TravelSetting whereTravelEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TravelSetting whereTravelLogo($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TravelSetting whereTravelName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TravelSetting whereTravelPhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TravelSetting whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TravelSetting whereUpdatedAt($value)
 * @method static \Database\Factories\TravelSettingFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class TravelSetting extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'travel_name',
        'travel_logo',
        'travel_address',
        'travel_email',
        'travel_phone',
        'license_number',
        'terms_conditions',
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