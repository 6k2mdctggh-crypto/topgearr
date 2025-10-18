export default function VehicleCard({ vehicle, onOpen }) {
  return (
    <div className="card bg-white rounded-xl overflow-hidden" onClick={()=>onOpen(vehicle)}>
      <div className="h-56 bg-gray-100">
        <img src={vehicle.image || '/placeholder.jpg'} alt={vehicle.make + ' ' + vehicle.model} className="w-full h-full object-cover"/>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{vehicle.make} {vehicle.model}</h3>
        <p className="text-sm text-gray-500">{vehicle.type} • {vehicle.bought}</p>
        <p className="text-sm text-gray-500">Colour: {vehicle.colour}</p>
        <p className="mt-2 text-lg font-bold text-primary">{vehicle.price}</p>
      </div>
    </div>
  )
}