
const Amount = ({amount}) => {
  return (
    <div className="flex items-center bg-green-900 py-5 px-6 rounded-lg">
        <label className="text-xl text-white font-semibold mr-10" htmlFor="table">Total : </label>
        <p className="text-xl pr-1 text-yellow-600">Rs.</p>
        <input className="text-center w-15 h-8 text-xl border-black border-3 rounded-md bg-gray-400 text-yellow-600 select-none focus:outline-none focus:ring-0" required readOnly value={`${amount}`} name="table" type="text" min="1" max="100"/>
    </div>
  )
}

export default Amount