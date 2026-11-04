import React,{useState,useEffect,useMemo} from "react";
import {
 ArrowRight,ArrowUpRight,ArrowLeft,Check,CheckCircle2,ChevronRight,ChevronDown,Compass,House,Blocks,UserRound,
 Trophy,Wallet,BookOpen,Search,Clock3,Building2,Sparkles,Plus,Save,Send,PanelRightClose,
 Download,Copy,ExternalLink,Menu,X,Globe2,ShieldCheck,HeartPulse,Clapperboard,Code2,
 ChartNoAxesCombined,Lightbulb,Play,FileText,RefreshCw,Eye,MessageSquare,Lock,
 BriefcaseBusiness,Target,CalendarDays,Users,Info,SlidersHorizontal,CloudOff,
 CircleCheck,RotateCcw,Trash2,ImagePlus,BarChart3,AlertCircle,Link2,FolderOpen,Star
} from "lucide-react";
import {Brand,BrandMark} from "./FhiloBrand";
import {industries,opportunities,lessons,blankProfile,newProject,formatDate} from "./fhilo-data";
import "./fhilo.css";

const ICONS={Trophy,Clapperboard,HeartPulse,Code2,ChartNoAxesCombined,Globe2};
function useStored(key,initial){
 const [value,set]=useState(()=>{try{
  const v=localStorage.getItem(key);if(v)return JSON.parse(v);
  // One-way compatibility with the original AI Lab browser-only prototype.
  if(key==="fhilo_lessons_v1")return JSON.parse(localStorage.getItem("ailab_lessons_v1")||"[]");
  if(key==="fhilo_projects_v1"){
   const oldProjects=JSON.parse(localStorage.getItem("ailab_projects_v1")||"[]");
   if(Array.isArray(oldProjects)&&oldProjects.length)return oldProjects.map(p=>({
    ...newProject( opportunities.find(o=>o.id===p.challengeId)||null,"create"),
    id:String(p.id),title:p.title,problem:p.problem||"",solution:p.solution||"",
    status:"draft",startedAt:p.created||new Date().toISOString(),updatedAt:p.updated||p.created||new Date().toISOString(),
    opportunityId:p.challengeId||null,notes:"Imported from the original AI Lab prototype · "+(p.stage||"Idea")
   }));
  }
  return initial;
 }catch{return initial;}});
 useEffect(()=>{const id=setTimeout(()=>{try{localStorage.setItem(key,JSON.stringify(value));}catch{}},180);return()=>clearTimeout(id);},[key,value]);
 return [value,set];
}
function useRoute(){
 const now=()=>window.location.pathname.replace(/\/+$/,"")||"/";
 const [path,setPath]=useState(now);
 useEffect(()=>{const pop=()=>setPath(now());window.addEventListener("popstate",pop);return()=>window.removeEventListener("popstate",pop);},[]);
 const go=(p)=>{window.history.pushState({}, "",p);setPath(now());window.scrollTo(0,0);};
 return [path,go];
}
function A({to,go,children,className="",...props}){
 return <a href={to} className={className} onClick={e=>{if(e.button===0&&!e.ctrlKey&&!e.shiftKey&&!e.metaKey&&!e.altKey){e.preventDefault();go(to);}}} {...props}>{children}</a>;
}
function Button({children,onClick,icon:Icon=ArrowRight,variant="",disabled=false,type="button",className=""}){
 return <button type={type} className={"f-btn "+variant+" "+className} disabled={disabled} onClick={onClick}>{children}{Icon&&<Icon size={17}/>}</button>;
}
function Badge({children,tone=""}){return <span className={"f-badge "+tone}>{children}</span>;}
function Empty({icon:Icon=Sparkles,title,text,action}){return <div className="f-empty"><span className="f-iconbox"><Icon size={24}/></span><h3>{title}</h3><p>{text}</p>{action}</div>;}
function TagIcon({name,size=18}){const Icon=ICONS[name]||Sparkles;return <Icon size={size}/>;}
function SectionHead({eyebrow,title,text,action}){return <div className="f-section-head"><div><div className="f-eyebrow">{eyebrow}</div><h1>{title}</h1>{text&&<p>{text}</p>}</div>{action&&<div>{action}</div>}</div>;}
function OpCard({item,go,compact=false}){
 const ind=industries.find(x=>x.id===item.industry);
 return <A to={"/app/opportunities/"+item.id} go={go} className={"f-opp "+(compact?"compact":"")}>
  <div className="f-opp-img" style={{backgroundImage:"url("+item.image+")"}}><span className="f-img-tag">{ind?.name||"Community"}</span></div>
  <div className="f-opp-body"><div className="f-opp-top"><Badge>{item.type||"Challenge"}</Badge><span className="f-opp-time"><Clock3 size={13}/>{item.commitment||"Flexible"}</span></div>
  <h3>{item.title}</h3><p>{item.description}</p><div className="f-opp-footer"><span><span className="f-dot"/> {item.funded?"Verified funded":"Free practice"}</span><ArrowUpRight size={18}/></div></div>
 </A>;
}
function AppShell({path,go,profile,children}){
 const [mobile,setMobile]=useState(false);
 const current=path.startsWith("/app/studio")?"/app/studio":path.startsWith("/app/opportunities")?"/app/explore":path.startsWith("/app/learn")?"/app/explore":path;
 const nav=[{path:"/app",title:"Home",icon:House},{path:"/app/explore",title:"Explore",icon:Compass},{path:"/app/studio",title:"Studio",icon:Blocks},{path:"/app/projects",title:"My projects",icon:FolderOpen}];
 const personal=[{path:"/app/profile",title:"My profile",icon:UserRound},{path:"/app/rewards",title:"Rewards",icon:Wallet}];
 const render=(list)=><>{list.map(it=><A key={it.path} to={it.path} go={x=>{setMobile(false);go(x);}} className={"f-navlink "+(current===it.path?"active":"")}><it.icon size={19}/><span>{it.title}</span>{current===it.path&&<span className="f-active-mark"/>}</A>)}</>;
 return <div className="f-app">
  <aside className={"f-sidebar "+(mobile?"show":"")}>
   <A to="/" go={go} className="f-sidebar-logo"><Brand/></A>
   <button className="f-sideclose" onClick={()=>setMobile(false)} aria-label="Close navigation"><X size={20}/></button>
   <div className="f-sidebar-group"><span className="f-navlabel">WORKSPACE</span>{render(nav)}</div>
   <div className="f-sidebar-group"><span className="f-navlabel">YOUR ACCOUNT</span>{render(personal)}</div>
   <div className="f-side-bottom">
    <div className="f-side-sofia"><span className="f-sofia-mark"><Sparkles size={18}/></span><b>Meet Sofia</b><p>Get help understanding a challenge and building your idea.</p><button onClick={()=>go("/app/studio")}>Open Studio <ArrowUpRight size={15}/></button></div>
    <A to="/organisations" go={go} className="f-side-org"><Building2 size={17}/> For organisations <ArrowUpRight size={15}/></A>
   </div>
  </aside>
  {mobile&&<button aria-label="Close navigation" className="f-dim" onClick={()=>setMobile(false)}/>}
  <div className="f-app-main">
   <header className="f-topbar"><button onClick={()=>setMobile(true)} className="f-mobile-trigger" aria-label="Open menu"><Menu size={22}/></button><div className="f-breadcrumb">fhilo <ChevronRight size={15}/> <span>{path.startsWith("/app/studio")?"Studio":path.startsWith("/app/opportunities")?"Opportunity":path.split("/").filter(Boolean).at(-1)||"Home"}</span></div>
    <div className="f-top-right"><span className="f-savedlabel"><CloudOff size={14}/> Device preview</span><A to="/app/profile" go={go} className="f-avatar">{profile?.name?profile.name.slice(0,1).toUpperCase():"F"}</A></div>
   </header>
   <main className="f-page">{children}</main>
   <footer className="f-app-footer">Fhilo preview · Your work is saved in this browser only. <A to="/organisations" go={go}>For organisations</A></footer>
  </div>
  <nav className="f-bottomnav" aria-label="Mobile navigation">{nav.slice(0,3).concat(personal.slice(0,1)).map(it=><A to={it.path} go={go} key={it.path} className={current===it.path?"active":""}><it.icon size={20}/><span>{it.title}</span></A>)}</nav>
 </div>;
}
function WelcomeModal({profile,setProfile,onClose}){
 const [name,setName]=useState(profile.name||"");
 const [selected,setSelected]=useState(profile.interests||[]);
 const [experience,setExperience]=useState(profile.experience||"Just starting");
 const toggle=(id)=>setSelected(x=>x.includes(id)?x.filter(y=>y!==id):x.concat(id));
 return <div className="f-modal-backdrop"><section className="f-modal" role="dialog" aria-modal="true" aria-labelledby="onboard-title">
  <div className="f-modal-top"><Brand size={31}/><button onClick={onClose} aria-label="Close"><X size={21}/></button></div>
  <span className="f-eyebrow">YOUR STARTING POINT</span><h2 id="onboard-title">Welcome to Fhilo. There's a place for you here.</h2>
  <p>No experience is required. Tell us what interests you so your workspace starts with relevant challenges.</p>
  <label className="f-field"><span>What should we call you?</span><input autoFocus value={name} onChange={e=>setName(e.target.value)} placeholder="Your first name"/></label>
  <span className="f-field-label">What are you curious about?</span>
  <div className="f-interest-grid">{industries.map(i=><button className={selected.includes(i.id)?"selected":""} key={i.id} onClick={()=>toggle(i.id)}><TagIcon name={i.icon} size={18}/>{i.name}{selected.includes(i.id)&&<Check size={16}/>}</button>)}</div>
  <label className="f-field"><span>Where are you starting?</span><select value={experience} onChange={e=>setExperience(e.target.value)}><option>Just starting</option><option>I've tried AI before</option><option>I already build projects</option></select></label>
  <div className="f-onboard-actions"><button className="f-text-button" onClick={onClose}>Explore first</button><Button onClick={()=>{setProfile(p=>({...p,name:name.trim().slice(0,50),interests:selected,experience}));onClose();}} disabled={!name.trim()}>Enter my workspace</Button></div>
 </section></div>;
}
function Home({profile,projects,lessonsDone,go,create}){
 const recent=[...projects].sort((a,b)=>(b.updatedAt||"").localeCompare(a.updatedAt||""))[0];
 const recommended=opportunities.filter(x=>!profile.interests?.length||profile.interests.includes(x.industry));
 const list=(recommended.length?recommended:opportunities).slice(0,3);
 return <div className="f-content">
  <div className="f-home-hello"><span className="f-eyebrow">YOUR SPACE TO GROW</span><h1>{profile.name?"Welcome back, "+profile.name+".":"Your journey starts here."}</h1><p>Discover something. Build something. Become something.</p></div>
  {recent?<div className="f-continue"><div><span className="f-continue-label"><Blocks size={15}/> CONTINUE BUILDING</span><h2>{recent.title}</h2><p>{recent.status==="submitted"?"Your practice submission is saved. You can keep refining your project.":"Your idea is taking shape. Keep building right where you left off."}</p><div className="f-continue-meta">Last edited {formatDate(recent.updatedAt)} · {recent.mode==="create"?"Create":recent.mode==="code"?"Build":"Investigate"} mode</div><Button onClick={()=>go("/app/studio/"+recent.id)} variant="white">Open Studio</Button></div><div className="f-continue-art"><BrandMark size={190}/></div></div>:
  <div className="f-continue"><div><span className="f-continue-label"><Sparkles size={15}/> YOUR FIRST STEP</span><h2>Start with curiosity.<br/>Build with purpose.</h2><p>No coding or experience needed. Pick something you care about and we'll guide you from your first idea.</p><Button onClick={()=>go("/app/explore")} variant="white">Find my first challenge</Button></div><div className="f-continue-art"><BrandMark size={190}/></div></div>}
  <div className="f-home-grid">
   <section className="f-panel f-home-start"><div className="f-panel-heading"><h2>Make something today</h2><p>Start your own project, with or without a challenge.</p></div><div className="f-home-actions"><button onClick={()=>create(null,"create")}><span><Lightbulb size={22}/></span><div><b>Start an idea</b><small>Build a plan and explore what's possible</small></div><ArrowUpRight/></button><button onClick={()=>create(null,"code")}><span><Code2 size={22}/></span><div><b>Build an interactive prototype</b><small>Write and preview a real web project</small></div><ArrowUpRight/></button></div></section>
   <section className="f-panel f-home-sofia"><div className="f-sofia-circle"><Sparkles size={27}/></div><h2>Need a starting point?</h2><p>Sofia helps you think through an idea, understand unfamiliar concepts and find your next step.</p><Button variant="outline" onClick={()=>go("/app/studio")} icon={ArrowRight}>Explore Studio</Button></section>
  </div>
  <div className="f-rowheading"><div><h2>Opportunities for you</h2><p>Free practice challenges. Built for the curious.</p></div><A to="/app/explore" go={go}>Explore all <ArrowRight size={17}/></A></div>
  <div className="f-opps-grid">{list.map(c=><OpCard key={c.id} item={c} go={go}/>)}</div>
  <div className="f-home-lower"><div className="f-panel"><div className="f-panel-heading"><h2>Your journey so far</h2><p>Every small step counts.</p></div><div className="f-progress-stats"><div><strong>{projects.length}</strong><span>Projects started</span></div><div><strong>{projects.filter(x=>x.status==="submitted").length}</strong><span>Practice submissions</span></div><div><strong>{lessonsDone.length}</strong><span>Lessons completed</span></div></div></div><div className="f-panel f-home-affirmation"><span className="f-iconbox"><HeartPulse size={21}/></span><h3>Everyone starts somewhere.</h3><p>What matters isn't where you begin. It's what you're curious enough to try next.</p></div></div>
 </div>;
}
function Explore({go}){
 const initial=(()=>{try{return new URLSearchParams(window.location.search).get("industry")||"all";}catch{return "all";}})();
 const [industry,setIndustry]=useState(initial),[search,setSearch]=useState("");
 const filtered=opportunities.filter(o=>(industry==="all"||o.industry===industry)&&(o.title+" "+o.description+" "+o.brief+" "+o.category).toLowerCase().includes(search.toLowerCase()));
 return <div className="f-content">
  <SectionHead eyebrow="DISCOVER WHAT'S POSSIBLE" title="Explore opportunities" text="Find something that interests you. Every practice challenge has a beginner-friendly starting point."/>
  <div className="f-discover-banner"><div><span className="f-eyebrow">YOUR CURIOSITY IS ENOUGH</span><h2>There is no perfect starting point.</h2><p>Explore, experiment and build real work with Sofia by your side.</p></div><Compass size={76}/></div>
  <div className="f-explore-tools"><label className="f-search"><Search size={19}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search opportunities or industries..." aria-label="Search opportunities"/></label><span>{filtered.length} opportunities</span></div>
  <div className="f-filterchips"><button className={industry==="all"?"selected":""} onClick={()=>setIndustry("all")}>All industries</button>{industries.map(i=><button key={i.id} className={industry===i.id?"selected":""} onClick={()=>setIndustry(i.id)}>{i.name}</button>)}</div>
  <div className="f-disclaimer"><Info size={17}/> These are free, self-paced practice briefs. They are not sponsored competitions and do not offer cash prizes.</div>
  {filtered.length?<div className="f-opps-grid">{filtered.map(o=><OpCard key={o.id} item={o} go={go}/>)}</div>:<Empty icon={Search} title="No matching opportunities" text="Try a different industry or search term." action={<Button onClick={()=>{setSearch("");setIndustry("all");}}>See all challenges</Button>}/>}
  <div className="f-callout"><span><Sparkles size={21}/></span><div><h3>Prefer to make your own idea?</h3><p>You can create a project in Studio without joining a challenge.</p></div><Button variant="outline" onClick={()=>go("/app/studio")}>Open Studio</Button></div>
 </div>;
}
function OpportunityDetail({item,go,create,joined,onJoin}){
 if(!item)return <Empty title="Opportunity not found" text="This opportunity is not available." action={<Button onClick={()=>go("/app/explore")}>Browse opportunities</Button>}/>;
 return <div className="f-content">
  <button className="f-back" onClick={()=>go("/app/explore")}><ArrowLeft size={16}/> All opportunities</button>
  <div className="f-detail-hero"><div className="f-detail-cover" style={{backgroundImage:"url("+item.image+")"}}/><div className="f-detail-main"><Badge>{item.category}</Badge><h1>{item.title}</h1><p>{item.description}</p><div className="f-detail-chips"><Badge tone="green">Beginner friendly</Badge><Badge>{item.commitment}</Badge><Badge>Free · Self-paced</Badge></div></div></div>
  <div className="f-detail-layout"><div className="f-detail-column">
   <div className="f-panel"><h2>The challenge</h2><p>{item.brief}</p><blockquote>{item.prompt}</blockquote><h3>What could you explore?</h3><div className="f-idea-chips">{item.ideas.map(x=><span key={x}>{x}</span>)}</div></div>
   <div className="f-panel"><h2>How you'll build it</h2><p>No experience needed. These are starting points, not strict rules.</p><div className="f-timeline">{(item.steps||[]).map((s,i)=><div key={s}><span>{i+1}</span><p>{s}</p></div>)}</div></div>
   <div className="f-panel"><h2>How you'll reflect on your work</h2><p>Use these prompts to evaluate your project. No external judges are reviewing these practice briefs.</p><div className="f-criteria">{item.rubric.map((x,i)=><div key={i}><CheckCircle2 size={18}/>{x}</div>)}</div></div>
  </div><aside className="f-detail-aside"><div className="f-panel"><div className="f-aside-top"><Trophy size={24}/><span>OPEN PRACTICE</span></div><h2>Ready to give it a try?</h2><p>Everything you need to get started lives in Fhilo Studio.</p><Button className="full" onClick={()=>create(item,"create")}>Guide me through</Button><Button variant="outline full" icon={Code2} onClick={()=>create(item,"code")}>I'm ready to build</Button><div className="f-aside-split"><span>Created by</span><b>Fhilo practice library</b></div><div className="f-aside-split"><span>Prize pool</span><b>None · Practice only</b></div><div className="f-aside-split"><span>Eligibility</span><b>Open for learning</b></div></div></aside></div>
 </div>;
}
function Projects({projects,go,create,remove}){
 const [search,setSearch]=useState("");
 const filtered=projects.filter(x=>(x.title+" "+x.problem+" "+x.solution).toLowerCase().includes(search.toLowerCase())).sort((a,b)=>(b.updatedAt||"").localeCompare(a.updatedAt||""));
 return <div className="f-content"><SectionHead eyebrow="YOUR WORK" title="My projects" text="Every idea, experiment and prototype you've started." action={<Button onClick={()=>create() } icon={Plus}>New project</Button>}/>
 <div className="f-explore-tools"><label className="f-search"><Search size={18}/><input placeholder="Find a project..." value={search} onChange={e=>setSearch(e.target.value)}/></label><span>{filtered.length} projects</span></div>
 {filtered.length?<div className="f-project-grid">{filtered.map(p=><div className="f-project-card" key={p.id}><div className="f-project-card-top"><span className="f-iconbox">{p.mode==="code"?<Code2/>:p.mode==="investigate"?<BarChart3/>:<Lightbulb/>}</span><Badge>{p.status==="submitted"?"Practice submission":"Draft"}</Badge></div><h3>{p.title||"Untitled project"}</h3><p>{p.solution||p.problem||"Your next idea is waiting."}</p><div className="f-project-foot"><small>Updated {formatDate(p.updatedAt)}</small><div><button aria-label={"Delete "+p.title} title="Delete project" onClick={()=>{if(window.confirm("Delete this project from this browser?"))remove(p.id);}}><Trash2 size={16}/></button><Button onClick={()=>go("/app/studio/"+p.id)} variant="outline" icon={ArrowUpRight}>Open</Button></div></div></div>)}</div>:<Empty icon={FolderOpen} title="Nothing here yet" text="Start a new project and we'll keep your work here on this device." action={<Button onClick={()=>create()}>Create a project</Button>}/>}
 </div>;
}
function Profile({profile,setProfile,projects,lessonsDone,go}){
 const [editing,setEditing]=useState(false);
 const [draft,setDraft]=useState(profile);
 useEffect(()=>setDraft(profile),[profile]);
 const toggle=id=>setDraft(x=>({...x,interests:x.interests.includes(id)?x.interests.filter(a=>a!==id):x.interests.concat(id)}));
 const exportData=()=>{const blob=new Blob([JSON.stringify({profile,projects},null,2)],{type:"application/json"});const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="fhilo-portfolio.json";a.click();URL.revokeObjectURL(a.href);};
 return <div className="f-content"><SectionHead eyebrow="YOUR STORY" title="My profile" text="A record of what you're exploring, building and learning." action={<Button variant="outline" icon={editing?Check:UserRound} onClick={()=>{if(editing)setProfile(draft);setEditing(!editing);}}>{editing?"Save profile":"Edit profile"}</Button>}/>
 <div className="f-profile-hero"><div className="f-profile-avatar">{profile.name?.slice(0,1).toUpperCase()||"F"}</div><div><h2>{profile.name||"Fhilo Explorer"}</h2><p>{profile.headline||"Curious about what's possible."}</p><div className="f-profile-tags"><Badge>Learning & building</Badge><Badge tone="green">Private profile</Badge></div></div></div>
 {editing&&<div className="f-panel f-editprofile"><h2>About you</h2><label className="f-field"><span>Name</span><input value={draft.name} onChange={e=>setDraft({...draft,name:e.target.value.slice(0,60)})}/></label><label className="f-field"><span>Headline</span><input value={draft.headline} onChange={e=>setDraft({...draft,headline:e.target.value.slice(0,110)})} placeholder="What do you want to explore?"/></label><label className="f-field"><span>Your story</span><textarea rows={4} value={draft.bio} onChange={e=>setDraft({...draft,bio:e.target.value.slice(0,1200)})} placeholder="Tell us what interests you..."/></label><div className="f-field-label">Interested industries</div><div className="f-interest-grid">{industries.map(i=><button key={i.id} className={draft.interests.includes(i.id)?"selected":""} onClick={()=>toggle(i.id)}><TagIcon name={i.icon}/>{i.name}</button>)}</div><p className="f-fineprint">Profile information is currently stored only in this browser and isn't publicly discoverable.</p></div>}
 <div className="f-profile-grid"><section className="f-panel"><h2>Your journey</h2><div className="f-profile-stats"><div><strong>{projects.length}</strong><span>Projects</span></div><div><strong>{projects.filter(x=>x.status==="submitted").length}</strong><span>Practice submissions</span></div><div><strong>{lessonsDone.length}</strong><span>Lessons</span></div></div><h3>Interests</h3><div className="f-idea-chips">{profile.interests.length?profile.interests.map(id=><span key={id}>{industries.find(i=>i.id===id)?.name}</span>):<p>Add your interests to personalise opportunities.</p>}</div></section>
 <section className="f-panel"><h2>Achievements</h2><div className="f-achievement"><span className="f-iconbox"><Sparkles size={22}/></span><div><b>Curious Explorer</b><p>Every learning journey begins with curiosity.</p></div></div><p className="f-fineprint">Verified skill credentials and awards will appear here when assessments and issuing are active. We won't invent skill scores.</p></section></div>
 <div className="f-rowheading"><div><h2>Portfolio</h2><p>Your projects make your progress visible.</p></div><button className="f-inline" onClick={exportData}><Download size={16}/> Export my work</button></div>
 {projects.length?<div className="f-project-grid">{projects.slice(0,4).map(p=><button key={p.id} className="f-port-card" onClick={()=>go("/app/studio/"+p.id)}><Blocks size={22}/><strong>{p.title}</strong><small>{p.mode==="code"?"Web prototype":p.mode==="investigate"?"Investigation":"Concept"} · {formatDate(p.updatedAt)}</small><ArrowUpRight size={17}/></button>)}</div>:<Empty icon={Blocks} title="Your first project will appear here" text="Create something in Studio, then come back and see your progress." action={<Button onClick={()=>go("/app/explore")}>Explore opportunities</Button>}/>}
 </div>;
}
function Rewards(){return <div className="f-content"><SectionHead eyebrow="RECOGNITION" title="Rewards & payouts" text="A future home for verified awards and eligible reward claims."/>
 <div className="f-rewards-layout"><div className="f-rewards-hero"><span className="f-eyebrow">VERIFIED AWARDS</span><h2>0 <small>USDC</small></h2><p>No monetary awards have been issued. Prize payouts are not yet active.</p><Badge>Wallet integration not connected</Badge></div><div className="f-panel"><span className="f-iconbox"><Wallet size={25}/></span><h2>Your payout preferences</h2><p>In the future, eligible winners will be able to connect a supported wallet or choose an available local payment option.</p><button disabled className="f-btn outline full">Wallet setup unavailable <Lock size={17}/></button><small>Never share your wallet recovery phrase or private keys. Do not send funds to claim a prize.</small></div></div>
 <div className="f-panel f-rewards-info"><h2>How rewards will work</h2><div className="f-steps-grid">{[{n:"01",title:"Take part",text:"Enter an eligible, verified funded opportunity."},{n:"02",title:"Show your work",text:"Submit your project for published, skill-based judging."},{n:"03",title:"Receive an award",text:"Verified winners can claim a reward where legally supported."}].map(x=><div key={x.n}><span>{x.n}</span><h3>{x.title}</h3><p>{x.text}</p></div>)}</div></div>
 <p className="f-fineprint">Fhilo does not currently offer live prize pools, wallet custody or stablecoin transfers. Availability will depend on confirmed funding, approved payment partners, verification and local laws.</p>
 </div>;}
function Lessons({done,setDone,go,id}){
 const lesson=lessons.find(x=>x.id===id);
 if(lesson)return <div className="f-content"><button className="f-back" onClick={()=>go("/app/learn")}><ArrowLeft size={16}/> Back to lessons</button><div className="f-lesson-hero"><Badge>{lesson.tag}</Badge><h1>{lesson.title}</h1><p>{lesson.overview}</p><span><Clock3 size={16}/> {lesson.minutes} minutes · {lesson.level}</span></div><div className="f-detail-layout"><section className="f-panel"><h2>Let's explore</h2><div className="f-timeline">{lesson.steps.map((s,i)=><div key={s.title}><span>{i+1}</span><div><h3>{s.title}</h3><p>{s.body}</p></div></div>)}</div><div className="f-promptbox"><b>Try it yourself</b><p>{lesson.challenge}</p></div><Button onClick={()=>setDone(a=>a.includes(id)?a:a.concat(id))} disabled={done.includes(id)} icon={CheckCircle2}>{done.includes(id)?"Completed":"Mark this lesson complete"}</Button></section><aside className="f-panel"><Sparkles color="#2563eb"/><h3>Learn by doing</h3><p>Apply your new knowledge to a project when you're ready.</p><Button variant="outline" onClick={()=>go("/app/explore")}>Explore challenges</Button></aside></div></div>;
 return <div className="f-content"><SectionHead eyebrow="BUILD YOUR FOUNDATIONS" title="Short lessons. Real skills." text="No prior experience needed. Explore these beginner-friendly lessons before or alongside a challenge."/>
 <div className="f-lessons-grid">{lessons.map(l=><button key={l.id} onClick={()=>go("/app/learn/"+l.id)} className="f-lesson-card"><span className="f-iconbox"><BookOpen size={22}/></span><Badge>{done.includes(l.id)?"Completed":l.tag}</Badge><h3>{l.title}</h3><p>{l.description}</p><div><Clock3 size={15}/> {l.minutes} min <ArrowUpRight size={18}/></div></button>)}</div></div>;
}

export {useStored,useRoute,AppShell,Home,Explore,OpportunityDetail,Projects,Profile,Rewards,Lessons,WelcomeModal};
