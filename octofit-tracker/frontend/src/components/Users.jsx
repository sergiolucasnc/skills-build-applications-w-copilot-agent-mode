import { displayName, itemKey } from '../utils/formatters.js'
import { useCollection } from '../hooks/useCollection.js'

function Users() {
  const { items, loading, error } = useCollection('users')

  return (
    <section aria-labelledby="users-title">
      <div className="page-heading">
        <p className="eyebrow">Community</p>
        <h1 id="users-title">Athletes</h1>
        <p className="page-summary">People building healthy habits with Octofit.</p>
      </div>
      {loading ? <p role="status">Loading athletes…</p> : null}
      {error ? <div className="alert alert-danger" role="alert">Could not load athletes: {error}</div> : null}
      {!loading && !error && items.length === 0 ? <p className="empty-state">No athletes registered yet.</p> : null}
      {!loading && !error && items.length > 0 ? (
        <div className="table-responsive data-table-wrap">
          <table className="table align-middle mb-0">
            <thead><tr><th>Name</th><th>Email</th><th>Age</th><th>Team</th></tr></thead>
            <tbody>
              {items.map((user, index) => (
                <tr key={itemKey(user, index)}>
                  <td className="fw-semibold">{displayName(user)}</td>
                  <td>{user.email || '—'}</td>
                  <td>{user.age ?? '—'}</td>
                  <td>{displayName(user.team)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </section>
  )
}

export default Users