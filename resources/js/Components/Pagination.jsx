import React from 'react'
import { Link } from '@inertiajs/react';

export default function Pagination({ links }) {
    return (
        <nav className="text-center mt-4">
            {links.map((link) => (
                <Link
                    preserveScroll
                    href={link.url || ''}
                    key={link.label}
                    className={
                        'inline-block py-2 px-3 mx-1 rounded-lg text-gray-500 text-xs ' +
                        (link.active ? 'bg-gray-950 text-white ' : ' ') +
                        (!link.url ? '!text-gray-500 cursor-not-allowed ' : 'hover:bg-gray-950 hover:text-white')
                    }
                    // dangerouslySetInnerHTML is used because Laravel sends 
                    // HTML entities like &laquo; for arrows
                    dangerouslySetInnerHTML={{ __html: link.label }}
                />
            ))}
        </nav>
    );
}