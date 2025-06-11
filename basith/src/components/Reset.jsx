
const Reset = ({handleClick}) => {

  return (
    <div className="flex items-center  bg-red-600 hover:bg-red-900 px-6 rounded-lg">
        <button onClick={handleClick} className="text-xl" type="reset">reset</button>
    </div>
  )
}

export default Reset