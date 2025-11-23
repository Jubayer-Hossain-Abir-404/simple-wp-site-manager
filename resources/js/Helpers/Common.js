import React from 'react'
import { Status } from '@/Constants/Index';

export const getStatusLabel = (status) => {
    switch (status) {
        case Status.STOPPED:
            return 'stopped';
        case Status.DEPLOYING:
            return 'deploying';
        case Status.RUNNING:
            return 'running';
        case Status.FAILED:
            return 'failed';
        default:
            return 'unknown';
    }
}

export const getStatusStyles = (label) => {
    const styles = {
        stopped: 'bg-gray-100 text-gray-800 border-gray-200',
        deploying: 'bg-blue-100 text-blue-800 border-blue-200 animate-pulse',
        running: 'bg-green-100 text-green-800 border-green-200',
        failed: 'bg-red-100 text-red-800 border-red-200',
        unknown: 'bg-gray-100 text-gray-500 border-gray-200',
    };

    return styles[label] || styles.unknown;
}