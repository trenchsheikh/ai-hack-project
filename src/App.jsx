import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, Bell, BookOpen, BookOpenCheck,
  BrainCircuit, CalendarDays, Check, CheckCircle2, ChevronDown, ChevronLeft, ChevronRight,
  CircleHelp, Clock3, Compass, FileText, FolderKanban, GraduationCap, HeartPulse, House,
  Info, LayoutDashboard, Lightbulb, ListTodo, Menu, MoreHorizontal, PanelLeftClose,
  PanelLeftOpen, Palette, Pencil, Play, Plus, Search, Settings2, ShieldCheck,
  Sparkles, Target, Trash2, Trophy, UserRound, WandSparkles, X, Zap
} from 'lucide-react';
import Nexacore from './components/templates/nexacore/nexacore';
import { GradientCard } from './components/ui/gradient-card';
import { GradientCardDemo } from './components/ui/gradient-card-demo';
import { lessons, challenges } from './data';
import './workspace.css';

const NAV = [
  { group:'WORKSPACE', items:[
    { path:'/app', label:'Overview', icon:LayoutDashboard },
    { path:'/app/learn', label:'Learn', icon:BookOpen },
    { path:'/app/hackathons', label:'Mini-hackathons', icon:Trophy },
    { path:'/app/projects', label:'My projects', icon:FolderKanban }
  ]},
  { group:'CREATE', items:[
    { path:'/app/build', label:'Start a project', icon:Plus },
    { path:'/app/progress', label:'My progress', icon:Target }
  ]}
];
const iconFor = {
  sports_soccer:Trophy, palette:Palette, favorite:HeartPulse, public:Compass,
  auto_awesome:Sparkles, edit_note:Pencil, verified_user:ShieldCheck, deployed_code:WandSparkles
};
const colors={purple:'purple',cyan:'cyan',lime:'lime',pink:'pink'};
// Photo assets are from Unsplash; only the lesson and challenge catalogue uses these
// decorative images, with the original NexaCore brand colours in the gradients.
const cardStyle={
  purple:{gradient:'blue',dot:'#2563EB'},
  cyan:{gradient:'sky',dot:'#3285CA'},
  lime:{gradient:'cream',dot:'#6CA9D4'},
  pink:{gradient:'white',dot:'#5396CF'}
};
const lessonImages={
  'generative-ai':'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=760&q=80',
  prompting:'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=760&q=80',
  'ai-football':'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=760&q=80',
  'creative-ai':'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=760&q=80',
  'responsible-ai':'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=760&q=80',
  prototype:'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=760&q=80'
};
const challengeImages={
  future:'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=760&q=80',
  football:'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=760&q=80',
  creative:'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=760&q=80',
  wellbeing:'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=760&q=80'
};
function useStored(key, fallback) {
  const [value,setValue]=useState(()=>{
    try { const fromStorage=JSON.parse(window.localStorage.getItem(key)); return Array.isArray(fromStorage)?fromStorage:fallback; }
    catch {return fallback;}
  });
  useEffect(()=>{try{window.localStorage.setItem(key,JSON.stringify(value));}catch{}},[key,value]);
  return [value,setValue];
}
function usePath(){
 const current=()=>window.location.pathname.replace(/\/+$/,'')||'/';
 const [path,setPath]=useState(current);
 useEffect(()=>{
   const update=()=>setPath(current());
   window.addEventListener('popstate',update);
   return ()=>window.removeEventListener('popstate',update);
 },[]);
 const navigate=(to)=>{
   if(to.startsWith('#')){document.querySelector(to)?.scrollIntoView({behavior:'smooth'});return;}
   window.history.pushState({},'',to);setPath(current());window.scrollTo({top:0,behavior:'instant'});
 };
 return [path,navigate];
}
function SectionTitle({eyebrow,title,description,action}){
 return <div className="st-page-heading"><div><div className="st-eyebrow">{eyebrow}</div><h1>{title}</h1>{description&&<p>{description}</p>}</div>{action&&<div className="st-heading-action">{action}</div>}</div>;
}
function Button({children,onClick,variant='primary',icon:Icon,disabled=false,type='button',className=''}) {
 return <button type={type} disabled={disabled} onClick={onClick} className={'st-button st-button-'+variant+' '+className}>{Icon&&<Icon size={17} strokeWidth={2}/>}<span>{children}</span></button>;
}
function Tag({children,color='neutral'}){return <span className={'st-tag st-tag-'+color}>{children}</span>;}
function Panel({children,className=''}){return <section className={'st-panel '+className}>{children}</section>;}
function PanelHeader({title,subtitle,action}){return <div className="st-panel-header"><div><h2>{title}</h2>{subtitle&&<p>{subtitle}</p>}</div>{action}</div>;}
function PlaceholderArt({icon:Icon=Sparkles,tone='purple',compact=false}) {
 return <div className={'st-art st-art-'+tone+(compact?' st-art-compact':'')} aria-hidden="true"><div className="st-art-orb"/><div className="st-art-stripe"/><span className="st-art-device"><Icon size={compact?25:38} strokeWidth={1.7}/></span><span className="st-art-twinkle">✦</span></div>;
}
function ProgressBar({percent}){return <div className="st-progress-track" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent}><div style={{width:percent+'%'}}/></div>;}
function Stats({completed,joined,projects,go}){
 const rows=[
  {title:'Lessons completed',value:completed.length,sub:'of '+lessons.length+' available',icon:BookOpenCheck,path:'/app/learn',tone:'purple'},
  {title:'Challenges joined',value:joined.length,sub:'of '+challenges.length+' practice briefs',icon:Trophy,path:'/app/hackathons',tone:'pink'},
  {title:'Projects created',value:projects.length,sub:'saved in this browser',icon:FolderKanban,path:'/app/projects',tone:'cyan'},
  {title:'Learning progress',value:Math.round(completed.length/lessons.length*100)+'%',sub:'your lesson completion',icon:Target,path:'/app/progress',tone:'lime'}
 ];
 return <div className="st-stats-grid">{rows.map(x=><button key={x.title} className="st-stat" onClick={()=>go(x.path)}><div className="st-stat-top"><span>{x.title}</span><x.icon size={17}/></div><strong>{x.value}</strong><div className="st-stat-bottom"><span className={'st-stat-indicator st-indicator-'+x.tone}><ArrowUpRight size={13}/></span><span>{x.sub}</span></div></button>)}</div>;
}
function LessonTile({lesson,completed,go}) {
 const style=cardStyle[lesson.theme]||cardStyle.purple;
 return <GradientCard
   gradient={style.gradient}
   badgeText={completed?'Completed · '+lesson.tag:lesson.tag+' · '+lesson.minutes+' min'}
   badgeColor={completed?'#26855A':style.dot}
   title={lesson.title}
   description={lesson.description}
   ctaText={completed?'Review lesson':'Start lesson'}
   ctaHref={'/app/learn/'+lesson.id}
   imageUrl={lessonImages[lesson.id]||lessonImages.prototype}
   onNavigate={go}
 />;
}
function ChallengeTile({challenge,joined,go}) {
 const Icon=iconFor[challenge.icon]||Trophy;
 return <button className="st-challenge-tile" onClick={()=>go('/app/hackathons/'+challenge.id)}><div className={'st-challenge-icon st-soft-'+(colors[challenge.theme]||'purple')}><Icon size={22}/></div><div className="st-challenge-text"><div className="st-challenge-title"><h3>{challenge.title}</h3><ArrowUpRight size={16}/></div><p>{challenge.description}</p><div className="st-tile-tags"><Tag>{challenge.category}</Tag>{joined?<Tag color="green"><Check size={12}/> Joined</Tag>:<Tag color="outline">Self-paced</Tag>}</div></div></button>;
}
function Empty({icon:Icon=FolderKanban,title,description,button,go}) {
 return <div className="st-empty"><span className="st-empty-icon"><Icon size={24}/></span><h3>{title}</h3><p>{description}</p>{button&&<Button icon={Plus} onClick={go}>{button}</Button>}</div>;
}
function Overview({completed,joined,projects,go}){
 const next=lessons.find(l=>!completed.includes(l.id));
 const recent=[...projects].sort((a,b)=>new Date(b.created||0)-new Date(a.created||0)).slice(0,3);
 return <div className="st-view">
   <SectionTitle eyebrow="YOUR WORKSPACE" title="Welcome to your learning space." description="Keep learning, take on new challenges and turn your ideas into something real." action={<Button icon={Plus} onClick={()=>go('/app/build')}>New project</Button>}/>
   <Stats completed={completed} joined={joined} projects={projects} go={go}/>
   <div className="st-dashboard-grid">
     <Panel className="st-overview-progress"><PanelHeader title="Your learning journey" subtitle="Progress based on lessons you've completed" action={<button className="st-small-link" onClick={()=>go('/app/progress')}>Full progress <ArrowRight size={15}/></button>}/><div className="st-progress-layout">
       <div className="st-donut" style={{'--progress':Math.round(completed.length/lessons.length*100)+'%'}}><div><strong>{Math.round(completed.length/lessons.length*100)}%</strong><span>complete</span></div></div>
       <div className="st-progress-details"><strong>Keep your momentum going</strong><p>{completed.length===0?'Complete your first lesson to start tracking your progress.':completed.length===lessons.length?'You have completed every available lesson. Great work!':'You have completed '+completed.length+' of '+lessons.length+' starter lessons.'}</p><div className="st-micro-label"><BookOpenCheck size={14}/>{completed.length} / {lessons.length} lessons</div><ProgressBar percent={Math.round(completed.length/lessons.length*100)}/><button className="st-link" onClick={()=>go(next?'/app/learn/'+next.id:'/app/hackathons')}>{next?'Continue learning':'Explore a challenge'}<ArrowRight size={15}/></button></div>
     </div></Panel>
     <Panel className="st-next-card"><div className="st-next-stars"><Sparkles size={22}/></div><div className="st-next-tag">YOUR NEXT STEP</div><h2>{next?'Small steps. Big possibilities.':'Ready for the next challenge?'}</h2><p>{next?'Take your next lesson, or explore a practical challenge connected to the things you love.':'Put those skills to work and bring an idea to life in a mini-hackathon.'}</p><Button onClick={()=>go(next?'/app/learn/'+next.id:'/app/hackathons')} variant="light" icon={ArrowRight}>{next?'Start next lesson':'Explore challenges'}</Button><span className="st-next-decoration">✳</span></Panel>
   </div>
   <div className="st-overview-bottom">
     <Panel><PanelHeader title="Continue learning" subtitle="Pick up where you left off" action={<button className="st-small-link" onClick={()=>go('/app/learn')}>All lessons <ArrowRight size={15}/></button>}/><div className="st-continue-list">{lessons.filter(l=>!completed.includes(l.id)).slice(0,3).concat(completed.length===lessons.length?lessons.slice(0,2):[]).map(l=>{const Icon=iconFor[l.icon]||BookOpen;return <button className="st-continue-row" key={l.id} onClick={()=>go('/app/learn/'+l.id)}><span className={'st-row-icon st-soft-'+(colors[l.theme]||'purple')}><Icon size={20}/></span><span><strong>{l.title}</strong><small>{l.minutes} min · {l.tag}</small></span><ChevronRight size={17}/></button>})}</div></Panel>
     <Panel><PanelHeader title="Mini-hackathons" subtitle="Creative, self-paced briefs" action={<button className="st-small-link" onClick={()=>go('/app/hackathons')}>Explore all <ArrowRight size={15}/></button>}/><div className="st-mini-challenges">{challenges.slice(0,3).map(c=><ChallengeTile key={c.id} challenge={c} joined={joined.includes(c.id)} go={go}/>)}</div></Panel>
   </div>
   <Panel className="st-discovery-panel"><PanelHeader title="Discover your starting point" subtitle="Explore learning, creativity and real-world AI challenges" action={<button className="st-small-link" onClick={()=>go('/app/learn')}>Browse lessons <ArrowRight size={15}/></button>}/><GradientCardDemo onNavigate={go}/></Panel>
   <Panel><PanelHeader title="Your latest projects" subtitle="Ideas saved in your browser" action={<button className="st-small-link" onClick={()=>go('/app/projects')}>View projects <ArrowRight size={15}/></button>}/>{recent.length?<div className="st-project-table-wrap"><table className="st-project-table"><thead><tr><th>Project</th><th>Area</th><th>Stage</th><th>Created</th><th></th></tr></thead><tbody>{recent.map(p=><tr key={p.id}><td><span className="st-table-project"><span><WandSparkles size={16}/></span>{p.title}</span></td><td>{p.area}</td><td><Tag color="purple">{p.stage||'Idea'}</Tag></td><td>{formatDate(p.created)}</td><td><button aria-label={'Open '+p.title} onClick={()=>go('/app/projects/'+p.id)}><ArrowUpRight size={16}/></button></td></tr>)}</tbody></table></div>:<Empty icon={FolderKanban} title="Your first project is waiting." description="Sketch an idea, save it, and watch it take shape." button="Start a project" go={()=>go('/app/build')}/>}</Panel>
   <p className="st-storage-note"><Info size={14}/> This is an early preview. Your progress and projects are stored only in this browser, not in a shared account.</p>
 </div>;
}
function Learn({completed,go}) {
 const [term,setTerm]=useState(''),[category,setCategory]=useState('All');
 const options=['All','Foundations','Sports','Creative','Build'];
 const filtered=lessons.filter(l=>(category==='All'||category===l.tag)&&(l.title+' '+l.description+' '+l.tag).toLowerCase().includes(term.toLowerCase()));
 return <div className="st-view"><SectionTitle eyebrow="LEARN AI" title="Your learning library" description="Build confidence with short, practical lessons. No previous experience required." action={<Tag color="purple">{completed.length} of {lessons.length} completed</Tag>}/>
   <div className="st-library-actions"><label className="st-search-input"><Search size={18}/><input value={term} onChange={e=>setTerm(e.target.value)} placeholder="Search lessons…" aria-label="Search lessons"/></label><span className="st-results">{filtered.length} lessons</span></div>
   <div className="st-tabs" role="group" aria-label="Filter by subject">{options.map(x=><button key={x} aria-pressed={category===x} className={category===x?'selected':''} onClick={()=>setCategory(x)}>{x}</button>)}</div>
   {filtered.length?<div className="st-lessons-grid">{filtered.map(l=><LessonTile key={l.id} lesson={l} completed={completed.includes(l.id)} go={go}/>)}</div>:<Panel><Empty icon={Search} title="No lessons found" description="Try a different keyword or filter."/></Panel>}
 </div>;
}
function Lesson({lesson,completed,onComplete,go}) {
 const Icon=iconFor[lesson.icon]||BookOpen;
 return <div className="st-view"><button className="st-back" onClick={()=>go('/app/learn')}><ArrowLeft size={16}/>All lessons</button>
   <section className="st-detail-hero"><div><Tag color={colors[lesson.theme]||'purple'}>{lesson.eyebrow}</Tag><h1>{lesson.title}</h1><p>{lesson.description}</p><div className="st-detail-metadata"><span><Clock3 size={16}/>{lesson.minutes} min</span><span><GraduationCap size={16}/>{lesson.level}</span></div></div><PlaceholderArt icon={Icon} tone={colors[lesson.theme]||'purple'}/></section>
   <div className="st-detail-grid"><Panel><PanelHeader title="What you'll learn" subtitle={lesson.overview}/><div className="st-detail-steps">{lesson.steps.map((s,i)=><article key={s.title}><div className="st-step-count">{String(i+1).padStart(2,'0')}</div><div><h3>{s.title}</h3><p>{s.body}</p></div></article>)}</div><div className="st-practice-box"><span><Lightbulb size={17}/> TRY IT YOURSELF</span><h3>Your practice task</h3><p>{lesson.challenge}</p></div><div className="st-detail-actions"><Button icon={completed?CheckCircle2:Check} disabled={completed} onClick={()=>onComplete(lesson.id)}>{completed?'Lesson completed':'Mark lesson complete'}</Button><Button variant="outline" icon={WandSparkles} onClick={()=>go('/app/build')}>Use this in a project</Button></div></Panel>
   <Panel className="st-aside"><PanelHeader title="A reminder"/><span className="st-aside-illustration"><Sparkles size={26}/></span><h3>Build as you learn.</h3><p>You don't need to know everything to start. Try small ideas and keep people in control of important decisions.</p><div className="st-aside-footer"><ShieldCheck size={17}/> Beginner friendly</div></Panel></div>
 </div>;
}
function Hackathons({joined,go}){
 const [filter,setFilter]=useState('All');
 const options=['All','Sport','Creativity','Social impact','Health'];
 const filtered=challenges.filter(c=>filter==='All'||c.category===filter);
 return <div className="st-view">
   <SectionTitle eyebrow="IDEAS INTO ACTION" title="Mini-hackathons" description="Pick a theme you care about, explore a real problem, and turn an idea into a project." action={<Tag color="purple">{challenges.length} practice challenges</Tag>}/>
   <div className="st-info-line"><Info size={16}/> These are self-paced practice briefs, not scheduled competitions or prize-backed events.</div>
   <div className="st-tabs" role="group" aria-label="Filter challenges by theme">{options.map(o=><button key={o} aria-pressed={filter===o} className={filter===o?'selected':''} onClick={()=>setFilter(o)}>{o}</button>)}</div>
   <div className="st-challenge-grid">{filtered.map(c=>{
     const style=cardStyle[c.theme]||cardStyle.purple;
     return <GradientCard
       key={c.id}
       gradient={style.gradient}
       badgeText={joined.includes(c.id)?'Joined · '+c.category:'Self-paced · '+c.category}
       badgeColor={joined.includes(c.id)?'#26855A':style.dot}
       title={c.title}
       description={c.description}
       ctaText={joined.includes(c.id)?'Continue challenge':'Explore challenge'}
       ctaHref={'/app/hackathons/'+c.id}
       imageUrl={challengeImages[c.id]||challengeImages.future}
       onNavigate={go}
     />;
   })}</div>
 </div>;
}
function Challenge({challenge,joined,onJoin,go}) {
 const Icon=iconFor[challenge.icon]||Trophy;
 return <div className="st-view"><button className="st-back" onClick={()=>go('/app/hackathons')}><ArrowLeft size={16}/>All mini-hackathons</button>
   <section className="st-detail-hero"><div><Tag color="purple">{challenge.tag}</Tag><h1>{challenge.title}</h1><p>{challenge.description}</p><div className="st-detail-metadata"><span><Clock3 size={16}/>{challenge.duration}</span><span><Target size={16}/>{challenge.category}</span></div></div><PlaceholderArt icon={Icon} tone={colors[challenge.theme]||'purple'}/></section>
   <div className="st-detail-grid"><Panel><PanelHeader title="Your challenge brief" subtitle={challenge.brief}/><div className="st-practice-box"><span><Lightbulb size={17}/> DESIGN QUESTION</span><h3>{challenge.prompt}</h3></div><h3 className="st-ideas-title">Some starting points</h3><div className="st-detail-steps">{challenge.ideas.map((idea,i)=><article key={idea}><div className="st-step-count">{String(i+1).padStart(2,'0')}</div><div><h3>{idea}</h3><p>How could you turn this into a useful, human-centred prototype?</p></div></article>)}</div><div className="st-detail-actions"><Button icon={WandSparkles} onClick={()=>{onJoin(challenge.id);go('/app/build?challenge='+challenge.id)}}>{joined?'Continue building':'Join & start a project'}</Button></div></Panel>
   <Panel className="st-aside"><PanelHeader title="How it works"/><div className="st-how-items"><p><span>01</span> Pick an idea that matters to you</p><p><span>02</span> Define who you're helping</p><p><span>03</span> Sketch how AI could help</p><p><span>04</span> Save your first project</p></div><div className="st-aside-footer"><Info size={17}/> Self-paced practice</div></Panel></div>
 </div>;
}
function formatDate(value){if(!value)return '—';const d=new Date(value);return Number.isNaN(+d)?'—':d.toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'});}
function ProjectForm({onSave,go,existing=null}){
 const linked=challenges.find(c=>c.id===new URLSearchParams(window.location.search).get('challenge'));
 const [title,setTitle]=useState(existing?.title||'');
 const [area,setArea]=useState(existing?.area||linked?.category||'Sport');
 const [problem,setProblem]=useState(existing?.problem||'');
 const [solution,setSolution]=useState(existing?.solution||'');
 const [stage,setStage]=useState(existing?.stage||'Idea');
 const [showValidation,setShowValidation]=useState(false);
 const valid=title.trim().length>=3&&problem.trim().length>=10&&solution.trim().length>=10;
 const submit=e=>{
   e.preventDefault();if(!valid){setShowValidation(true);return;}
   onSave({id:existing?.id||String(Date.now()),title:title.trim(),area,problem:problem.trim(),solution:solution.trim(),stage,challengeId:existing?.challengeId||linked?.id||null,created:existing?.created||new Date().toISOString(),updated:new Date().toISOString()});
   go('/app/projects');
 };
 return <div className="st-view"><button className="st-back" onClick={()=>go('/app/projects')}><ArrowLeft size={16}/>My projects</button>
   <SectionTitle eyebrow="YOUR CREATIVE WORKSPACE" title={existing?'Edit your project':'Start something meaningful'} description="Define a real problem and make the first version of your idea. You can refine it any time."/>
   <div className="st-editor-grid"><Panel><PanelHeader title="Project details" subtitle="A first draft is enough. Keep it clear, useful and focused."/>{linked&&!existing&&<div className="st-linked-challenge"><Trophy size={16}/> Building for <strong>{linked.title}</strong></div>}
     <form className="st-form" onSubmit={submit} noValidate>
       <div className="st-form-field"><label htmlFor="pj-title">Project name <b>*</b></label><input id="pj-title" maxLength={90} value={title} onChange={e=>setTitle(e.target.value)} placeholder="e.g. AI coach for grassroots football"/></div>
       <div className="st-form-row"><div className="st-form-field"><label htmlFor="pj-area">Area</label><select id="pj-area" value={area} onChange={e=>setArea(e.target.value)}>{['Sport','Creative','Creativity','Health','Social impact','Education','Everyday life','Other'].map(o=><option key={o}>{o}</option>)}</select></div>
       <div className="st-form-field"><label htmlFor="pj-stage">Stage</label><select id="pj-stage" value={stage} onChange={e=>setStage(e.target.value)}>{['Idea','Planning','Prototype','Completed'].map(o=><option key={o}>{o}</option>)}</select></div></div>
       <div className="st-form-field"><label htmlFor="pj-problem">Who are you helping, and what is the problem? <b>*</b></label><textarea id="pj-problem" rows={4} value={problem} onChange={e=>setProblem(e.target.value)} placeholder="Describe a specific person and a problem that matters to them."/></div>
       <div className="st-form-field"><label htmlFor="pj-solution">How could AI help? <b>*</b></label><textarea id="pj-solution" rows={4} value={solution} onChange={e=>setSolution(e.target.value)} placeholder="Explain your idea in plain English. What might the first version do?"/></div>
       {showValidation&&!valid&&<div className="st-form-error" role="alert">Add a project name (3+ characters), a problem and a solution (10+ characters each).</div>}
       <div className="st-form-footer"><span><Info size={15}/> Saved in your browser only</span><Button icon={Check} type="submit">{existing?'Save changes':'Create project'}</Button></div>
     </form>
   </Panel><Panel className="st-aside"><PanelHeader title="Tips for a strong idea"/><div className="st-how-items"><p><span>01</span> Start with people, not technology</p><p><span>02</span> Focus on one clear problem</p><p><span>03</span> Explain how someone will use it</p><p><span>04</span> Test your idea with real people</p></div><div className="st-aside-footer"><Lightbulb size={17}/> No coding required to start</div></Panel></div>
 </div>;
}
function Projects({projects,onRemove,go}){
 const [filter,setFilter]=useState('All'),[query,setQuery]=useState(''),[pending,setPending]=useState(null);
 const options=['All','Idea','Planning','Prototype','Completed'];
 const list=projects.filter(p=>(filter==='All'||(p.stage||'Idea')===filter)&&(p.title+' '+p.area+' '+p.problem).toLowerCase().includes(query.toLowerCase()));
 return <div className="st-view"><SectionTitle eyebrow="YOUR PROJECT WORKSPACE" title="My projects" description="Your ideas, all in one place. Start simple, then move each project towards a prototype." action={<Button icon={Plus} onClick={()=>go('/app/build')}>New project</Button>}/>
   <div className="st-library-actions"><label className="st-search-input"><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search projects…" aria-label="Search projects"/></label><span className="st-results">{projects.length} saved</span></div>
   <div className="st-tabs">{options.map(o=><button key={o} className={filter===o?'selected':''} onClick={()=>setFilter(o)}>{o}</button>)}</div>
   {list.length?<div className="st-project-grid">{list.map(p=><article className="st-project-card" key={p.id}><div className="st-project-card-top"><span className="st-project-symbol"><WandSparkles size={19}/></span><Tag color={p.stage==='Completed'?'green':'purple'}>{p.stage||'Idea'}</Tag></div><h3>{p.title}</h3><span className="st-project-category">{p.area}</span><p>{p.problem}</p><div className="st-project-card-foot"><small>{formatDate(p.created)}</small><div><button onClick={()=>go('/app/projects/'+p.id)} aria-label={'Open '+p.title}><ArrowUpRight size={18}/></button><button onClick={()=>setPending(p.id)} aria-label={'Delete '+p.title}><Trash2 size={17}/></button></div></div>{pending===p.id&&<div className="st-delete-overlay"><strong>Delete this project?</strong><p>This cannot be undone.</p><div><Button variant="outline" onClick={()=>setPending(null)}>Cancel</Button><Button variant="danger" onClick={()=>{onRemove(p.id);setPending(null)}}>Delete</Button></div></div>}</article>)}</div>:<Panel><Empty icon={FolderKanban} title={projects.length?'Nothing matches your filters':'Your first project starts here'} description={projects.length?'Try a different search or stage.':'Create a project and keep track of your ideas as you build.'} button={projects.length?'Clear filters':'Create a project'} go={()=>projects.length?(setFilter('All'),setQuery('')):go('/app/build')}/></Panel>}
 </div>;
}
function ProjectDetail({project,go}){
 return <div className="st-view"><button className="st-back" onClick={()=>go('/app/projects')}><ArrowLeft size={16}/>My projects</button><SectionTitle eyebrow="YOUR PROJECT" title={project.title} description={'Created '+formatDate(project.created)} action={<Button icon={Pencil} onClick={()=>go('/app/projects/'+project.id+'/edit')}>Edit project</Button>}/>
 <div className="st-project-detail-layout"><Panel><PanelHeader title="The problem"/><p className="st-reading-text">{project.problem}</p></Panel><Panel><PanelHeader title="Your solution"/><p className="st-reading-text">{project.solution}</p></Panel><Panel><PanelHeader title="Project information"/><div className="st-definition-list"><div>Area <strong>{project.area}</strong></div><div>Stage <Tag color="purple">{project.stage||'Idea'}</Tag></div><div>Created <strong>{formatDate(project.created)}</strong></div><div>Last edited <strong>{formatDate(project.updated||project.created)}</strong></div></div></Panel></div>
 </div>;
}
function Progress({completed,joined,projects,go}){
 const groups=[{name:'AI foundations',items:lessons.filter(l=>l.tag==='Foundations')},{name:'Explore your interests',items:lessons.filter(l=>['Sports','Creative'].includes(l.tag))},{name:'Make it real',items:lessons.filter(l=>l.tag==='Build')}];
 return <div className="st-view"><SectionTitle eyebrow="YOUR JOURNEY" title="Learning progress" description="See what you've explored and where you could go next." action={<Button icon={ArrowRight} onClick={()=>go('/app/learn')}>Explore lessons</Button>}/>
 <Stats completed={completed} joined={joined} projects={projects} go={go}/>
 <Panel><PanelHeader title="Your learning path" subtitle="Progress is calculated from available starter lessons"/><div className="st-path-groups">{groups.map(g=>{const count=g.items.filter(l=>completed.includes(l.id)).length;return <section key={g.name}><div className="st-path-heading"><div><strong>{g.name}</strong><span>{count} of {g.items.length} completed</span></div><ProgressBar percent={Math.round(count/g.items.length*100)}/></div><div className="st-path-items">{g.items.map(l=><button key={l.id} onClick={()=>go('/app/learn/'+l.id)}><span className={completed.includes(l.id)?'done':''}>{completed.includes(l.id)?<Check size={16}/>:<BookOpen size={16}/>}</span><strong>{l.title}</strong><ChevronRight size={16}/></button>)}</div></section>})}</div></Panel>
 <p className="st-storage-note"><Info size={14}/> Your completion and project information remains on this device until you clear browser storage.</p></div>;
}
function Sidebar({path,go,collapsed,setCollapsed,mobileOpen,setMobileOpen}){
 return <><aside className={'st-sidebar'+(collapsed?' st-sidebar-collapsed':'')+(mobileOpen?' st-sidebar-mobile-open':'')}>
   <div className="st-side-top"><button className="st-wordmark" onClick={()=>go('/')} aria-label="Back to home"><span className="st-logo-ring"/>{!collapsed&&<strong>AI <span>Lab</span></strong>}</button><button className="st-sidebar-collapse" aria-label={collapsed?'Expand sidebar':'Collapse sidebar'} onClick={()=>setCollapsed(!collapsed)}>{collapsed?<PanelLeftOpen size={19}/>:<PanelLeftClose size={19}/>}</button><button className="st-mobile-close" aria-label="Close navigation" onClick={()=>setMobileOpen(false)}><X size={19}/></button></div>
   <div className="st-space-select"><span className="st-space-avatar"><GraduationCap size={18}/></span>{!collapsed&&<span><strong>My workspace</strong><small>Learning preview</small></span>}{!collapsed&&<ChevronDown size={15}/>}</div>
   <nav className="st-sidebar-nav" aria-label="App navigation">{NAV.map(g=><div key={g.group}><div className="st-nav-group">{!collapsed?g.group:'·'}</div>{g.items.map(item=>{const Icon=item.icon;const selected=item.path==='/app'?path==='/app':path.startsWith(item.path);return <button className={'st-nav-link'+(selected?' st-nav-active':'')} key={item.path} onClick={()=>{go(item.path);setMobileOpen(false)}} title={collapsed?item.label:undefined}><Icon size={18}/>{!collapsed&&<span>{item.label}</span>}{selected&&!collapsed&&<span className="st-nav-active-dot"/>}</button>})}</div>)}</nav>
   <div className="st-sidebar-bottom">{!collapsed&&<div className="st-sidebar-help"><Sparkles size={20}/><strong>Have an idea?</strong><p>You can start with a question. Turn it into your first project.</p><button onClick={()=>go('/app/build')}>Start building <ArrowRight size={15}/></button></div>}
   <button className="st-nav-link" onClick={()=>go('/')} title="Back to website"><House size={18}/>{!collapsed&&<span>Back to website</span>}</button></div>
 </aside>{mobileOpen&&<button className="st-sidebar-backdrop" aria-label="Close menu" onClick={()=>setMobileOpen(false)}/>}</>;
}
function Shell({path,go,completed,setCompleted,joined,setJoined,projects,setProjects}){
 const [collapsed,setCollapsed]=useState(false),[mobileOpen,setMobileOpen]=useState(false),[searchOpen,setSearchOpen]=useState(false),[term,setTerm]=useState(''),[profileOpen,setProfileOpen]=useState(false);
 const segments=path.split('/').filter(Boolean);const section=segments[1]||'overview';const id=segments[2];const isEdit=segments[3]==='edit';
 const title=section==='learn'?'Learn':section==='hackathons'?'Mini-hackathons':section==='build'?'Start a project':section==='projects'?'My projects':section==='progress'?'Progress':'Overview';
 const results=useMemo(()=>{
  const q=term.trim().toLowerCase();if(!q)return [];
  return [
   ...lessons.filter(l=>(l.title+' '+l.description).toLowerCase().includes(q)).map(l=>({label:l.title,type:'Lesson',path:'/app/learn/'+l.id})),
   ...challenges.filter(c=>(c.title+' '+c.description).toLowerCase().includes(q)).map(c=>({label:c.title,type:'Challenge',path:'/app/hackathons/'+c.id})),
   ...projects.filter(p=>(p.title+' '+p.problem).toLowerCase().includes(q)).map(p=>({label:p.title,type:'Project',path:'/app/projects/'+p.id}))
  ].slice(0,8);
 },[term,projects]);
 useEffect(()=>{
  const handler=e=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();setSearchOpen(true)}if(e.key==='Escape'){setSearchOpen(false);setProfileOpen(false)}};
  window.addEventListener('keydown',handler);return()=>window.removeEventListener('keydown',handler);
 },[]);
 const visit=target=>{setMobileOpen(false);setSearchOpen(false);setProfileOpen(false);setTerm('');go(target)};
 const create=project=>setProjects(prev=>[project,...prev.filter(p=>p.id!==project.id)]);
 const mark=id=>setCompleted(prev=>prev.includes(id)?prev:[...prev,id]);
 const join=id=>setJoined(prev=>prev.includes(id)?prev:[...prev,id]);
 const remove=id=>setProjects(prev=>prev.filter(p=>p.id!==id));
 const selectedLesson=lessons.find(l=>l.id===id),selectedChallenge=challenges.find(c=>c.id===id),selectedProject=projects.find(p=>p.id===id);
 let view;
 if(section==='overview')view=<Overview completed={completed} joined={joined} projects={projects} go={visit}/>;
 else if(section==='learn')view=selectedLesson?<Lesson lesson={selectedLesson} completed={completed.includes(id)} onComplete={mark} go={visit}/>:<Learn completed={completed} go={visit}/>;
 else if(section==='hackathons')view=selectedChallenge?<Challenge challenge={selectedChallenge} joined={joined.includes(id)} onJoin={join} go={visit}/>:<Hackathons joined={joined} go={visit}/>;
 else if(section==='build')view=<ProjectForm go={visit} onSave={create}/>;
 else if(section==='projects')view=selectedProject?(isEdit?<ProjectForm key={id} existing={selectedProject} go={visit} onSave={create}/>:<ProjectDetail project={selectedProject} go={visit}/>):<Projects projects={projects} onRemove={remove} go={visit}/>;
 else if(section==='progress')view=<Progress completed={completed} joined={joined} projects={projects} go={visit}/>;
 else view=<Overview completed={completed} joined={joined} projects={projects} go={visit}/>;
 return <div className={'studio-app'+(collapsed?' st-collapsed':'')}>
   <Sidebar path={path} go={visit} collapsed={collapsed} setCollapsed={setCollapsed} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen}/>
   <div className="st-content-frame"><header className="st-topbar"><div className="st-topbar-left"><button className="st-mobile-menu" aria-label="Open menu" onClick={()=>setMobileOpen(true)}><Menu size={20}/></button><div className="st-breadcrumb"><span>Workspace</span><ChevronRight size={14}/><strong>{title}</strong></div></div><div className="st-topbar-right"><button className="st-top-search" onClick={()=>setSearchOpen(true)}><Search size={17}/><span>Search anything...</span><kbd>⌘ K</kbd></button><button className="st-icon-button st-search-mobile" aria-label="Search" onClick={()=>setSearchOpen(true)}><Search size={19}/></button><button className="st-icon-button" aria-label="About this preview" onClick={()=>setProfileOpen(!profileOpen)}><CircleHelp size={19}/></button><div className="st-avatar-wrap"><button className="st-avatar" aria-label="Profile details" onClick={()=>setProfileOpen(!profileOpen)}><UserRound size={17}/></button>{profileOpen&&<div className="st-profile-menu"><strong>Welcome, explorer</strong><p>This preview uses browser-local progress and projects. No account or cloud sync is connected.</p><button onClick={()=>setProfileOpen(false)}>Got it <Check size={14}/></button></div>}</div></div></header>
   <main className="st-main">{view}</main><footer className="st-footer"><span>AI Lab · learning workspace</span><span>Early preview · browser-local data</span></footer></div>
   {searchOpen&&<div className="st-search-backdrop" onClick={()=>setSearchOpen(false)}><div className="st-search-dialog" role="dialog" aria-modal="true" aria-label="Search workspace" onClick={e=>e.stopPropagation()}><div className="st-search-dialog-top"><Search size={20}/><input autoFocus value={term} onChange={e=>setTerm(e.target.value)} placeholder="Find lessons, challenges, projects…" aria-label="Search workspace"/><button onClick={()=>setSearchOpen(false)} aria-label="Close search"><X size={18}/></button></div><div className="st-search-hits">{term.trim()?results.length?results.map(r=><button key={r.path} onClick={()=>visit(r.path)}><span><Search size={16}/>{r.label}</span><Tag>{r.type}</Tag></button>):<div className="st-search-empty">No matching results</div>:<div className="st-search-empty"><Sparkles size={20}/> Search your learning workspace</div>}</div><div className="st-search-hint">Tip: Press Esc to close</div></div></div>}
 </div>;
}
export default function App(){
 const [path,go]=usePath();
 const [completed,setCompleted]=useStored('ailab_lessons_v1',[]);
 const [joined,setJoined]=useStored('ailab_challenges_v1',[]);
 const [projects,setProjects]=useStored('ailab_projects_v1',[]);
 return path.startsWith('/app')?<Shell path={path} go={go} completed={completed} setCompleted={setCompleted} joined={joined} setJoined={setJoined} projects={projects} setProjects={setProjects}/>:<Nexacore/>;
}