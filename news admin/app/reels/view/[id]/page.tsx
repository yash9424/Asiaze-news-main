'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import styles from './page.module.css'

export default function ViewReelPage({ params }: any) {
  const router = useRouter()
  const [reel, setReel] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchReel()
    const interval = setInterval(() => {
      fetchReel()
    }, 5000)
    return () => clearInterval(interval)
  }, [params.id])

  const fetchReel = async () => {
    try {
      const res = await fetch(`/api/reels/${params.id}`, { cache: 'no-store' })
      const data = await res.json()
      setReel(data.reel)
    } catch (err) {
      console.error('Failed to fetch reel:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div>Loading...</div>
  if (!reel) return <div>Reel not found</div>

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
              {reel.videoUrl ? (
                <video 
                  key={reel.videoUrl}
                  src={reel.videoUrl} 
                  className={styles.videoImg} 
                  controls 
                  onError={(e) => console.error('Video load error:', e)}
                />
              ) : (
                <img src="/placeholder-video.jpg" alt="Reel" className={styles.videoImg} />
              )}
            </div>
            <div className={styles.videoInfo}>
              <h3 className={styles.videoTitle}>{reel.title}</h3>
              <p className={styles.videoCaption}>{reel.description}</p>
              <p className={styles.videoMeta}>{reel.source || 'ASIAZE'} · {new Date(reel.createdAt).toLocaleDateString()}</p>
              <div className={styles.progressBar}></div>
            </div>
          </div>
        </div>

        <div className={styles.metadataSection}>
          <h2 className={styles.metadataTitle}>Reel Metadata</h2>

          <div className={styles.metadataItem}>
            <label className={styles.metadataLabel}>Title:</label>
            <p className={styles.metadataValue}>{reel.title}</p>
          </div>

          <div className={styles.metadataItem}>
            <label className={styles.metadataLabel}>Caption:</label>
            <p className={styles.metadataValue}>{reel.description || 'No description'}</p>
          </div>

          <div className={styles.metadataItem}>
            <label className={styles.metadataLabel}>Full Article Link:</label>
            {reel.fullArticleLink ? (
              <a href={reel.fullArticleLink} target="_blank" rel="noopener noreferrer" className={styles.metadataLink}>Read full article</a>
            ) : (
              <p className={styles.metadataValue}>No link</p>
            )}
          </div>

          <div className={styles.metadataItem}>
            <label className={styles.metadataLabel}>Category:</label>
            <p className={styles.metadataValue}>{reel.category?.name || 'N/A'}</p>
          </div>

          <div className={styles.metadataItem}>
            <label className={styles.metadataLabel}>Language:</label>
            <p className={styles.metadataValue}>{reel.language || 'EN'}</p>
          </div>

          <div className={styles.metadataItem}>
            <label className={styles.metadataLabel}>Tags:</label>
            <div className={styles.tags}>
              {reel.tags?.length > 0 ? (
                reel.tags.map((tag: any, i: number) => (
                  <span key={i} className={styles.tag}>{tag.name || tag}</span>
                ))
              ) : (
                <p className={styles.metadataValue}>No tags</p>
              )}
            </div>
          </div>

          <div className={styles.metadataItem}>
            <label className={styles.metadataLabel}>Views & Likes:</label>
            <p className={styles.metadataValue}>{reel.views || 0} views · {reel.likes || 0} likes</p>
          </div>

          <div className={styles.metadataItem}>
            <label className={styles.metadataLabel}>Status:</label>
            <p className={styles.metadataValue}>{reel.status}</p>
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
