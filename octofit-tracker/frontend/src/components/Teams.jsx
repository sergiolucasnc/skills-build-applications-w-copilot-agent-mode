import { displayName, itemKey } from '../utils/formatters.js'
import { useCollection } from '../hooks/useCollection.js'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
  || import.meta.env.CODESPACE_NAME?.trim()
const teamsEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/'

function Teams() {
  const { items, loading, error } = useCollection(teamsEndpoint)

  return (
    <section aria-labelledby="teams-title">
      <div className="page-heading">
        <p className="eyebrow">Find your people</p>
        <h1 id="teams-title">Teams</h1>
        <p className="page-summary">Groups training and competing together.</p>
      </div>
      {loading ? <p role="status">Loading teams…</p> : null}
      {error ? <div className="alert alert-danger" role="alert">Could not load teams: {error}</div> : null}
      {!loading && !error && items.length === 0 ? <p className="empty-state">No teams created yet.</p> : null}
      {!loading && !error && items.length > 0 ? (
        <div className="row g-3">
          {items.map((team, index) => (
            <div className="col-12 col-md-6 col-xl-4" key={itemKey(team, index)}>
              <article className="team-item h-100">
                <div className="d-flex align-items-start justify-content-between gap-3">
                  <h2>{team.name || 'Unnamed team'}</h2>
                  <span className="member-count">{team.members?.length || 0} members</span>
                </div>
                <p className="team-description">{team.description || 'No description provided.'}</p>
                {team.members?.length ? (
                  <p className="team-members">{team.members.map(displayName).join(', ')}</p>
                ) : <p className="team-members">No members yet</p>}
              </article>
            </div>
          ))}
        </div>
      ) : null}
    </section>
  )
}

export default Teams