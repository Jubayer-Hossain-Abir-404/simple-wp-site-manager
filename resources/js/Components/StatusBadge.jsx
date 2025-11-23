import React from 'react'
import { getStatusLabel, getStatusStyles } from '@/Helpers/Common';

export default function StatusBadge({ status }) {
    const statusLabel = getStatusLabel(status);
    const activeClass = getStatusStyles(statusLabel);

    return (
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${activeClass} capitalize`}>
            {statusLabel}
        </span>
    );
}