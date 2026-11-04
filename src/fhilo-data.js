import { challenges, lessons } from "./data";

export { lessons };
export const industries = [
  {id:"sport",name:"Sport",icon:"Trophy",detail:"Performance, coaching and experiences",color:"ice"},
  {id:"creative",name:"Creative & Media",icon:"Clapperboard",detail:"Stories, design and digital expression",color:"cream"},
  {id:"health",name:"Health & Wellbeing",icon:"HeartPulse",detail:"Human-centred solutions",color:"mint"},
  {id:"technology",name:"Technology",icon:"Code2",detail:"Products, software and automation",color:"sky"},
  {id:"finance",name:"Finance",icon:"ChartNoAxesCombined",detail:"Research, analysis and financial tools",color:"ice"},
  {id:"community",name:"Community",icon:"Globe2",detail:"Ideas for the places we live",color:"cream"}
];

const industryIds={football:"sport",creative:"creative",wellbeing:"health",future:"community"};
const pictures={
 football:"https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=900&q=80",
 creative:"https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=900&q=80",
 wellbeing:"https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=900&q=80",
 future:"https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80"
};
export const opportunities=challenges.map((item,index)=>({
 ...item,
 industry:industryIds[item.id],
 type:"Challenge",
 experience:"Beginner",
 commitment:index===1?"2–3 hours":"1–2 hours",
 delivery:"Online · Self-paced",
 funded:false,
 sponsor:null,
 prize:null,
 status:"Practice · Open",
 image:pictures[item.id],
 access:"Open to learners",
 steps:["Define the problem and who it affects","Explore ideas and make a plan","Create a project in Fhilo Studio","Test, reflect and prepare your submission"],
 rubric:["Understanding the problem","Creativity and practicality","Human judgement and responsible AI","Clarity of explanation"]
}));
export const starterHtml='<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">\n<style>body{font:16px system-ui;margin:0;background:#f7f9fc;color:#16395a}main{max-width:680px;margin:60px auto;padding:32px;background:white;border-radius:22px;box-shadow:0 15px 40px #16395a10}button{background:#2563eb;border:0;color:white;padding:12px 22px;border-radius:10px;cursor:pointer}h1{font-size:34px}</style>\n</head>\n<body><main><p>MY FIRST PROJECT</p><h1>Something worth building.</h1><p>Replace this example with your own idea, then select Preview to test it.</p><button onclick="document.getElementById(\'message\').textContent=\'You built an interaction!\';">Try it</button><p id="message"></p></main></body>\n</html>';
export const blankProfile={name:"",headline:"",bio:"",interests:[],experience:"Just starting",visibility:"private",consent:false};
export function newProject(opportunity=null,mode="create"){
 return {id:(typeof crypto!=="undefined"&&crypto.randomUUID)?crypto.randomUUID():String(Date.now()),opportunityId:opportunity?.id||null,
  title:opportunity?opportunity.title+" — My idea":"Untitled project",mode,status:"draft",
  problem:"",audience:"",solution:"",impact:"",notes:"",html:starterHtml,csv:"",history:[],
  startedAt:new Date().toISOString(),updatedAt:new Date().toISOString(),submittedAt:null};
}
export const formatDate=(date)=>{if(!date)return "";try{return new Date(date).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"});}catch{return "";}};
