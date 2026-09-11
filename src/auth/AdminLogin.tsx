import { FormEvent, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function AdminLogin(){
 const {login}=useAuth(), nav=useNavigate(), location=useLocation();
 const [email,setEmail]=useState(""),[password,setPassword]=useState(""),[busy,setBusy]=useState(false),[error,setError]=useState("");
 const submit=async(e:FormEvent)=>{e.preventDefault();setError("");setBusy(true);try{await login(email,password);const from=(location.state as any)?.from?.pathname||"/admin";nav(from,{replace:true})}catch(err:any){setError(err.message||"Unable to sign in.")}finally{setBusy(false)}};
 return <main className="auth-page"><div className="auth-shell"><Link className="auth-back" to="/">← Public website</Link><section className="auth-card"><div className="auth-mark">ETEF</div><span className="eyebrow">SECURE ADMINISTRATION</span><h1>Sign in to ETEF.</h1><p>Authorized administrators can manage memberships, FAQs, gallery content, vacancies and website settings.</p><form onSubmit={submit}><label className="admin-field"><span>Email address</span><input type="email" autoComplete="username" value={email} onChange={e=>setEmail(e.target.value)} required /></label><label className="admin-field"><span>Password</span><input type="password" autoComplete="current-password" value={password} onChange={e=>setPassword(e.target.value)} required /></label>{error&&<div className="auth-error">{error}</div>}<button className="button button-dark auth-submit" disabled={busy}>{busy?"Signing in…":"Sign in securely →"}</button></form></section><p className="auth-foot">ETEF Digital Platform · Authorized access only</p></div></main>
}
