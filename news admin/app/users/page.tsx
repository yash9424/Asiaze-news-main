'use client'

import Sidebar from '@/components/Sidebar'
import { useState, useEffect } from 'react'
import styles from './page.module.css'

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<string[]>([])

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/users')
      const data = await res.json()
      setUsers(data.users || [])
      setLoading(false)
    } catch (error) {
      console.error('Failed to fetch users:', error)
      setLoading(false)
    }
  }

  const toggleSelect = (id: string) => {
    setSelected(selected.includes(id) ? selected.filter(s => s !== id) : [...selected, id])
  }

  const toggleSelectAll = () => {
    setSelected(selected.length === users.length ? [] : users.map(u => u._id))
  }

  const handleBlock = async () => {
    if (selected.length === 0) return alert('Please select users to block')
    for (const id of selected) {
      await fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: false })
      })
    }
    setSelected([])
    fetchUsers()
  }

  const handleUnblock = async () => {
    if (selected.length === 0) return alert('Please select users to unblock')
    for (const id of selected) {
      await fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: true })
      })
    }
    setSelected([])
    fetchUsers()
  }

  const handleDelete = async () => {
    if (selected.length === 0) return alert('Please select users to delete')
    if (!confirm('Are you sure you want to delete selected users?')) return
    for (const id of selected) {
      await fetch(`/api/users/${id}`, { method: 'DELETE' })
    }
    setSelected([])
    fetchUsers()
  }

  const handleExport = () => {
    const csv = ['Name,Email,Role,Status,Date Registered']
    users.forEach(u => {
      csv.push(`${u.name},${u.email},${u.role},${u.isActive ? 'Active' : 'Inactive'},${new Date(u.createdAt).toLocaleDateString()}`)
    })
    const blob = new Blob([csv.join('\n')], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'users.csv'
    a.click()
  }

  const toggleUserStatus = async (id: string, currentStatus: boolean) => {
    await fetch(`/api/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isActive: !currentStatus })
    })
    fetchUsers()
  }

  const deleteUser = async (id: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return
    await fetch(`/api/users/${id}`, { method: 'DELETE' })
    fetchUsers()
  }

  if (loading) {
    return (
      <div className={styles.container}>
        <Sidebar />
        <div className={styles.main}>
          <div style={{ textAlign: 'center', padding: '50px' }}>Loading users...</div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>Manage Users</h1>
          <button className={styles.addBtn}>+ Add User</button>
        </div>

        <div className={styles.filters}>
          <input type="text" placeholder="Search by name, email, or phone..." className={styles.search} />
          <select className={styles.select}>
            <option>User Role</option>
            <option>Admin</option>
            <option>User</option>
            <option>Moderator</option>
          </select>
          <select className={styles.select}>
            <option>Status</option>
            <option>Active</option>
            <option>Inactive</option>
            <option>Blocked</option>
          </select>
        </div>

        <div className={styles.bulkActions}>
          <button className={styles.blockBtn} onClick={handleBlock}>Block Users</button>
          <button className={styles.unblockBtn} onClick={handleUnblock}>Unblock Users</button>
          <button className={styles.deleteBtn} onClick={handleDelete}>Delete Users</button>
          <button className={styles.exportBtn} onClick={handleExport}>USER EXPORT</button>
        </div>

        <div className={styles.content}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th><input type="checkbox" checked={selected.length === users.length && users.length > 0} onChange={toggleSelectAll} /></th>
                <th>Name</th>
                <th>Email/Phone</th>
                <th>Role</th>
                <th>Status</th>
                <th>Date Registered</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '20px' }}>No users found</td>
                </tr>
              ) : (
                users.map(user => (
                  <tr key={user._id}>
                    <td><input type="checkbox" checked={selected.includes(user._id)} onChange={() => toggleSelect(user._id)} /></td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className={user.role === 'admin' ? styles.roleAdmin : user.role === 'user' ? styles.roleUser : styles.roleModerator}>
                        {user.role}
                      </span>
                    </td>
                    <td>
                      <span className={user.isActive ? styles.statusActive : styles.statusInactive}>
                        {user.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td>
                      <button className={styles.iconBtn} title="View">👁</button>
                      <button className={styles.iconBtn} onClick={() => window.location.href = `/users/edit/${user._id}`} title="Edit">✏️</button>
                      <button className={styles.iconBtn} onClick={() => toggleUserStatus(user._id, user.isActive)} title={user.isActive ? 'Block' : 'Unblock'}>🔒</button>
                      <button className={styles.iconBtn} onClick={() => deleteUser(user._id)} title="Delete">🗑️</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
