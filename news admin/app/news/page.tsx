'use client'

import Sidebar from '@/components/Sidebar'
import Link from 'next/link'

export default function ManageNewsPage() {
  const newsData = [
    {
      id: 1,
      headline: 'Breaking: Major Event Unfolds',
      category: 'Politics',
      language: 'EN',
      status: 'Draft',
      date: '12 Oct 2023',
    },
    {
      id: 2,
      headline: 'Entertainment: Film Release',
      category: 'Entertainment',
      language: 'HIN',
      status: 'Published',
      date: '10 Oct 2023',
    },
    {
      id: 3,
      headline: 'Finance: Market Update',
      category: 'Finance',
      language: 'BEN',
      status: 'Draft',
      date: '08 Oct 2023',
    },
  ]

  return (
    <div style={styles.container}>
      <Sidebar />
      <div style={styles.main}>
        <div style={styles.header}>
          <h1 style={styles.title}>Manage News – All News</h1>
          <Link href="/news/add" style={styles.addBtn}>+ Add News</Link>
          <input type="text" placeholder="Search by headline or tags" style={styles.search} />
          <select style={styles.select}>
            <option>Category</option>
          </select>
          <select style={styles.select}>
            <option>Language</option>
          </select>
          <select style={styles.select}>
            <option>Status</option>
          </select>
        </div>

        <div style={styles.content}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeader}>
                <th style={styles.th}></th>
                <th style={styles.th}>Headline</th>
                <th style={styles.th}>Category</th>
                <th style={styles.th}>Language</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Date Created</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {newsData.map((news) => (
                <tr key={news.id} style={styles.tableRow}>
                  <td style={styles.td}>
                    <input type="checkbox" />
                  </td>
                  <td style={styles.td}>{news.headline}</td>
                  <td style={styles.td}>
                    <span style={{
                      ...styles.badge,
                      backgroundColor: news.category === 'Politics' ? '#e31e3a' : news.category === 'Entertainment' ? '#e31e3a' : '#e31e3a'
                    }}>
                      {news.category}
                    </span>
                  </td>
                  <td style={styles.td}>{news.language}</td>
                  <td style={styles.td}>
                    <span style={{
                      ...styles.badge,
                      backgroundColor: news.status === 'Published' ? '#28a745' : '#e31e3a'
                    }}>
                      {news.status}
                    </span>
                  </td>
                  <td style={styles.td}>{news.date}</td>
                  <td style={styles.td}>
                    <Link href={`/news/edit/${news.id}`} style={styles.actionLink}>Edit</Link>
                    <Link href={`/news/view/${news.id}`} style={styles.actionLink}>View</Link>
                    <a href="#" style={styles.actionLink}>Delete</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
    padding: '20px 35px',
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    borderBottom: '1px solid #e0e0e0',
  },
  title: {
    fontSize: '22px',
    fontWeight: '600' as const,
    marginRight: 'auto',
  },
  addBtn: {
    backgroundColor: '#e31e3a',
    color: 'white',
    padding: '10px 25px',
    borderRadius: '25px',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '600' as const,
  },
  search: {
    padding: '10px 16px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    width: '250px',
    fontSize: '14px',
  },
  select: {
    padding: '10px 16px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '14px',
    backgroundColor: 'white',
    cursor: 'pointer',
  },
  content: {
    padding: '35px',
  },
  table: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
  },
  tableHeader: {
    backgroundColor: '#e8e8e8',
  },
  th: {
    padding: '18px 20px',
    textAlign: 'left' as const,
    fontSize: '14px',
    fontWeight: '600' as const,
    color: '#333',
  },
  tableRow: {
    borderBottom: '1px solid #f0f0f0',
  },
  td: {
    padding: '18px 20px',
    fontSize: '14px',
    color: '#333',
  },
  badge: {
    padding: '6px 16px',
    borderRadius: '20px',
    color: 'white',
    fontSize: '13px',
    fontWeight: '500' as const,
    display: 'inline-block',
  },
  actionLink: {
    color: '#e31e3a',
    textDecoration: 'none',
    fontSize: '14px',
    marginRight: '15px',
    fontWeight: '500' as const,
  },
}
