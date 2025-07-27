<?php
/*
Template Name: Care AI Landing Page
*/

// Disable all WordPress scripts and styles
function disable_wp_scripts_styles() {
    wp_dequeue_script('wp-embed');
    wp_dequeue_script('jquery');
    wp_dequeue_script('locatorjs');
    wp_deregister_script('wp-embed');
    wp_deregister_script('jquery');
    wp_deregister_script('locatorjs');
    
    // Remove all stylesheets
    global $wp_styles;
    $wp_styles->queue = array();
    
    // Remove all scripts
    global $wp_scripts;
    $wp_scripts->queue = array();
}

// Apply only to this template
if (is_page_template('page-care-ai-landing.php')) {
    add_action('wp_enqueue_scripts', 'disable_wp_scripts_styles', 999);
    remove_action('wp_head', 'wp_generator');
    remove_action('wp_head', 'wlwmanifest_link');
    remove_action('wp_head', 'rsd_link');
    remove_action('wp_head', 'wp_shortlink_wp_head');
    remove_action('wp_head', 'adjacent_posts_rel_link_wp_head');
}
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>個別支援計画書作成GPTs - 福祉現場の効率化を実現</title>
    <meta name="description" content="面談記録から高品質な個別支援計画書を自動生成。作業時間を95%短縮する福祉現場向けAIアシスタント">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap" rel="stylesheet">
    
    <style>
    /* Complete CSS inline to avoid conflicts */
    /* リセットとベーススタイル */
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        font-family: 'Noto Sans JP', sans-serif;
        line-height: 1.7;
        color: #333333;
        background-color: #ffffff;
    }

    .container {
        max-width: 1140px;
        margin: 0 auto;
        padding: 0 20px;
    }

    /* ヒーローセクション */
    .hero {
        background: linear-gradient(135deg, #1A2B4C 0%, #00A99D 100%);
        color: white;
        padding: 100px 0;
        text-align: center;
    }

    .hero-title {
        font-size: 40px;
        font-weight: 700;
        line-height: 1.3;
        margin-bottom: 24px;
    }

    .highlight {
        background: linear-gradient(90deg, #00A99D, #F5F7FA);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .hero-subtitle {
        font-size: 18px;
        margin-bottom: 40px;
        opacity: 0.9;
    }

    .hero-cta {
        display: flex;
        gap: 20px;
        justify-content: center;
        margin-bottom: 60px;
        flex-wrap: wrap;
    }

    .btn {
        display: inline-block;
        padding: 16px 32px;
        border-radius: 8px;
        text-decoration: none;
        font-weight: 500;
        transition: all 0.15s ease;
        border: 2px solid transparent;
        cursor: pointer;
        background: none;
        font-size: 16px;
    }

    .btn-primary {
        background-color: #00A99D;
        color: white;
    }

    .btn-primary:hover {
        transform: scale(1.03);
        box-shadow: 0 8px 25px rgba(0, 169, 157, 0.3);
    }

    .btn-secondary {
        background-color: transparent;
        color: white;
        border-color: white;
    }

    .btn-secondary:hover {
        background-color: white;
        color: #1A2B4C;
    }

    .hero-stats {
        display: flex;
        gap: 60px;
        justify-content: center;
        flex-wrap: wrap;
    }

    .stat {
        text-align: center;
    }

    .stat-number {
        display: block;
        font-size: 32px;
        font-weight: 700;
        color: #F5F7FA;
    }

    .stat-label {
        font-size: 14px;
        opacity: 0.8;
    }

    /* 課題提示セクション */
    .problems {
        padding: 96px 0;
        background-color: #F5F7FA;
    }

    .section-title {
        font-size: 32px;
        font-weight: 700;
        text-align: center;
        margin-bottom: 60px;
        color: #333333;
    }

    .problem-list {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 30px;
        max-width: 900px;
        margin: 0 auto;
    }

    .problem-item {
        background: white;
        padding: 30px;
        border-radius: 12px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        display: flex;
        align-items: center;
        gap: 20px;
    }

    .problem-icon {
        flex-shrink: 0;
        color: #1A2B4C;
    }

    .problem-icon svg {
        width: 40px;
        height: 40px;
        fill: currentColor;
    }

    /* Contact Section */
    .final-cta {
        padding: 96px 0;
        background: linear-gradient(135deg, #1A2B4C 0%, #00A99D 100%);
        color: white;
        text-align: center;
    }

    .cta-content h2 {
        font-size: 36px;
        margin-bottom: 16px;
    }

    .cta-description {
        font-size: 18px;
        margin-bottom: 60px;
        opacity: 0.9;
    }

    .contact-options {
        display: grid;
        grid-template-columns: 1fr 2fr;
        gap: 60px;
        margin-bottom: 60px;
        align-items: start;
    }

    .contact-method {
        background: rgba(255, 255, 255, 0.15);
        padding: 40px 30px;
        border-radius: 16px;
        backdrop-filter: blur(10px);
        text-align: center;
        border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .contact-form-section {
        background: white;
        padding: 40px;
        border-radius: 16px;
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
    }

    .form-header {
        text-align: center;
        margin-bottom: 30px;
        border-bottom: 1px solid #E0E0E0;
        padding-bottom: 24px;
    }

    .form-header h3 {
        font-size: 28px;
        font-weight: 700;
        color: #1A2B4C;
        margin-bottom: 16px;
    }

    .form-subtitle {
        font-size: 16px;
        color: #666666;
        line-height: 1.6;
    }

    .contact-form {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .contact-form .form-group {
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
    }

    .contact-form label {
        font-size: 16px;
        font-weight: 600;
        color: #333333;
        margin-bottom: 8px;
    }

    .radio-group {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .radio-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 16px;
        border: 2px solid #E0E0E0;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.15s ease;
        font-size: 14px;
        color: #333333;
    }

    .radio-item:hover {
        border-color: #1A2B4C;
        background-color: #F5F7FA;
    }

    .radio-item input[type="radio"] {
        display: none;
    }

    .radio-mark {
        width: 20px;
        height: 20px;
        border: 2px solid #E0E0E0;
        border-radius: 50%;
        position: relative;
        transition: all 0.15s ease;
        flex-shrink: 0;
    }

    .radio-item input[type="radio"]:checked + .radio-mark {
        border-color: #1A2B4C;
        background-color: #1A2B4C;
    }

    .radio-item input[type="radio"]:checked + .radio-mark::after {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 8px;
        height: 8px;
        background-color: white;
        border-radius: 50%;
    }

    .radio-item input[type="radio"]:checked + .radio-mark + span {
        color: #1A2B4C;
        font-weight: 600;
    }

    .contact-form .form-input,
    .contact-form .form-textarea {
        padding: 16px 20px;
        border: 2px solid #E0E0E0;
        border-radius: 12px;
        font-size: 16px;
        background: #FAFAFA;
        color: #333333;
        transition: all 0.15s ease;
    }

    .contact-form .form-input::placeholder,
    .contact-form .form-textarea::placeholder {
        color: #999999;
    }

    .contact-form .form-input:focus,
    .contact-form .form-textarea:focus {
        outline: none;
        border-color: #1A2B4C;
        background: white;
        box-shadow: 0 0 0 3px rgba(26, 43, 76, 0.1);
    }

    .contact-form .form-textarea {
        resize: vertical;
        min-height: 140px;
        font-family: inherit;
    }

    .form-submit-btn {
        background: linear-gradient(135deg, #1A2B4C 0%, #00A99D 100%);
        color: white;
        border: none;
        padding: 16px 40px;
        border-radius: 12px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.15s ease;
        margin-top: 16px;
        align-self: center;
        min-width: 180px;
    }

    .form-submit-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(26, 43, 76, 0.3);
    }

    /* レスポンシブ対応 */
    @media (max-width: 768px) {
        .hero-title {
            font-size: 28px;
        }
        
        .hero-cta {
            flex-direction: column;
            align-items: center;
        }
        
        .btn {
            width: 100%;
            max-width: 300px;
        }
        
        .contact-options {
            grid-template-columns: 1fr;
            gap: 40px;
        }
        
        .contact-form-section {
            padding: 30px 20px;
        }
        
        .radio-item {
            font-size: 13px;
            padding: 12px;
        }
    }
    </style>
    
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>

    <!-- Hero Section -->
    <section class="hero">
        <div class="container">
            <h1 class="hero-title">
                面談記録から<br>
                <span class="highlight">高品質な計画書</span>を<br>
                30秒で自動生成
            </h1>
            <p class="hero-subtitle">
                福祉現場の計画書作成業務を95%効率化。厚労省準拠の個別支援計画書を、
                面談記録を入力するだけで自動生成します。
            </p>
            
            <div class="hero-cta">
                <button class="btn btn-primary" onclick="document.getElementById('contact').scrollIntoView()">
                    無料診断を始める
                </button>
                <button class="btn btn-secondary" onclick="document.getElementById('contact').scrollIntoView()">
                    デモを見る
                </button>
            </div>
            
            <div class="hero-stats">
                <div class="stat">
                    <span class="stat-number">95%</span>
                    <span class="stat-label">作業時間短縮</span>
                </div>
                <div class="stat">
                    <span class="stat-number">30秒</span>
                    <span class="stat-label">生成時間</span>
                </div>
                <div class="stat">
                    <span class="stat-number">100%</span>
                    <span class="stat-label">厚労省準拠</span>
                </div>
            </div>
        </div>
    </section>

    <!-- Problems Section -->
    <section class="problems">
        <div class="container">
            <h2 class="section-title">こんなお悩みありませんか？</h2>
            <div class="problem-list">
                <div class="problem-item">
                    <div class="problem-icon">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                             viewBox="0 0 512 512" xml:space="preserve">
                            <path fill="currentColor" d="M256,32C132.3,32,32,132.3,32,256s100.3,224,224,224s224-100.3,224-224S379.7,32,256,32z M256,448
                                c-106,0-192-86-192-192S150,64,256,64s192,86,192,192S362,448,256,448z"/>
                            <path fill="currentColor" d="M272,128h-32v128l96,96l22.6-22.6L272,243.4V128z"/>
                        </svg>
                    </div>
                    <div>
                        <h3>時間がかかりすぎる</h3>
                        <p>1件の計画書作成に2-3時間。他の業務に影響が出ている</p>
                    </div>
                </div>
                <div class="problem-item">
                    <div class="problem-icon">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                             viewBox="0 0 512 512" xml:space="preserve">
                            <path fill="currentColor" d="M506.53,88.263L423.737,5.47c-7.294-7.293-19.118-7.293-26.411,0L47.776,341.176
                                c-2.168,2.168-3.769,4.836-4.661,7.768L0.836,487.86c-4.35,14.293,9.011,27.654,23.304,23.305l143.382-43.639h0L506.53,114.675
                                C513.823,107.381,513.823,95.556,506.53,88.263z M63.524,465.077l-16.584-16.584l24.373-80.107l47.004,25.29l25.296,47.012
                                L63.524,465.077z M453.986,75.041L156.172,374.747l-18.919-18.918l299.72-297.828l17.013,17.012
                                C453.986,75.024,453.986,75.03,453.986,75.041z"/>
                        </svg>
                    </div>
                    <div>
                        <h3>品質のばらつき</h3>
                        <p>担当者によって内容の質や詳細度が異なってしまう</p>
                    </div>
                </div>
                <div class="problem-item">
                    <div class="problem-icon">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                             viewBox="0 0 512 512" xml:space="preserve">
                            <path fill="currentColor" d="M256,96c88.4,0,160,71.6,160,160c0,88.4-71.6,160-160,160c-88.4,0-160-71.6-160-160H64
                                c0,106,86,192,192,192s192-86,192-192S362,64,256,64V32l-64,48l64,48V96z"/>
                            <path fill="currentColor" d="M256,416c-88.4,0-160-71.6-160-160c0-88.4,71.6-160,160-160c88.4,0,160,71.6,160,160h32
                                c0-106-86-192-192-192S64,150,64,256s86,192,192,192v32l64-48l-64-48V416z"/>
                        </svg>
                    </div>
                    <div>
                        <h3>何度も修正</h3>
                        <p>上司のチェックで修正指示。作り直しでさらに時間がかかる</p>
                    </div>
                </div>
                <div class="problem-item">
                    <div class="problem-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 512 512" fill="currentColor">
                            <path fill="currentColor" d="M400,0H112C85.5,0,64,21.5,64,48v416c0,26.5,21.5,48,48,48h288c26.5,0,48-21.5,48-48V48C448,21.5,426.5,0,400,0z M384,464H128V48h256V464z M160,160h192v32H160V160z M160,224h192v32H160V224z M160,288h192v32H160V288z M160,352h128v32H160V352z"/>
                        </svg>
                    </div>
                    <div>
                        <h3>厚労省基準への不安</h3>
                        <p>基準に沿っているか確信が持てず、実地指導が不安</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Final CTA Section -->
    <section class="final-cta" id="contact">
        <div class="container">
            <div class="cta-content">
                <h2>個別支援計画書作成AIツール お申し込み</h2>
                <p class="cta-description">
                    お電話またはフォームにてお気軽にお問い合わせください。<br>
                    ご相談・お見積りは無料です。
                </p>
                
                <div class="contact-options">
                    <div class="contact-method">
                        <h3>
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                 viewBox="0 0 512 512" xml:space="preserve" style="vertical-align: middle; margin-right: 8px;" width="24" height="24">
                                <path fill="currentColor" d="M477.156,364.465c-1.266-9.234-5.625-17.891-12.484-24.75L413.906,289
                                    c-13.828-13.828-36.234-13.828-50.062,0l-26.297,26.297c-6.859,6.859-16.031,10.641-25.547,10.641
                                    c-9.516,0-18.688-3.781-25.547-10.641L152.781,181.625c-6.859-6.859-10.641-16.031-10.641-25.547
                                    s3.781-18.688,10.641-25.547l26.297-26.297c13.828-13.828,13.828-36.234,0-50.062L128.344,3.406
                                    c-6.859-6.859-15.516-11.219-24.75-12.484C94.359-10.344,85.469-8.844,78.609-2.516L27.844,48.25
                                    C10.969,65.125,0,88.656,0,113.781c0,98.375,39.844,187.438,104.219,251.813S255.875,470.031,354.25,470.031
                                    c25.125,0,48.656-10.969,65.531-27.844l50.766-50.766C476.875,384.563,478.375,375.672,477.156,364.465z"/>
                            </svg>
                            お電話でのお問い合わせ
                        </h3>
                        <div style="font-size: 18px; font-weight: 700; margin-bottom: 8px;">080-3665-5541</div>
                        <div style="font-size: 14px; opacity: 0.8;">平日 9:00-18:00</div>
                    </div>
                    
                    <div class="contact-form-section">
                        <div class="form-header">
                            <h3>お問い合わせフォーム</h3>
                            <p class="form-subtitle">下記フォームに必要事項をご記入の上、送信してください。<br>2営業日以内にご返信いたします。</p>
                        </div>
                        
                        <?php echo do_shortcode('[contact-form-7 id="your-form-id" title="Care AI Contact Form"]'); ?>
                        
                        <!-- Fallback form if CF7 is not available -->
                        <form class="contact-form" action="mailto:info@ichi-company.net" method="get" enctype="text/plain">
                            <div class="form-group">
                                <label for="inquiry-type">お問い合わせ内容</label>
                                <div class="radio-group">
                                    <label class="radio-item">
                                        <input type="radio" name="inquiry-type" value="tool-purchase" checked>
                                        <span class="radio-mark"></span>
                                        <span>ツール導入のお問い合わせ</span>
                                    </label>
                                    <label class="radio-item">
                                        <input type="radio" name="inquiry-type" value="demo-request">
                                        <span class="radio-mark"></span>
                                        <span>デモ・説明のご依頼</span>
                                    </label>
                                    <label class="radio-item">
                                        <input type="radio" name="inquiry-type" value="other">
                                        <span class="radio-mark"></span>
                                        <span>その他のご相談</span>
                                    </label>
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <label for="company">事業所名</label>
                                <input type="text" id="company" name="company" class="form-input">
                            </div>
                            
                            <div class="form-group">
                                <label for="name">お名前</label>
                                <input type="text" id="name" name="name" required class="form-input">
                            </div>
                            
                            <div class="form-group">
                                <label for="email">メールアドレス</label>
                                <input type="email" id="email" name="email" required class="form-input">
                            </div>
                            
                            <div class="form-group">
                                <label for="message">お問い合わせ内容</label>
                                <textarea id="message" name="message" required class="form-textarea" rows="6" placeholder="個別支援計画書作成AIツールについてのご質問やご相談内容をお聞かせください。"></textarea>
                            </div>
                            
                            <button type="submit" class="form-submit-btn">送信する</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <?php wp_footer(); ?>
</body>
</html>
<?php
// Clean output buffer
ob_end_clean();
?>