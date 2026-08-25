// components/LineLoginButton.tsx
import { signInWithRedirect } from 'aws-amplify/auth';

export default function LineLoginButton() {
  const handleLineLogin = async () => {
    try {
      await signInWithRedirect({
        provider: {
          custom: 'LINE', // amplify/auth/resource.ts で指定した名前
        },
      });
    } catch (error) {
      console.error('LINEログインへのリダイレクトに失敗しました:', error);
    }
  };

  return (
    <button
      onClick={handleLineLogin}
      style={{
        backgroundColor: '#06C755',
        color: '#fff',
        padding: '10px 20px',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
      }}
    >
      LINEでログイン
    </button>
  );
}