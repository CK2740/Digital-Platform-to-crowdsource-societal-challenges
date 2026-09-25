import { useState } from 'react'
import { ArrowUpRight, Bell, ChevronDown, CircleHelp, FilePlus2, Filter, Gauge, Globe2, GraduationCap, LayoutDashboard, Lightbulb, MapPin, Menu, MessageSquareText, MoreHorizontal, PanelLeftClose, PanelLeftOpen, Plus, Search, Settings2, ShieldCheck, Sparkles, Users, X } from 'lucide-react'
import './App.css'

const challenges = [
  { id: 'JH-1048', title: 'Restoring summer water access in Latehar', domain: 'Water & sanitation', location: 'Latehar', status: 'In review', initials: 'PS', tone: 'orange', date: 'Today, 10:24 AM' },
  { id: 'JH-1047', title: 'Market linkage for lac producers', domain: 'Rural livelihoods', location: 'Khunti', status: 'Matched', initials: 'AK', tone: 'green', date: 'Yesterday, 4:12 PM' },
  { id: 'JH-1046', title: 'Low-cost learning kits for tribal schools', domain: 'Education', location: 'West Singhbhum', status: 'In progress', initials: 'RM', tone: 'purple', date: 'Sep 23, 2026' },
  { id: 'JH-1045', title: 'Reducing crop loss through local weather signals', domain: 'Agriculture', location: 'Dumka', status: 'Matched', initials: 'SN', tone: 'blue', date: 'Sep 22, 2026' },
]
const domains = [
  { label: 'Water & sanitation', count: 186, color: '#e87942' },
  { label: 'Education', count: 152, color: '#6d65c4' },
  { label: 'Agriculture', count: 128, color: '#5d9f73' },
  { label: 'Healthcare', count: 94, color: '#d45d74' },
]
const priorityActions = [
  { title: 'Resolve water backlog', detail: '12 urgent reports', tone: 'orange' },
  { title: 'Activate school kits', detail: '4 districts ready', tone: 'green' },
  { title: 'Scale training partners', detail: '9 new partners onboarded', tone: 'purple' },
]
const momentumStats = [
  { label: 'Pilot readiness', value: '88%', change: '+6%' },
  { label: 'District response', value: '74%', change: '+12%' },
  { label: 'Funding confidence', value: '91%', change: '+9%' },
]
const trendData = [42, 54, 49, 66, 60, 78, 88, 82, 94]

