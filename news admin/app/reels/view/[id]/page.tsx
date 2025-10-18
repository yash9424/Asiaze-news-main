'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import styles from './page.module.css'

export default function ViewReelPage({ params }: any) {
  const router = useRouter()

  return (
    <div className={styles.container}>
      <button className={styles.backArrow} onClick={() => router.push('/reels')}>
        ⬅
      </button>

      <div className={styles.content}>
        <div className={styles.videoSection}>
          <div className={styles.videoPlayer}>
            <div className={styles.videoIcons}>
              <span>♥</span>
              <span>💬</span>
              <span>🔖</span>
              <span>↗</span>
            </div>
            <div className={styles.videoContent}>
              <img src="/placeholder-video.jpg" alt="Reel" className={styles.videoImg} />
            </div>
            <div className={styles.videoInfo}>
              <h3 className={styles.videoTitle}>Reel Headline</h3>
              <p className={styles.videoCaption}>This is a sample caption for the reel preview.</p>
              <p className={styles.videoMeta}>Source Name · 2 hours ago</p>
              <div className={styles.progressBar}></div>
            </div>
          </div>
        </div>

        <div className={styles.metadataSection}>
          <h2 className={styles.metadataTitle}>Reel Metadata</h2>

          <div className={styles.metadataItem}>
            <label className={styles.metadataLabel}>Title:</label>
            <p className={styles.metadataValue}>Sample Reel Title</p>
          </div>

          <div className={styles.metadataItem}>
            <label className={styles.metadataLabel}>Caption:</label>
            <p className={styles.metadataValue}>This is a detailed caption for the reel, providing more context and information.</p>
          </div>

          <div className={styles.metadataItem}>
            <label className={styles.metadataLabel}>Full Article Link:</label>
            <a href="#" className={styles.metadataLink}>Read full article</a>
          </div>

          <div className={styles.metadataItem}>
            <label className={styles.metadataLabel}>Category:</label>
            <p className={styles.metadataValue}>Entertainment</p>
          </div>

          <div className={styles.metadataItem}>
            <label className={styles.metadataLabel}>Language:</label>
            <p className={styles.metadataValue}>English</p>
          </div>

          <div className={styles.metadataItem}>
            <label className={styles.metadataLabel}>Tags:</label>
            <div className={styles.tags}>
              <span className={styles.tag}>Tag1</span>
              <span className={styles.tag}>Tag2</span>
              <span className={styles.tag}>Tag3</span>
            </div>
          </div>

          <div className={styles.metadataItem}>
            <label className={styles.metadataLabel}>Source & Duration:</label>
            <p className={styles.metadataValue}>News Network · 2 min read</p>
          </div>

          <div className={styles.metadataItem}>
            <label className={styles.metadataLabel}>Status:</label>
            <p className={styles.metadataValue}>Published</p>
          </div>

          <div className={styles.buttonRow}>
            <button className={styles.editBtn} onClick={() => router.push(`/reels/edit/${params.id}`)}>Edit Reel</button>
            <button className={styles.backBtn} onClick={() => router.push('/reels')}>Back to All Reels</button>
          </div>
        </div>
      </div>
    </div>
  )
}
