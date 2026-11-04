import { createHash } from "node:crypto";
import { put } from "@vercel/blob";

// Fhilo's public waitlist writes only to a private Vercel Blob store.
// The storage token stays server-side, and no endpoint exposes the email list.
const attempts=new Map();
const WINDOW_MS=10*60*1000;
const MAX_ATTEMPTS=8;

export default async function handler(req,res){
 res.setHeader("Cache-Control","no-store");
 res.setHeader("X-Content-Type-Options","nosniff");
 if(req.method!=="POST"){
  res.setHeader("Allow","POST");
  return res.status(405).json({error:"Method not allowed"});
 }
 const origin=req.headers.origin;
 if(origin){
  try{
   if(new URL(origin).host!==req.headers.host)return res.status(403).json({error:"This form must be submitted from Fhilo."});
  }catch{
   return res.status(403).json({error:"Invalid request origin."});
  }
 }
 if(!String(req.headers["content-type"]||"").includes("application/json")){
  return res.status(415).json({error:"Please submit the waitlist form."});
 }
 if(!process.env.BLOB_READ_WRITE_TOKEN){
  return res.status(503).json({error:"Waitlist signups are temporarily unavailable. Please try again later."});
 }
 const body=(typeof req.body==="object"&&req.body!==null)?req.body:{};
 if(JSON.stringify(body).length>2048){
  return res.status(413).json({error:"Submission too large."});
 }
 // A hidden form field catches automated submissions without collecting data.
 if(typeof body.company==="string"&&body.company.trim()){
  return res.status(200).json({ok:true});
 }
 const email=typeof body.email==="string"?body.email.trim().toLowerCase():"";
 const interest=["learner","organisation"].includes(body.interest)?body.interest:"learner";
 if(email.length>254||email.length<5||!/^[^\s@<>]{1,64}@[^\s@<>]{1,190}\.[a-z]{2,24}$/i.test(email)){
  return res.status(400).json({error:"Please enter a valid email address."});
 }
 if(body.consent!==true){
  return res.status(400).json({error:"Consent is required for waitlist emails."});
 }
 const ip=String(req.headers["x-forwarded-for"]||req.socket?.remoteAddress||"unknown").split(",")[0].trim();
 const now=Date.now();
 // Best-effort per-instance throttling. Add platform WAF rate limiting before large-scale promotion.
 const attemptsByIp=(attempts.get(ip)||[]).filter(t=>now-t<WINDOW_MS);
 if(attemptsByIp.length>=MAX_ATTEMPTS){
  return res.status(429).json({error:"Too many attempts. Please try again later."});
 }
 attemptsByIp.push(now);
 attempts.set(ip,attemptsByIp);
 if(attempts.size>2000){
  for(const [key,times] of attempts){
   if(times.every(t=>now-t>=WINDOW_MS))attempts.delete(key);
  }
 }
 const hash=createHash("sha256").update(email).digest("hex");
 const record={
  email,interest,consent:true,source:"fhilo-website-waitlist",updatedAt:new Date().toISOString()
 };
 try{
  await put("waitlist/"+hash+".json",JSON.stringify(record),{
   access:"private",allowOverwrite:true,contentType:"application/json",
   cacheControlMaxAge:60
  });
  return res.status(200).json({ok:true});
 }catch(error){
  console.error("Fhilo waitlist storage failed",error?.name||"unknown");
  return res.status(503).json({error:"We couldn't save your email right now. Please try again shortly."});
 }
}
