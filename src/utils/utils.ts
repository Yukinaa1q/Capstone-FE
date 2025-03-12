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
    sig: signature,
  };
}

export function isJSON(checkJson: string) {
  if (
    /^[\],:{}\s]*$/.test(
      checkJson
        .replace(/\\["\\\/bfnrtu]/g, "@")
        .replace(
          /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
          "]"
        )
        .replace(/(?:^|:|,)(?:\s*\[)+/g, "")
    )
  ) {
    //the json is ok
    return true;
  } else {
    //the json is not ok
    return false;
  }
}

export function matchUrl(prefixUrl: string, currentUrl: string) {
  if (prefixUrl === "/") {
    return currentUrl === prefixUrl;
  }
  return currentUrl.startsWith(prefixUrl);
}

export function toHeadCase(str: string): string {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
    .join(" ");
}

export function levelToString(level: string): string {
  switch (level) {
    case "1":
      return "Beginner";
    case "2":
      return "Pre-Intermediate";
    case "3":
      return "Intermediate";
    case "4":
      return "Upper-Intermediate";
    case "5":
      return "Advanced";
    default:
      return "Unknown";
  }
}
