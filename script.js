/**
 * ROYAL AUSPICIOUS ENGAGEMENT INVITATION JAVASCRIPT
 * Bride: Sri Ramya & Groom: Sai Ram
 * Date: 25th November 2026 at 09:20 AM | Rajahmundry
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. STATE & CONSTANTS
  // =========================================================================
  const TARGET_DATE = new Date('2026-11-25T09:20:00+05:30');
  let isEnvelopeOpened = false;
  let isAudioPlaying = false;
  let audioCtx = null;
  let musicLoopInterval = null;
  let tanpuraNodes = [];

  // DOM Elements
  const envelopeOverlay = document.getElementById('envelopeOverlay');
  const envelope3d = document.getElementById('envelope3d');
  const waxSealBtn = document.getElementById('waxSealBtn');
  const musicCtrl = document.getElementById('musicCtrl');
  const musicDisc = document.getElementById('musicDisc');
  const musicLabel = document.getElementById('musicLabel');

  const daysVal = document.getElementById('daysVal');
  const hoursVal = document.getElementById('hoursVal');
  const minutesVal = document.getElementById('minutesVal');
  const secondsVal = document.getElementById('secondsVal');

  const showerBlessingsBtn = document.getElementById('showerBlessingsBtn');
  const blessingCountDisplay = document.getElementById('blessingCountDisplay');
  const floatingBlessingMsg = document.getElementById('floatingBlessingMsg');

  const viewOriginalCardBtn = document.getElementById('viewOriginalCardBtn');
  const whatsappShareBtn = document.getElementById('whatsappShareBtn');
  const cardModal = document.getElementById('cardModal');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalCloseBtn = document.getElementById('modalCloseBtn');

  const addToGoogleCalBtn = document.getElementById('addToGoogleCalBtn');
  const downloadIcalBtn = document.getElementById('downloadIcalBtn');
  const copyAddressBtn = document.getElementById('copyAddressBtn');
  const toastNotification = document.getElementById('toastNotification');
  const toastText = document.getElementById('toastText');

  const wishesForm = document.getElementById('wishesForm');
  const wishesList = document.getElementById('wishesList');
  const totalWishesCount = document.getElementById('totalWishesCount');

  // =========================================================================
  // 2. WEB AUDIO API - AUSPICIOUS INDIAN CLASSICAL SYNTHESIZER
  // (Tanpura Drone, Mohanam Raga Flute & Temple Bell Chimes)
  // 100% Offline & works without external audio files!
  // =========================================================================
  function getAudioContext() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  // Play auspicious temple bell chime (Ghantha / Shankh resonance)
  function playTempleBell(freq = 780, duration = 2.2) {
    try {
      const ctx = getAudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.98, ctx.currentTime + duration);

      // Bell harmonics
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(freq * 2.76, ctx.currentTime);

      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      gain2.gain.setValueAtTime(0.12, ctx.currentTime);
      gain2.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration * 0.6);

      osc.connect(gain);
      osc2.connect(gain2);
      gain.connect(ctx.destination);
      gain2.connect(ctx.destination);

      osc.start();
      osc2.start();
      osc.stop(ctx.currentTime + duration);
      osc2.stop(ctx.currentTime + duration);
    } catch (e) {
      console.warn('Audio not allowed yet:', e);
    }
  }

  // Melodious Indian Flute Note (Bansuri timbre with breathy warmth)
  function playFluteNote(freq, startTime, duration = 1.4) {
    if (!isAudioPlaying) return;
    try {
      const ctx = getAudioContext();
      const osc = ctx.createOscillator();
      const subOsc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);
      // Gentle vibrato
      osc.frequency.setTargetAtTime(freq * 1.008, startTime + 0.3, 0.4);

      subOsc.type = 'triangle';
      subOsc.frequency.setValueAtTime(freq * 2, startTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, startTime);

      // Smooth attack & gentle breath decay
      gain.gain.setValueAtTime(0.001, startTime);
      gain.gain.linearRampToValueAtTime(0.18, startTime + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc.connect(filter);
      subOsc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      subOsc.start(startTime);
      osc.stop(startTime + duration);
      subOsc.stop(startTime + duration);
    } catch (e) {
      // Audio permission or suspend
    }
  }

  // Start continuous soothing Tanpura drone + Mohanam Melody
  function startAuspiciousMusic() {
    try {
      const ctx = getAudioContext();
      stopAuspiciousMusic();

      // Tanpura frequencies based on C# (Root Sa: 138.59 Hz, Pa: 207.65 Hz)
      const baseFreqs = [138.59, 207.65, 277.18];
      tanpuraNodes = baseFreqs.map((f) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, ctx.currentTime);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        return { osc, gain };
      });

      // Raag Mohanam / Bhupali Auspicious Notes (Sa, Ri, Ga, Pa, Dha, Sa')
      // Frequencies for C# Mohanam:
      const mohanamNotes = [
        277.18, // Sa
        311.13, // Ri
        349.23, // Ga
        415.30, // Pa
        466.16, // Dha
        554.37, // High Sa
        466.16,
        415.30,
        349.23,
        311.13
      ];

      let noteIndex = 0;
      const playMelodyStep = () => {
        if (!isAudioPlaying) return;
        const note = mohanamNotes[noteIndex % mohanamNotes.length];
        const now = ctx.currentTime;
        playFluteNote(note, now, 1.8);
        noteIndex++;
      };

      playMelodyStep();
      musicLoopInterval = setInterval(playMelodyStep, 1600);
      isAudioPlaying = true;
      musicDisc.classList.add('playing');
      musicLabel.textContent = 'Music: ON';
    } catch (e) {
      console.warn('Music init error:', e);
    }
  }

  function stopAuspiciousMusic() {
    isAudioPlaying = false;
    if (musicLoopInterval) {
      clearInterval(musicLoopInterval);
      musicLoopInterval = null;
    }
    tanpuraNodes.forEach(({ osc, gain }) => {
      try {
        osc.stop();
        osc.disconnect();
        gain.disconnect();
      } catch (err) {}
    });
    tanpuraNodes = [];
    musicDisc.classList.remove('playing');
    musicLabel.textContent = 'Music: OFF';
  }

  function toggleMusic() {
    if (isAudioPlaying) {
      stopAuspiciousMusic();
      showToast('Music paused 🔇');
    } else {
      startAuspiciousMusic();
      showToast('Auspicious flute & drone playing 🪈✨');
    }
  }

  musicCtrl.addEventListener('click', toggleMusic);

  // =========================================================================
  // 3. FALLING FLOWER PETALS & SPARKLES CANVAS ENGINE
  // =========================================================================
  const canvas = document.getElementById('petalCanvas');
  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const petals = [];
  const PETAL_TYPES = ['marigold-yellow', 'marigold-orange', 'rose-red', 'rose-pink', 'gold-sparkle', 'akshata-gold'];

  class Petal {
    constructor(x, y, isBurst = false) {
      this.reset(x, y, isBurst);
    }

    reset(x, y, isBurst = false) {
      this.x = x !== undefined ? x : Math.random() * width;
      this.y = y !== undefined ? y : -20;
      this.type = PETAL_TYPES[Math.floor(Math.random() * PETAL_TYPES.length)];
      this.size = Math.random() * 12 + 8;
      
      if (isBurst) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 10 + 4;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed - 5; // upward bias
      } else {
        this.vx = Math.random() * 2 - 1;
        this.vy = Math.random() * 1.5 + 1.2;
      }

      this.rotation = Math.random() * 360;
      this.rotationSpeed = (Math.random() - 0.5) * 3;
      this.swingSpeed = Math.random() * 0.04 + 0.02;
      this.swingAmplitude = Math.random() * 2 + 1;
      this.swingStep = Math.random() * Math.PI * 2;
      this.opacity = Math.random() * 0.4 + 0.6;
    }

    update() {
      this.swingStep += this.swingSpeed;
      this.x += this.vx + Math.sin(this.swingStep) * this.swingAmplitude;
      this.y += this.vy;
      this.rotation += this.rotationSpeed;

      // Slow down burst momentum
      this.vx *= 0.98;
      if (this.vy < 3) this.vy += 0.15;

      // Wrap around bottom
      if (this.y > height + 30) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.rotation * Math.PI) / 180);
      ctx.globalAlpha = this.opacity;

      if (this.type === 'marigold-yellow') {
        ctx.fillStyle = '#fbc531';
        this.drawFlowerPetal();
      } else if (this.type === 'marigold-orange') {
        ctx.fillStyle = '#e67e22';
        this.drawFlowerPetal();
      } else if (this.type === 'rose-red') {
        ctx.fillStyle = '#c0392b';
        this.drawHeartPetal();
      } else if (this.type === 'rose-pink') {
        ctx.fillStyle = '#e84393';
        this.drawHeartPetal();
      } else if (this.type === 'akshata-gold') {
        ctx.fillStyle = '#f1c40f';
        this.drawGrain();
      } else {
        ctx.fillStyle = '#ffd700';
        this.drawSparkle();
      }

      ctx.restore();
    }

    drawFlowerPetal() {
      ctx.beginPath();
      ctx.ellipse(0, 0, this.size * 0.6, this.size, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    drawHeartPetal() {
      ctx.beginPath();
      ctx.moveTo(0, -this.size * 0.5);
      ctx.bezierCurveTo(this.size * 0.5, -this.size * 0.8, this.size * 0.8, 0, 0, this.size);
      ctx.bezierCurveTo(-this.size * 0.8, 0, -this.size * 0.5, -this.size * 0.8, 0, -this.size * 0.5);
      ctx.fill();
    }

    drawGrain() {
      ctx.beginPath();
      ctx.ellipse(0, 0, 2.5, 6, Math.PI / 4, 0, Math.PI * 2);
      ctx.fill();
    }

    drawSparkle() {
      const s = this.size * 0.5;
      ctx.beginPath();
      ctx.moveTo(0, -s);
      ctx.lineTo(s * 0.3, -s * 0.3);
      ctx.lineTo(s, 0);
      ctx.lineTo(s * 0.3, s * 0.3);
      ctx.lineTo(0, s);
      ctx.lineTo(-s * 0.3, s * 0.3);
      ctx.lineTo(-s, 0);
      ctx.lineTo(-s * 0.3, -s * 0.3);
      ctx.closePath();
      ctx.fill();
    }
  }

  // Populate ambient petals
  const AMBIENT_COUNT = 32;
  for (let i = 0; i < AMBIENT_COUNT; i++) {
    petals.push(new Petal(Math.random() * width, Math.random() * height));
  }

  // Petal burst trigger
  function triggerPetalBurst(startX, startY, count = 75) {
    for (let i = 0; i < count; i++) {
      petals.push(new Petal(startX, startY, true));
    }
    // Limit total petals on screen to avoid lag
    if (petals.length > 250) {
      petals.splice(0, petals.length - 250);
    }
  }

  function animatePetals() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < petals.length; i++) {
      petals[i].update();
      petals[i].draw();
    }
    requestAnimationFrame(animatePetals);
  }
  animatePetals();

  // =========================================================================
  // 4. SURPRISE ENVELOPE UNVEILING INTERACTION
  // =========================================================================
  function revealInvitation() {
    if (isEnvelopeOpened) return;
    isEnvelopeOpened = true;

    // 1. Play auspicious sound
    playTempleBell(587, 2.5);
    setTimeout(() => playTempleBell(880, 2.8), 350);

    // 2. Animate 3D envelope
    envelope3d.classList.add('opened');

    // 3. Massive confetti / petal burst
    const rect = waxSealBtn.getBoundingClientRect();
    const sealX = rect.left + rect.width / 2;
    const sealY = rect.top + rect.height / 2;
    triggerPetalBurst(sealX, sealY, 120);

    // 4. Start background Indian melody after slight delay
    setTimeout(() => {
      startAuspiciousMusic();
    }, 700);

    // 5. Hide overlay smoothly
    setTimeout(() => {
      envelopeOverlay.classList.add('revealed');
      showToast('🌸 Welcome to Sri Ramya & Sai Ram\'s Engagement Invitation! 🪔');
    }, 1300);
  }

  waxSealBtn.addEventListener('click', revealInvitation);
  // Also allow clicking envelope card peek to open
  envelope3d.addEventListener('click', (e) => {
    if (!isEnvelopeOpened) revealInvitation();
  });

  // Hanging bells interactive swing & ring
  document.querySelectorAll('.hanging-chain').forEach((chain) => {
    chain.addEventListener('click', () => {
      playTempleBell(987, 1.8);
      chain.style.transform = 'scale(1.25) rotate(20deg)';
      setTimeout(() => {
        chain.style.transform = '';
      }, 400);
      showToast('🔔 Auspicious Temple Bells Chiming!');
    });
  });

  // =========================================================================
  // 5. COUNTDOWN TIMER ENGINE
  // Target: Wednesday, 25th November 2026 at 9:20 AM IST
  // =========================================================================
  function updateCountdown() {
    const now = new Date();
    const diff = TARGET_DATE - now;

    if (diff <= 0) {
      daysVal.textContent = '00';
      hoursVal.textContent = '00';
      minutesVal.textContent = '00';
      secondsVal.textContent = '00';
      return;
    }

    const totalSecs = Math.floor(diff / 1000);
    const days = Math.floor(totalSecs / (3600 * 24));
    const hours = Math.floor((totalSecs % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSecs % 3600) / 60);
    const seconds = Math.floor(totalSecs % 60);

    daysVal.textContent = String(days).padStart(2, '0');
    hoursVal.textContent = String(hours).padStart(2, '0');
    minutesVal.textContent = String(minutes).padStart(2, '0');
    secondsVal.textContent = String(seconds).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // =========================================================================
  // 6. INTERACTIVE "SHOWER BLESSINGS" FEATURE
  // =========================================================================
  let blessingCount = parseInt(localStorage.getItem('sriramya_sairam_blessings') || '136', 10);
  blessingCountDisplay.textContent = blessingCount.toLocaleString();

  const BLESSING_QUOTES = [
    '✨ May Lord Ganesha shower Sri Ramya & Sai Ram with everlasting joy!',
    '💖 Wishing the lovely couple a glorious life filled with harmony and love!',
    '🌿 Subhamasthu! May your togetherness shine bright with prosperity!',
    '🪔 Prayers for infinite health, wealth, and laughter in your journey ahead!',
    '🌸 Heartiest congratulations to Volety and Satyavolu Families!'
  ];
  let quoteIndex = 0;

  showerBlessingsBtn.addEventListener('click', (e) => {
    blessingCount++;
    localStorage.setItem('sriramya_sairam_blessings', blessingCount);
    blessingCountDisplay.textContent = blessingCount.toLocaleString();

    // Trigger flower shower at button position
    const rect = showerBlessingsBtn.getBoundingClientRect();
    triggerPetalBurst(rect.left + rect.width / 2, rect.top, 80);

    // Play auspicious bell chime
    playTempleBell(659 + Math.random() * 200, 1.8);

    // Show floating quote
    floatingBlessingMsg.textContent = BLESSING_QUOTES[quoteIndex % BLESSING_QUOTES.length];
    quoteIndex++;

    // Little button bounce
    showerBlessingsBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
      showerBlessingsBtn.style.transform = '';
    }, 150);
  });

  // =========================================================================
  // 7. CALENDAR INTEGRATION (Google Calendar & Apple / Outlook .ics)
  // =========================================================================
  const eventDetails = {
    title: 'Engagement of Sri Ramya & Sai Ram',
    description: 'We cordially invite you to celebrate the auspicious Engagement Ceremony of Sri Ramya (Bride) & Sai Ram (Groom). Followed by lunch. With love from Volety and Satyavolu Families.',
    location: '3Star Mini Function Hall, Beside Goli Rama Rao Hospital, Danavaipeta, Rajahmundry, Andhra Pradesh',
    // 25th Nov 2026, 09:20 AM IST to 01:30 PM IST
    // UTC: 20261125T035000Z to 20261125T080000Z
    startUTC: '20261125T035000Z',
    endUTC: '20261125T080000Z'
  };

  // Google Calendar URL
  const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    eventDetails.title
  )}&dates=${eventDetails.startUTC}/${eventDetails.endUTC}&details=${encodeURIComponent(
    eventDetails.description
  )}&location=${encodeURIComponent(eventDetails.location)}`;
  addToGoogleCalBtn.href = gcalUrl;

  // Generate .ics download
  downloadIcalBtn.addEventListener('click', () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Sri Ramya & Sai Ram//Engagement Invitation//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `SUMMARY:${eventDetails.title}`,
      `DESCRIPTION:${eventDetails.description}`,
      `LOCATION:${eventDetails.location}`,
      `DTSTART:${eventDetails.startUTC}`,
      `DTEND:${eventDetails.endUTC}`,
      'STATUS:CONFIRMED',
      'SEQUENCE:0',
      'BEGIN:VALARM',
      'TRIGGER:-PT24H',
      'ACTION:DISPLAY',
      'DESCRIPTION:Reminder: Sri Ramya & Sai Ram Engagement Ceremony Tomorrow',
      'END:VALARM',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'SriRamya_SaiRam_Engagement.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('📅 Calendar event (.ics) downloaded!');
  });

  // =========================================================================
  // 8. COPY ADDRESS TO CLIPBOARD
  // =========================================================================
  copyAddressBtn.addEventListener('click', () => {
    const address = '3Star Mini Function Hall, Beside Goli Rama Rao Hospital, Danavaipeta, Rajahmundry, Andhra Pradesh';
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(address).then(() => {
        showToast('📍 Venue address copied to clipboard!');
      });
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = address;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      showToast('📍 Venue address copied to clipboard!');
    }
  });

  // =========================================================================
  // 9. WHATSAPP INVITATION SHARE
  // =========================================================================
  whatsappShareBtn.addEventListener('click', () => {
    const inviteMessage = `🌸 *AUSPICIOUS ENGAGEMENT INVITATION* 🌸\n\nWith the divine blessings of Lord Ganesha, we cordially invite you to celebrate the engagement ceremony of\n\n💍 *Sri Ramya* (Bride)\n       & \n💍 *Sai Ram* (Groom)\n\n🗓 *Date:* Wednesday, 25th November 2026\n⏰ *Sumuhurtham:* at 9:20 AM\n🍽 *Feast:* ~ Followed by Grand Lunch ~\n\n📍 *Venue:* \n3Star Mini Function Hall,\nBeside Goli Rama Rao Hospital,\nDanavaipeta, Rajahmundry.\n\nFrom:\n✨ *Volety and Satyavolu Families* ✨\n\nYour gracious presence and blessings will make the occasion truly memorable for us! 🙏💐`;

    const shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(inviteMessage)}`;
    window.open(shareUrl, '_blank');
  });

  // =========================================================================
  // 10. MODAL: VIEW ORIGINAL PRINTED CARD
  // =========================================================================
  viewOriginalCardBtn.addEventListener('click', () => {
    cardModal.classList.add('active');
  });

  function closeModal() {
    cardModal.classList.remove('active');
  }

  modalCloseBtn.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && cardModal.classList.contains('active')) {
      closeModal();
    }
  });

  // =========================================================================
  // 11. GUESTBOOK & WALL OF BLESSINGS (RSVP / WISHES)
  // Preloaded + LocalStorage Persistence
  // =========================================================================
  const DEFAULT_WISHES = [
    {
      id: 1,
      name: 'K. Sharma & Family',
      relation: 'Family Friends • Hyderabad',
      message: 'Heartiest congratulations to Ramya and Sai Ram! Wishing you both an extraordinary life brimming with happiness, harmony, and eternal romance. See you in Rajahmundry on the 25th!',
      attendance: '🎉 Yes, Joyfully Attending!',
      time: 'Just now'
    },
    {
      id: 2,
      name: 'Venkat Rao Satyavolu',
      relation: 'Uncle • Vijayawada',
      message: 'Subhamasthu! Delighted to celebrate this grand occasion with both families. May Lord Ganesha bestow boundless peace and joy upon our dear Ramya and Sai Ram.',
      attendance: '🎉 Yes, Joyfully Attending!',
      time: '1 hour ago'
    },
    {
      id: 3,
      name: 'Ananya & Karthik',
      relation: 'Cousins • Bengaluru',
      message: 'So incredibly thrilled for you two! Looking forward to an amazing celebration and the delicious lunch in Rajahmundry! 🥳✨',
      attendance: '🎉 Yes, Joyfully Attending!',
      time: '3 hours ago'
    },
    {
      id: 4,
      name: 'Lakshmi Narayana Volety',
      relation: 'Family Elder • Visakhapatnam',
      message: 'May God bless Sri Ramya & Sai Ram with long life, prosperity, and unwavering understanding. All our heartfelt blessings!',
      attendance: '💐 Sending Blessings from Afar',
      time: 'Yesterday'
    }
  ];

  function getSavedWishes() {
    try {
      const stored = localStorage.getItem('sriramya_sairam_wishes');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {}
    return DEFAULT_WISHES;
  }

  function renderWishes() {
    const list = getSavedWishes();
    totalWishesCount.textContent = list.length;
    wishesList.innerHTML = '';

    list.forEach((w) => {
      const card = document.createElement('div');
      card.className = 'wish-card';
      card.innerHTML = `
        <div class="wish-card-top">
          <div>
            <span class="wish-author">${escapeHtml(w.name)}</span>
            <span class="wish-relation">${escapeHtml(w.relation)}</span>
          </div>
          <span class="wish-time">${escapeHtml(w.time || 'Recently')}</span>
        </div>
        <p class="wish-text">“${escapeHtml(w.message)}”</p>
        <span class="wish-attendance-badge">${escapeHtml(w.attendance)}</span>
      `;
      wishesList.appendChild(card);
    });
  }

  wishesForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('guestName').value.trim();
    const relation = document.getElementById('guestRelation').value.trim();
    const message = document.getElementById('guestMessage').value.trim();
    const attendanceRadio = document.querySelector('input[name="attendance"]:checked');
    const attendance = attendanceRadio ? attendanceRadio.value : 'Yes, joyfully attending';

    if (!name || !relation || !message) return;

    const newWish = {
      id: Date.now(),
      name,
      relation,
      message,
      attendance,
      time: 'Just now'
    };

    const currentWishes = getSavedWishes();
    currentWishes.unshift(newWish);
    localStorage.setItem('sriramya_sairam_wishes', JSON.stringify(currentWishes));

    renderWishes();
    wishesForm.reset();

    // Trigger celebration
    triggerPetalBurst(window.innerWidth / 2, window.innerHeight / 2, 70);
    playTempleBell(740, 2);
    showToast('💌 Thank you! Your blessing was posted on the Wall of Love ✨');
  });

  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  renderWishes();

  // =========================================================================
  // 12. TOAST NOTIFICATION UTILITY
  // =========================================================================
  let toastTimeout = null;
  function showToast(message) {
    if (toastTimeout) clearTimeout(toastTimeout);
    toastText.textContent = message;
    toastNotification.classList.add('show');
    toastTimeout = setTimeout(() => {
      toastNotification.classList.remove('show');
    }, 3800);
  }

})();

