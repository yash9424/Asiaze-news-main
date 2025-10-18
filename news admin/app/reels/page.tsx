'use client'

import Sidebar from '@/components/Sidebar'
import { useState } from 'react'
import styles from './page.module.css'

export default function ManageReelsPage() {
  const [reels, setReels] = useState([
    { id: 1, headline: 'Exciting Reel Headline...', category: 'Entertainment', language: 'EN', status: 'Published', views: 1234, likes: 567, dateCreated: '2023-10-01' },
    { id: 2, headline: 'Quarterly Finance Update...', category: 'Finance', language: 'EN', status: 'Draft', views: 892, likes: 234, dateCreated: '2023-09-28' },
    { id: 3, headline: 'Breaking News: Market Trends...', category: 'Finance', language: 'HIN', status: 'Draft', views: 456, likes: 789, dateCreated: '2023-09-15' },
    { id: 4, headline: 'Political Debate Highlights...', category: 'Politics', language: 'BEN', status: 'Published', views: 345, likes: 789, dateCreated: '2023-09-25' }
  ])
  const [selected, setSelected] = useState<number[]>([])
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    fullArticleLink: '',
    category: 'Politics',
    language: 'EN',
    tags: ['Tag1', 'Tag2', 'Tag3'],
    sourceName: '',
    duration: '',
    featured: true,
    enableComments: true
  })

  const toggleSelect = (id: number) => {
    setSelected(selected.includes(id) ? selected.filter(s => s !== id) : [...selected, id])
  }

  const handleEdit = (reel: any) => {
    setEditingId(reel.id)
    setFormData({
      title: reel.headline,
      summary: 'Current summary text, limited to 60 words.',
      fullArticleLink: 'https://currentarticlelink.com',
      category: reel.category,
      language: reel.language,
      tags: ['Tag1', 'Tag2', 'Tag3'],
      sourceName: 'Current Source Name',
      duration: '00:02:30',
      featured: true,
      enableComments: true
    })
    setShowModal(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleToggle = (field: 'featured' | 'enableComments') => {
    setFormData(prev => ({ ...prev, [field]: !prev[field] }))
  }

  const handleSubmit = () => {
    if (editingId) {
      setReels(reels.map(reel => reel.id === editingId ? { ...reel, headline: formData.title, category: formData.category, language: formData.language } : reel))
    } else {
      const newReel = {
        id: reels.length + 1,
        headline: formData.title,
        category: formData.category,
        language: formData.language,
        status: 'Draft',
        views: 0,
        likes: 0,
        dateCreated: new Date().toISOString().split('T')[0]
      }
      setReels([...reels, newReel])
    }
    setShowModal(false)
    setEditingId(null)
    setFormData({
      title: '',
      summary: '',
      fullArticleLink: '',
      category: 'Politics',
      language: 'EN',
      tags: ['Tag1', 'Tag2', 'Tag3'],
      sourceName: '',
      duration: '',
      featured: true,
      enableComments: true
    })
  }

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>Manage Reels – All Reels</h1>
          <button className={styles.addBtn} onClick={() => window.location.href = '/reels/add'}>+ Add Reel</button>
        </div>

        <div className={styles.filters}>
          <input type="text" placeholder="Search reels by headline or tags..." className={styles.search} />
          <select className={styles.select}><option>Category</option></select>
          <select className={styles.select}><option>Language</option></select>
          <select className={styles.select}><option>Status</option></select>
        </div>

        <div className={styles.content}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th></th>
                <th>Reel Headline</th>
                <th>Category</th>
                <th>Language</th>
                <th>Status</th>
                <th>Views Count</th>
                <th>Likes Count</th>
                <th>Date Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reels.map(reel => (
                <tr key={reel.id}>
                  <td><input type="checkbox" checked={selected.includes(reel.id)} onChange={() => toggleSelect(reel.id)} /></td>
                  <td><a href="#" className={styles.link}>{reel.headline}</a></td>
                  <td><span className={styles.badge}>{reel.category}</span></td>
                  <td>{reel.language}</td>
                  <td>
                    <span className={reel.status === 'Published' ? styles.statusPublished : styles.statusDraft}>
                      {reel.status}
                    </span>
                  </td>
                  <td>{reel.views}</td>
                  <td>{reel.likes}</td>
                  <td>{reel.dateCreated}</td>
                  <td>
                    <button className={styles.iconBtn} onClick={() => handleEdit(reel)}>✏️</button>
                    <button className={styles.iconBtn} onClick={() => window.location.href = `/reels/view/${reel.id}`}>👁️</button>
                    <button className={styles.iconBtn}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.bulkActions}>
          <button className={styles.publishBtn}>Publish</button>
          <button className={styles.unpublishBtn}>Unpublish</button>
          <button className={styles.deleteBtn}>Delete</button>
        </div>

        {showModal && (
          <div className={styles.modal}>
            <div className={styles.modalContentLarge}>
              <div className={styles.formGrid}>
                <div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Reel Title/Headline</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Current Reel Title"
                      className={styles.input}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Summary/Caption</label>
                    <textarea
                      name="summary"
                      value={formData.summary}
                      onChange={handleChange}
                      placeholder="Current summary text, limited to 60 words."
                      className={styles.textarea}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Full Article Link</label>
                    <input
                      type="text"
                      name="fullArticleLink"
                      value={formData.fullArticleLink}
                      onChange={handleChange}
                      placeholder="https://currentarticlelink.com"
                      className={styles.input}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Category</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className={styles.select}
                    >
                      <option>Current Category</option>
                      <option value="Politics">Politics</option>
                      <option value="Entertainment">Entertainment</option>
                      <option value="Finance">Finance</option>
                      <option value="Sports">Sports</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Language</label>
                    <select
                      name="language"
                      value={formData.language}
                      onChange={handleChange}
                      className={styles.select}
                    >
                      <option value="EN">EN</option>
                      <option value="HIN">HIN</option>
                      <option value="BEN">BEN</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Tags</label>
                    <div className={styles.tagsContainer}>
                      {formData.tags.map((tag, index) => (
                        <span key={index} className={styles.tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Current Video</label>
                    <div className={styles.videoPreview}>
                      <div className={styles.previewPlaceholder}>Video Preview</div>
                    </div>
                    <button className={styles.replaceBtn}>Replace Video</button>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Current Thumbnail</label>
                    <div className={styles.thumbnailPreview}>
                      <div className={styles.previewPlaceholder}>Thumbnail Preview</div>
                    </div>
                    <button className={styles.replaceBtn}>Replace Thumbnail</button>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Source Name</label>
                    <input
                      type="text"
                      name="sourceName"
                      value={formData.sourceName}
                      onChange={handleChange}
                      placeholder="Current Source Name"
                      className={styles.input}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Duration</label>
                    <input
                      type="text"
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      placeholder="00:02:30"
                      className={styles.input}
                    />
                  </div>

                  <div className={styles.toggleRow}>
                    <div className={styles.toggleGroupInline}>
                      <label className={styles.label}>Featured/Breaking</label>
                      <div 
                        className={`${styles.toggle} ${formData.featured ? styles.toggleActive : ''}`}
                        onClick={() => handleToggle('featured')}
                      >
                        <div className={styles.toggleCircle}></div>
                      </div>
                    </div>

                    <div className={styles.toggleGroupInline}>
                      <label className={styles.label}>Enable Comments</label>
                      <div 
                        className={`${styles.toggle} ${formData.enableComments ? styles.toggleActive : ''}`}
                        onClick={() => handleToggle('enableComments')}
                      >
                        <div className={styles.toggleCircle}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.buttonRow}>
                <button onClick={() => { setShowModal(false); setEditingId(null); }} className={styles.cancelBtnLarge}>Cancel</button>
                <button onClick={handleSubmit} className={styles.updateBtnLarge}>Update</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
