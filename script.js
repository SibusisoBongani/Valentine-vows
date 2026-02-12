// script.js - COMPLETE SUPABASE VERSION WITH PREVIEW FIXED ✅
import supabase from './supabase-config.js';

// Test Supabase connection immediately
console.log('🧪 Testing Supabase connection...');
supabase.from('surprises').select('count', { count: 'exact', head: true })
    .then(({ data, error }) => {
        if (error) {
            console.error('❌ Supabase connection failed:', error);
        } else {
            console.log('✅ Supabase connected successfully!');
        }
    });

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // ===== PAGE 1: FORM ELEMENTS =====
    const page1 = document.getElementById('page1');
    const page2 = document.getElementById('page2');
    const page3 = document.getElementById('page3');
    const createBtn = document.getElementById('createSurpriseBtn');
    const valentineNameInput = document.getElementById('valentineName');
    const loveMessageInput = document.getElementById('loveMessage');
    const senderNameInput = document.getElementById('senderName');
    
    // ===== PAGE 2: SHARE ELEMENTS =====
    const shareLink = document.getElementById('shareLink');
    const copyBtn = document.getElementById('copyLinkBtn');
    const whatsappBtn = document.getElementById('whatsappShare');
    const facebookBtn = document.getElementById('facebookShare');
    const instagramBtn = document.getElementById('instagramShare');
    const createAnotherBtn = document.getElementById('createAnotherBtn');
    const previewBtn = document.getElementById('previewSurpriseBtn');
    
    // ===== PAGE 3: PROPOSAL ELEMENTS =====
    const yesBtn = document.getElementById("yesBtn");
    const noBtn = document.getElementById("noBtn");
    const celebration = document.getElementById("celebration");
    const mainContainer = document.getElementById("mainContainer");
    const loveMessagePopup = document.getElementById("loveMessagePopup");
    const nameDisplay = document.getElementById("nameDisplay");
    const createSurpriseFromPage3Btn = document.getElementById('createSurpriseFromPage3Btn');
    const personalizedYesTitle = document.getElementById("personalizedYesTitle");
    const personalizedLoveMessage = document.getElementById("personalizedLoveMessage");
    const personalizedQuote = document.getElementById("personalizedQuote");
    const fromSender = document.getElementById("fromSender");
    
    // ===== GLOBAL VARIABLES =====
    let currentSurpriseId = null;
    let noClickCount = 0;
    let isPreviewMode = false;
    const originalNoText = "No 💔";
    
    // Array of messages for the No button
    const noMessages = [
        "Think again! 💕",
        "Are you sure? 🥺",
        "Please? 🎀",
        "Try again! 💖",
        "Click Yes instead! 💘",
        "That's not the right answer! 💔",
        "You know you want to say Yes! 😊",
        "One more try? 💝",
        "I'll keep asking! 💗",
        "Nice try! Now click Yes! 💓",
        "Really? How about now? 💞",
        "Nope, try again! 💕",
        "Almost there... click Yes! 💖",
        "Your finger slipped, right? 💘",
        "Let's pretend you clicked Yes! 🎀",
        "No isn't an option! 💗",
        "I'm very persistent! 💓",
        "The Yes button is prettier! ✨",
        "Don't break my heart! 💔",
        "This button is broken... try Yes! 💝"
    ];
    
    // Array of cute quotes
    const cuteQuotes = [
        "Happy Valentine's Day, my love ❤️🌹You are truly the best thing that has ever happened to me, and I thank God for blessing me with you every single day 🙏💕Being with you fills my heart with so much joy and warmth, and I cherish every moment we spend together 💖You make even the simplest days feel magical, and your love gives me strength and happiness like no other 🌟I promise to love, support, and treasure you forever, today and always 💌💞",
        "Being with you feels like home 🏡💞Safe, warm, and full of love, you make every day brighter and better 🌟💖I feel so lucky and grateful to have you in my life, and to call you mine 😘💓Your love surrounds me like a cozy hug, comforting me through every moment 💌💞I promise to cherish, adore, and stand by you always, today and forever 💕",
        "If I had to choose again, I'd still choose you — over and over and over 💕🔁😍No matter the time, place, or circumstances, my heart will always pick you 💖🌹You are my favorite person, my safe place, and my greatest joy every single day 💞✨Being with you makes life sweeter, brighter, and so much more meaningful 💌🌟I promise to love you endlessly, cherish you always, and choose you forever 😘💓",
        "You make my world brighter just by being in it ☀️🌍Every moment with you fills my heart with joy and warmth 💖✨I love you more than words could ever explain, deeper than the oceans 🌊💞Being with you turns ordinary days into unforgettable memories 🌹💫i promise to cherish, adore, and love you endlessly, today and always 😘💌",
        "My heart is yours ❤️ Today, tomorrow, and always 🤗💍Every beat of my heart belongs to you, and it always will 💖✨You are my love, my joy, and my everything, the reason I smile every day 🌹💞Being with you feels like home, safe, warm, and full of happiness 🏡💓I promise to love, cherish, and stand by you forever, through every moment 💌🌟",
        "Loving you has been the most beautiful chapter of my life 📖💘Every day with you adds joy, love, and unforgettable memories to my story 🌸💞You’ve touched my heart in ways I never imagined and made me a better person 😊✨Being with you fills my world with warmth, laughter, and endless happiness 💖🌟I promise to cherish, love, and write many more beautiful chapters with you forever 💌❤️",
        "You're not just my girlfriend — you're my peace 🕊️, my happiness 😄, and my biggest blessing 🙌❤️Every moment with you fills my heart with love and joy that I never knew before 💖✨You make my world brighter, my worries lighter, and my dreams sweeter 🌟💞Being with you feels like home, safe, warm, and full of laughter and love 🏡💓I promise to cherish, adore, and love you endlessly, today, tomorrow, and always 💌🌹",
        "Every moment with you feels like something I prayed for 🙏💫You’ve brought so much love, joy, and light into my life 💖✨I cherish you more than words could ever express, and my heart is yours 💕🌹Being with you makes every day brighter, happier, and full of meaning 🌟💞I promise to love, honor, and treasure you forever, today and always 💌❤️",
        "I didn't just fall in love with you… I found my best friend in you 👫💖You understand me, support me, and make every moment brighter 🌟💞Being with you is a perfect blend of love, laughter, and comfort 💖✨You make my heart feel at home and my soul feel at peace 🏡💓I promise to love, cherish, and stand by you always, through every chapter of our lives 💌❤️",
        "No matter what life throws at us 🌧️☀️I promise to stand by you, support you, and choose you every single time 💍❤️Through every challenge and every joy, my heart will always belong to you 💖✨Being with you makes even the hardest days feel lighter and every moment sweeter 🌟💞I vow to love, cherish, and treasure you forever, today, tomorrow, and always 💌🌹",
        "So… when did you become my favorite notification? 📱😍💘Every ping from you makes my heart skip a beat and my day brighter 💖✨I can’t help smiling whenever I see your name pop up 🌟💞You’ve become my joy, my excitement, and the highlight of every moment 💌❤️I promise to always cherish every message, every laugh, and every moment with you 💕💫",
        "I love you more than pizza 🍕😂 and that says A LOT ❤️🔥You’re my favorite treat, my ultimate happiness, and my daily craving 💖✨Being with you makes every day tastier, sweeter, and so much more fun 🌟💞No matter what, my heart always chooses you over anything else 💌❤️I promise to love, cherish, and adore you forever, even more than my favorite slice 💕🍕",
        "If kisses were money 💋💸I’d make you a billionaire today 💎👑Every kiss from you fills my heart with wealth I could never imagine 💖✨Being with you is richer than anything in the world 🌟💞I promise to shower you with love, kisses, and endless affection forever 💌❤️",
        "I'm not perfect 🥺But I promise to love you perfectly every single day 💖✨With all my heart, flaws and all, I’ll cherish you through every moment 🌹💞Being with you makes me want to be the best version of myself just for you 💌🌟I vow to stand by you, adore you, and love you endlessly, today and always ❤️💫",
        "You're the reason my heart beats faster 💓🔥And my world feels alive, brighter, and full of joy 🌍💘Every moment with you fills me with excitement, love, and happiness 💖✨Being with you turns ordinary days into unforgettable memories 🌟💞I promise to love, cherish, and treasure you endlessly, today and always 💌❤️",
    ];

    // ===== EMERGENCY FIX - Force page3 background =====
    function forcePage3Background() {
        if (page3) {
            page3.style.background = 'linear-gradient(-45deg, #ffc0cb, #ff99cc, #ffb6c1, #ff8da1)';
            page3.style.backgroundSize = '400% 400%';
            page3.style.animation = 'gradientBG 15s ease infinite';
        }
    }

    // ===== PREVIEW FUNCTIONALITY =====
    if (previewBtn) {
        // Preview button click handler
        previewBtn.addEventListener('click', async function(e) {
            e.preventDefault();
            
            console.log('👀 Preview button clicked!');
            console.log('Current surprise ID:', currentSurpriseId);
            
            if (!currentSurpriseId) {
                alert('Please create a surprise first! 💕');
                return;
            }
            
            isPreviewMode = true;
            
            // Force background to show
            forcePage3Background();
            
            try {
                console.log('👀 Loading preview for ID:', currentSurpriseId);
                
                // Get the surprise data from Supabase
                const { data, error } = await supabase
                    .from('surprises')
                    .select('*')
                    .eq('id', currentSurpriseId)
                    .single();
                
                console.log('Supabase response:', { data, error });
                
                if (error) throw error;
                
                if (!data) {
                    throw new Error('No data found for this surprise ID');
                }
                
                // Store preview mode in session
                sessionStorage.setItem('previewMode', 'true');
                sessionStorage.setItem('previewSurpriseId', currentSurpriseId);
                
                // Store the surprise data
                sessionStorage.setItem('currentSurprise', JSON.stringify({
                    id: currentSurpriseId,
                    ...data
                }));
                
                // Update page 3 with preview data
                if (nameDisplay) {
                    nameDisplay.textContent = `For ${data.name} 💕`;
                    console.log('Updated nameDisplay:', nameDisplay.textContent);
                }
                
                // Reset No button for preview
                resetNoButton();
                
                // Make sure main container is visible and love message is hidden
                if (mainContainer) {
                    mainContainer.classList.remove('hidden');
                    mainContainer.style.opacity = '1';
                    mainContainer.style.transform = 'translate(-50%, -50%) scale(1)';
                }
                if (loveMessagePopup) {
                    loveMessagePopup.classList.add('hidden');
                }
                
                // Hide page 2, show page 3
                page2.classList.remove('active');
                page3.classList.add('active');
                
                // Force background again after page becomes active
                forcePage3Background();
                
                // Launch some balloons to show it's working
                launchBalloons();
                
                // Show preview badge and back button
                showPreviewBadge();
                
                console.log('✅ Preview mode activated for:', data.name);
                
            } catch (error) {
                console.error('❌ Error loading preview:', error);
                alert('Could not load preview: ' + error.message + ' 💕');
                isPreviewMode = false;
            }
        });
    } else {
        console.error('❌ Preview button not found in DOM!');
    }

    // Function to show preview badge and back button
    function showPreviewBadge() {
        // Remove any existing badge
        removePreviewElements();
        
        // Create preview mode badge
        const badge = document.createElement('div');
        badge.className = 'preview-mode-badge';
        badge.id = 'previewBadge';
        badge.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(108, 92, 231, 0.95);
            color: white;
            padding: 12px 25px;
            border-radius: 50px;
            font-weight: bold;
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 10px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.2);
            backdrop-filter: blur(10px);
            border: 2px solid rgba(255,255,255,0.3);
            animation: slideDown 0.3s ease;
        `;
        badge.innerHTML = `
            <span>👀 PREVIEW MODE</span>
            <span style="margin: 0 10px;">•</span>
            <span>Your Valentine will see this</span>
            <button id="exitPreviewBtn" style="
                background: white;
                color: #6c5ce7;
                border: none;
                padding: 6px 16px;
                border-radius: 30px;
                font-weight: bold;
                cursor: pointer;
                margin-left: 15px;
                font-size: 0.9rem;
                transition: all 0.2s ease;
            ">✕ Close</button>
        `;
        document.body.appendChild(badge);
        
        // Create back to share button
        const backBtn = document.createElement('button');
        backBtn.className = 'back-to-share-btn';
        backBtn.id = 'backToShareBtn';
        backBtn.style.cssText = `
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            background: white;
            color: #6c5ce7;
            border: 3px solid #6c5ce7;
            border-radius: 50px;
            padding: 14px 30px;
            font-size: 1.1rem;
            font-weight: bold;
            cursor: pointer;
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 10px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
        `;
        backBtn.innerHTML = `
            <span>←</span>
            Back to Share Page
            <span>💕</span>
        `;
        document.body.appendChild(backBtn);
        
        // Add event listeners
        const exitBtn = document.getElementById('exitPreviewBtn');
        const backBtnElement = document.getElementById('backToShareBtn');
        
        if (exitBtn) {
            exitBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('❌ Exit button clicked!');
                exitPreviewMode();
            });
        }
        
        if (backBtnElement) {
            backBtnElement.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('🔙 Back button clicked!');
                exitPreviewMode();
            });
        }
    }

    // Function to exit preview mode
    function exitPreviewMode() {
        console.log('🚪 Exiting preview mode...');
        
        isPreviewMode = false;
        sessionStorage.removeItem('previewMode');
        sessionStorage.removeItem('previewSurpriseId');
        
        // Remove preview elements
        removePreviewElements();
        
        // Reset page 3 to normal state
        resetNoButton();
        mainContainer.classList.remove('hidden');
        loveMessagePopup.classList.add('hidden');
        mainContainer.style.opacity = '1';
        mainContainer.style.transform = 'translate(-50%, -50%) scale(1)';
        
        // Clear any preview text from name
        const surpriseData = JSON.parse(sessionStorage.getItem('currentSurprise'));
        if (surpriseData) {
            nameDisplay.textContent = `For ${surpriseData.name} 💕`;
        }
        
        // Go back to page 2
        page3.classList.remove('active');
        page2.classList.add('active');
        
        console.log('👋 Preview mode exited');
    }

    // Function to remove preview elements
    function removePreviewElements() {
        const badge = document.getElementById('previewBadge');
        const backBtn = document.getElementById('backToShareBtn');
        
        if (badge) badge.remove();
        if (backBtn) backBtn.remove();
    }

    // Check if coming from preview mode on page load
    async function checkForPreviewMode() {
        const isPreview = sessionStorage.getItem('previewMode');
        const previewId = sessionStorage.getItem('previewSurpriseId');
        
        if (isPreview === 'true' && previewId) {
            isPreviewMode = true;
            currentSurpriseId = previewId;
            showPreviewBadge();
            forcePage3Background();
            
            // Load the surprise data
            const { data, error } = await supabase
                .from('surprises')
                .select('*')
                .eq('id', previewId)
                .single();
            
            if (data) {
                nameDisplay.textContent = `For ${data.name} 💕`;
                sessionStorage.setItem('currentSurprise', JSON.stringify({
                    id: previewId,
                    ...data
                }));
                
                // Make sure page 3 is visible
                page2.classList.remove('active');
                page3.classList.add('active');
                mainContainer.classList.remove('hidden');
                loveMessagePopup.classList.add('hidden');
                forcePage3Background();
            }
        }
    }
    
    // ===== CHECK URL PARAMETERS =====
    async function checkUrlForSurprise() {
        const urlParams = new URLSearchParams(window.location.search);
        const surpriseId = urlParams.get('id');
        
        if (surpriseId) {
            try {
                console.log("🔍 Looking for surprise ID:", surpriseId);
                
                const { data, error } = await supabase
                    .from('surprises')
                    .select('*')
                    .eq('id', surpriseId)
                    .single();
                
                if (error) throw error;
                
                if (data) {
                    console.log("✅ Surprise found:", data);
                    
                    // Update view count
                    await supabase
                        .from('surprises')
                        .update({ view_count: (data.view_count || 0) + 1 })
                        .eq('id', surpriseId);
                    
                    nameDisplay.textContent = `For ${data.name} 💕`;
                    
                sessionStorage.setItem('currentSurprise', JSON.stringify({
                    id: surpriseId,
                    name: data.name,
                    message: data.message,
                    from_sender: data.from_sender || 'Your Secret Admirer', // FIX THIS
                    yes_clicked: data.yes_clicked,
                    no_clicks: data.no_clicks,
                    view_count: data.view_count
                }));
                    
                    page1.classList.remove('active');
                    page2.classList.remove('active');
                    page3.classList.add('active');
                    
                    resetNoButton();
                    launchBalloons();
                    forcePage3Background();
                    
                    return true;
                }
            } catch (error) {
                console.error("❌ Error getting surprise: ", error);
            }
        }
        return false;
    }
    
// ===== PAGE 1: CREATE SURPRISE BUTTON =====
createBtn.addEventListener("click", async function(e) {
    e.preventDefault();
    
    const valentineName = valentineNameInput.value.trim();
    const customMessage = loveMessageInput.value.trim();
    const senderName = senderNameInput.value.trim(); 

    console.log("📝 Sender name entered:", senderName || "(blank - will use Secret Admirer)");
    
    if (!valentineName) {
        alert("Please enter your Valentine's name! 💕");
        valentineNameInput.focus();
        return;
    }
    
    createBtn.disabled = true;
    createBtn.style.opacity = '0.7';
    createBtn.innerHTML = '<span class="btn-text">Creating...</span> <span class="btn-icon">✨</span>';
    
    try {
        console.log("📝 Creating surprise in Supabase...");
        
        const { data, error } = await supabase
            .from('surprises')
            .insert({
                name: valentineName,
                message: customMessage || "",
                from_sender: senderName || "Your Secret Admirer", // ✅ FIXED HERE
                yes_clicked: false,
                no_clicks: 0,
                view_count: 0
            })
            .select();
        
        if (error) throw error;
        
        const newSurprise = data[0];
        console.log("✅ Success! ID:", newSurprise.id);
        
        const baseUrl = window.location.origin + window.location.pathname;
        const fullLink = `${baseUrl}?id=${newSurprise.id}`;
        
        shareLink.value = fullLink;
        currentSurpriseId = newSurprise.id;
        
        page1.classList.remove('active');
        page2.classList.add('active');
        
        console.log(`✨ Valentine surprise created! ID: ${newSurprise.id} ✨`);
        
    } catch (error) {
        console.error("❌ Error creating surprise: ", error);
        alert("Oops! Something went wrong. Please try again. 💕");
    } finally {
        createBtn.disabled = false;
        createBtn.style.opacity = '1';
        createBtn.innerHTML = '<span class="btn-text">Create Surprise</span> <span class="btn-icon">✨💖🎁</span>';
    }
});
    
    // ===== PAGE 2: COPY LINK BUTTON =====
    copyBtn.addEventListener("click", function() {
        shareLink.select();
        document.execCommand('copy');
        
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<span class="copy-icon">✅</span> Copied!';
        setTimeout(() => { copyBtn.innerHTML = originalText; }, 2000);
    });
    
    // ===== PAGE 2: SHARE BUTTONS =====
    whatsappBtn.addEventListener("click", function() {
        const link = shareLink.value;
        const text = encodeURIComponent(`💖 Will you be my Valentine? I made something special for you! 💖\n\n${link}`);
        window.open(`https://wa.me/?text=${text}`, '_blank');
    });
    
    facebookBtn.addEventListener("click", function() {
        const link = shareLink.value;
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}`, '_blank');
    });
    
    instagramBtn.addEventListener("click", function() {
        shareLink.select();
        document.execCommand('copy');
        alert('✨ Link copied! You can now paste it in your Instagram story or bio! ✨');
    });
    
    // ===== PAGE 2: CREATE ANOTHER SURPRISE =====
    createAnotherBtn.addEventListener("click", function() {
        valentineNameInput.value = '';
        loveMessageInput.value = '';
        senderNameInput.value = '';
        page2.classList.remove('active');
        page1.classList.add('active');
    });
// ===== PAGE 3: CREATE SURPRISE BUTTON =====
createSurpriseFromPage3Btn.addEventListener("click", function() {
    console.log('🎯 Create Your Own Surprise button clicked!');
    
    // Clear form fields
    valentineNameInput.value = '';
    loveMessageInput.value = '';
    senderNameInput.value = '';
    
    // RESET PAGE 3 TO ORIGINAL STATE
    // Hide love message popup and show main container
    loveMessagePopup.classList.add('hidden');
    mainContainer.classList.remove('hidden');
    mainContainer.style.opacity = '1';
    mainContainer.style.transform = 'translate(-50%, -50%) scale(1)';
    
    // Reset No button
    resetNoButton();
    
    // Clear any preview/surprise data
    sessionStorage.removeItem('currentSurprise');
    sessionStorage.removeItem('previewMode');
    sessionStorage.removeItem('previewSurpriseId');
    currentSurpriseId = null;
    isPreviewMode = false;
    
    // Clear share link
    shareLink.value = '✨ Create a surprise first! ✨';
    
    // Switch to page 1
    page3.classList.remove('active');
    page1.classList.add('active');
    
    // Remove any preview badges if they exist
    removePreviewElements();
    
    console.log('✅ Redirected to create surprise page - Page 3 reset');
});
    
    // ===== PAGE 3: YES BUTTON CLICK HANDLER =====
    yesBtn.addEventListener("click", async function(e) {
        if (isPreviewMode) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('💘 Preview Yes clicked!');
            
            launchAllCelebrations();
            
            const surpriseData = JSON.parse(sessionStorage.getItem('currentSurprise'));
            
            if (surpriseData) {
                personalizedYesTitle.textContent = `❤️🌹 To ${surpriseData.name} ❤️🌹`;
                
                if (surpriseData.message) {
                    personalizedLoveMessage.textContent = `"${surpriseData.message}" 💕`;
                } else {
                    personalizedLoveMessage.textContent = `You've just made me the happiest person in the world, ${surpriseData.name}! 💕`;
                }
                
                fromSender.textContent = `With love, ${surpriseData.from_sender || 'Your Secret Admirer'} 💝`;
            }
            
            const randomQuote = cuteQuotes[Math.floor(Math.random() * cuteQuotes.length)];
            personalizedQuote.textContent = `"${randomQuote}"`;
            
            mainContainer.style.opacity = '0';
            mainContainer.style.transform = 'translate(-50%, -50%) scale(0.8)';
            
            setTimeout(() => {
                mainContainer.classList.add('hidden');
                loveMessagePopup.classList.remove('hidden');
                
                const previewNote = document.createElement('p');
                previewNote.style.color = '#6c5ce7';
                previewNote.style.fontWeight = 'bold';
                previewNote.style.marginTop = '20px';
                previewNote.style.fontSize = '1rem';
                previewNote.style.padding = '10px';
                previewNote.style.background = 'rgba(108, 92, 231, 0.1)';
                previewNote.style.borderRadius = '50px';
                previewNote.innerHTML = '👀 PREVIEW MODE • Your Valentine will see this exact message!';
                
                const existingNote = document.querySelector('.preview-mode-note');
                if (existingNote) existingNote.remove();
                
                previewNote.className = 'preview-mode-note';
                document.querySelector('.message-content').appendChild(previewNote);
            }, 500);
            
            createHeartRain();
            return;
        }
        
        e.preventDefault();
        
        const surpriseData = JSON.parse(sessionStorage.getItem('currentSurprise'));
        
        if (surpriseData && surpriseData.id) {
            try {
                await supabase
                    .from('surprises')
                    .update({ 
                        yes_clicked: true,
                        no_clicks: noClickCount 
                    })
                    .eq('id', surpriseData.id);
                
                console.log("✅ Yes click tracked in Supabase!");
            } catch (error) {
                console.error("❌ Error updating surprise: ", error);
            }
        }
        
        if (surpriseData) {
            personalizedYesTitle.textContent = `❤️🌹 To ${surpriseData.name} ❤️🌹`;
            
            if (surpriseData.message) {
                personalizedLoveMessage.textContent = `"${surpriseData.message}" 💕`;
            } else {
                personalizedLoveMessage.textContent = `You've just made me the happiest person in the world, ${surpriseData.name}! 💕`;
            }
            
            fromSender.textContent = `With love, ${surpriseData.from_sender || 'Your Secret Admirer'} 💝`;
        }
        
        const randomQuote = cuteQuotes[Math.floor(Math.random() * cuteQuotes.length)];
        personalizedQuote.textContent = `"${randomQuote}"`;
        
        launchAllCelebrations();
        
        mainContainer.style.opacity = '0';
        mainContainer.style.transform = 'translate(-50%, -50%) scale(0.8)';
        
        setTimeout(() => {
            mainContainer.classList.add('hidden');
            loveMessagePopup.classList.remove('hidden');
        }, 500);
        
        createHeartRain();
        
        noBtn.disabled = true;
        noBtn.style.opacity = '0.5';
        noBtn.style.cursor = 'not-allowed';
        
        console.log(`💖 ${surpriseData ? surpriseData.name : 'Someone'} said YES after ${noClickCount} attempts! 💖`);
    });
    
    // ===== PAGE 3: NO BUTTON CLICK HANDLER =====
    noBtn.addEventListener("click", async function(e) {
        if (isPreviewMode) {
            e.preventDefault();
            e.stopPropagation();
            
            noClickCount++;
            
            const randomMessage = noMessages[Math.floor(Math.random() * noMessages.length)];
            this.textContent = randomMessage;
            
            this.classList.add('shake');
            setTimeout(() => { this.classList.remove('shake'); }, 400);
            
            const yesScale = 1 + (noClickCount * 0.03);
            if (yesScale < 1.4) {
                yesBtn.style.transform = `scale(${yesScale})`;
            }
            
            createSadReaction();
            
            const tooltip = document.createElement('div');
            tooltip.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(108, 92, 231, 0.95);
                color: white;
                padding: 15px 25px;
                border-radius: 50px;
                font-size: 1rem;
                font-weight: bold;
                z-index: 10001;
                animation: slideDown 0.3s ease;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            `;
            tooltip.innerHTML = '✨ This is just a preview! Your Valentine will see this! ✨';
            document.body.appendChild(tooltip);
            setTimeout(() => tooltip.remove(), 2000);
            
            setTimeout(() => {
                if (!noBtn.disabled) {
                    noBtn.textContent = originalNoText;
                }
            }, 2000);
            
            return;
        }
        
        e.preventDefault();
        
        noClickCount++;
        
        const surpriseData = JSON.parse(sessionStorage.getItem('currentSurprise'));
        if (surpriseData && surpriseData.id) {
            try {
                await supabase
                    .from('surprises')
                    .update({ no_clicks: noClickCount })
                    .eq('id', surpriseData.id);
                
                console.log(`✅ No click ${noClickCount} tracked`);
            } catch (error) {
                console.error("❌ Error updating no clicks: ", error);
            }
        }
        
        const randomMessage = noMessages[Math.floor(Math.random() * noMessages.length)];
        this.textContent = randomMessage;
        
        this.classList.add('shake');
        setTimeout(() => { this.classList.remove('shake'); }, 400);
        
        const yesScale = 1 + (noClickCount * 0.03);
        if (yesScale < 1.4) {
            yesBtn.style.transform = `scale(${yesScale})`;
        }
        
        const pulseSpeed = Math.max(1.2, 2 - (noClickCount * 0.07));
        yesBtn.style.animation = `pulse ${pulseSpeed}s infinite`;
        
        createSadReaction();
        
        setTimeout(() => {
            if (!noBtn.disabled) {
                noBtn.textContent = originalNoText;
            }
        }, 2000);
    });
    
    // ===== CREATE SAD REACTION =====
    function createSadReaction() {
        const noBtnRect = noBtn.getBoundingClientRect();
        
        let sad = document.createElement("div");
        sad.innerHTML = "💔";
        sad.style.position = "fixed";
        sad.style.left = (noBtnRect.left + (noBtnRect.width / 2) - 20) + "px";
        sad.style.top = (noBtnRect.top - 30) + "px";
        sad.style.fontSize = "30px";
        sad.style.animation = "floatUp 2s ease-out forwards";
        sad.style.zIndex = "999";
        sad.style.pointerEvents = "none";
        celebration.appendChild(sad);
        setTimeout(() => sad.remove(), 2000);
        
        let why = document.createElement("div");
        why.innerHTML = "Why? 😢";
        why.style.position = "fixed";
        why.style.left = (noBtnRect.left - 20) + "px";
        why.style.top = (noBtnRect.bottom + 10) + "px";
        why.style.fontSize = "16px";
        why.style.color = "#666";
        why.style.fontWeight = "bold";
        why.style.animation = "fadeOut 1.5s ease-out forwards";
        why.style.zIndex = "999";
        why.style.pointerEvents = "none";
        celebration.appendChild(why);
        setTimeout(() => why.remove(), 1500);
    }
    
    // ===== CELEBRATION FUNCTIONS =====
    function launchAllCelebrations() {
        launchBalloons();
        launchTeddies();
        launchFireworks();
        launchConfetti();
        launchSparkles();
        
        setTimeout(launchBalloons, 800);
        setTimeout(launchTeddies, 1200);
        setTimeout(launchFireworks, 1600);
        setTimeout(launchConfetti, 2000);
        setTimeout(launchSparkles, 2400);
    }
    
    function launchBalloons() {
        const colors = ['#ff4d4d', '#ff6fa5', '#ffb3b3', '#ff80bf', '#ff9999', '#ff66b2', '#ff1493', '#ff69b4'];
        
        for (let i = 0; i < 25; i++) {
            setTimeout(() => {
                let balloon = document.createElement("div");
                balloon.className = "balloon";
                balloon.style.left = Math.random() * 100 + "vw";
                balloon.style.animationDuration = (3 + Math.random() * 5) + "s";
                balloon.style.background = `radial-gradient(circle at 30% 30%, white, ${colors[Math.floor(Math.random() * colors.length)]})`;
                celebration.appendChild(balloon);
                setTimeout(() => balloon.remove(), 10000);
            }, i * 60);
        }
    }
    
    function launchTeddies() {
        const teddyEmojis = ["🧸", "🐻", "🐼", "🐨", "🧸", "🐻‍❄️", "🦊", "🐰"];
        
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                let teddy = document.createElement("div");
                teddy.className = "teddy";
                teddy.innerHTML = teddyEmojis[Math.floor(Math.random() * teddyEmojis.length)];
                teddy.style.left = Math.random() * 100 + "vw";
                teddy.style.fontSize = (30 + Math.random() * 40) + "px";
                teddy.style.animationDuration = (4 + Math.random() * 4) + "s";
                celebration.appendChild(teddy);
                setTimeout(() => teddy.remove(), 10000);
            }, i * 100);
        }
    }
    
    function launchFireworks() {
        const fireworkColors = ['#ffd700', '#ffa500', '#ff69b4', '#ff1493', '#ff4500', '#ff6347', '#ff00ff', '#ff6b6b'];
        
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                for (let j = 0; j < 6; j++) {
                    setTimeout(() => {
                        let firework = document.createElement("div");
                        firework.className = "firework";
                        firework.style.left = Math.random() * 100 + "vw";
                        firework.style.top = Math.random() * 80 + "vh";
                        firework.style.background = fireworkColors[Math.floor(Math.random() * fireworkColors.length)];
                        firework.style.boxShadow = `0 0 30px ${firework.style.background}`;
                        celebration.appendChild(firework);
                        setTimeout(() => firework.remove(), 1200);
                    }, j * 80);
                }
            }, i * 180);
        }
    }
    
    function launchConfetti() {
        for (let i = 0; i < 100; i++) {
            setTimeout(() => {
                let confetti = document.createElement("div");
                confetti.style.position = "fixed";
                confetti.style.left = Math.random() * 100 + "vw";
                confetti.style.top = "-20px";
                confetti.style.width = (5 + Math.random() * 15) + "px";
                confetti.style.height = (5 + Math.random() * 15) + "px";
                confetti.style.background = `hsl(${Math.random() * 60 + 300}, 100%, 70%)`;
                confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
                confetti.style.animation = `floatUp ${2 + Math.random() * 4}s linear forwards`;
                confetti.style.zIndex = "150";
                celebration.appendChild(confetti);
                setTimeout(() => confetti.remove(), 6000);
            }, i * 25);
        }
    }
    
    function launchSparkles() {
        for (let i = 0; i < 60; i++) {
            setTimeout(() => {
                let sparkle = document.createElement("div");
                sparkle.style.position = "fixed";
                sparkle.style.left = Math.random() * 100 + "vw";
                sparkle.style.top = Math.random() * 100 + "vh";
                sparkle.style.width = "6px";
                sparkle.style.height = "6px";
                sparkle.style.background = "white";
                sparkle.style.borderRadius = "50%";
                sparkle.style.boxShadow = "0 0 15px white, 0 0 30px gold, 0 0 45px pink";
                sparkle.style.animation = `explode 1s ease-out forwards`;
                celebration.appendChild(sparkle);
                setTimeout(() => sparkle.remove(), 1000);
            }, i * 40);
        }
    }
    
    // ===== HEART RAIN =====
    function createHeartRain() {
        const heartRain = setInterval(() => {
            if (!loveMessagePopup.classList.contains('hidden')) {
                let heart = document.createElement("div");
                heart.innerHTML = "❤️";
                heart.style.position = "fixed";
                heart.style.left = Math.random() * 100 + "vw";
                heart.style.top = "-50px";
                heart.style.fontSize = (20 + Math.random() * 40) + "px";
                heart.style.animation = `floatUp ${3 + Math.random() * 5}s linear forwards`;
                heart.style.zIndex = "999";
                celebration.appendChild(heart);
                setTimeout(() => heart.remove(), 7000);
            }
        }, 250);
    }
    
    // ===== FLOATING HEARTS BACKGROUND =====
    function addFloatingHearts() {
        setInterval(() => {
            if (page3.classList.contains('active')) {
                let heart = document.createElement("div");
                heart.innerHTML = "❤️";
                heart.style.position = "fixed";
                heart.style.left = Math.random() * 100 + "%";
                heart.style.top = "100%";
                heart.style.fontSize = "20px";
                heart.style.opacity = "0.4";
                heart.style.animation = `floatUp 10s linear forwards`;
                heart.style.zIndex = "5";
                document.body.appendChild(heart);
                setTimeout(() => heart.remove(), 10000);
            }
        }, 400);
    }
    
    // ===== RESET NO BUTTON =====
    function resetNoButton() {
        noClickCount = 0;
        noBtn.textContent = originalNoText;
        noBtn.disabled = false;
        noBtn.style.opacity = '1';
        noBtn.style.transform = 'scale(1)';
        noBtn.style.cursor = 'pointer';
        yesBtn.style.transform = 'scale(1)';
        yesBtn.style.animation = 'pulse 2s infinite';
        
        mainContainer.classList.remove('hidden');
        mainContainer.style.opacity = '1';
        mainContainer.style.transform = 'translate(-50%, -50%) scale(1)';
        
        loveMessagePopup.classList.add('hidden');
        celebration.innerHTML = '';
    }
    
    // ===== TEST CONNECTION =====
    async function testConnection() {
        const { data, error } = await supabase
            .from('surprises')
            .select('count', { count: 'exact', head: true });
        
        if (error) {
            console.error('❌ Supabase connection failed:', error);
        } else {
            console.log('✅ Supabase connected successfully!');
        }
    }
    
    // ===== INITIALIZE =====
    async function init() {
        await testConnection();
        addFloatingHearts();
        forcePage3Background();
        
        const hasSurprise = await checkUrlForSurprise();
        
        if (!hasSurprise) {
            const isPreview = sessionStorage.getItem('previewMode');
            
            if (!isPreview) {
                page1.classList.add('active');
                page2.classList.remove('active');
                page3.classList.remove('active');
                shareLink.value = '✨ Create a surprise first! ✨';
            } else {
                await checkForPreviewMode();
            }
        }
        
        console.log("💝 ValentineVows is ready with Supabase! 💝");
        console.log("✨ Preview feature loaded! ✨");
    }
    
    // Start the app
    init();
});
