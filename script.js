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
    {
        id: 8,
        question: "業務効率化への投資予算は？",
        options: [
            { text: "月額5万円以上", value: "high", description: "効率化に積極投資" },
            { text: "月額1-5万円", value: "medium", description: "適度な投資は可能" },
            { text: "月額1万円未満", value: "low", description: "予算は限られている" },
            { text: "予算はない", value: "none", description: "無料でないと難しい" }
        ]
    }
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
    
    // 診断フォームを表示、結果を非表示
    document.getElementById('diagnosisForm').style.display = 'block';
    document.getElementById('diagnosisResult').style.display = 'none';
    
    container.innerHTML = `
        <div class="question active">
            <h3>${question.question}</h3>
            <div class="question-options">
                ${question.options.map((option, index) => `
                    <div class="option" onclick="selectAnswer('${option.value}', ${index})">
                        <strong>${option.text}</strong>
                        <br><small>${option.description}</small>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    updateProgress();
}

function selectAnswer(value, index) {
    // 選択状態の表示
    const options = document.querySelectorAll('.option');
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
    let budgetScore = 0;
    
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
    
    // 予算
    if (answers[8] === 'high') budgetScore = 3;
    else if (answers[8] === 'medium') budgetScore = 2;
    else if (answers[8] === 'low') budgetScore = 1;
    else budgetScore = 0;
    
    const totalScore = timeScore + needScore + readinessScore + budgetScore;
    
    // 結果判定
    if (totalScore >= 10) return 'immediate';
    else if (totalScore >= 6) return 'recommended';
    else if (totalScore >= 3) return 'consider';
    else return 'not_needed';
}

function showResult() {
    const result = calculateResult();
    
    // フォームを非表示、結果を表示
    document.getElementById('diagnosisForm').style.display = 'none';
    document.getElementById('diagnosisResult').style.display = 'block';
    
    const results = {
        immediate: {
            icon: '🚀',
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
            icon: '✨',
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
            icon: '🤔',
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
            icon: '😊',
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
    const resultContainer = document.getElementById('diagnosisResult');
    
    // スコアに応じたクラス名を決定
    let scoreClass = 'score-' + result.replace('_', '-');
    
    resultContainer.innerHTML = `
        <div class="result-header">
            <h3 class="result-title">${resultData.title}</h3>
            <div class="result-score ${scoreClass}">
                ${resultData.icon} ${result === 'immediate' ? '最優先' : 
                  result === 'recommended' ? '推奨' : 
                  result === 'consider' ? '検討' : '不要'}
            </div>
        </div>
        <div class="result-content">
            <p>${resultData.description}</p>
            <div class="result-recommendations">
                <h4>おすすめのアクション</h4>
                <ul>
                    ${resultData.recommendations.map(rec => `<li>${rec}</li>`).join('')}
                </ul>
            </div>
        </div>
        <div class="result-actions">
            <a href="${resultData.ctaLink}" class="btn-primary">${resultData.cta}</a>
            <button class="btn-outline" onclick="startDiagnosis()" style="margin-left: 1rem;">もう一度診断する</button>
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