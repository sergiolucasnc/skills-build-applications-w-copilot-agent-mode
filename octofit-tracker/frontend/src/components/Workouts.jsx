import { itemKey } from '../utils/formatters.js'
import { useCollection } from '../hooks/useCollection.js'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
  || import.meta.env.CODESPACE_NAME?.trim()
const workoutsEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/'

function Workouts() {
  const { items, loading, error } = useCollection(workoutsEndpoint)

  return (
    <section aria-labelledby="workouts-title">
      <div className="page-heading">
        <p className="eyebrow">Your next session</p>
        <h1 id="workouts-title">Workouts</h1>
        <p className="page-summary">Suggestions to keep your training moving.</p>
      </div>
      {loading ? <p role="status">Loading workouts…</p> : null}
      {error ? <div className="alert alert-danger" role="alert">Could not load workouts: {error}</div> : null}
      {!loading && !error && items.length === 0 ? <p className="empty-state">No workouts available yet.</p> : null}
      {!loading && !error && items.length > 0 ? (
        <div className="row g-3">
          {items.map((workout, index) => (
            <div className="col-12 col-md-6 col-xl-4" key={itemKey(workout, index)}>
              <article className="workout-item h-100">
                <div className="d-flex align-items-start justify-content-between gap-3">
                  <h2>{workout.title || 'Workout'}</h2>
                  <span className="difficulty">{workout.difficulty || 'beginner'}</span>
                </div>
                <p className="workout-description">{workout.description || 'No description provided.'}</p>
                <div className="workout-meta">
                  <span className="text-capitalize">{workout.activityType || 'Activity'}</span>
                  <span>{workout.durationMinutes ?? '—'} min</span>
                </div>
              </article>
            </div>
          ))}
        </div>
      ) : null}
    </section>
  )
}

export default Workouts