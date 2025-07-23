// 診断機能
const diagnosisQuestions = [
    {
        id: 1,
        question: "現在、個別支援計画書の作成にどのくらい時間をかけていますか？",
        options: [
            { text: "1件あたり30分未満", value: "fast", description: "効率的に作成できている" },
            { text: "1件あたり1-2時間", value: "normal", description: "一般的な作成時間" },
            { text: "1件あたり2時間以上", value: "slow", description: "時間がかかりすぎている" },
            { text: "よくわからない", value: "unknown", description: "時間を測ったことがない" }
        ]
    },
    {
        id: 2,
        question: "計画書作成で最も困っていることは何ですか？",
        options: [
            { text: "厚労省様式への対応", value: "compliance", description: "必須項目や記載方法がわからない" },
            { text: "文章を書くのが苦手", value: "writing", description: "適切な表現が思い浮かばない" },
            { text: "時間が足りない", value: "time", description: "他の業務で忙しい" },
            { text: "特に困っていない", value: "none", description: "現状で満足している" }
        ]
    },
    {
        id: 3,
        question: "あなたの事業所の利用者数は？",
        options: [
            { text: "20名未満", value: "small", description: "小規模事業所" },
            { text: "20-50名", value: "medium", description: "中規模事業所" },
            { text: "50名以上", value: "large", description: "大規模事業所" },
            { text: "わからない", value: "unknown", description: "正確な人数を把握していない" }
        ]
    },
    {
        id: 4,
        question: "計画書作成を担当しているのは？",
        options: [
            { text: "サービス管理責任者のみ", value: "sabikan_only", description: "専任で対応" },
            { text: "複数の職員で分担", value: "multiple", description: "チームで作成" },
            { text: "外部に委託", value: "outsource", description: "専門業者に依頼" },
            { text: "その他", value: "other", description: "上記以外の体制" }
        ]
    },
    {
        id: 5,
        question: "ITツールの導入経験はありますか？",
        options: [
            { text: "積極的に導入している", value: "active", description: "新しいツールを試すのが好き" },
            { text: "必要に応じて導入", value: "moderate", description: "効果があれば使う" },
            { text: "あまり得意ではない", value: "passive", description: "ITは苦手意識がある" },
            { text: "全く使わない", value: "none", description: "アナログ派" }
        ]
    },
    {
        id: 6,
        question: "実地指導での指摘経験はありますか？",
        options: [
            { text: "計画書で指摘を受けたことがある", value: "pointed", description: "記載内容や様式で指摘" },
            { text: "指摘はないが不安", value: "anxious", description: "品質に自信がない" },
            { text: "特に問題なし", value: "confident", description: "品質に自信がある" },
            { text: "実地指導を受けたことがない", value: "none", description: "新規事業所など" }
        ]
    },
    {
        id: 7,
        question: "AI（人工知能）についてどう思いますか？",
        options: [
            { text: "積極的に活用したい", value: "positive", description: "効率化に期待" },
            { text: "興味はあるが不安", value: "curious", description: "使えるか心配" },
            { text: "よくわからない", value: "unknown", description: "詳しく知らない" },
            { text: "使いたくない", value: "negative", description: "人の手で行いたい" }
        ]
    },
];

let currentQuestion = 0;
let answers = {};

function startDiagnosis() {
    currentQuestion = 0;
    answers = {};
    showQuestion();
}

function showQuestion() {
    const container = document.getElementById('questionContainer');
    const question = diagnosisQuestions[currentQuestion];
    
    // 結果コンテナを非表示
    document.getElementById('resultContainer').style.display = 'none';
    
    container.innerHTML = `
        <div class="question-title">${question.question}</div>
        <div class="answer-options">
            ${question.options.map((option, index) => `
                <div class="answer-option" onclick="selectAnswer('${option.value}', ${index})">
                    <h4>${option.text}</h4>
                    <p>${option.description}</p>
                </div>
            `).join('')}
        </div>
    `;
    
    updateProgress();
}

function selectAnswer(value, index) {
    // 選択状態の表示
    const options = document.querySelectorAll('.answer-option');
    options.forEach(option => option.classList.remove('selected'));
    options[index].classList.add('selected');
    
    // 回答を保存
    answers[diagnosisQuestions[currentQuestion].id] = value;
    
    // 少し待ってから次の質問へ
    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < diagnosisQuestions.length) {
            showQuestion();
        } else {
            showResult();
        }
    }, 500);
}

function updateProgress() {
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    const percentage = ((currentQuestion + 1) / diagnosisQuestions.length) * 100;
    progressFill.style.width = percentage + '%';
    progressText.textContent = `質問 ${currentQuestion + 1} / ${diagnosisQuestions.length}`;
}

