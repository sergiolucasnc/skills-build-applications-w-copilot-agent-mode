import { displayName, formatDate, itemKey } from '../utils/formatters.js'
import { useCollection } from '../hooks/useCollection.js'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
  || import.meta.env.CODESPACE_NAME?.trim()
const activitiesEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/'

function Activities() {
  const { items, loading, error } = useCollection(activitiesEndpoint)

  return (
    <section aria-labelledby="activities-title">
      <div className="page-heading">
        <p className="eyebrow">Training log</p>
        <h1 id="activities-title">Activities</h1>
        <p className="page-summary">Recent movement across your tracker.</p>
      </div>
      {loading ? <p role="status">Loading activities…</p> : null}
      {error ? <div className="alert alert-danger" role="alert">Could not load activities: {error}</div> : null}
      {!loading && !error && items.length === 0 ? <p className="empty-state">No activities recorded yet.</p> : null}
      {!loading && !error && items.length > 0 ? (
        <div className="table-responsive data-table-wrap">
          <table className="table align-middle mb-0">
            <thead><tr><th>Date</th><th>Athlete</th><th>Activity</th><th>Duration</th><th>Distance</th><th>Calories</th><th>Points</th></tr></thead>
            <tbody>
              {items.map((activity, index) => (
                <tr key={itemKey(activity, index)}>
                  <td>{formatDate(activity.date)}</td>
                  <td>{displayName(activity.user)}</td>
                  <td className="text-capitalize">{activity.type || '—'}</td>
                  <td>{activity.durationMinutes ?? '—'} min</td>
                  <td>{activity.distanceKm == null ? '—' : `${activity.distanceKm} km`}</td>
                  <td>{activity.calories ?? '—'}</td>
                  <td>{activity.points ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </section>
  )
}

export default Activities