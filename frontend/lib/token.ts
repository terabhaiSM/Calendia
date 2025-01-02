export function setAuthToken(token: string) {
    // Store the token in localStorage
    localStorage.setItem("authToken", token);
  }