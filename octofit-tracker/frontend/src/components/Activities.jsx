import React from 'react';
import { useApiCollection } from '../api.js';

// Codespaces endpoint: https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/
function getUserName(user) {
  if (!user) return 'Unknown athlete';
  return user.profile?.displayName || user.username || user.email || 'Unknown athlete';
}

function Activities() {
  const { items, pagination, loading, error } = useApiCollection('activities');

  return (
    <section className="data-panel" aria-labelledby="activities-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Movement log</p>
          <h1 id="activities-title">Recent activity</h1>
        </div>
        <span className="count-badge">{pagination.count} sessions</span>
      </div>
      {loading && <p className="status-message">Loading activity...</p>}
      {error && <p className="status-message error-message">{error}</p>}
      {!loading && !error && items.length === 0 && <p className="status-message">No activity logged yet.</p>}
      {!loading && !error && items.length > 0 && (
        <div className="table-wrap">
          <table className="data-table">
            <thead><tr><th>Athlete</th><th>Activity</th><th>Value</th><th>Date</th></tr></thead>
            <tbody>
              {items.map((activity) => (
                <tr key={activity._id || activity.id}>
                  <td><strong>{getUserName(activity.user)}</strong></td>
                  <td className="capitalize">{activity.type}</td>
                  <td>{activity.value}</td>
                  <td>{activity.recordedAt ? new Date(activity.recordedAt).toLocaleDateString() : 'Recent'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default Activities;
