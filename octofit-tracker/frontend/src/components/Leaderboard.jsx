import { displayName, itemKey } from '../utils/formatters.js'
import { useCollection } from '../hooks/useCollection.js'

function Leaderboard() {
  const { items, loading, error } = useCollection('leaderboard')

  return (
    <section aria-labelledby="leaderboard-title">
      <div className="page-heading">
        <p className="eyebrow">Team performance</p>
        <h1 id="leaderboard-title">Leaderboard</h1>
        <p className="page-summary">A running view of points earned by each athlete.</p>
      </div>
      {loading ? <p role="status">Loading leaderboard…</p> : null}
      {error ? <div className="alert alert-danger" role="alert">Could not load leaderboard: {error}</div> : null}
      {!loading && !error && items.length === 0 ? <p className="empty-state">No leaderboard entries yet.</p> : null}
      {!loading && !error && items.length > 0 ? (
        <div className="table-responsive data-table-wrap">
          <table className="table align-middle mb-0">
            <thead><tr><th>Rank</th><th>Athlete</th><th>Email</th><th className="text-end">Points</th></tr></thead>
            <tbody>
              {items.map((entry, index) => (
                <tr key={itemKey(entry, index)}>
                  <td><span className="rank-number">{index + 1}</span></td>
                  <td className="fw-semibold">{displayName(entry.user)}</td>
                  <td>{entry.user?.email || '—'}</td>
                  <td className="text-end fw-semibold">{entry.points ?? 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </section>
  )
}

export default Leaderboard