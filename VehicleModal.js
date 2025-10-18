export default function VehicleModal({ vehicle, onClose }) {
  if (!vehicle) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
      <div className="bg-white rounded-xl max-w-3xl w-11/12 p-6" onClick={(e)=>e.stopPropagation()}>
        <button className="text-gray-700 float-right" onClick={onClose}>✕</button>
        <img src={vehicle.image || '/placeholder.jpg'} className="w-full h-64 object-cover rounded-lg mb-4" alt="" />
        <h2 className="text-2xl font-semibold">{vehicle.make} {vehicle.model}</h2>
        <p className="text-gray-500">{vehicle.type} • {vehicle.bought}</p>
        <p className="text-gray-500">Colour: {vehicle.colour}</p>
        <p className="text-primary font-bold text-lg">{vehicle.price}</p>
        <p className="mt-3"><a className="text-primary underline" href={vehicle.link} target="_blank" rel="noreferrer">View official page</a></p>
      </div>
    </div>
  )
}