function calculateResult() {
    // スコア計算
    let timeScore = 0;
    let needScore = 0;
    let readinessScore = 0;
    
    // 時間の問題度
    if (answers[1] === 'slow') timeScore = 3;
    else if (answers[1] === 'normal') timeScore = 2;
    else if (answers[1] === 'fast') timeScore = 0;
    else timeScore = 1;
    
    // 困りごとの深刻度
    if (answers[2] === 'compliance' || answers[2] === 'writing') needScore = 3;
    else if (answers[2] === 'time') needScore = 2;
    else needScore = 0;
    
    // 規模による必要性
    if (answers[3] === 'large') needScore += 2;
    else if (answers[3] === 'medium') needScore += 1;
    
    // 実地指導への不安
    if (answers[6] === 'pointed') needScore += 3;
    else if (answers[6] === 'anxious') needScore += 2;
    else if (answers[6] === 'none') needScore += 1;
    
    // IT準備度
    if (answers[5] === 'active') readinessScore = 3;
    else if (answers[5] === 'moderate') readinessScore = 2;
    else if (answers[5] === 'passive') readinessScore = 1;
    else readinessScore = 0;
    
    // AI受容度
    if (answers[7] === 'positive') readinessScore += 2;
    else if (answers[7] === 'curious') readinessScore += 1;
    else if (answers[7] === 'negative') readinessScore -= 2;
    
    const totalScore = timeScore + needScore + readinessScore;
    
    // 結果判定（7問に調整）
    if (totalScore >= 8) return 'immediate';
    else if (totalScore >= 5) return 'recommended';
    else if (totalScore >= 2) return 'consider';
    else return 'not_needed';
}

function showResult() {
    const result = calculateResult();
    
    // 質問コンテナを非表示、結果を表示
    document.getElementById('questionContainer').style.display = 'none';
    document.getElementById('resultContainer').style.display = 'block';
    
    const results = {
        immediate: {
            icon: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" xml:space="preserve" width="80" height="80"><polygon fill="currentColor" points="386.415,193.208 287.481,193.208 359.434,0 161.566,0 125.585,280.151 206.528,280.151 170.557,512 "/></svg>',
            title: '今すぐ導入をおすすめします！',
            description: 'あなたの事業所は、AI導入による効果を最大限に活用できる環境が整っています。厚労省準拠の計画書作成で大幅な効率化が期待できます。',
            recommendations: [
                '無料デモで厚労省準拠の効果を実感してください',
                '導入支援パッケージで安心スタート',
                '継続コンサルティングで更なる効率化',
                '実地指導対応も万全にサポート'
            ],
            cta: '今すぐ無料デモを申し込む',
            ctaLink: '#contact'
        },
        recommended: {
            icon: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="512px" height="512px" viewBox="0 0 512 512" xml:space="preserve" width="80" height="80"><polygon fill="currentColor" points="403.797,256 481.188,121.953 326.406,121.953 256,0 185.594,121.953 30.813,121.953 108.203,256 30.813,390.047 185.594,390.047 256,512 326.406,390.047 481.188,390.047 "/></svg>',
            title: 'AI導入をおすすめします',
            description: '現在の課題解決にAIが効果的です。厚労省準拠の品質向上と業務効率化を同時に実現できるでしょう。',
            recommendations: [
                'まずは無料デモで効果を確認',
                '小規模から始めて徐々に拡大',
                '職員研修でスムーズな導入',
                '継続サポートで安心運用'
            ],
            cta: '無料デモを見てみる',
            ctaLink: '#contact'
        },
        consider: {
            icon: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" xml:space="preserve" width="80" height="80"><path fill="currentColor" d="M256,512C114.6,512,0,397.4,0,256S114.6,0,256,0s256,114.6,256,256S397.4,512,256,512z M256,25.6C128.8,25.6,25.6,128.8,25.6,256S128.8,486.4,256,486.4S486.4,383.2,486.4,256S383.2,25.6,256,25.6z M281.6,256c0,14.1-11.5,25.6-25.6,25.6s-25.6-11.5-25.6-25.6s11.5-25.6,25.6-25.6S281.6,241.9,281.6,256z M345.6,128c7.1,7.1,7.1,18.4,0,25.6l-64,64c-7.1,7.1-18.4,7.1-25.6,0c-7.1-7.1-7.1-18.4,0-25.6l64-64C327.2,120.9,338.5,120.9,345.6,128z M153.6,358.4c-7.1-7.1-7.1-18.4,0-25.6l64-64c7.1-7.1,18.4-7.1,25.6,0c7.1,7.1,7.1,18.4,0,25.6l-64,64C172.1,365.5,160.7,365.5,153.6,358.4z M89.6,281.6c-10.6,0-19.2-8.6-19.2-19.2s8.6-19.2,19.2-19.2h128c10.6,0,19.2,8.6,19.2,19.2s-8.6,19.2-19.2,19.2H89.6z M275.2,217.6c10.6,0,19.2,8.6,19.2,19.2v128c0,10.6-8.6,19.2-19.2,19.2s-19.2-8.6-19.2-19.2v-128C256,226.2,264.6,217.6,275.2,217.6z"/></svg>',
            title: '導入を検討してみませんか？',
            description: '現状でも運用できていますが、AI導入により更なる効率化と品質向上が可能です。まずは情報収集から始めてみましょう。',
            recommendations: [
                '無料相談で詳しい情報を収集',
                '他事業所の導入事例を参考に',
                '職員の意見を聞いて検討',
                '予算に応じたプランを相談'
            ],
            cta: '詳しい情報を聞いてみる',
            ctaLink: '#contact'
        },
        not_needed: {
            icon: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" xml:space="preserve" width="80" height="80"><path fill="currentColor" d="M256,32C132.3,32,32,132.3,32,256c0,47.2,14.6,91.1,39.5,127.4L32,480l96.6-39.5C164.9,465.4,208.8,480,256,480c123.7,0,224-100.3,224-224S379.7,32,256,32z M384,288H128v-32h256V288z M384,224H128v-32h256V224z M384,160H128v-32h256V160z"/></svg>',
            title: '現状維持で問題ありません',
            description: '現在の業務フローで十分に効率的に運用されています。今すぐAI導入の必要性は低いと判断されます。',
            recommendations: [
                '現在の業務フローを継続',
                '将来的な課題が出た時に再検討',
                '業界動向の情報収集は継続',
                '必要に応じて無料相談をご利用'
            ],
            cta: '将来の参考に情報だけ見る',
            ctaLink: '#features'
        }
    };
    
    const resultData = results[result];
    const resultContainer = document.getElementById('resultContainer');
    
    resultContainer.innerHTML = `
        <div class="result-icon">${resultData.icon}</div>
        <div class="result-title">${resultData.title}</div>
        <div class="result-description">${resultData.description}</div>
        <div class="result-recommendations">
            <h4>おすすめのアクション</h4>
            <ul>
                ${resultData.recommendations.map(rec => `<li>${rec}</li>`).join('')}
            </ul>
        </div>
        <div class="result-actions">
            <a href="${resultData.ctaLink}" class="btn btn-primary">${resultData.cta}</a>
            <a href="#" class="restart-diagnosis" onclick="startDiagnosis()">もう一度診断する</a>
        </div>
    `;
    
    // プログレスバーを100%に
    document.getElementById('progressFill').style.width = '100%';
    document.getElementById('progressText').textContent = '診断完了';
}

