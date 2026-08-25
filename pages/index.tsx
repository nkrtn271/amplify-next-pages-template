"use client";

import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import "aws-amplify/auth/enable-oauth-listener";  // OAuth リダイレクト処理に必須
import LineLoginButton from "./button";

let configured = false;
try {
  const outputs = require("@/amplify_outputs.json");
  Amplify.configure(outputs.default ?? outputs);
  configured = true;
} catch {
  console.info(
    "[AmplifyProvider] amplify_outputs.json が見つかりません。sandbox を起動してください。"
  );
}

/** Amplify が設定済みかどうかを返す */
export function isAmplifyConfigured(): boolean {
  return configured;
}

/** Authenticator の SignIn フッターに LINE ボタンを追加 */
const authenticatorComponents = {
  SignIn: {
    Footer() {
      return <LineLoginButton />;
    },
  },
};

export default function AmplifyProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!configured) {
    return <>{children}</>;
  }
  return (
    <Authenticator components={authenticatorComponents}>
      {children}
    </Authenticator>
  );
}
