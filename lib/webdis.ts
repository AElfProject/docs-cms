export const getWebdisData = async (key: string) => {
  try {
    const res = await fetch(`http://127.0.0.1:7379/`, {
      method: "POST",
      body: `GET/${encodeURIComponent(key)}`,
    });
    const cached = await res.json();
    console.log(cached, "cached");
    if (typeof cached.GET === "string") {
      return cached.GET as string;
    }
  } catch (e) {}
};
export const setWebdisData = async (key: string, data: any) => {
  try {
    const res = await fetch(`http://127.0.0.1:7379/`, {
      method: "POST",
      body: `SET/${encodeURIComponent(key)}/${JSON.stringify(data)}`,
    });
    const result = await res.json();
    console.log(result, "result");
    if (result.SET?.[0] === true && result.SET?.[1] === "OK") {
      return true;
    } else {
      console.log(key, "key");
      console.log(`SET/${encodeURIComponent(key)}/${JSON.stringify(data)}`);
      console.error("redis set fail");
    }
  } catch (e) {}
};
