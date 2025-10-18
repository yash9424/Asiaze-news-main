'use client'

import Sidebar from '@/components/Sidebar'
import LineChart from '@/components/LineChart'
import BarChart from '@/components/BarChart'

export default function DashboardPage() {
  return (
    <div style={styles.container}>
      <Sidebar />
      <div style={styles.main}>
        <header style={styles.header}>
          <input type="text" placeholder="Search..." style={styles.search} />
          <div style={styles.userInfo}>
            <span style={styles.adminName}>Admin Name</span>
            <span style={styles.profile}>Profile</span>
          </div>
        </header>

        <div style={styles.content}>
          <h1 style={styles.title}>Welcome Admin, here's today's overview</h1>

          <div style={styles.statsGrid}>
            <div style={styles.statCard}>
              <div style={styles.statLabel}>Total Users</div>
              <div style={styles.statValue}>1,234</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statLabel}>Total Articles</div>
              <div style={styles.statValue}>567</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statLabel}>Total Reels</div>
              <div style={styles.statValue}>89</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statLabel}>Total Bookmarks/Shares</div>
              <div style={styles.statValue}>345</div>
            </div>
          </div>

          <div style={styles.chartsGrid}>
            <div style={styles.chartCard}>
              <h3 style={styles.chartTitle}>Daily Active Users</h3>
              <LineChart />
            </div>
            <div style={styles.chartCard}>
              <h3 style={styles.chartTitle}>Article/Video Engagement</h3>
              <BarChart />
            </div>
          </div>

          <div style={styles.listsGrid}>
            <div style={styles.listCard}>
              <h3 style={styles.listTitle}>Latest News Entries</h3>
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} style={styles.listItem}>
                  <span>News Title</span>
                  <a href="#" style={styles.editLink}>Edit</a>
                </div>
              ))}
            </div>
            <div style={styles.listCard}>
              <h3 style={styles.listTitle}>Latest Reels</h3>
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} style={styles.listItem}>
                  <span>Reel Title {i}</span>
                  <a href="#" style={styles.editLink}>Edit</a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    fontFamily: 'Arial, sans-serif',
  },
  main: {
    marginLeft: '250px',
    flex: 1,
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',
  },
  header: {
    backgroundColor: 'white',
    padding: '18px 35px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #e0e0e0',
  },
  search: {
    padding: '10px 16px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    width: '280px',
    fontSize: '14px',
  },
  userInfo: {
    display: 'flex',
    gap: '25px',
    alignItems: 'center',
  },
  adminName: {
    fontSize: '15px',
    fontWeight: '600' as const,
  },
  profile: {
    fontSize: '15px',
    fontWeight: '600' as const,
  },
  content: {
    padding: '35px',
  },
  title: {
    color: '#e31e3a',
    fontSize: '26px',
    marginBottom: '35px',
    fontWeight: '600' as const,
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '25px',
    marginBottom: '35px',
  },
  statCard: {
    backgroundColor: 'white',
    padding: '28px',
    borderRadius: '8px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
  },
  statLabel: {
    fontSize: '15px',
    color: '#333',
    marginBottom: '12px',
    fontWeight: '700' as const,
  },
  statValue: {
    fontSize: '34px',
    fontWeight: '700' as const,
    color: '#333',
  },
  chartsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '25px',
    marginBottom: '35px',
  },
  chartCard: {
    backgroundColor: 'white',
    padding: '28px',
    borderRadius: '8px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
  },
  chartTitle: {
    fontSize: '17px',
    fontWeight: '600' as const,
    marginBottom: '25px',
  },
  listsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '25px',
  },
  listCard: {
    backgroundColor: 'white',
    padding: '28px',
    borderRadius: '8px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
  },
  listTitle: {
    fontSize: '17px',
    fontWeight: '600' as const,
    marginBottom: '25px',
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '16px 0',
    borderBottom: '1px solid #f0f0f0',
    fontSize: '15px',
  },
  editLink: {
    color: '#e31e3a',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '500' as const,
  },
}
