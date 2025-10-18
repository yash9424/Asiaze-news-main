'use client'

import Sidebar from '@/components/Sidebar'
import { useState } from 'react'
import styles from './page.module.css'

export default function PushNotificationsPage() {
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    link: '',
    audienceType: 'allUsers',
    category: 'Politics',
    language: 'EN',
    sendType: 'now',
    scheduleDate: ''
  })

  const [notifications] = useState([
    { id: 1, title: 'New Update Released', audience: 'All Users', status: 'Sent', dateTime: '2023-10-25 14:30' },
    { id: 2, title: 'Election Updates', audience: 'Politics', status: 'Scheduled', dateTime: '2023-10-26 09:00' },
    { id: 3, title: 'Sports Highlights', audience: 'Sports', status: 'Draft', dateTime: '2023-10-24 17:00' },
    { id: 4, title: 'Tech News', audience: 'Technology', status: 'Sent', dateTime: '2023-10-23 11:45' },
    { id: 5, title: 'Finance Tips', audience: 'Finance', status: 'Sent', dateTime: '2023-10-22 08:20' }
  ])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSend = () => console.log('Send:', formData)
  const handleDraft = () => console.log('Draft:', formData)

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.main}>
        <div className={styles.content}>
          <div className={styles.leftSection}>
            <h1 className={styles.title}>Send Notification</h1>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Title"
              className={styles.input}
            />

            <div className={styles.textareaWrapper}>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Message Body (max 200 chars)"
                className={styles.textarea}
                maxLength={200}
              />
              <div className={styles.charCount}>{formData.message.length}/200</div>
            </div>

            <input
              type="text"
              name="link"
              value={formData.link}
              onChange={handleChange}
              placeholder="Link (optional)"
              className={styles.input}
            />

            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Audience Selector</h3>
              
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="audienceType"
                  value="allUsers"
                  checked={formData.audienceType === 'allUsers'}
                  onChange={handleChange}
                />
                All Users
              </label>

              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="audienceType"
                  value="byCategory"
                  checked={formData.audienceType === 'byCategory'}
                  onChange={handleChange}
                />
                By Category
              </label>

              {formData.audienceType === 'byCategory' && (
                <select name="category" value={formData.category} onChange={handleChange} className={styles.select}>
                  <option>Politics</option>
                  <option>Entertainment</option>
                  <option>Finance</option>
                  <option>Sports</option>
                  <option>Technology</option>
                </select>
              )}

              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="audienceType"
                  value="byLanguage"
                  checked={formData.audienceType === 'byLanguage'}
                  onChange={handleChange}
                />
                By Language
              </label>

              {formData.audienceType === 'byLanguage' && (
                <select name="language" value={formData.language} onChange={handleChange} className={styles.select}>
                  <option value="EN">EN</option>
                  <option value="HIN">HIN</option>
                  <option value="BEN">BEN</option>
                </select>
              )}
            </div>

            <div className={styles.section}>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="sendType"
                  value="now"
                  checked={formData.sendType === 'now'}
                  onChange={handleChange}
                />
                Send Now
              </label>

              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="sendType"
                  value="schedule"
                  checked={formData.sendType === 'schedule'}
                  onChange={handleChange}
                />
                Schedule for Later
              </label>

              {formData.sendType === 'schedule' && (
                <input
                  type="datetime-local"
                  name="scheduleDate"
                  value={formData.scheduleDate}
                  onChange={handleChange}
                  className={styles.input}
                />
              )}
            </div>

            <div className={styles.buttonRow}>
              <button onClick={handleSend} className={styles.sendBtn}>Send Notification</button>
              <button onClick={handleDraft} className={styles.draftBtn}>Save as Draft</button>
            </div>
          </div>

          <div className={styles.rightSection}>
            <h1 className={styles.title}>Past Notifications</h1>

            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Audience</th>
                  <th>Status</th>
                  <th>Date & Time</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {notifications.map(notif => (
                  <tr key={notif.id}>
                    <td>{notif.title}</td>
                    <td>{notif.audience}</td>
                    <td>
                      <span className={
                        notif.status === 'Sent' ? styles.statusSent :
                        notif.status === 'Scheduled' ? styles.statusScheduled :
                        styles.statusDraft
                      }>
                        {notif.status}
                      </span>
                    </td>
                    <td>{notif.dateTime}</td>
                    <td>
                      <a href="#" className={styles.link}>View</a>
                      <a href="#" className={styles.link}>Resend</a>
                      <a href="#" className={styles.linkDelete}>Delete</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
