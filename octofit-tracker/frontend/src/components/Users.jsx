import React from 'react';
import { useApiCollection } from '../api.js';

function Users() {
  const { items, pagination, loading, error } = useApiCollection('users');

  return (
    <section className="data-panel" aria-labelledby="users-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Community</p>
          <h1 id="users-title">Athletes</h1>
        </div>
        <span className="count-badge">{pagination.count} profiles</span>
      </div>
      {loading && <p className="status-message">Loading athlete profiles...</p>}
      {error && <p className="status-message error-message">{error}</p>}
      {!loading && !error && items.length === 0 && <p className="status-message">No athlete profiles yet.</p>}
      {!loading && !error && items.length > 0 && (
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr><th>Athlete</th><th>Email</th><th>Goal</th></tr>
            </thead>
            <tbody>
              {items.map((user) => (
                <tr key={user._id || user.id || user.username}>
                  <td><strong>{user.profile?.displayName || user.username}</strong><small>@{user.username}</small></td>
                  <td>{user.email}</td>
                  <td>{user.profile?.goal || 'Keep moving'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default Users;
