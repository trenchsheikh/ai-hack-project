import React,{useState} from "react";
import FhiloLanding from "./FhiloLanding";
import Studio from "./FhiloStudio";
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
 if(path==="/")return <FhiloLanding/>;
 if(path==="/organisations")return <OrganisationsLanding go={go}/>;
 if(path==="/organisations/dashboard")return <OrganisationDashboard drafts={orgDrafts} setDrafts={setOrgDrafts} go={go}/>;
 if(path==="/organisations/new"||path.startsWith("/organisations/edit/"))return <OrganisationCreate key={path} id={path.split("/")[3]} drafts={orgDrafts} setDrafts={setOrgDrafts} go={go}/>;
 const segments=path.split("/").filter(Boolean);
 const content=(()=>{
  if(path==="/app"||path==="/app/home")return <Home profile={profile} projects={projects} lessonsDone={lessonsDone} go={go} create={create}/>;
  if(path==="/app/explore"||path==="/app/opportunities")return <Explore key={path} go={go}/>;
  if(path.startsWith("/app/opportunities/"))return <OpportunityDetail item={opportunities.find(o=>o.id===segments[2])} go={go} create={create}/>;
  if(path==="/app/studio"||path.startsWith("/app/studio/"))return <Studio key={segments[2]||"new"} projectId={segments[2]} projects={projects} setProjects={setProjects} create={create} update={update} go={go}/>;
  if(path==="/app/projects")return <Projects projects={projects} go={go} create={create} remove={remove}/>;
  if(path==="/app/profile")return <Profile profile={profile} setProfile={setProfile} projects={projects} lessonsDone={lessonsDone} go={go}/>;
  if(path==="/app/rewards")return <Rewards/>;
  if(path==="/app/learn"||path.startsWith("/app/learn/"))return <Lessons id={segments[2]} done={lessonsDone} setDone={setLessonsDone} go={go}/>;
  return <div className="f-content"><h1>Page not found</h1><p>This page isn't available. Explore Fhilo and find a place to begin.</p><button className="f-btn" onClick={()=>go("/app")}>Return to your workspace</button></div>;
 })();
 return <AppShell path={path} go={go} profile={profile}>{content}{path==="/app"&&!profile.name&&!onboardDismissed&&showOnboard&&<WelcomeModal profile={profile} setProfile={setProfile} onClose={()=>{setShowOnboard(false);setOnboardDismissed(true);}}/>}</AppShell>;
}
