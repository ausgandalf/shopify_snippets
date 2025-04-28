export const handleize = (str) => {
  const toReplace = ['"', "'", "\\", "(", ")", "[", "]", "$"];
  toReplace.forEach((char) => {
    str = str.replaceAll(char, "");
  })

  str = str.replace(/\W+/g, "-")
    .toLowerCase();

  if (str.charAt(str.length - 1) == "-") {
    str = str.replace(/-+\z/, "");
  }

  if (str.charAt(0) == "-") {
    str = str.replace(/\A-+/, "");
  }

  return str;
};

export const camelize = (str) => {
  return str.toLowerCase()
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (ltr, idx) => {
      return idx === 0 ? ltr.toLowerCase() : ltr.toUpperCase();
    })
    .replace(/\s+/g, '')
}
