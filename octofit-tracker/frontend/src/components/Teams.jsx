import React from 'react';
import { useApiCollection } from '../api.js';

function Teams() {
  const { items, pagination, loading, error } = useApiCollection('teams');

  return (
    <section className="data-panel" aria-labelledby="teams-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Find your pace</p>
          <h1 id="teams-title">Teams</h1>
        </div>
        <span className="count-badge">{pagination.count} teams</span>
      </div>
      {loading && <p className="status-message">Loading teams...</p>}
      {error && <p className="status-message error-message">{error}</p>}
      {!loading && !error && items.length === 0 && <p className="status-message">No teams created yet.</p>}
      {!loading && !error && items.length > 0 && (
        <div className="team-grid">
          {items.map((team) => (
            <article className="team-card" key={team._id || team.id || team.name}>
              <span className="team-mark">{team.name?.slice(0, 1).toUpperCase()}</span>
              <div>
                <h2>{team.name}</h2>
                <p>{team.members?.length || 0} members</p>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default Teams;
