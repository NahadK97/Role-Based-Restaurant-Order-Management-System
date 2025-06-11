import DishCard from "./DishCard";
const OrderCard = ({order}) => {
  return (
        <div className="bg-red-900 mb-10  h-full min-w-[60vw] ">
          <div className="bg-green-900 flex px-[5%] justify-between min-h-15 py-10 rounded-t-xl">
            <h3 className="border-3 rounded-lg min-w-1/3 min-h-[80%] py-2 self-center flex flex-col justify-center items-center text-2xl 2xl:text-6xl">Table {order.tableNo}</h3>
            <button className="bg-green-400 rounded-3xl self-center hover:bg-green-800 min-w-1/4 min-h-[80%] py-2 2xl:text-6xl">Done</button>
          </div>
          <div className="flex flex-col">
            {
              order.dishList.map((dish, index) => {
                return <DishCard key={index} name = {dish.name} quantity={dish.quantity} description={dish.description}/>
              })
            }
          </div>
          <div className="flex items-center justify-center gap-[5vh] bg-indigo-800 min-h-[14vh] rounded-b-xl">
            <h1 className="text-3xl  xl:text-4xl">
              {order.status}
            </h1>
            {order.status === "ready-to-take" && <button className="bg-rose-500 hover:bg-rose-900 rounded-l-4xl min-w-20 min-h-12 xl:text-2xl">Lock</button>}
          </div>
        </div>
  )
}

export default OrderCard;