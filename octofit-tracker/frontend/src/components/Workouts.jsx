import React from 'react';
import { useApiCollection } from '../api.js';

function Workouts() {
  const { items, pagination, loading, error } = useApiCollection('workouts');

  return (
    <section className="data-panel" aria-labelledby="workouts-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Build your next session</p>
          <h1 id="workouts-title">Workouts</h1>
        </div>
        <span className="count-badge">{pagination.count} plans</span>
      </div>
      {loading && <p className="status-message">Loading workouts...</p>}
      {error && <p className="status-message error-message">{error}</p>}
      {!loading && !error && items.length === 0 && <p className="status-message">No workouts available yet.</p>}
      {!loading && !error && items.length > 0 && (
        <div className="workout-grid">
          {items.map((workout) => (
            <article className="workout-card" key={workout._id || workout.id || workout.name}>
              <div className="workout-card-top"><span className="difficulty">{workout.difficulty}</span><span>{workout.exercises?.length || 0} moves</span></div>
              <h2>{workout.name}</h2>
              <p>{workout.description}</p>
              <ul>
                {(workout.exercises || []).slice(0, 3).map((exercise, index) => <li key={exercise.name || index}>{exercise.name || 'Exercise'}</li>)}
              </ul>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default Workouts;
