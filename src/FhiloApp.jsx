import React,{useState} from "react";
import {ArrowLeft,Plus,Save,Download,CheckCircle2} from "lucide-react";
import FhiloLanding from "./FhiloLanding";
import Studio from "./FhiloStudio";
import StudioErrorBoundary from "./StudioErrorBoundary";
import {OrganisationsLanding,OrganisationDashboard,OrganisationCreate} from "./FhiloOrg";
import {opportunities,blankProfile,newProject} from "./fhilo-data";
import {useStored,useRoute,AppShell,Home,Explore,OpportunityDetail,Projects,Profile,Rewards,Lessons,WelcomeModal} from "./FhiloAppParts";
import "./fhilo.css";

export default function FhiloApp(){
 const [path,go]=useRoute();
 const [profile,setProfile]=useStored("fhilo_profile_v1",blankProfile);
 const [projects,setProjects]=useStored("fhilo_projects_v1",[]);
 const [lessonsDone,setLessonsDone]=useStored("fhilo_lessons_v1",[]);
 const [orgDrafts,setOrgDrafts]=useStored("fhilo_org_drafts_v1",[]);
 const [onboardDismissed,setOnboardDismissed]=useStored("fhilo_onboard_dismissed_v1",false);
 const [showOnboard,setShowOnboard]=useState(true);
 const create=(opportunity=null,mode="create")=>{
  const p=newProject(opportunity,mode);
  setProjects(xs=>[p,...xs]);go("/app/studio/"+p.id);
 };
 const update=(id,changes)=>setProjects(xs=>xs.map(p=>p.id===id?{...p,...changes,updatedAt:new Date().toISOString()}:p));
 const remove=(id)=>setProjects(xs=>xs.filter(p=>p.id!==id));
 // The Studio controls live in the existing application header, not in a second row.
 const isStudioRoute=path==="/app/studio"||path.startsWith("/app/studio/");
 const studioId=isStudioRoute?path.split("/").filter(Boolean)[2]:null;
 const studioProject=isStudioRoute?(studioId?projects.find(p=>p.id===studioId):projects.filter(p=>p.mode==="code").sort((a,b)=>(b.updatedAt||"").localeCompare(a.updatedAt||""))[0]):null;
 const studioIsBuild=isStudioRoute&&(!studioProject||studioProject.mode==="code");
 const [studioNotice,setStudioNotice]=useState("");
 const saveStudioVersion=()=>{
  if(!studioProject)return;
  setProjects(xs=>xs.map(x=>x.id===studioProject.id?{...x,history:(x.history||[]).concat({
   at:new Date().toISOString(),title:x.title,problem:x.problem,audience:x.audience,
   solution:x.solution,impact:x.impact,notes:x.notes,html:x.html,csv:x.csv
  }).slice(-20)}:x));
  setStudioNotice("Version saved");
 };
 const exportStudioProject=()=>{
  if(!studioProject)return;
  const blob=new Blob([JSON.stringify(studioProject,null,2)],{type:"application/json"});
  const url=URL.createObjectURL(blob);
  const link=document.createElement("a");
  link.href=url;
  link.download=(studioProject.title||"fhilo-project").replace(/[^a-z0-9]+/gi,"-").toLowerCase()+".json";
  link.click();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
 };
 const studioHeader=isStudioRoute&&!studioIsBuild&&studioProject?<div className="fh-topbar-studio-content">
  <button className="fh-topbar-studio-back" type="button" onClick={()=>go("/app/projects")} aria-label="Back to projects" title="My projects"><ArrowLeft size={18}/></button>
  <div className="fh-topbar-studio-title"><input aria-label="Project title" value={studioProject.title||""} onChange={e=>update(studioProject.id,{title:e.target.value.slice(0,140)})}/><span><CheckCircle2 size={13}/>{studioNotice||"Saved on this device"}</span></div>
  <div className="fh-topbar-studio-actions">
   {studioProject.mode==="code"&&<button className="fh-topbar-action primary" type="button" onClick={()=>{setStudioNotice("");create(null,"code");}} title="New chat" aria-label="New chat"><Plus size={17}/><span>New chat</span></button>}
   <button className="fh-topbar-action" type="button" onClick={saveStudioVersion} title="Save project version" aria-label="Save project version"><Save size={16}/><span>Version</span></button>
   <button className="fh-topbar-action" type="button" onClick={exportStudioProject} title="Export project" aria-label="Export project"><Download size={16}/><span>Export</span></button>
  </div>
 </div>:null;
 if(path==="/")return <FhiloLanding/>;
 if(path==="/organisations")return <OrganisationsLanding go={go}/>;
 if(path==="/organisations/dashboard")return <OrganisationDashboard drafts={orgDrafts} setDrafts={setOrgDrafts} go={go}/>;
 if(path==="/organisations/new"||path.startsWith("/organisations/edit/"))return <OrganisationCreate key={path} id={path.split("/")[3]} drafts={orgDrafts} setDrafts={setOrgDrafts} go={go}/>;
 const segments=path.split("/").filter(Boolean);
 const content=(()=>{
  if(path==="/app"||path==="/app/home")return <Home profile={profile} projects={projects} lessonsDone={lessonsDone} go={go} create={create}/>;
  if(path==="/app/explore"||path==="/app/opportunities")return <Explore key={path} go={go}/>;
  if(path.startsWith("/app/opportunities/"))return <OpportunityDetail item={opportunities.find(o=>o.id===segments[2])} go={go} create={create}/>;
  if(path==="/app/studio"||path.startsWith("/app/studio/"))return <StudioErrorBoundary key={segments[2]||"new"}><Studio projectId={segments[2]} projects={projects} setProjects={setProjects} create={create} update={update} go={go}/></StudioErrorBoundary>;
  if(path==="/app/projects")return <Projects projects={projects} go={go} create={create} remove={remove}/>;
  if(path==="/app/profile")return <Profile profile={profile} setProfile={setProfile} projects={projects} lessonsDone={lessonsDone} go={go}/>;
  if(path==="/app/rewards")return <Rewards/>;
  if(path==="/app/learn"||path.startsWith("/app/learn/"))return <Lessons id={segments[2]} done={lessonsDone} setDone={setLessonsDone} go={go}/>;
  return <div className="f-content"><h1>Page not found</h1><p>This page isn't available. Explore Fhilo and find a place to begin.</p><button className="f-btn" onClick={()=>go("/app")}>Return to your workspace</button></div>;
 })();
 return <AppShell path={path} go={go} profile={profile} studioHeader={studioHeader} studioIsBuild={studioIsBuild}>{content}{path==="/app"&&!profile.name&&!onboardDismissed&&showOnboard&&<WelcomeModal profile={profile} setProfile={setProfile} onClose={()=>{setShowOnboard(false);setOnboardDismissed(true);}}/>}</AppShell>;
}
