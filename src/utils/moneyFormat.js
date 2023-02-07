export default (string) => {
  const money = parseFloat(string);
  const formatedMoney = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(money);
  console.log(formatedMoney);
  return formatedMoney;
};
