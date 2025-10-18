import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import VehicleCard from '../components/VehicleCard';
import VehicleModal from '../components/VehicleModal';

export default function Home() {
  const [vehicles, setVehicles] = useState([]);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    fetchVehicles();
  },[]);

  async function fetchVehicles(){
    setLoading(true);
    const { data, error } = await supabase.from('vehicles').select('*').order('created_at',{ascending:false});
    if(error) console.error(error);
    else setVehicles(data || []);
    setLoading(false);
  }

  const filtered = vehicles.filter(v => filter==='all' || v.type.toLowerCase().includes(filter));

  return (
    <div className="min-h-screen">
      <header className="max-w-6xl mx-auto py-8 px-4">
        <h1 className="text-4xl header-title">Premium Used Vehicles</h1>
        <p className="text-gray-600 mt-2">Browse our curated selection of cars and two-wheelers.</p>
      </header>

      <main className="max-w-6xl mx-auto px-4">
        <div className="flex gap-3 mb-6">
          {['all','car','suv','two-wheeler','ev'].map(t=>(
            <button key={t} onClick={()=>setFilter(t)} className={`px-4 py-2 rounded-full ${filter===t ? 'bg-primary text-white':'bg-gray-100 text-gray-700'}`}>{t.replace('-',' ')}</button>
          ))}
        </div>

        {loading ? <p>Loading...</p> : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(v => <VehicleCard key={v.id} vehicle={v} onOpen={setSelected} />)}
          </div>
        )}
      </main>

      {selected && <VehicleModal vehicle={selected} onClose={()=>setSelected(null)} />}
    </div>
  )
}