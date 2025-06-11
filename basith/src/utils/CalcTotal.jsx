const CalcTotal = (orderList, menuList) => {
    let amount = 0;
    orderList.forEach(order => {
        const price = menuList.find(item => item.name == order.name).price;
        amount += price * order.quantity;
    })
    return amount;
}

export default CalcTotal;