// pages/dashboard.tsx
import { useEffect, useState } from 'react';
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function checkUser() {
      try {
        const currentUser = await getCurrentUser();
        const attributes = await fetchUserAttributes();
        setUser({ ...currentUser, attributes });
      } catch (err) {
        // 未ログインの場合はログインページ等へリダイレクト
        console.error('未認証です', err);
        router.push('/');
      } finally {
        setLoading(false);
      }
    }
    checkUser();
  }, [router]);

  if (loading) return <p>読み込み中...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>ダッシュボード</h1>
      <p>ログイン成功！</p>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}