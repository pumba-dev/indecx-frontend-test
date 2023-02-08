export default (string) => {
  if (string == null || string == undefined || string == "") return "";
  var numsStr = string.replace(/[^0-9]/g, "");
  return parseInt(numsStr);
};
