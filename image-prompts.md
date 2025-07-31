# 個別支援計画書作成アプリ LP用画像生成プロンプト集

## 【優先度1】ヒーローセクション背景画像

### プロンプト
```
Clean modern office consultation room, soft natural lighting from large windows, professional healthcare setting, warm and welcoming atmosphere, desk with papers and documents (blurred), comfortable chairs, plants in background, minimal and clean design, soft teal and navy color palette, professional medical consultation environment, photorealistic, high quality, --ar 16:9 --style raw
```

### 日本語補足
- 清潔感のある現代的なオフィス相談室
- 大きな窓からの柔らかい自然光
- 温かく迎え入れる雰囲気
- ティール(#00A99D)とネイビー(#1A2B4C)の色調

---

## 【優先度2】3ステップ プロセス図解用アイコン

### ステップ1: 面談記録入力
```
Simple line art icon, document with text lines, pen writing on paper, clean minimal design, teal color #00A99D, white background, vector style, professional icon for healthcare workflow, --ar 1:1 --style raw
```

### ステップ2: AI処理中
```
Simple line art icon, brain with circuit patterns, AI processing symbol, progress indicator, clean minimal design, teal color #00A99D, white background, vector style, modern tech icon, --ar 1:1 --style raw
```

### ステップ3: 計画書完成
```
Simple line art icon, completed document with checkmark, professional report, success symbol, clean minimal design, teal color #00A99D, white background, vector style, achievement icon, --ar 1:1 --style raw
```

---

## 【優先度3】ビフォー・アフター比較画像

### BEFORE画像
```
Stressed healthcare worker at cluttered desk, multiple paper documents scattered, tired expression, dim office lighting, overwhelming paperwork, traditional office setting, realistic photography style, muted colors, showing workplace stress, --ar 16:9 --style raw
```

### AFTER画像
```
Happy healthcare professional at clean organized desk, single laptop showing completed digital document, bright natural lighting, satisfied expression, modern efficient workspace, minimal clean environment, professional and positive atmosphere, --ar 16:9 --style raw
```

---

## 【優先度4】開発者プロフィール画像

### プロンプト
```
Professional Japanese male healthcare specialist, 30-35 years old, wearing clean white medical coat or professional business shirt, confident and trustworthy expression, medical or healthcare books in background, natural lighting, professional headshot, clean background, trustworthy and competent appearance, photorealistic portrait, --ar 4:5 --style raw
```

---

## 【優先度5】機能アイコン改善

### 厚労省準拠アイコン
```
Government approval badge icon, official seal design, Japanese government style, professional certification symbol, navy blue #1A2B4C, clean vector design, trustworthy and official, --ar 1:1 --style raw
```

### 超高速生成アイコン
```
Lightning bolt with stopwatch, speed and efficiency symbol, dynamic movement, teal color #00A99D, clean minimal design, vector style, performance icon, --ar 1:1 --style raw
```

### 個人情報保護アイコン
```
Shield with lock symbol, data protection icon, security and privacy, professional design, navy blue #1A2B4C, clean vector style, trustworthy security symbol, --ar 1:1 --style raw
```

---

## 【実装順序と優先度】

### Phase 1 (即座に実装)
1. **ヒーロー背景画像** - 最も効果的、CSS background-imageで簡単実装
2. **3ステップアイコン** - HTMLのSVG置き換えで簡単

### Phase 2 (次週実装)
3. **ビフォーアフター画像** - 比較セクションに追加
4. **機能アイコン** - 既存SVGの置き換え

### Phase 3 (余裕があれば)
5. **プロフィール画像** - 既存profile.jpgの置き換え

---

## 【技術仕様】

### ファイル形式
- **写真系**: WebP (フォールバック: JPG)
- **アイコン系**: SVG (インライン推奨)

### サイズ最適化
- **ヒーロー背景**: 1920x1080px (WebP, 80%品質)
- **アイコン**: 64x64px (SVG)
- **比較画像**: 800x450px (WebP, 85%品質)
- **プロフィール**: 400x500px (WebP, 90%品質)

### 命名規則
```
hero-background.webp
step-1-input.svg
step-2-ai.svg  
step-3-complete.svg
before-traditional.webp
after-efficient.webp
profile-developer.webp
icon-compliance.svg
icon-speed.svg
icon-security.svg
```

---

## 【カラーパレット参考】

- **メインティール**: #00A99D
- **ネイビー**: #1A2B4C  
- **ライトグレー**: #F5F7FA
- **ホワイト**: #FFFFFF
- **アクセント**: #E0F2FE (薄いティール)