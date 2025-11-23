import React from 'react'
import Pagination from '@/Components/Pagination';
import StatusBadge from '@/Components/StatusBadge';
import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react'
import { router } from '@inertiajs/react';


export default function Index({ wordpressSites }) {
    const deleteWordPressSite = (wordpressSiteId) => {
        if (confirm('Are you sure you want to delete this Wordpress site?')) {
            router.delete(`/wordpress-sites/${wordpressSiteId}`), {
                onError: (errors) => {
                    console.error(errors);
                    alert('An error occurred while deleting the Wordpress site.');
                },
            };
        }
    };
    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <Head title="Wordpress Sites" />

            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold mb-6 text-red-600">Wordpress Site List</h2>
                    <Link href="/wordpress-sites/create" className="bg-violet-500 text-white px-4 py-2 rounded-md">New Wordpress Site</Link>
                </div>

                {/* Data Table */}
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr>
                            <th className="p-3 border-b">Name</th>
                            <th className="p-3 border-b">Domain</th>
                            <th className="p-3 border-b">Status</th>
                            <th className="p-3 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {wordpressSites.data.map((wordpressSite) => (
                            <tr key={wordpressSite.id} className="hover:bg-gray-50">
                                <td className="p-3 border-b">{wordpressSite.name}</td>
                                <td className="p-3 border-b">{wordpressSite.domain}</td>
                                <td className="p-3 border-b">
                                    <StatusBadge
                                        status={wordpressSite.status}
                                    />
                                </td>
                                <div className="p-3 border-b">
                                    <Link href={`/wordpress-sites/${wordpressSite.id}/edit`} className="mr-2">Edit</Link>
                                    <button type="submit" className="text-red-600" onClick={() => deleteWordPressSite(wordpressSite.id)}>Delete</button>
                                </div>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination Links */}
                <div className="mt-6">
                    <Pagination links={wordpressSites.links} />
                </div>
            </div>
        </div>
    );
}