// 診断開始ボタンのイベントリスナー
document.addEventListener('DOMContentLoaded', function() {
    const startBtn = document.getElementById('startDiagnosisBtn');
    const finalBtn = document.getElementById('finalDiagnosisBtn');
    
    // ページ読み込み時に診断を自動開始
    startDiagnosis();
    
    if (startBtn) {
        startBtn.addEventListener('click', function() {
            document.getElementById('diagnosis').scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => {
                startDiagnosis();
            }, 500);
        });
    }
    
    if (finalBtn) {
        finalBtn.addEventListener('click', function() {
            document.getElementById('diagnosis').scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => {
                startDiagnosis();
            }, 500);
        });
    }
});

// FAQ機能
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // 他のFAQを閉じる
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // クリックされたFAQを開閉
            item.classList.toggle('active');
        });
    });
});

// スムーススクロール
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// デモ動画プレースホルダーのクリック処理
document.addEventListener('DOMContentLoaded', function() {
    const playButton = document.querySelector('.play-button');
    
    if (playButton) {
        playButton.addEventListener('click', function() {
            alert('デモ動画は準備中です。実際のGPTs使用シーンを撮影予定です。');
        });
    }
});

// CTAボタンのクリック追跡（分析用）
document.addEventListener('DOMContentLoaded', function() {
    const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            const section = this.closest('section')?.className || 'unknown';
            
            // Google Analytics等の分析ツールにイベントを送信
            if (typeof gtag !== 'undefined') {
                gtag('event', 'cta_click', {
                    'button_text': buttonText,
                    'section': section
                });
            }
            
            console.log(`CTA clicked: ${buttonText} in ${section}`);
        });
    });
});

// アニメーション効果
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // アニメーション対象の要素を監視
    const animatedElements = document.querySelectorAll('.feature, .step, .pricing-card, .process-step');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// エラーハンドリング
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
});

// パフォーマンス監視
window.addEventListener('load', function() {
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    console.log(`Page load time: ${loadTime}ms`);
});