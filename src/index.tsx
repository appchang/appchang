import "./index.css";
import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import liff from "@line/liff";
import { App } from "./App";

interface Profile {
  name: string;
  picture: string;
}

function LiffRoot() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const initLiff = async () => {
      try {
        await liff.init({ liffId: "2008132085-Ex4bOk3P" });
        if (!liff.isLoggedIn()) {
          liff.login();
          return;
        }
        const userProfile = await liff.getProfile();
        if (mounted) {
          setProfile({
            name: userProfile.displayName,
            picture: userProfile.pictureUrl || "",
          });
        }
      } catch (err) {
        console.error("LIFF init error:", err);
        setError("ไม่สามารถเชื่อมต่อ LIFF");
      } finally {
        if (mounted) setLoading(false);
      }
    };
    initLiff();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading)
    return <div style={{ padding: 24 }}>กำลังเชื่อมต่อ LINE ...</div>;
  if (error) return <div style={{ padding: 24, color: "red" }}>{error}</div>;

  // ส่ง profile เข้า App ถ้าต้องใช้
  //   return <App profile={profile} />;
  return <App />;
}

// render(<LiffRoot />, document.getElementById("root"));
render(<App />, document.getElementById("root"));
