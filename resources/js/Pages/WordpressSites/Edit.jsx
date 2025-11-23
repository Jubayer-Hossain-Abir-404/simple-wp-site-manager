import React from 'react';
import { useForm } from 'react-hook-form';
import { Head, usePage, router } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { Status } from '../../Constants/Index';

export default function Edit() {
    const { wordpressSite, errors } = usePage().props;

    const {
        register,
        handleSubmit,
        formState: { errors: formErrors, isSubmitting, isDirty },
        setError,
        clearErrors,
    } = useForm({
        defaultValues: {
            name: wordpressSite.name || '',
            domain: wordpressSite.domain || '',
            server_ip: wordpressSite.server_ip || '',
            ssh_port: wordpressSite.ssh_port || 22,
            ssh_user: wordpressSite.ssh_user || '',
            ssh_password: '', // Empty for security
            ssh_password_confirmation: '',
            status: wordpressSite.status || Status.STOPPED,
        },
    });

    const onSubmit = (data) => {
        clearErrors();

        const submitData = { ...data };
        if (!submitData.ssh_password) {
            delete submitData.ssh_password;
            delete submitData.ssh_password_confirmation;
        }

        router.put(`/wordpress-sites/${wordpressSite.id}`, submitData, {
            onError: (errors) => {
                Object.keys(errors).forEach((key) => {
                    setError(key, { message: errors[key] });
                });
            },
        });
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <Head title={`Edit ${wordpressSite.name}`} />

            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Edit Wordpress Site: {wordpressSite.name}</h1>
                    <Link
                        href="/wordpress-sites"
                        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition duration-200"
                    >
                        Back to List
                    </Link>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Site Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Site Name <span className="text-sm text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                {...register('name', {
                                    required: 'Site name is required',
                                    minLength: {
                                        value: 2,
                                        message: 'Site name must be at least 2 characters'
                                    },
                                    maxLength: {
                                        value: 255,
                                        message: 'Site name must be at most 255 characters'
                                    }
                                })}
                                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.name ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                placeholder="Enter site name"
                            />
                            {formErrors.name && (
                                <p className="mt-1 text-sm text-red-600">{formErrors.name.message}</p>
                            )}
                        </div>

                        {/* Domain */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Domain <span className="text-sm text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                {...register('domain', {
                                    required: 'Domain is required',
                                    pattern: {
                                        value: /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/,
                                        message: 'Please enter a valid domain'
                                    }
                                })}
                                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.domain ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                placeholder="https://example.com"
                            />
                            {formErrors.domain && (
                                <p className="mt-1 text-sm text-red-600">{formErrors.domain.message}</p>
                            )}
                        </div>

                        {/* Server IP */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Server IP <span className="text-sm text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                {...register('server_ip', {
                                    required: 'Server IP is required',
                                    pattern: {
                                        value: /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/,
                                        message: 'Please enter a valid IP address'
                                    }
                                })}
                                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.server_ip ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                placeholder="192.168.1.100"
                            />
                            {formErrors.server_ip && (
                                <p className="mt-1 text-sm text-red-600">{formErrors.server_ip.message}</p>
                            )}
                        </div>

                        {/* SSH Port */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                SSH Port
                            </label>
                            <input
                                type="number"
                                {...register('ssh_port', {
                                    required: 'SSH port is required',
                                    min: { value: 1, message: 'SSH port must be greater than 0' },
                                    max: { value: 65535, message: 'SSH port must be less than 65536' }
                                })}
                                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.ssh_port ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                placeholder="22"
                            />
                            {formErrors.ssh_port && (
                                <p className="mt-1 text-sm text-red-600">{formErrors.ssh_port.message}</p>
                            )}
                        </div>

                        {/* SSH User */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                SSH User
                            </label>
                            <input
                                type="text"
                                {...register('ssh_user', {
                                    required: 'SSH user is required',
                                    maxLength: {
                                        value: 255,
                                        message: 'SSH user must be at most 255 characters'
                                    }
                                })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="ubuntu"
                            />
                            {formErrors.ssh_user && (
                                <p className="mt-1 text-sm text-red-600">{formErrors.ssh_user.message}</p>
                            )}
                        </div>

                        {/* SSH Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                SSH Password
                            </label>
                            <input
                                type="password"
                                {...register('ssh_password')}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Leave blank to keep current password"
                            />
                            {formErrors.ssh_password && (
                                <p className="mt-1 text-sm text-red-600">{formErrors.ssh_password.message}</p>
                            )}
                        </div>

                        {/* SSH Password Confirmation */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Confirm SSH Password
                            </label>
                            <input
                                type="password"
                                {...register('ssh_password_confirmation')}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Confirm new password"
                            />
                            {formErrors.ssh_password_confirmation && (
                                <p className="mt-1 text-sm text-red-600">{formErrors.ssh_password_confirmation.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Form Actions */}
                    <div className="flex justify-end space-x-3 pt-4">
                        <Link
                            href="/wordpress-sites"
                            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-md transition duration-200"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={isSubmitting || !isDirty}
                            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-md transition duration-200 flex items-center cursor-pointer"
                        >
                            {isSubmitting ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Updating...
                                </>
                            ) : (
                                'Update Site'
                            )}
                        </button>
                    </div>

                    {/* Display server-side errors */}
                    {errors && Object.keys(errors).length > 0 && (
                        <div className="bg-red-50 border border-red-200 rounded-md p-4">
                            <h3 className="text-red-800 font-medium mb-2">Please fix the following errors:</h3>
                            <ul className="list-disc list-inside text-red-700 text-sm">
                                {Object.entries(errors).map(([key, error]) => (
                                    <li key={key}>{error}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}