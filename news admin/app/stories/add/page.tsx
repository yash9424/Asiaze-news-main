'use client'

import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import { useRouter } from 'next/navigation'

export default function AddStoryPage() {
  const [heading, setHeading] = useState('')
  const [description, setDescription] = useState('')
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image')
  const [image, setImage] = useState('')
  const [videoUrl, setVideoUrl] = useState('')
  const [thumbnail, setThumbnail] = useState('')
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [liked, setLiked] = useState(false)
  const router = useRouter()

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData })
      const data = await res.json()
      setImage(data.url)
    } catch (err) {
      alert('Failed to upload image')
    } finally {
      setUploading(false)
    }
  }

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    formData.append('video', file)

    try {
      const res = await fetch('/api/upload/video', { method: 'POST', body: formData })
      const data = await res.json()
      setVideoUrl(data.videoUrl)
      setThumbnail(data.thumbnail)
    } catch (err) {
      alert('Failed to upload video')
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/stories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          heading,
          description,
          image: mediaType === 'image' ? image : undefined,
          videoUrl: mediaType === 'video' ? videoUrl : undefined,
          thumbnail: mediaType === 'video' ? thumbnail : undefined,
        }),
      })

      if (res.ok) {
        alert('Story added successfully!')
        router.push('/stories')
      } else {
        alert('Failed to add story')
      }
    } catch (err) {
      alert('Error adding story')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.container}>
      <Sidebar />
      <div style={styles.main}>
        <header style={styles.header}>
          <h1 style={styles.title}>Add New Story</h1>
        </header>

        <div style={styles.content}>
          <div style={styles.formContainer}>
            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Heading *</label>
                <input
                  type="text"
                  value={heading}
                  onChange={(e) => setHeading(e.target.value)}
                  required
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Description *</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows={4}
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Media Type *</label>
                <div style={{ display: 'flex', gap: '20px', marginBottom: '10px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <input
                      type="radio"
                      value="image"
                      checked={mediaType === 'image'}
                      onChange={() => setMediaType('image')}
                    />
                    Image
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <input
                      type="radio"
                      value="video"
                      checked={mediaType === 'video'}
                      onChange={() => setMediaType('video')}
                    />
                    Video
                  </label>
                </div>
              </div>

              {mediaType === 'image' ? (
                <div style={styles.formGroup}>
                  <label style={styles.label}>Upload Image *</label>
                  <input type="file" accept="image/*" onChange={handleImageUpload} style={styles.input} disabled={uploading} />
                  {uploading && <p>Uploading...</p>}
                  {image && <img src={image} alt="Preview" style={styles.preview} />}
                </div>
              ) : (
                <div style={styles.formGroup}>
                  <label style={styles.label}>Upload Video *</label>
                  <input type="file" accept="video/*" onChange={handleVideoUpload} style={styles.input} disabled={uploading} />
                  {uploading && <p>Uploading video...</p>}
                  {videoUrl && (
                    <div>
                      <video src={videoUrl} controls style={styles.preview} />
                      {thumbnail && <img src={thumbnail} alt="Thumbnail" style={styles.preview} />}
                    </div>
                  )}
                </div>
              )}

              <button type="submit" disabled={loading || uploading} style={styles.submitBtn}>
                {loading ? 'Adding...' : 'Add Story'}
              </button>
            </form>

            <div style={styles.previewContainer}>
              <h3 style={styles.previewTitle}>Preview</h3>
              <div style={styles.phoneFrame}>
                {mediaType === 'image' && image ? (
                  <img src={image} alt="Preview" style={styles.previewMedia} />
                ) : mediaType === 'video' && videoUrl ? (
                  <video src={videoUrl} style={styles.previewMedia} controls />
                ) : (
                  <div style={styles.placeholderMedia}>Upload media to preview</div>
                )}
                <div style={styles.storyOverlay}>
                  <div style={styles.storyHeader}>
                    <div style={styles.storyBrand}>asiaze</div>
                  </div>
                  {!showDetails && (
                    <>
                      <button onClick={() => setShowDetails(true)} style={styles.readDetailBtn}>
                        Read More ↑
                      </button>
                      <div style={styles.actionButtons}>
                        <button onClick={() => setLiked(!liked)} style={{ ...styles.actionBtn, color: liked ? '#ff0000' : 'white' }}>♥</button>
                        <button style={styles.actionBtn}>➤</button>
                      </div>
                    </>
                  )}
                </div>
                {showDetails && (
                  <div style={styles.detailsPanel}>
                    <button onClick={() => setShowDetails(false)} style={styles.closeDetailsBtn}>×</button>
                    <h2 style={styles.detailHeading}>{heading || 'Story Heading'}</h2>
                    <p style={styles.detailDescription}>{description || 'Story description will appear here...'}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: { display: 'flex', fontFamily: 'Arial, sans-serif' },
  main: { marginLeft: '250px', flex: 1, backgroundColor: '#f5f5f5', minHeight: '100vh' },
  header: { backgroundColor: 'white', padding: '20px 35px', borderBottom: '1px solid #e0e0e0' },
  title: { color: '#e31e3a', fontSize: '24px', margin: 0, fontWeight: '600' as const },
  content: { padding: '35px' },
  formContainer: { display: 'flex', gap: '30px', alignItems: 'flex-start' },
  form: { backgroundColor: 'white', padding: '30px', borderRadius: '8px', flex: 1, maxWidth: '500px' },
  formGroup: { marginBottom: '20px' },
  label: { display: 'block', marginBottom: '8px', fontWeight: '600' as const, fontSize: '14px' },
  input: { width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px', fontSize: '14px' },
  preview: { marginTop: '10px', maxWidth: '200px', borderRadius: '8px' },
  submitBtn: {
    backgroundColor: '#e31e3a',
    color: 'white',
    padding: '12px 30px',
    border: 'none',
    borderRadius: '5px',
    fontSize: '15px',
    fontWeight: '600' as const,
    cursor: 'pointer',
    width: '100%',
  },
  previewContainer: { flex: 1, maxWidth: '400px' },
  previewTitle: { fontSize: '18px', fontWeight: '600' as const, marginBottom: '15px', color: '#333' },
  phoneFrame: {
    width: '300px',
    height: '600px',
    backgroundColor: '#000',
    borderRadius: '30px',
    overflow: 'hidden',
    position: 'relative' as const,
    boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
  },
  previewMedia: { width: '100%', height: '100%', objectFit: 'cover' as const },
  placeholderMedia: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#666',
    fontSize: '14px',
    backgroundColor: '#f0f0f0',
  },
  storyOverlay: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 30%, transparent 60%, rgba(0,0,0,0.5) 100%)',
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'space-between',
    padding: '20px',
    pointerEvents: 'none' as const,
  },
  storyHeader: { display: 'flex', justifyContent: 'center' },
  storyBrand: { color: 'white', fontSize: '18px', fontWeight: '700' as const, letterSpacing: '1px' },
  readDetailBtn: {
    position: 'absolute' as const,
    bottom: '20px',
    left: '20px',
    backgroundColor: 'rgba(255,255,255,0.2)',
    color: 'white',
    border: '1px solid rgba(255,255,255,0.5)',
    padding: '10px 20px',
    borderRadius: '20px',
    fontSize: '13px',
    fontWeight: '600' as const,
    cursor: 'pointer',
    pointerEvents: 'auto' as const,
    backdropFilter: 'blur(10px)',
  },
  actionButtons: {
    position: 'absolute' as const,
    bottom: '20px',
    right: '20px',
    display: 'flex',
    gap: '10px',
    pointerEvents: 'auto' as const,
  },
  actionBtn: {
    backgroundColor: 'transparent',
    border: 'none',
    color: 'white',
    fontSize: '28px',
    cursor: 'pointer',
    padding: '5px',
  },
  detailsPanel: {
    position: 'absolute' as const,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255,255,255,0.15)',
    backdropFilter: 'blur(20px)',
    borderTopLeftRadius: '20px',
    borderTopRightRadius: '20px',
    padding: '25px 20px',
    maxHeight: '70%',
    overflowY: 'auto' as const,
    animation: 'slideUp 0.3s ease-out',
  },
  closeDetailsBtn: {
    position: 'absolute' as const,
    top: '10px',
    right: '10px',
    background: 'transparent',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: 'white',
  },
  detailHeading: { fontSize: '18px', fontWeight: '700' as const, marginBottom: '12px', color: 'white', marginTop: '10px' },
  detailDescription: { fontSize: '14px', lineHeight: '1.6', color: 'white' },
}
