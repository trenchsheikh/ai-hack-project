import React,{useState} from "react";
import { ArrowRight, ArrowUpRight, Check, LoaderCircle } from "lucide-react";
import { Brand } from "./FhiloBrand";
import "./waitlist.css";

const VIDEO="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_115655_b4d9cd77-feed-43cd-a198-af78ebdf1f7a.mp4";

export default function FhiloWaitlist({onExplore}){
 const [email,setEmail]=useState("");
 const [consent,setConsent]=useState(false);
 const [company,setCompany]=useState("");
 const [status,setStatus]=useState("idle");
 const [error,setError]=useState("");
 const [interest,setInterest]=useState("learner");

 async function submit(event){
  event.preventDefault();
  if(status==="sending"||status==="success")return;
  setError("");
  const clean=email.trim().toLowerCase();
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(clean)||clean.length>254){
   setError("Please enter a valid email address.");return;
  }
  if(!consent){setError("Please confirm you'd like to receive Fhilo waitlist updates.");return;}
  setStatus("sending");
  try{
   const response=await fetch("/api/waitlist",{
    method:"POST",headers:{"Content-Type":"application/json"},
    body:JSON.stringify({email:clean,consent:true,interest,company})
   });
   const data=await response.json().catch(()=>({}));
   if(!response.ok||data.ok!==true)throw Error(data.error||"We couldn't save your email. Please try again.");
   setStatus("success");
   try{window.localStorage.setItem("fhilo_waitlist_joined_v1","1");}catch{}
  }catch(err){
   setStatus("idle");
   setError(err?.message||"We couldn't save your email. Please try again.");
  }
 }
 return <div className="fw-page">
   <video className="fw-bg-video" src={VIDEO} autoPlay muted loop playsInline preload="metadata" aria-hidden="true"/>
   <div className="fw-color-wash" aria-hidden="true"/>
   <div className="fw-ambient" aria-hidden="true"><span/><span/><span/></div>
   <header className="fw-header">
    <a href="/" aria-label="Fhilo home" onClick={e=>{e.preventDefault();onExplore();}}><Brand light size={31}/></a>
    <span className="fw-header-tag"><i/> Opening soon</span>
   </header>
   <main className="fw-main">
    <div className="fw-content">
     <div className="fw-eyebrow"><span/> SOMETHING NEW IS GROWING</div>
     {status==="success"?<section className="fw-success" aria-live="polite">
       <div className="fw-success-icon"><Check size={26}/></div>
       <h1>You're on the list.<br/><em>This is a beginning.</em></h1>
       <p>Thanks for being part of what's next. Your email has been saved, and we'll be in touch with Fhilo updates.</p>
       <button type="button" className="fw-explore-button" onClick={onExplore}>Explore Fhilo <ArrowUpRight size={18}/></button>
      </section>:<>
       <h1>You have more in you.<br/><em>Let's see where it takes you.</em></h1>
       <p className="fw-description">Maybe you're still figuring out what you're good at. Maybe you have ideas but haven't had the chance to try them. Fhilo is creating a place to explore what interests you, learn new skills, and make something real. <strong>No experience. No connections. Just a place to begin.</strong></p>
       <form className="fw-form" onSubmit={submit} noValidate>
        <label className="fw-form-label" htmlFor="fw-email">Be among the first to hear when Fhilo opens.</label>
        <div className="fw-input-row">
         <input id="fw-email" type="email" name="email" autoComplete="email" inputMode="email" placeholder="Your email address" value={email} onChange={e=>setEmail(e.target.value)} aria-invalid={Boolean(error)} maxLength={254} required/>
         <button type="submit" disabled={status==="sending"||!consent||!email.trim()}>{status==="sending"?<><LoaderCircle size={18} className="fw-spin"/> Joining</>:<>Join the waitlist <ArrowRight size={18}/></>}</button>
        </div>
        <div className="fw-form-meta">
         <label className="fw-consent"><input type="checkbox" checked={consent} onChange={e=>setConsent(e.target.checked)} required/><span>I agree to receive launch and early-access updates from Fhilo by email.</span></label>
        </div>
        <div className="fw-segment" aria-label="I'm interested in"><span>I'm interested in</span>
         <button type="button" onClick={()=>setInterest("learner")} aria-pressed={interest==="learner"}>Learning & building</button>
         <button type="button" onClick={()=>setInterest("organisation")} aria-pressed={interest==="organisation"}>Creating opportunities</button>
        </div>
        <label className="fw-trap" aria-hidden="true">Leave this field empty<input tabIndex={-1} autoComplete="off" value={company} onChange={e=>setCompany(e.target.value)} name="company"/></label>
        {error&&<p className="fw-form-error" role="alert">{error}</p>}
        <p className="fw-privacy">We only use your email to contact you about Fhilo. No unrelated marketing. No payment required.</p>
       </form>
      </>}
    </div>
   </main>
   <footer className="fw-footer"><span>Where potential grows.</span><button type="button" onClick={onExplore}>Explore the website <ArrowUpRight size={15}/></button></footer>
  </div>;
}
