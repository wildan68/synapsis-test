import * as ClientCookies from 'cookies-next';

export const getCookie = async (key: string, parse: boolean = false, defaultValue: any = {}) => {
  let value;
  if (typeof window !== "undefined") {
    value = ClientCookies.getCookie(key);
  } else {
    const { cookies: ServerCookies } = await import("next/headers");
    value = ServerCookies().get(key)?.value;
  }

  if (parse) {
    try {
      if (!value) throw new Error("Empty Item");

      return JSON.parse(value);
    } catch (error) {
      return defaultValue;
    }
  } else {
    return value;
  }
}

export const setCookie = async (key: string, data: string, parse: boolean = false) => {
  const value = parse ? JSON.stringify(data) : data;

  if (typeof window !== "undefined") {
    console.log('value', value)
    ClientCookies.setCookie(key, value);
  } else {
    const { cookies: ServerCookies } = await import("next/headers");
    ServerCookies().set(key, value);
  }
}

export const deleteCookie = async (key: string) => {
  if (typeof window !== "undefined") {
    ClientCookies.deleteCookie(key);
  } else {
    const { cookies: ServerCookies } = await import("next/headers");
    ServerCookies().delete(key);
  }
}