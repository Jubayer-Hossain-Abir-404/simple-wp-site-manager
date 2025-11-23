<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class WordpressSiteRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        if ($this->isMethod('PUT') || $this->isMethod('PATCH')) {
            return $this->updateRules();
        }

        return [
            'name' => [
                'required',
                'string',
                'min:2',
                'max:255',
            ],
            'domain' => [
                'required',
                'string',
                'max:255',
                'unique:wordpress_sites,domain',
                'regex:/^(?!:\/\/)(?=.{1,255}$)((.{1,63}\.){1,127}(?![0-9]*$)[a-z0-9-]+\.?)$/i',
            ],
            'server_ip' => [
                'required',
                'string',
                'ipv4',
            ],
            'ssh_port' => [
                'required',
                'integer',
                'min:1',
                'max:65535',
            ],
            'ssh_user' => [
                'required',
                'string',
                'min:2',
                'max:255',
            ],
            'ssh_password' => [
                'required',
                'confirmed',
                'string',
                'min:4',
                'max:255',
            ],
            'status' => [
                'integer',
                'between:1,4',
            ],
        ];
    }

    public function updateRules(): array
    {
        return [
            'name' => [
                'string',
                'min:2',
                'max:255',
            ],
            'domain' => [
                'string',
                'max:255',
                Rule::unique('wordpress_sites', 'domain')->ignore($this->wordpress_site),
                'regex:/^(?!:\/\/)(?=.{1,255}$)((.{1,63}\.){1,127}(?![0-9]*$)[a-z0-9-]+\.?)$/i',
            ],
            'server_ip' => [
                'string',
                'ipv4',
            ],
            'ssh_port' => [
                'integer',
                'min:1',
                'max:65535',
            ],
            'ssh_user' => [
                'string',
                'min:2',
                'max:255',
            ],
            'ssh_password' => [
                'confirmed',
                'string',
                'min:4',
                'max:255',
            ],
            'status' => [
                'integer',
                'between:1,4',
            ],
        ];
    }
}
