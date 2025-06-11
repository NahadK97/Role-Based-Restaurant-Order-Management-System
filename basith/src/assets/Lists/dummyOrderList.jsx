const dummyOrderList = [
  {
    tableNo : 1,
    status : "ready-to-take",
    dishList : [
      {
        name : "biriyani",
        quantity : 2,
        description: "add more masala",
      },
      {
        name : "raita",
        quantity : 2,
      },
      {
        name : "chapati",
        quantity : 3,
      },
      {
        name : "paneer curry",
        quantity : 1,
        description : "less spicy"
      }
    ]
  },
  {
    tableNo : 2,
    status : "yet-to-cook",
    dishList : [
      {
        name : "chicken mandhi half",
        quantity : 1,
        description: "more myonise",
      },
      {
        name : "campa 1Ltr.",
        quantity : 1,
        description: "more chilled",
      }
    ]
  }
];
export default dummyOrderList;