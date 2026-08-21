import { useState } from "react";

export default function App() {
  // 入力値とモーダルの状態管理
  const [joinCode, setJoinCode] = useState('');
  const [email, setEmail] = useState('');
  const [modal, setModal] = useState({ 
    visible: false, 
    title: '', 
    message: '', 
    type: 'info' 
  });

  const VALID_CODE = "SHUDO2026";

  // モーダル表示関数
  const showFeedback = (type: string, title: string, message: string) => {
    setModal({ visible: true, title, message, type });
  };

  // モーダル閉じる関数
  const closeModal = () => {
    setModal(prev => ({ ...prev, visible: false }));
  };

  // 認証チェック関数
  const validateCode = () => {
    if (!joinCode.trim()) {
      showFeedback('error', '入会コードが未入力です', 'お便りやプリントに記載されている「入会コード（例: SHUDO2026）」を入力してください。');
      return false;
    }
    if (joinCode.trim().toUpperCase() !== VALID_CODE) {
      showFeedback('error', '無効な入会コード', '入力されたコードが正しくありません。<br>正しいコードを入力してください。');
      return false;
    }
    return true;
  };

  // LINEログインボタンの処理
  const handleLineLogin = () => {
    if (validateCode()) {
      showFeedback('success', 'LINE連携を開始します', '入会コードの認証に成功しました！<br>このあとLINE認証用のポップアップが立ち上がります。');
    }
  };

  // メール送信ボタンの処理
  const handleEmailLogin = () => {
    if (!validateCode()) return;
    
    if (!email || !email.includes('@')) {
      showFeedback('error', 'メール形式エラー', '有効なメールアドレスを入力してください。');
      return;
    }

    showFeedback('success', '認証メールを送信しました', `<strong>${email}</strong> 宛てにログイン専用リンクを送信しました。<br>メールをご確認ください。`);
  };

  return (
    <div className="page">
      <div className="card">
        
        {/* 上部オレンジカラーバー */}
        <div className="card__bar"></div>
        
        <div className="card__body">
            {/* クラブロゴエリア */}
            <div className="club-logos">
                <div className="club-badge club-badge--soccer">
                    <img src="./logo_soccer.png" alt="蹴道サッカークラブ ロゴ" className="club-badge__logo" />
                    <span className="club-badge__text">
                        蹴道サッカー<br/>クラブ
                    </span>
                </div>
                <div className="club-badge club-badge--cheer">
                    <img src="./logo_cheer_dance.png" alt="蹴道チアダンスクラブ ロゴ" className="club-badge__logo" />
                    <span className="club-badge__text">
                        蹴道チアダンス<br/>クラブ
                    </span>
                </div>
            </div>

            {/* タイトル */}
            <div className="section-header">
                <h2 className="section-header__title">保護者アカウント登録・ログイン</h2>
                <p className="section-header__desc">
                    安全なクラブ運営のため、関係者以外の登録を制限しています。<br/>
                    お手元の案内プリントに記載のコードを入力して進んでください。
                </p>
            </div>

            {/* ステップ1：入会コード */}
            <div className="form-step">
                <label htmlFor="join-code" className="form-step__label">
                    <span className="form-step__label-inner">
                        <span className="form-step__badge">1</span>
                        配布された入会コードを入力
                    </span>
                    <span className="form-step__tag">必須</span>
                </label>
                <div className="input-wrap">
                    <div className="input-wrap__icon">
                        <i className="fa-solid fa-key text-sm"></i>
                    </div>
                    <input 
                        type="text" 
                        id="join-code"
                        autoComplete="off"
                        value={joinCode} 
                        onChange={(e) => setJoinCode(e.target.value)}
                        className="input-text input-text--code"
                        placeholder="例：SHUDO2026" 
                    />
                </div>
                <p className="form-step__note">
                    ※案内プリントの下部などに記載されています。<br/>
                    （確認用サンプルコード: <strong className="form-step__highlight">SHUDO2026</strong>）
                </p>
            </div>

            {/* ステップ2：ログイン方法選択 */}
            <div className="auth-section">
                <div className="auth-section__heading">
                    <span className="form-step__badge">2</span>
                    登録・ログイン方法を選択
                </div>

                <div className="auth-group">
                    <button onClick={handleLineLogin} type="button" className="btn btn--line">
                        <i className="fab fa-line text-2xl"></i>
                        <span>LINEアカウントで登録・ログイン</span>
                    </button>
                    <p className="auth-group__caption">
                        ※パスワード不要。欠席連絡や中止のお知らせがLINEに届きます。
                    </p>
                </div>

                <div className="divider">
                    <div className="divider__line"></div>
                    <span className="divider__text">または LINEをお持ちでない場合</span>
                    <div className="divider__line"></div>
                </div>

                <div className="auth-group auth-group--email">
                    <div className="form-control">
                        <label htmlFor="email" className="form-control__label">
                            連絡用メールアドレス
                        </label>
                        <div className="input-wrap">
                            <div className="input-wrap__icon">
                                <i className="fa-solid fa-envelope text-sm"></i>
                            </div>
                            <input 
                                type="email" 
                                id="email"
                                autoComplete="email"
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)}
                                className="input-text input-text--bg"
                                placeholder="example@mail.com" 
                            />
                        </div>
                    </div>

                    <div className="info-box">
                        <i className="fa-solid fa-circle-info info-box__icon"></i>
                        <div className="info-box__content">
                            <strong className="info-box__strong">パスワードの設定は不要です：</strong><br/>
                            送信ボタンを押すと、このアドレス宛に「1回限りのサインイン用URL」が届きます。そのURLをタップするだけで安全にマイページへ入れます。
                        </div>
                    </div>

                    <button onClick={handleEmailLogin} type="button" className="btn btn--dark">
                        <span>認証メールを送信する</span>
                        <i className="fa-solid fa-paper-plane text-xs"></i>
                    </button>
                </div>
            </div>

        </div>
      </div>

      {/* カスタムダイアログ（Reactの状態に基づいて表示を切り替え） */}
      {modal.visible && (
        <div id="custom-modal" className="modal">
            <div className="modal__content">
                <div className="modal__inner">
                    <div className={`modal__icon-wrap ${
                        modal.type === 'success' ? 'modal__icon-wrap--success' : 
                        modal.type === 'error' ? 'modal__icon-wrap--error' : 'modal__icon-wrap--info'
                    }`}>
                        <i className={`fa-solid ${
                            modal.type === 'success' ? 'fa-circle-check' : 
                            modal.type === 'error' ? 'fa-triangle-exclamation' : 'fa-circle-info'
                        }`}></i>
                    </div>
                    <h3 className="modal__title">{modal.title}</h3>
                    <p className="modal__message" dangerouslySetInnerHTML={{ __html: modal.message }}></p>
                    <button type="button" onClick={closeModal} className="btn btn--modal">
                        確認
                    </button>
                </div>
            </div>
        </div>
      )}

    </div>
  );
}