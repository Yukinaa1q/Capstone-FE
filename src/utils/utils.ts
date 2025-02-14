export function shortName(name: string) {
  const wordList = name.split(" ");
  return wordList[0][0] + wordList[wordList.length - 1][0];
}

export function jwtDecoder(jwt: string) {
  const [header, payload, signature] = jwt.split(".");
  const decodedHeader = atob(header);
  const decodedPayload = atob(payload);
  return {
    header: JSON.parse(decodedHeader),
    payload: JSON.parse(decodedPayload),
    sig: signature
  };
}