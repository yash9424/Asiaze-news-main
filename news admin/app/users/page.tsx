'use client'

import Sidebar from '@/components/Sidebar'
import { useState } from 'react'
import styles from './page.module.css'

export default function UsersPage() {
  const [users, setUsers] = useState([
    { id: 1, name: 'Alice Johnson', email: 'alice.j@example.com', phone: '+1234567890', role: 'Admin', status: 'Active', dateRegistered: '2023-05-12' },
    { id: 2, name: 'Robert Smith', email: 'robert.smith@email.com', phone: '+1234567890', role: 'User', status: 'Active', dateRegistered: '2023-04-15' },
    { id: 3, name: 'John Smith', email: 'john.smith@email.com', phone: '+1987654321', role: 'Moderator', status: 'Blocked', dateRegistered: '2023-04-25' },
    { id: 4, name: 'Samantha Green', email: 'samantha.green@email.com', phone: '+1123456789', role: 'User', status: 'Inactive', dateRegistered: '2023-03-15' },
    { id: 5, name: 'Emily Brown', email: 'emily.brown@email.com', phone: '+1987654321', role: 'User', status: 'Active', dateRegistered: '2022-11-22' }
  ])
  const [selected, setSelected] = useState<number[]>([])

  const toggleSelect = (id: number) => {
    setSelected(selected.includes(id) ? selected.filter(s => s !== id) : [...selected, id])
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
              {users.map(user => (
                <tr key={user.id}>
                  <td><input type="checkbox" checked={selected.includes(user.id)} onChange={() => toggleSelect(user.id)} /></td>
                  <td>{user.name}</td>
                  <td>{user.email} / {user.phone}</td>
                  <td>
                    <span className={user.role === 'Admin' ? styles.roleAdmin : user.role === 'User' ? styles.roleUser : styles.roleModerator}>
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <span className={user.status === 'Active' ? styles.statusActive : user.status === 'Blocked' ? styles.statusBlocked : styles.statusInactive}>
                      {user.status}
                    </span>
                  </td>
                  <td>{user.dateRegistered}</td>
                  <td>
                    <button className={styles.iconBtn}>👁</button>
                    <button className={styles.iconBtn} onClick={() => window.location.href = `/users/edit/${user.id}`}>✏️</button>
                    <button className={styles.iconBtn}>🔒</button>
                    <button className={styles.iconBtn}>🗑️</button>
                  </td>
                </tr>
              ))}
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
