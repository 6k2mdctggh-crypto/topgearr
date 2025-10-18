import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Admin() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({type:'Car', make:'', model:'', colour:'', bought:'', price:'', image:'', link:''});
  const [message, setMessage] = useState('');

  useEffect(()=>{
    const session = supabase.auth.getSession().then(r=>r.data.session);
    supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });
    // check initial
    supabase.auth.getSession().then(({data})=> setUser(data.session?.user ?? null));
  },[]);

  async function signInPhone(e){
    e.preventDefault();
    const phone = e.target.phone.value;
    if(!phone) return alert('Enter phone');
    const { error } = await supabase.auth.signInWithOtp({ phone });
    if(error) setMessage('Error sending OTP: ' + error.message);
    else setMessage('OTP sent to ' + phone + '. Check your phone and confirm.');
  }

  async function addVehicle(e){
    e.preventDefault();
    const { data, error } = await supabase.from('vehicles').insert([form]);
    if(error) setMessage('Error: ' + error.message);
    else { setMessage('Vehicle added'); setForm({type:'Car', make:'', model:'', colour:'', bought:'', price:'', image:'', link:''}); }
  }

  async function signOut(){ await supabase.auth.signOut(); setUser(null); }

  return (
    <div className="min-h-screen max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Portal</h1>

      {!user ? (
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="mb-4 text-gray-700">Sign in with your phone number (Supabase OTP)</p>
          <form onSubmit={signInPhone} className="space-y-3">
            <input name="phone" placeholder="+919999999999" className="w-full p-2 border rounded" />
            <button className="px-4 py-2 bg-primary text-white rounded">Send OTP</button>
          </form>
          <p className="text-sm text-gray-500 mt-3">After entering the OTP you'll be signed in automatically (check your phone).</p>
          <p className="text-green-600 mt-3">{message}</p>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-4">
            <div>Signed in as <strong>{user.phone}</strong></div>
            <button onClick={signOut} className="px-3 py-2 bg-gray-100 rounded">Sign out</button>
          </div>

          <form className="bg-white p-6 rounded-lg shadow space-y-3" onSubmit={addVehicle}>
            <select value={form.type} onChange={e=>setForm({...form,type:e.target.value})} className="w-full p-2 border rounded">
              <option>Car</option><option>SUV</option><option>Two-wheeler</option><option>EV</option>
            </select>
            <input value={form.make} onChange={e=>setForm({...form,make:e.target.value})} placeholder="Make" className="w-full p-2 border rounded" />
            <input value={form.model} onChange={e=>setForm({...form,model:e.target.value})} placeholder="Model" className="w-full p-2 border rounded" />
            <input value={form.colour} onChange={e=>setForm({...form,colour:e.target.value})} placeholder="Colour" className="w-full p-2 border rounded" />
            <input value={form.bought} onChange={e=>setForm({...form,bought:e.target.value})} placeholder="Bought (e.g., 3 years ago)" className="w-full p-2 border rounded" />
            <input value={form.price} onChange={e=>setForm({...form,price:e.target.value})} placeholder="Price (₹)" className="w-full p-2 border rounded" />
            <input value={form.image} onChange={e=>setForm({...form,image:e.target.value})} placeholder="Image URL" className="w-full p-2 border rounded" />
            <input value={form.link} onChange={e=>setForm({...form,link:e.target.value})} placeholder="Official link" className="w-full p-2 border rounded" />
            <button className="px-4 py-2 bg-primary text-white rounded">Add Vehicle</button>
          </form>
          <p className="text-green-600 mt-3">{message}</p>
        </div>
      )}
    </div>
  )
}