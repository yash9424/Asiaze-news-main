"use client"

import Sidebar from '@/components/Sidebar'
import Link from 'next/link'
import React from 'react'
import styles from '../page.module.css'

export default function ViewNewsPage({ params }: { params: any }) {
  const { id } = params

  // Mock data for the news article
  const newsData = {
    headline: 'Breaking News: Major Event in the City',
    summary:
      'This is a short summary of the news article, providing a brief overview of the major event happening in the city, limited to approximately 60 words to give a quick insight for readers.',
    fullArticleLink: 'https://example.com/full-article',
    category: 'Politics',
    language: 'English',
    source: 'ASIAZE News Network',
    timestamp: '2023-10-14T10:00',
    tags: ['Breaking', 'Local'],
    imageUrl: '/sample-image.jpg'
  }

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>News Details</h1>
          <Link href="/news" className={styles.backBtn}>
            ← Back to All News
          </Link>
        </div>

        <div className={styles.content}>
          <div className={styles.articleContainer}>
            <img src={newsData.imageUrl} alt={newsData.headline} className={styles.articleImage} />
            <h2 className={styles.articleHeadline}>{newsData.headline}</h2>
            <p className={styles.articleSummary}>{newsData.summary}</p>
          </div>

          <aside className={styles.rightPanel}>
            <div className={styles.metaTitle}>Headline</div>
            <div className={styles.metaItem}>{newsData.headline}</div>

            <div className={styles.metaTitle}>Summary</div>
            <div className={styles.metaItem}>{newsData.summary}</div>

            <div className={styles.metaTitle}>Full Article Link</div>
            <div className={styles.metaItem}>
              <a href={newsData.fullArticleLink} target="_blank" rel="noreferrer">
                Read Full Article
              </a>
            </div>

            <div className={styles.metaTitle}>Category</div>
            <div className={styles.metaItem}>{newsData.category}</div>

            <div className={styles.metaTitle}>Language</div>
            <div className={styles.metaItem}>{newsData.language}</div>

            <div className={styles.metaTitle}>Source</div>
            <div className={styles.metaItem}>{newsData.source}</div>

            <div className={styles.metaTitle}>Timestamp</div>
            <div className={styles.metaItem}>{new Date(newsData.timestamp).toLocaleString()}</div>

            <div className={styles.buttonRow}>
              <Link href={`/news/edit/${id}`} className={styles.editBtn}>
                Edit News
              </Link>
              <Link href="/news" className={styles.backBtn}>
                Back to All News
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}