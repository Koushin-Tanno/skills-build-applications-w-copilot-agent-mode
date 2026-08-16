import React from 'react';
import { useApiCollection } from '../api.js';

function getName(person) {
  return person?.profile?.displayName || person?.username || person?.email || 'Unknown athlete';
}

function Leaderboard() {
  const { items, pagination, loading, error } = useApiCollection('leaderboard');

  return (
    <section className="data-panel" aria-labelledby="leaderboard-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Friendly competition</p>
          <h1 id="leaderboard-title">Leaderboard</h1>
        </div>
        <span className="count-badge">{pagination.count} ranked</span>
      </div>
      {loading && <p className="status-message">Loading rankings...</p>}
      {error && <p className="status-message error-message">{error}</p>}
      {!loading && !error && items.length === 0 && <p className="status-message">No rankings yet.</p>}
      {!loading && !error && items.length > 0 && (
        <ol className="ranking-list">
          {items.map((entry, index) => (
            <li key={entry._id || entry.id || `${entry.user?._id}-${index}`}>
              <span className="rank-number">{String(index + 1).padStart(2, '0')}</span>
              <span className="rank-name"><strong>{getName(entry.user)}</strong><small>{entry.team?.name || 'Independent'}</small></span>
              <strong className="rank-score">{entry.score.toLocaleString()} pts</strong>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}

export default Leaderboard;
