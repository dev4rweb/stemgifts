<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SocialTwitter extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'tweeter_id',
        'screen_name',
        'oauth_token',
        'oauth_token_secret',
    ];
}
