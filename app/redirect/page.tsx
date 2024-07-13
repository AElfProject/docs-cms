// redirect/page.tsx
"use client";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef } from "react";
export default function Redirect() {
  return (
    <Suspense>
      <_Redirect />
    </Suspense>
  );
}
function _Redirect() {
  const searchParams = useSearchParams();
  const mounted = useRef(false);
  const code = searchParams.get("code");
  useEffect(() => {
    async function setSessionToken(code: string) {
      const res = await fetch(`/api/token?code=${code}`);
      const data = await res.json();
      // window.sessionStorage.setItem("session", data.token);
    }
    if (!!code && !mounted.current) {
      setSessionToken(code);
      mounted.current = true;
    }
    // return () => {
    //   window.sessionStorage.removeItem("session");
    // };
  }, [code]);
  return <p>Loading...</p>;
}
