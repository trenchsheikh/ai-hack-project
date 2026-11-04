import React,{useState,useMemo,useEffect} from "react";
import {ArrowLeft,ArrowRight,ArrowUpRight,Check,CheckCircle2,ChevronDown,Code2,Lightbulb,BarChart3,Sparkles,Send,Save,Download,Play,Eye,RefreshCw,RotateCcw,BookOpen,Clock3,FileText,Info,AlertCircle,Maximize2,PanelRightClose,PanelRightOpen,Copy,MessageSquare,FolderOpen,Trophy,Plus,ShieldCheck,Trash2} from "lucide-react";
import {opportunities,starterHtml,formatDate} from "./fhilo-data";

const modes=[{id:"create",icon:Lightbulb,title:"Create",desc:"Turn your idea into a clear, shareable project."},
 {id:"code",icon:Code2,title:"Build",desc:"Write and preview a working web prototype."},
 {id:"investigate",icon:BarChart3,title:"Investigate",desc:"Explore data and present a reasoned conclusion."}];
function StudioChoice({create,projects,go}){
 return <div className="f-content"><div className="f-section-head"><div><span className="f-eyebrow">FHILO STUDIO</span><h1>What will you make?</h1><p>Everything starts somewhere. Pick a format; you can change your mind later.</p></div></div>
 <div className="f-studio-choices">{modes.map(x=><button className="f-studio-choice" key={x.id} onClick={()=>create(null,x.id)}><span className="f-iconbox"><x.icon size={26}/></span><h2>{x.title}</h2><p>{x.desc}</p><span className="f-choice-cta">Start building <ArrowUpRight size={18}/></span></button>)}</div>
 {projects.length>0&&<section className="f-panel"><div className="f-panel-heading"><h2>Continue something</h2><p>Your projects are saved on this device.</p></div><div className="f-recent-list">{projects.slice().sort((a,b)=>(b.updatedAt||"").localeCompare(a.updatedAt||"")).slice(0,4).map(p=><button key={p.id} onClick={()=>go("/app/studio/"+p.id)}><span className="f-iconbox"><FolderOpen size={19}/></span><span><b>{p.title||"Untitled project"}</b><small>{formatDate(p.updatedAt)}</small></span><ArrowUpRight size={18}/></button>)}</div></section>}
 </div>;
}
function CSV({text}){
 const rows=useMemo(()=>text.trim().split(/\r?\n/).filter(Boolean).slice(0,101).map(line=>line.split(",").map(v=>v.trim())),[text]);
 const header=rows[0]||[];const body=rows.slice(1);const numeric=header.map((h,i)=>{
 const nums=body.map(r=>r[i]).filter(v=>v!==undefined&&String(v).trim()!=="").map(v=>Number(v)).filter(n=>Number.isFinite(n));
 return {name:h,values:nums};
 }).filter(x=>x.values.length>0);
return <div className="f-csv-output">{rows.length>1?<><div className="f-previewstats"><div><b>{rows.length-1}</b><small>Rows previewed</small></div><div><b>{header.length}</b><small>Columns</small></div><div><b>{numeric.length}</b><small>Numeric fields</small></div></div><div className="f-csv-scroll"><table><thead><tr>{header.map((h,i)=><th key={i}>{h}</th>)}</tr></thead><tbody>{body.slice(0,15).map((r,i)=><tr key={i}>{header.map((_,j)=><td key={j}>{r[j]||"—"}</td>)}</tr>)}</tbody></table></div>{numeric.length>0&&<div className="f-numeric"><h4>Quick observations</h4>{numeric.slice(0,3).map(n=><p key={n.name}><b>{n.name}:</b> mean {(n.values.reduce((a,b)=>a+b,0)/n.values.length).toFixed(2)} across {n.values.length} numerical values.</p>)}</div>}</>:<div className="f-empty-preview"><BarChart3 size={27}/><b>Your data preview will appear here.</b><p>Paste a small CSV dataset using the editor to see a table and simple summary.</p></div>}</div>;
}
function practiceGuide(question,project,opportunity){
 const q=question.toLowerCase();
 if(q.includes("idea")||q.includes("start")||q.includes("stuck"))return "Let's begin with one person and one problem. Who experiences the problem, and what do they currently find difficult? Write one sentence in the Problem field; then list two possible solutions. Choose the simplest one you could test.";
 if(q.includes("test")||q.includes("feedback"))return "Find one assumption your project relies on. Think of a small, safe test and a question that could reveal if your idea is useful. Record what you would change if the feedback is negative.";
 if(q.includes("code")||q.includes("build")||q.includes("website"))return "In Build mode, edit the HTML, CSS and JavaScript in the left pane, then select Preview. Begin with one interactive screen. Avoid personal data, external scripts or anything you cannot explain.";
 if(q.includes("data")||q.includes("analyse")||q.includes("analy"))return "Start by checking what each column represents, what is missing and whether you are allowed to use the data. In Investigate mode, paste a small CSV file. Use the summary as a clue, not as proof of a causal relationship.";
 if(q.includes("submit")||q.includes("finish"))return "Before you submit: explain who benefits, show what you created, describe one limitation and state what you would improve next. Save a version first so you can return to your earlier work.";
 if(q.includes("ai")||q.includes("prompt"))return "Try a useful prompt structure: objective, audience, context, constraints and desired format. Check the output yourself. The purpose is to improve your judgment, not to accept every AI answer.";
 return "You're working on "+(project.title||"a project")+(opportunity?" for the challenge ‘"+opportunity.title+"’":"")+". Try describing one small, concrete next step. Who is this for, what would it do, and how would you know if it helped? You can also ask me about ideas, building, testing, data or submitting.";
}
function Sofia({project,opportunity,onUpdate}){
 const [messages,setMessages]=useState([{role:"assistant",text:"Hi, I'm Sofia. Let's turn curiosity into something real. Tell me what you're trying to make, or choose a starting point below.",local:true}]);
 const [input,setInput]=useState("");const [loading,setLoading]=useState(false);const [mode,setMode]=useState("guided");
 const suggestions=["Help me start","Give me feedback","How do I test this?"];
 async function ask(value){
  const text=(value||input).trim();if(!text||loading)return;
  const next=messages.concat({role:"user",text});
  setMessages(next);setInput("");setLoading(true);
  try{
   const response=await fetch("/api/sofia",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:text,history:next.slice(-8).map(x=>({role:x.role,content:x.text})),project:{title:project.title,mode:project.mode,problem:project.problem,audience:project.audience,solution:project.solution},opportunity:opportunity?{title:opportunity.title,brief:opportunity.brief,category:opportunity.category}:null})});
   if(!response.ok)throw Error("Sofia live AI is not configured.");
   const json=await response.json();if(!json.reply)throw Error("No AI response");
   setMode("live");setMessages(m=>m.concat({role:"assistant",text:json.reply,local:false}));
  }catch{
   setMode("guided");setMessages(m=>m.concat({role:"assistant",text:practiceGuide(text,project,opportunity),local:true}));
  }finally{setLoading(false);}
 }
 return <aside className="f-sofia-panel"><div className="f-sofia-head"><div className="f-sofia-head-title"><span className="f-sofia-mark"><Sparkles size={19}/></span><div><b>Sofia</b><small>Your learning companion</small></div></div><span className="f-sofia-mode">{mode==="live"?"Live AI":"Guided preview"}</span></div>
 <div className="f-sofia-messages" aria-live="polite">{messages.map((m,i)=><div key={i} className={"f-chat "+m.role}><div>{m.text}</div>{m.local&&m.role==="assistant"&&<small>Guided suggestions · Not live AI</small>}</div>)}{loading&&<div className="f-chat assistant"><div>Thinking about your next step…</div></div>}</div>
 <div className="f-sofia-bottom">{messages.length<=2&&<div className="f-suggestion-list">{suggestions.map(s=><button key={s} onClick={()=>ask(s)}>{s}</button>)}</div>}
 <form onSubmit={e=>{e.preventDefault();ask();}} className="f-sofia-input"><textarea rows={2} placeholder="Ask Sofia about your project..." value={input} maxLength={1500} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();ask();}}}/><button disabled={loading||!input.trim()} aria-label="Send to Sofia"><Send size={18}/></button></form><p>Keep sensitive details out of prompts. Sofia supports your thinking; verify important information.</p></div>
 </aside>;
}
function ProjectPreview({project}){
 const entry=[["The problem",project.problem],["Who it's for",project.audience],["Our idea",project.solution],["Why it matters",project.impact]];
 return <div className="f-concept-preview"><div className="f-concept-title"><span className="f-eyebrow">PROJECT CONCEPT</span><h2>{project.title||"Untitled idea"}</h2><p>{project.solution||"Start filling in your project to see it come to life."}</p></div><div className="f-concept-grid">{entry.map(([label,value])=><div key={label}><small>{label}</small><p>{value||"Your answer will appear here."}</p></div>)}</div><div className="f-concept-foot"><span>Created in Fhilo Studio</span><Sparkles size={21}/></div></div>;
}
function StudioEditor({project,opportunity,update,go,projects,setProjects}){
 const [tab,setTab]=useState("edit");const [sofiaOpen,setSofiaOpen]=useState(true);const [notice,setNotice]=useState("");
 const mode=project.mode||"create";
 const set=(field,value)=>update(project.id,{[field]:value});
 const snapshot=()=>{setProjects(xs=>xs.map(x=>x.id===project.id?{...x,history:(x.history||[]).concat({at:new Date().toISOString(),title:x.title,problem:x.problem,audience:x.audience,solution:x.solution,impact:x.impact,notes:x.notes,html:x.html,csv:x.csv}).slice(-20)}:x));setNotice("Version saved");setTimeout(()=>setNotice(""),3500);};
 const restore=(version)=>{if(!window.confirm("Restore this version? Your current changes will be replaced. Save a version first if needed."))return;update(project.id,{title:version.title,problem:version.problem,audience:version.audience,solution:version.solution,impact:version.impact,notes:version.notes,html:version.html,csv:version.csv});setTab("edit");};
 const exportProject=()=>{const blob=new Blob([JSON.stringify(project,null,2)],{type:"application/json"});const link=document.createElement("a");link.href=URL.createObjectURL(blob);link.download=(project.title||"fhilo-project").replace(/[^a-z0-9]+/gi,"-").toLowerCase()+".json";link.click();URL.revokeObjectURL(link.href);};
 const submission=()=>{if(!project.title?.trim())return setNotice("Give your project a title first.");if(mode==="create"&&(!project.problem.trim()||!project.solution.trim()))return setNotice("Describe the problem and your proposed solution first.");if(!window.confirm("Save this as a completed practice submission? It will not be reviewed by an organisation or entered for a prize."))return;update(project.id,{status:"submitted",submittedAt:new Date().toISOString()});setNotice("Practice submission saved on this device.");};
 const safeHtml=useMemo(()=>{
  const policy="<meta http-equiv=\"Content-Security-Policy\" content=\"default-src 'none'; img-src data:; style-src 'unsafe-inline'; script-src 'unsafe-inline'; font-src data:; connect-src 'none'; frame-src 'none'; form-action 'none'; base-uri 'none'\">";
  const document=project.html||"";
  return /<head[^>]*>/i.test(document)?document.replace(/<head[^>]*>/i,match=>match+policy):("<!doctype html><html><head>"+policy+"</head><body>"+document+"</body></html>");
 },[project.html]);
 const loadFile=e=>{const file=e.target.files?.[0];if(!file)return;if(file.size>150000)return setNotice("Choose a CSV under 150 KB.");file.text().then(value=>set("csv",value.slice(0,150000)));e.target.value="";};
 const readOnlyUrl=null;
 return <div className="f-studio-page">
  <div className="f-studio-top"><div className="f-studio-top-left"><button className="f-iconbutton" onClick={()=>go("/app/projects")} aria-label="Back to projects"><ArrowLeft size={19}/></button><div><span className="f-studio-eyebrow">FHILO STUDIO {opportunity?"· "+opportunity.category:"· PERSONAL PROJECT"}</span><input aria-label="Project title" value={project.title} onChange={e=>set("title",e.target.value.slice(0,140))}/></div><span className="f-save-tag"><CheckCircle2 size={14}/> Local autosave</span></div>
   <div className="f-studio-actions"><button onClick={snapshot} className="f-studio-tool" title="Save version"><Save size={16}/><span>Version</span></button><button onClick={exportProject} className="f-studio-tool" title="Export your project"><Download size={16}/><span>Export</span></button><button onClick={()=>setSofiaOpen(!sofiaOpen)} className="f-studio-tool" aria-label={sofiaOpen?"Hide Sofia":"Show Sofia"}><Sparkles size={17}/><span>{sofiaOpen?"Hide Sofia":"Ask Sofia"}</span></button></div>
  </div>
  <div className="f-studio-body">
   <div className="f-studio-center">
    {opportunity&&<div className="f-studio-brief"><span><Trophy size={16}/> Challenge brief</span><strong>{opportunity.prompt}</strong><button onClick={()=>go("/app/opportunities/"+opportunity.id)}>View details <ArrowUpRight size={15}/></button></div>}
    <div className="f-studio-toolbar"><div className="f-mode-switch">{modes.map(x=><button key={x.id} className={mode===x.id?"selected":""} onClick={()=>update(project.id,{mode:x.id})}><x.icon size={16}/>{x.title}</button>)}</div><div className="f-studio-tabs"><button className={tab==="edit"?"selected":""} onClick={()=>setTab("edit")}>Edit</button><button className={tab==="preview"?"selected":""} onClick={()=>setTab("preview")}>Preview</button><button className={tab==="history"?"selected":""} onClick={()=>setTab("history")}>Versions</button></div></div>
    {tab==="edit"&&<div className="f-studio-editor">
      {mode==="create"&&<div className="f-create-form"><div className="f-studio-intro"><h2>Give your idea shape.</h2><p>Keep your answers simple. You can improve everything as you go.</p></div>
       {[{id:"problem",label:"What problem are you solving?",hint:"Describe one specific difficulty somebody faces.",placeholder:"A local football coach spends hours trying to organise match feedback..."},{id:"audience",label:"Who is this for?",hint:"Imagine one real person you want to help.",placeholder:"Volunteer coaches at grassroots clubs..."},{id:"solution",label:"What's your idea?",hint:"How could AI help, and what would a person remain responsible for?",placeholder:"A tool that helps coaches organise notes and suggest training themes..."},{id:"impact",label:"What difference could it make?",hint:"What would success look like? How would you test it?",placeholder:"Coaches spend less time on admin and more time with players..."},{id:"notes",label:"Sketches, research & next steps",hint:"Add thoughts, feedback and what you'd build next.",placeholder:"Next I want to test it with one volunteer coach..."}].map(f=><label className="f-project-field" key={f.id}><span>{f.label}</span><small>{f.hint}</small><textarea value={project[f.id]||""} onChange={e=>set(f.id,e.target.value.slice(0,10000))} placeholder={f.placeholder} rows={f.id==="notes"?5:3}/></label>)}
       <Button onClick={()=>setTab("preview")} icon={Eye}>See my project</Button>
      </div>}
      {mode==="code"&&<div className="f-code-editor"><div className="f-code-heading"><Code2 size={18}/><b>index.html</b><span>HTML · CSS · JavaScript</span></div><textarea spellCheck={false} aria-label="Project code" value={project.html||""} onChange={e=>set("html",e.target.value.slice(0,200000))}/><div className="f-code-note"><ShieldCheck size={16}/> Live preview runs in an isolated browser frame. External network access is blocked.</div><Button onClick={()=>setTab("preview")} icon={Play}>Run preview</Button></div>}
      {mode==="investigate"&&<div className="f-data-editor"><div className="f-studio-intro"><h2>Explore a question with evidence.</h2><p>Paste a small CSV dataset, inspect the rows and record what you found. Avoid personal or sensitive information.</p></div><label className="f-project-field"><span>Question you're investigating</span><textarea rows={2} value={project.problem} onChange={e=>set("problem",e.target.value)} placeholder="What question does this dataset help answer?"/></label><div className="f-data-upload"><label className="f-btn outline">Upload CSV <input type="file" accept=".csv,text/csv" onChange={loadFile} hidden/></label><span>Local file, up to 150 KB. No server upload.</span></div><label className="f-project-field"><span>Dataset (CSV)</span><textarea className="f-code-textarea" rows={11} value={project.csv||""} onChange={e=>set("csv",e.target.value.slice(0,150000))} placeholder="Month,Participants&#10;Jan,12&#10;Feb,24"/></label><label className="f-project-field"><span>What did you learn?</span><textarea rows={4} value={project.solution||""} onChange={e=>set("solution",e.target.value)} placeholder="Describe patterns, caveats and what you would investigate next..."/></label><Button onClick={()=>setTab("preview")} icon={BarChart3}>Explore results</Button></div>}
    </div>}
    {tab==="preview"&&<div className="f-studio-preview">{mode==="create"?<ProjectPreview project={project}/>:mode==="code"?<><div className="f-preview-bar"><span className="f-preview-dot red"/><span className="f-preview-dot yellow"/><span className="f-preview-dot green"/><span>Sandboxed project preview</span></div><iframe key={project.updatedAt} title="Isolated project preview" sandbox="allow-scripts" referrerPolicy="no-referrer" srcDoc={safeHtml}/></>:<CSV text={project.csv||""}/>}</div>}
    {tab==="history"&&<div className="f-panel f-history"><h2>Saved versions</h2><p>Autosave stores your latest edits. Save a named moment whenever you're about to make a big change.</p><Button onClick={snapshot} icon={Plus}>Save current version</Button>{(project.history||[]).length?<div className="f-version-list">{project.history.slice().reverse().map((v,i)=><div key={i}><div><strong>Version {project.history.length-i}</strong><small>{formatDate(v.at)} · {new Date(v.at).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}</small></div><button onClick={()=>restore(v)}><RotateCcw size={16}/> Restore</button></div>)}</div>:<p className="f-fineprint">No snapshots yet.</p>}</div>}
    <div className="f-studio-submit"><div><strong>{project.status==="submitted"?"Practice submission saved":"Ready to share what you've made?"}</strong><p>{project.status==="submitted"?"You can keep improving this project. Its practice submission stays on this device.":"Review your work and submit it as a personal practice milestone. No judges or prizes are connected."}</p></div><Button onClick={submission} variant={project.status==="submitted"?"outline":""} icon={CheckCircle2}>{project.status==="submitted"?"Update practice submission":"Complete practice"}</Button></div>
    {notice&&<div className="f-notice" role="status">{notice}</div>}
   </div>
   {sofiaOpen&&<Sofia key={project.id} project={project} opportunity={opportunity}/>}
  </div>
 </div>;
}
export default function Studio({projectId,projects,setProjects,create,go,update}){
 if(!projectId)return <StudioChoice projects={projects} create={create} go={go}/>;
 const project=projects.find(p=>p.id===projectId);
 if(!project)return <div className="f-content"><div className="f-empty"><h2>Project not found</h2><p>It may have been deleted or saved in a different browser.</p><button className="f-btn" onClick={()=>go("/app/projects")}>My projects <ArrowRight size={17}/></button></div></div>;
 return <StudioEditor project={project} opportunity={opportunities.find(o=>o.id===project.opportunityId)} projects={projects} setProjects={setProjects} update={update} go={go}/>;
}
