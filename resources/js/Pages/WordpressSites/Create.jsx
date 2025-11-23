import React, { useState } from 'react'
import { Inertia } from '@inertiajs/inertia'

export default function Create() {
    const [data, setData] = useState({
        name: '', domain: '', container_name: '', port: '8080',
        server_ip: '', ssh_user: 'ubuntu', ssh_private_key: '',
    })

    const submit = (e) => {
        e.preventDefault()
        Inertia.post('/sites', data)
    }

    return (
        <form onSubmit={submit} className="p-6">
            <div className="grid gap-3">
                <input value={data.name} onChange={e => setData({ ...data, name: e.target.value })} placeholder="Site name" />
                <input value={data.domain} onChange={e => setData({ ...data, domain: e.target.value })} placeholder="https://example.com" />
                <input value={data.container_name} onChange={e => setData({ ...data, container_name: e.target.value })} placeholder="container_name" />
                <input value={data.port} onChange={e => setData({ ...data, port: e.target.value })} placeholder="port" />
                <input value={data.server_ip} onChange={e => setData({ ...data, server_ip: e.target.value })} placeholder="server ip" />
                <input value={data.ssh_user} onChange={e => setData({ ...data, ssh_user: e.target.value })} placeholder="ssh user" />
                <textarea value={data.ssh_private_key} onChange={e => setData({ ...data, ssh_private_key: e.target.value })} placeholder="PEM private key" rows="6" />
                <button className="btn">Create</button>
            </div>
        </form>
    )
}
