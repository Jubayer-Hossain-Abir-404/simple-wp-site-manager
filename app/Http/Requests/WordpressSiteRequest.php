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
        $countryId = $this->country_id;
        $payloadStatus = $this->post('status');

        $rules = [
            'name' => [
                'string',
                'min:2',
                'max:255',
                function ($attribute, $value, $fail) {
                    if (is_string($value)
                    && preg_match('/<[^>]*script.*?>.*?<\/[^>]*script.*?>/i', $value)) {
                        $fail("The $attribute content is not allowed.");
                    }
                },
            ],
            'description' => [
                'nullable',
                'string',
                'min:3',
                'max:750',
                function ($attribute, $value, $fail) {
                    if (is_string($value)
                    && preg_match('/<[^>]*script.*?>.*?<\/[^>]*script.*?>/i', $value)) {
                        $fail("The $attribute content is not allowed.");
                    }
                },
            ],
            'country_id' => [
                'nullable',
                'integer',
                Rule::exists('countries', 'id')->where('status', config('common.status.active'))
                ->whereNull('deleted_at'),
            ],
            'region_id' => [
                'nullable',
                'integer',
                function ($attribute, $value, $fail) use ($countryId) {
                    if (!empty($value)) {
                        if (empty($countryId)) {
                            $fail('Country is required when region is provided.');
                        } else {
                            $region = Region::select('id')->where('country_id', $countryId)->active()->find($value);
                            if (empty($region)) {
                                $fail('The region must be within the selected country.');
                            }
                        }
                    }
                },
            ],
            'address' => [
                'nullable',
                'string',
                'min:3',
                'max:255',
                function ($attribute, $value, $fail) {
                    if (is_string($value)
                    && preg_match('/<[^>]*script.*?>.*?<\/[^>]*script.*?>/i', $value)) {
                        $fail("The $attribute content is not allowed.");
                    }
                },
            ],
            'employee_count' => [
                'nullable',
                'integer',
                'min:0',
            ],
            'survey_limit' => [
                'integer',
                'min:1',
            ],
            'has_admin_login' => [
                'required',
                'integer',
                'between:0,1',
                function ($attribute, $value, $fail) use ($payloadStatus) {
                    switch ($value) {
                        case config('common.has_org_admin_login.yes'):
                            if ($this->organization->status === config('common.status.inactive')
                                && (is_null($payloadStatus) || $payloadStatus === config('common.status.inactive'))) {
                                $fail('Organization must be active to create an admin.');
                            }
                            break;
                        default:
                            break;
                    }
                },
            ],
            'status' => [Rule::in([0, 1])],
        ];

        if ($this->post('has_admin_login')) {
            $hasAdminLogin = $this->post('has_admin_login');
            $isAdminUpdate = $this->post('is_admin_update');
            $adminRules = [];

            switch ($hasAdminLogin && $isAdminUpdate) {
                case config('common.has_org_admin_login.yes'):
                    $adminId = $this->organization->admin_id ?? 0;
                    $adminRules = collect($this->getAdminRequest()->updateRules($adminId))
                    ->mapWithKeys(fn ($rules, $key) => ["admin.$key" => $rules])
                    ->toArray();
                    break;
                default:
                    break;
            }

            $rules = array_merge($rules, $adminRules);
        }

        return $rules;
    }
}
