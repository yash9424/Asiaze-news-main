'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'

export default function Sidebar() {
  const [manageNewsOpen, setManageNewsOpen] = useState(true)
  const [manageReelsOpen, setManageReelsOpen] = useState(false)
  const [usersOpen, setUsersOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  return (
    <div style={styles.sidebar}>
      <div style={styles.logoSection}>
        <Image src="/White_Logo.png" alt="asiaze" width={140} height={45} />
      </div>

      <Link href="/dashboard" style={styles.dashboardItem}>Dashboard (overview)</Link>

      <nav style={styles.nav}>
        <div>
          <div style={styles.menuItem}>
            <Link href="/news" style={styles.menuText}>Manage News</Link>
            <span style={styles.arrow} onClick={() => setManageNewsOpen(!manageNewsOpen)}>{manageNewsOpen ? '▼' : '▶'}</span>
          </div>
          {manageNewsOpen && (
            <div style={styles.submenu}>
              <Link href="/news/add" style={styles.submenuItem}>Add News</Link>
              <Link href="/news" style={styles.submenuItem}>All News List</Link>
              <Link href="/news/categories" style={styles.submenuItem}>Categories</Link>
              <Link href="/news/tags" style={styles.submenuItem}>Tags Management</Link>
            </div>
          )}
        </div>

        <div>
          <div style={styles.menuItem}>
            <Link href="/reels" style={styles.menuText}>Manage Reels</Link>
            <span style={styles.arrow} onClick={() => setManageReelsOpen(!manageReelsOpen)}>{manageReelsOpen ? '▼' : '▶'}</span>
          </div>
          {manageReelsOpen && (
            <div style={styles.submenu}>
              <Link href="/reels/add" style={styles.submenuItem}>Add Reel</Link>
              <Link href="/reels" style={styles.submenuItem}>All Reels List</Link>
            </div>
          )}
        </div>

        <div>
          <div style={styles.menuItem}>
            <Link href="/users" style={styles.menuText}>Users Management</Link>
            <span style={styles.arrow} onClick={() => setUsersOpen(!usersOpen)}>{usersOpen ? '▼' : '▶'}</span>
          </div>
          {usersOpen && (
            <div style={styles.submenu}>
              <Link href="/users" style={styles.submenuItem}>User List</Link>
              <Link href="/users/block" style={styles.submenuItem}>Block/Unblock Users</Link>
            </div>
          )}
        </div>

        <div>
          <div style={styles.menuItem}>
            <Link href="/notifications" style={styles.menuText}>Notifications</Link>
            <span style={styles.arrow} onClick={() => setNotificationsOpen(!notificationsOpen)}>{notificationsOpen ? '▼' : '▶'}</span>
          </div>
          {notificationsOpen && (
            <div style={styles.submenu}>
              <Link href="/notifications/push" style={styles.submenuItem}>Push Notifications</Link>
              <Link href="/notifications/past" style={styles.submenuItem}>Past Notifications</Link>
            </div>
          )}
        </div>

        <Link href="/reports" style={styles.singleMenuItem}>Reports / Analytics</Link>
        <Link href="/settings" style={styles.singleMenuItem}>Setting</Link>
      </nav>

      <button onClick={async () => {
        await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
        localStorage.clear();
        window.location.href = '/login';
      }} style={styles.logoutBtn}>Logout</button>
    </div>
  )
}

const styles = {
  sidebar: {
    width: '250px',
    height: '100vh',
    backgroundColor: '#e31e3a',
    color: 'white',
    display: 'flex',
    flexDirection: 'column' as const,
    position: 'fixed' as const,
    left: 0,
    top: 0,
    fontFamily: 'Arial, sans-serif',
  },
  logoSection: {
    padding: '25px 20px',
    backgroundColor: '#e31e3a',
  },
  dashboardItem: {
    padding: '16px 22px',
    backgroundColor: '#000',
    color: 'white',
    fontSize: '15px',
    fontWeight: '500' as const,
    textDecoration: 'none',
    display: 'block',
  },
  nav: {
    flex: 1,
    overflowY: 'auto' as const,
  },
  menuItem: {
    padding: '16px 22px',
    color: 'white',
    fontSize: '15px',
    fontWeight: '400' as const,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  arrow: {
    fontSize: '11px',
    cursor: 'pointer',
    padding: '5px',
  },
  menuText: {
    color: 'white',
    textDecoration: 'none',
    flex: 1,
  },
  submenu: {
    backgroundColor: 'rgba(0,0,0,0.15)',
  },
  submenuItem: {
    padding: '14px 22px 14px 42px',
    color: 'white',
    textDecoration: 'none',
    display: 'block',
    fontSize: '14px',
    fontWeight: '300' as const,
  },
  singleMenuItem: {
    padding: '16px 22px',
    color: 'white',
    textDecoration: 'none',
    display: 'block',
    fontSize: '15px',
    fontWeight: '400' as const,
  },
  logoutBtn: {
    margin: '20px',
    padding: '13px',
    backgroundColor: '#000',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '15px',
    fontWeight: '500' as const,
  },
}
