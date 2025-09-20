export const catImages = [
  require("../assets/Pic-0.png"),
  require("../assets/Pic-1.png"),
  require("../assets/Pic-2.png"),
  require("../assets/Pic-3.png"),
  require("../assets/Pic-4.png"),
  require("../assets/Pic-5.png"),
  require("../assets/Pic-6.png"),
  require("../assets/Pic-7.png"),
  require("../assets/Pic-8.png"),
];

export const sortOptions = [
  { option: "all", text: "All facts" },
  { option: "longest", text: "Show long ones first" },
  { option: "shortest", text: "Show short ones first" },
  { option: "short-only", text: "Short ones only" },
  { option: "long-only", text: "Long ones only" },
];

export const hashId = () => {
  String.prototype.hashCode = function () {
    let hash = 0, i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
      chr = this.charCodeAt(i);
      hash = ((hash << 5) - hash) + chr;
      hash |= 0;
    }
    return hash;
  };
};