function App() {
  const [activeView, setActiveView] = useState('Overview')
  const [showForm, setShowForm] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [query, setQuery] = useState('')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [theme, setTheme] = useState('light')
  const filteredChallenges = challenges.filter((challenge) => `${challenge.title} ${challenge.domain} ${challenge.location}`.toLowerCase().includes(query.toLowerCase()))
  const handleSubmit = (event) => { event.preventDefault(); setShowForm(false); setSubmitted(true) }

  const renderOverview = () => (
    <>
      <section className="spotlight-grid">
        <div className="spotlight-banner">
          <div>
            <span className="eyebrow subtle">SIH 26043</span>
            <h3>Turning community problems into collaborative innovation.</h3>
          </div>
          <span className="banner-gain">+14.8% this week</span>
        </div>
        {priorityActions.map((action) => (
          <div key={action.title} className={`priority-card ${action.tone}`}>
            <span className="priority-pill">Priority</span>
            <strong>{action.title}</strong>
            <small>{action.detail}</small>
          </div>
        ))}
      </section>
      <section className="analytics-panel panel">
        <div className="panel-heading compact-heading">
          <div>
            <h2>Impact trend</h2>
            <p>Outcome acceleration across districts</p>
          </div>
          <button className="text-button" onClick={() => setActiveView('Analytics')}>Open analytics <ArrowUpRight size={15} /></button>
        </div>
        <div className="trend-chart" aria-label="Impact trend chart">
          {trendData.map((value, index) => (
            <div key={index} className="trend-column">
              <span className="trend-bar" style={{ height: `${value}%` }} />
            </div>
          ))}
        </div>
        <div className="trend-labels"><span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span></div>
      </section>
      <section className="momentum-grid">
        {momentumStats.map((stat) => (
          <div key={stat.label} className="momentum-card">
            <span>{stat.label}</span>
            <strong>{stat.value}</strong>
            <em>{stat.change}</em>
          </div>
        ))}
      </section>
      <section className="metric-grid"><Metric title="Citizen submissions" value="1,248" trend="+18.4%" icon={<Lightbulb size={17} />} highlight /><Metric title="University-linked projects" value="86" trend="+12.1%" icon={<Gauge size={17} />} /><Metric title="Industry partners" value="32" trend="+4" icon={<GraduationCap size={17} />} /><Metric title="District reach" value="48.6k" trend="+8.7%" icon={<Users size={17} />} /></section>
      <section className="dashboard-grid"><div className="panel challenge-panel"><div className="panel-heading"><div><h2>Challenge pipeline</h2><p>Track newly reported challenges through to action.</p></div><button className="text-button" onClick={() => setActiveView('Challenges')}>View all <ArrowUpRight size={15} /></button></div><div className="pipeline"><div><span className="pipeline-number">318</span><span>New this month</span></div><div className="pipeline-line"><span /></div><div className="pipeline-meta"><span>64% triaged</span><span>↑ 6.2%</span></div></div><div className="table-toolbar"><div className="search-field"><Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search challenges" /></div><button className="filter-button"><Filter size={15} /> Filter</button></div><div className="challenge-table"><div className="table-header"><span>Challenge</span><span>Domain</span><span>Location</span><span>Status</span><span /></div>{filteredChallenges.map((challenge) => <div className="table-row" key={challenge.id}><div className="challenge-name"><div className={`row-avatar ${challenge.tone}`}>{challenge.initials}</div><div><strong>{challenge.title}</strong><span>{challenge.id} · {challenge.date}</span></div></div><span className="domain-cell">{challenge.domain}</span><span className="location-cell"><MapPin size={14} />{challenge.location}</span><span className={`status ${challenge.status.toLowerCase().replace(' ', '-')}`}><i />{challenge.status}</span><button className="more-button" aria-label={`More options for ${challenge.id}`}><MoreHorizontal size={16} /></button></div>)}</div></div>
          <div className="side-column"><div className="panel domains-panel"><div className="panel-heading"><div><h2>Top challenge domains</h2><p>Where communities need us most.</p></div><button className="small-icon-button" aria-label="Domain options"><MoreHorizontal size={16} /></button></div><div className="domain-chart"><div className="donut"><div><strong>1,248</strong><span>Total</span></div></div><div className="legend">{domains.map((domain) => <div key={domain.label}><span className="legend-dot" style={{ backgroundColor: domain.color }} /><span>{domain.label}</span><strong>{domain.count}</strong></div>)}</div></div><button className="outline-button">Explore all domains <ArrowUpRight size={15} /></button></div><div className="panel activity-panel"><div className="panel-heading"><div><h2>Recent activity</h2><p>Updates from your network.</p></div><button className="small-icon-button" aria-label="Activity options"><MoreHorizontal size={16} /></button></div><Activity icon={<GraduationCap size={16} />} tone="purple" text={<><strong>BIT Mesra</strong> submitted a proposal</>} meta="Low-cost learning kits · 12 min ago" /><Activity icon={<Users size={16} />} tone="orange" text={<><strong>Ranchi Smart City</strong> joined as a partner</>} meta="Public infrastructure · 48 min ago" /><Activity icon={<ShieldCheck size={16} />} tone="green" text={<><strong>Challenge JH-1039</strong> moved to pilot</>} meta="Solar cold storage · 2 hrs ago" /></div></div></section>
    </>
  )

  const renderChallenges = () => (
    <section className="section-shell panel">
      <div className="section-header"><div><span className="eyebrow">Challenge board</span><h2>Challenges</h2></div><button className="primary-button" onClick={() => setShowForm(true)}><Plus size={18} /> New challenge</button></div>
      <div className="table-toolbar"><div className="search-field"><Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search challenges" /></div><button className="filter-button"><Filter size={15} /> Filter</button></div>
      <div className="challenge-table"><div className="table-header"><span>Challenge</span><span>Domain</span><span>Location</span><span>Status</span><span /></div>{filteredChallenges.map((challenge) => <div className="table-row" key={challenge.id}><div className="challenge-name"><div className={`row-avatar ${challenge.tone}`}>{challenge.initials}</div><div><strong>{challenge.title}</strong><span>{challenge.id} · {challenge.date}</span></div></div><span className="domain-cell">{challenge.domain}</span><span className="location-cell"><MapPin size={14} />{challenge.location}</span><span className={`status ${challenge.status.toLowerCase().replace(' ', '-')}`}><i />{challenge.status}</span><button className="more-button" aria-label={`More options for ${challenge.id}`}><MoreHorizontal size={16} /></button></div>)}</div>
    </section>
  )

  const renderProjects = () => (
    <section className="section-shell">
      <div className="section-header"><div><span className="eyebrow">Portfolio</span><h2>Projects</h2></div><button className="primary-button" onClick={() => setActiveView('Overview')}><ArrowUpRight size={16} /> Back to overview</button></div>
      <div className="info-grid">
        <div className="info-card"><strong>18</strong><span>Ongoing challenge pilots</span></div>
        <div className="info-card"><strong>7</strong><span>University-led innovation teams</span></div>
        <div className="info-card"><strong>42%</strong><span>Funded problem pipeline</span></div>
        <div className="info-card"><strong>3</strong><span>District pilots this month</span></div>
        <div className="info-card"><strong>11</strong><span>Industry co-development tracks</span></div>
        <div className="info-card"><strong>92%</strong><span>Implementation confidence</span></div>
      </div>
      <div className="panel">
        <div className="panel-heading"><div><h2>Priority portfolio</h2><p>High-impact societal innovation projects in active execution.</p></div></div>
        <div className="message-list" style={{ padding: '0 20px 20px' }}>
          <div className="message-item"><strong>Water access resilience</strong><span>Latehar · University + NGO + civic system collaboration</span></div>
          <div className="message-item"><strong>Tribal learning solution labs</strong><span>West Singhbhum · HEI mentors and student teams driving local design</span></div>
          <div className="message-item"><strong>Agri-warning intelligence</strong><span>Dumka · SME and research institute partnership for early alerts</span></div>
        </div>
      </div>
    </section>
  )

  const renderPartners = () => (
    <section className="section-shell">
      <div className="section-header"><div><span className="eyebrow">Network</span><h2>Partners</h2></div></div>
      <div className="info-grid">
        <div className="info-card"><strong>32</strong><span>Higher education institutions</span></div>
        <div className="info-card"><strong>14</strong><span>NGO and community collaborators</span></div>
        <div className="info-card"><strong>9</strong><span>Government programs</span></div>
        <div className="info-card"><strong>26</strong><span>Industry mentors and advisors</span></div>
        <div className="info-card"><strong>6</strong><span>New strategic onboarding</span></div>
        <div className="info-card"><strong>4.8/5</strong><span>Partnership satisfaction</span></div>
      </div>
      <div className="panel">
        <div className="panel-heading"><div><h2>Collaboration network</h2><p>Universities, industry, and civic stakeholders solving local challenges together.</p></div></div>
        <div className="message-list" style={{ padding: '0 20px 20px' }}>
          <div className="message-item"><strong>BIT Mesra</strong><span>Academic challenge review and multidisciplinary student problem-solving teams</span></div>
          <div className="message-item"><strong>Ranchi Smart City</strong><span>Urban infrastructure support, mentoring, and deployment coordination</span></div>
          <div className="message-item"><strong>Industry and MSME partners</strong><span>Prototyping, funding pathways, and pilot implementation support</span></div>
        </div>
      </div>
    </section>
  )

  const renderAnalytics = () => (
    <section className="section-shell">
      <div className="section-header"><div><span className="eyebrow">Insights</span><h2>Impact analytics</h2></div></div>
      <div className="info-grid">
        <div className="info-card"><strong>48.6K</strong><span>People reached</span></div>
        <div className="info-card"><strong>92%</strong><span>Program satisfaction</span></div>
        <div className="info-card"><strong>6.2%</strong><span>Quarter growth</span></div>
      </div>
    </section>
  )

  const renderMessages = () => (
    <section className="section-shell panel">
      <div className="section-header"><div><span className="eyebrow">Inbox</span><h2>Messages</h2></div></div>
      <div className="message-list">
        <div className="message-item"><strong>Ranchi Smart City</strong><span>Shared project timeline and training plan.</span></div>
        <div className="message-item"><strong>BIT Mesra</strong><span>Proposal under review for the education intervention.</span></div>
        <div className="message-item"><strong>District team</strong><span>Updated triage status for the water access issue.</span></div>
      </div>
    </section>
  )

  const renderContent = () => {
    switch (activeView) {
      case 'Challenges': return renderChallenges();
      case 'Projects': return renderProjects();
      case 'Partners': return renderPartners();
      case 'Analytics': return renderAnalytics();
      case 'Messages': return renderMessages();
      case 'Overview':
      default: return renderOverview();
    }
  }

  return <div className={`app-shell ${theme === 'dark' ? 'dark-mode' : ''}`}>
    <aside className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="brand"><span className="brand-mark"><Sparkles size={17} /></span><span className="brand-name">Socio<span className="brand-accent">Solve</span></span></div>
        <button className="sidebar-toggle" type="button" aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'} onClick={() => setSidebarCollapsed((value) => !value)}>{sidebarCollapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}</button>
      </div>
      <div className="org-switcher"><div className="org-avatar">JH</div><div className="org-details"><strong>Jharkhand Gov.</strong><span>Higher & Technical Edu.</span></div><ChevronDown size={15} /></div>
      <nav className="main-nav" aria-label="Main navigation"><span className="nav-label">Workspace</span>
        {[['Overview', LayoutDashboard], ['Challenges', Lightbulb], ['Projects', Gauge], ['Partners', Users]].map(([label, Icon]) => <button key={label} title={label} className={activeView === label ? 'nav-item active' : 'nav-item'} onClick={() => setActiveView(label)}><Icon size={17} /><span className="nav-item-label">{label}</span>{label === 'Challenges' && <span className="nav-count">24</span>}</button>)}
        <span className="nav-label secondary-label">Insights</span><button className="nav-item" title="Impact analytics" onClick={() => setActiveView('Analytics')}><Globe2 size={17} /><span className="nav-item-label">Impact analytics</span></button><button className="nav-item" title="Messages" onClick={() => setActiveView('Messages')}><MessageSquareText size={17} /><span className="nav-item-label">Messages</span><span className="unread-dot" /></button>
      </nav>
      <div className="sidebar-bottom"><button className="nav-item" title="Settings" onClick={() => setActiveView('Overview')}><Settings2 size={17} /><span className="nav-item-label">Settings</span></button><div className="user-profile"><div className="user-avatar">CK</div><div className="user-details"><strong>Chaitanya Kaldante</strong><span>Programme lead</span></div><MoreHorizontal size={17} /></div></div>
    </aside>
    <main className="main-content">
      <header className="topbar"><button className="mobile-menu" aria-label="Open menu"><Menu size={20} /></button><div className="breadcrumb"><span>Jharkhand</span><span>/</span><strong>{activeView}</strong></div><div className="top-actions"><div className="role-picker"><span className="role-dot" />Government view<ChevronDown size={14} /></div><button className="icon-button" aria-label="Toggle theme" onClick={() => setTheme((current) => current === 'light' ? 'dark' : 'light')}>{theme === 'light' ? '☾' : '☀'}</button><button className="icon-button" aria-label="Help"><CircleHelp size={19} /></button><button className="icon-button has-notification" aria-label="Notifications"><Bell size={19} /></button><div className="top-avatar">CK</div></div></header>
      <div className="content-wrap">
        <section className="page-heading"><div><div className="eyebrow">PROBLEM STATEMENT ID 26043 <span className="live-pill"><span /> LIVE</span></div><h1>Societal Innovation Collaboration Portal<span className="heading-dot">.</span></h1><p>Connecting citizens, universities, and industry to solve local challenges through structured collaboration and innovation.</p></div><button className="primary-button" onClick={() => setShowForm(true)}><Plus size={18} /> Submit a challenge</button></section>
        {submitted && <div className="success-banner"><ShieldCheck size={18} /><span><strong>Challenge submitted.</strong> Your report has been queued for triage and will receive an ID shortly.</span><button onClick={() => setSubmitted(false)} aria-label="Dismiss"><X size={16} /></button></div>}
        {renderContent()}
      </div>
    </main>
    {showForm && <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && setShowForm(false)}><section className="submit-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><div className="modal-heading"><div><span className="modal-kicker"><FilePlus2 size={15} /> Community report</span><h2 id="modal-title">Submit a societal challenge</h2><p>Give the right team enough context to start helping.</p></div><button className="close-button" onClick={() => setShowForm(false)} aria-label="Close"><X size={19} /></button></div><form onSubmit={handleSubmit}><label>Challenge title<input required placeholder="e.g. Unreliable drinking water in..." /></label><label>What is happening?<textarea required placeholder="Describe the challenge, who it affects, and what a better outcome looks like." rows="4" /></label><div className="form-row"><label>District<select defaultValue=""><option value="" disabled>Select district</option><option>Latehar</option><option>Ranchi</option><option>Khunti</option><option>Dumka</option></select></label><label>Theme<select defaultValue=""><option value="" disabled>Select a theme</option><option>Water & sanitation</option><option>Education</option><option>Agriculture</option><option>Healthcare</option></select></label></div><div className="upload-box"><FilePlus2 size={20} /><div><strong>Add supporting evidence</strong><span>Photos, videos, documents or a location pin</span></div><button type="button">Browse files</button></div><div className="modal-actions"><button type="button" className="cancel-button" onClick={() => setShowForm(false)}>Cancel</button><button type="submit" className="primary-button">Submit challenge <ArrowUpRight size={16} /></button></div></form></section></div>}
  </div>
}

function Metric({ title, value, trend, icon, highlight = false }) { return <div className={`metric-card ${highlight ? 'metric-highlight' : ''}`}><div className="metric-top"><span>{title}</span><span className="metric-icon">{icon}</span></div><strong>{value}</strong><div className="metric-footer"><span className="trend-up">{trend}</span><span>{trend === '+4' ? 'this quarter' : title === 'Community impact' ? 'people reached' : 'vs. last quarter'}</span><div className="metric-mini-bars"><i /><i /><i /><i /><i /></div></div></div> }
function Activity({ icon, tone, text, meta }) { return <div className="activity-item"><div className={`activity-icon ${tone}`}>{icon}</div><div><p>{text}</p><span>{meta}</span></div></div> }

export default App
