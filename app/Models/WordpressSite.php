<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class WordpressSite extends Model
{
    use SoftDeletes;
    use HasFactory;

    protected $fillable = [
        'name',
        'domain',
        'server_ip',
        'ssh_port',
        'ssh_user',
        'ssh_password',
        'status',
    ];

    protected $casts = [
        'server_ip' => 'encrypted',
        'ssh_user' => 'encrypted',
        'ssh_password' => 'encrypted',
    ];

    protected $hidden = ['deleted_at'];
}
