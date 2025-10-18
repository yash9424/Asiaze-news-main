'use client'

import Sidebar from '@/components/Sidebar'

export default function ReportsPage() {
  return (
    <div style={styles.container}>
      <Sidebar />
      <div style={styles.main}>
        <header style={styles.header}>
          <h1 style={styles.title}>Analytics & Reports</h1>
          <select style={styles.dateFilter}>
            <option>Today</option>
          </select>
        </header>

        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={styles.iconRed}>👥</div>
            <div style={styles.statLabel}>Total</div>
            <div style={styles.statValue}>1,234</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.iconRed}>👤</div>
            <div style={styles.statLabel}>Active Users</div>
            <div style={styles.statValue}>567</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.iconRed}>📄</div>
            <div style={styles.statLabel}>Total Articles</div>
            <div style={styles.statValue}>89</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.iconRed}>🎬</div>
            <div style={styles.statLabel}>Total Reels</div>
            <div style={styles.statValue}>45</div>
          </div>
        </div>

        <div style={styles.chartsGrid}>
          <div style={styles.chartCard}>
            <h3 style={styles.chartTitle}>User Growth</h3>
            <svg width="100%" height="200" style={{marginTop: '20px'}}>
              <polyline points="20,150 60,120 100,140 140,100 180,110 220,80 260,90 300,60 340,50" stroke="#9ca3af" strokeWidth="2" fill="none"/>
              <polyline points="20,100 60,110 100,90 140,100 180,120 220,110 260,130 300,140 340,150" stroke="#e31e3a" strokeWidth="2" fill="none"/>
            </svg>
          </div>
          <div style={styles.chartCard}>
            <h3 style={styles.chartTitle}>Engagement by Content Type</h3>
            <div style={{marginTop: '30px'}}>
              {[{gray: 60, red: 40}, {gray: 85, red: 15}, {gray: 70, red: 30}, {gray: 60, red: 40}].map((bar, i) => (
                <div key={i} style={{display: 'flex', marginBottom: '15px', height: '25px'}}>
                  <div style={{width: `${bar.gray}%`, backgroundColor: '#9ca3af'}}></div>
                  <div style={{width: `${bar.red}%`, backgroundColor: '#e31e3a'}}></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={styles.chartsGrid}>
          <div style={styles.chartCard}>
            <h3 style={styles.chartTitle}>Category Performance</h3>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px'}}>
              <svg width="200" height="200">
                <circle cx="100" cy="100" r="80" fill="#e31e3a" stroke="none"/>
                <path d="M 100 100 L 100 20 A 80 80 0 0 1 180 100 Z" fill="#9ca3af"/>
              </svg>
            </div>
          </div>
          <div style={styles.chartCard}>
            <h3 style={styles.chartTitle}>Language Distribution</h3>
            <div style={{display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', height: '200px', marginTop: '20px'}}>
              {[60, 40, 80, 70, 55, 30, 75, 70].map((h, i) => (
                <div key={i} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '30px'}}>
                  <div style={{width: '30px', height: `${h}%`, backgroundColor: '#e31e3a', marginBottom: '2px'}}></div>
                  <div style={{width: '30px', height: `${100-h}%`, backgroundColor: '#9ca3af'}}></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={styles.tableCard}>
          <h3 style={styles.tableTitle}>Top 10 Articles</h3>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Title</th>
                <th style={styles.th}>Views</th>
                <th style={styles.th}>Likes</th>
                <th style={styles.th}>Shares</th>
              </tr>
            </thead>
            <tbody>
              <tr style={styles.tr}>
                <td style={styles.td}>Breaking News</td>
                <td style={styles.td}>1,234</td>
                <td style={styles.td}>567</td>
                <td style={styles.td}>98</td>
              </tr>
              <tr style={styles.tr}>
                <td style={styles.td}>Tech Innovations</td>
                <td style={styles.td}>1,000</td>
                <td style={styles.td}>450</td>
                <td style={styles.td}>123</td>
              </tr>
              <tr style={styles.tr}>
                <td style={styles.td}>Market Updates</td>
                <td style={styles.td}>950</td>
                <td style={styles.td}>400</td>
                <td style={styles.td}>110</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={styles.tableCard}>
          <h3 style={styles.tableTitle}>Top 10 Reels</h3>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Title</th>
                <th style={styles.th}>Views</th>
                <th style={styles.th}>Likes</th>
                <th style={styles.th}>Comments</th>
              </tr>
            </thead>
            <tbody>
              <tr style={styles.tr}>
                <td style={styles.td}>Viral Dance</td>
                <td style={styles.td}>5,678</td>
                <td style={styles.td}>2,345</td>
                <td style={styles.td}>1,234</td>
              </tr>
              <tr style={styles.tr}>
                <td style={styles.td}>Funny Pets</td>
                <td style={styles.td}>4,500</td>
                <td style={styles.td}>2,100</td>
                <td style={styles.td}>1,000</td>
              </tr>
              <tr style={styles.tr}>
                <td style={styles.td}>Cooking Hacks</td>
                <td style={styles.td}>4,000</td>
                <td style={styles.td}>1,800</td>
                <td style={styles.td}>900</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={styles.exportButtons}>
          <button style={styles.exportBtnRed}>Export as PDF</button>
          <button style={styles.exportBtnWhite}>Export as CSV</button>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',
  },
  main: {
    marginLeft: '250px',
    flex: 1,
    padding: '30px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
  },
  title: {
    fontSize: '24px',
    fontWeight: '700' as const,
    color: '#000',
  },
  dateFilter: {
    padding: '8px 16px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '14px',
    backgroundColor: 'white',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '20px',
    marginBottom: '30px',
  },
  statCard: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.06)',
  },
  iconRed: {
    fontSize: '24px',
    marginBottom: '8px',
  },
  statLabel: {
    fontSize: '14px',
    color: '#000',
    fontWeight: '700' as const,
    marginBottom: '5px',
  },
  statValue: {
    fontSize: '24px',
    fontWeight: '700' as const,
    color: '#000',
  },
  chartsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
    marginBottom: '30px',
  },
  chartCard: {
    backgroundColor: 'white',
    padding: '25px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.06)',
  },
  chartTitle: {
    fontSize: '16px',
    fontWeight: '700' as const,
    color: '#000',
    marginBottom: '10px',
  },
  tableCard: {
    backgroundColor: 'white',
    padding: '25px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.06)',
    marginBottom: '30px',
  },
  tableTitle: {
    fontSize: '16px',
    fontWeight: '700' as const,
    color: '#000',
    marginBottom: '20px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
  },
  th: {
    textAlign: 'left' as const,
    padding: '12px',
    borderBottom: '2px solid #f0f0f0',
    fontSize: '14px',
    fontWeight: '700' as const,
    color: '#000',
  },
  tr: {
    borderBottom: '1px solid #f0f0f0',
  },
  td: {
    padding: '12px',
    fontSize: '14px',
    color: '#333',
  },
  exportButtons: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '15px',
    marginTop: '20px',
  },
  exportBtnRed: {
    backgroundColor: '#e31e3a',
    color: 'white',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '25px',
    fontSize: '14px',
    fontWeight: '600' as const,
    cursor: 'pointer',
  },
  exportBtnWhite: {
    backgroundColor: 'white',
    color: '#000',
    padding: '12px 24px',
    border: '1px solid #ddd',
    borderRadius: '25px',
    fontSize: '14px',
    fontWeight: '600' as const,
    cursor: 'pointer',
  },
}
