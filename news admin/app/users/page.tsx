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

        <div className={styles.content}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th><input type="checkbox" /></th>
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
                      <button className={styles.iconBtn}>👁</button>
                      <button className={styles.iconBtn} onClick={() => window.location.href = `/users/edit/${user._id}`}>✏️</button>
                      <button className={styles.iconBtn}>🔒</button>
                      <button className={styles.iconBtn}>🗑️</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className={styles.bulkActions}>
          <button className={styles.blockBtn}>Block Users</button>
          <button className={styles.unblockBtn}>Unblock Users</button>
          <button className={styles.deleteBtn}>Delete Users</button>
          <button className={styles.exportBtn}>USER EXPORT</button>
        </div>
      </div>
    </div>
  )
}
