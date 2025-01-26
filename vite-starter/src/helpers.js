export function kebabCaseToTitleCase(inputString) {
  const stringWithSpaces = inputString.replaceAll("-", " ");
  const stringWithCaps = stringWithSpaces.replace(/\b([a-z])/g, (m) =>
    m.toUpperCase()
  );

  return stringWithCaps;
}
