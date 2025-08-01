# 個別支援計画書作成GPTs - 要件定義書

## はじめに

福祉現場における個別支援計画書作成の効率化を目的とした、Google Gemini（GPTs）を活用したAIアシスタントシステムの開発を行います。面談記録の音声データから文字起こしされたテキストを入力として、厚生労働省の様式に準拠した高品質な個別支援計画書を自動生成します。

## 要件

### 要件1: 面談記録からの計画書生成

**ユーザーストーリー:** サービス管理責任者として、面談記録のテキストデータを入力するだけで、項目別に整理された個別支援計画書の文章を取得したい。これにより、計画書作成時間を大幅に短縮できる。

#### 受入基準

1. WHEN 面談記録のテキストデータを入力 THEN システムは以下の項目別に文章を生成 SHALL する
   - 利用者及び家族の生活に対する意向
   - 総合的な援助の方針
   - 長期目標（1年）
   - 短期目標（6ヶ月）
   - 支援目標1（就労支援）
   - 支援目標2（日常生活支援）
   - 支援目標3（社会生活支援）

2. WHEN 生成された文章を確認 THEN 各項目はコピー&ペーストで既存の計画書フォーマットに貼り付け可能 SHALL である

3. WHEN 計画書を生成 THEN 福祉専門用語が適切に使用され、実地指導に対応できる品質レベル SHALL である

### 要件2: 事業所特性に応じたカスタマイズ

**ユーザーストーリー:** 事業所管理者として、自事業所の特性（B型、A型、移行支援等）に応じた計画書を生成したい。これにより、事業所の実情に合った適切な支援内容を提案できる。

#### 受入基準

1. WHEN 事業所種別を選択 THEN 選択した種別に適した支援内容が生成 SHALL される
   - 就労継続支援A型
   - 就労継続支援B型
   - 就労移行支援
   - 生活介護
   - 自立訓練（生活訓練）
   - 自立訓練（機能訓練）

2. WHEN 主な作業内容を設定 THEN 設定した作業内容に関連した支援目標が生成 SHALL される

3. WHEN 利用者の障害種別を指定 THEN 障害特性に配慮した表現と支援内容が生成 SHALL される

### 要件3: 品質保証機能

**ユーザーストーリー:** サービス管理責任者として、生成された計画書の品質を客観的に評価したい。これにより、実地指導や監査に対応できる水準を保証できる。

#### 受入基準

1. WHEN 計画書生成完了 THEN システムは以下の観点で品質スコアを表示 SHALL する
   - 専門性（福祉専門用語の適切な使用）
   - 具体性（測定可能で観察可能な目標設定）
   - 実現可能性（事業所のリソースで実施可能）
   - 一貫性（各項目間の整合性）

2. WHEN 品質スコアが80点未満 THEN システムは具体的な改善提案を提示 SHALL する

3. WHEN 法的要件チェック実行 THEN 障害者総合支援法への準拠状況を確認 SHALL する

### 要件4: 代替案生成機能

**ユーザーストーリー:** サービス管理責任者として、同じ面談記録から異なるアプローチの計画書を比較検討したい。これにより、利用者に最適な支援方針を選択できる。

#### 受入基準

1. WHEN 代替案生成を要求 THEN システムは以下の3つのアプローチで計画書を生成 SHALL する
   - 就労重視型（一般就労への移行を重視）
   - 生活重視型（日常生活の安定化を重視）
   - 社会参加重視型（地域社会への参加を重視）

2. WHEN 各代替案を表示 THEN 特徴と適用場面の説明を併記 SHALL する

3. WHEN 代替案を比較 THEN 利用者の状況に最も適した案を推奨 SHALL する

### 要件5: セキュリティとプライバシー保護

**ユーザーストーリー:** 事業所管理者として、個人情報を安全に取り扱いたい。これにより、情報漏洩リスクを最小限に抑えながらAIを活用できる。

#### 受入基準

1. WHEN 個人情報を含むデータを入力 THEN システムは氏名等を「○○さん」等の匿名表記に自動変換 SHALL する

2. WHEN データ処理完了 THEN 入力されたデータは一時的処理のみで永続保存されない SHALL である

3. WHEN システム利用 THEN Google Geminiのエンタープライズグレードセキュリティが適用 SHALL される

### 要件6: ユーザビリティ

**ユーザーストーリー:** 福祉現場の職員として、ITスキルに関係なく簡単に操作したい。これにより、誰でも効率的に計画書を作成できる。

#### 受入基準

1. WHEN システムにアクセス THEN 直感的で分かりやすいインターフェースが表示 SHALL される

2. WHEN 操作方法が不明 THEN システム内にヘルプ機能とサンプル入力例が提供 SHALL される

3. WHEN エラーが発生 THEN 分かりやすいエラーメッセージと解決方法が表示 SHALL される

### 要件7: 継続的改善

**ユーザーストーリー:** システム管理者として、利用者のフィードバックを基にシステムを継続的に改善したい。これにより、現場のニーズに合った機能を提供し続けられる。

#### 受入基準

1. WHEN 計画書生成後 THEN ユーザーは満足度評価を入力可能 SHALL である

2. WHEN フィードバック収集 THEN システムは成功パターンと改善点を学習 SHALL する

3. WHEN 定期的なアップデート THEN 収集したフィードバックを基に生成品質が向上 SHALL される