/**
 * =========================================================================
 * MOMENT — CHAPTER-BASED PERSONAL EXPERIENCE CONTROLLER
 * Tactile • Cinematic • Intimate • Accountable
 * =========================================================================
 */

'use strict';

const AppState = {
  currentChapter: 0,
  totalChapters: 8,
  isTransitioning: false,
  audioActive: false,
  audioContext: null,
  audioNodes: null,
  calendarInterval: null
};

function populateExperienceContent() {
  const cfg = window.MOMENT_CONFIG || {};

  // Chapter 0: Envelope
  if (cfg.envelope) {
    const elTitle = document.getElementById('envelope-title');
    const elSub = document.getElementById('envelope-sub');
    if (elTitle && cfg.envelope.heading) {
      elTitle.innerHTML = cfg.envelope.heading.replace(/\\n/g, '<br>');
    }
    if (elSub && cfg.envelope.note) elSub.textContent = cfg.envelope.note;
  }

  // Chapter 1: Grounded Friendship Memories
  if (cfg.chapter1) {
    const elIntro = document.getElementById('ch1-intro');
    const elLead = document.getElementById('ch1-lead');
    const elHeadline = document.getElementById('ch1-headline');
    const grid = document.getElementById('ch1-fragments-grid');

    if (elIntro && cfg.chapter1.intro) elIntro.textContent = cfg.chapter1.intro;
    if (elLead && cfg.chapter1.lead) elLead.textContent = cfg.chapter1.lead;
    if (elHeadline && cfg.chapter1.highlight) elHeadline.textContent = cfg.chapter1.highlight;

    if (grid && Array.isArray(cfg.chapter1.memories)) {
      grid.innerHTML = '';
      cfg.chapter1.memories.forEach(mem => {
        const card = document.createElement('div');
        card.className = 'memory-fragment-card';
        card.innerHTML = `
          <div class="washi-tape" aria-hidden="true"></div>
          <p class="fragment-text">${escapeHTML(mem.text)}</p>
        `;
        grid.appendChild(card);
      });
    }
  }

  // Chapter 2: The Disappearance & Timeline
  if (cfg.chapter2) {
    const track = document.getElementById('timeline-track');
    const elGhost = document.getElementById('ghost-title');
    const elGhostSub = document.getElementById('ghost-sub');

    if (track && Array.isArray(cfg.chapter2.timelineSteps)) {
      track.innerHTML = '';
      cfg.chapter2.timelineSteps.forEach((step, idx) => {
        const stepEl = document.createElement('div');
        let classes = 'timeline-step';
        if (idx === 0) classes += ' first';
        if (step.label === '...') classes += ' ellipsis';
        if (step.label.toLowerCase().includes('disappear')) classes += ' disappeared';
        stepEl.className = classes;
        stepEl.textContent = step.label;
        track.appendChild(stepEl);
      });
    }
    if (elGhost && cfg.chapter2.confession) elGhost.textContent = cfg.chapter2.confession;
    if (elGhostSub && cfg.chapter2.realization) {
      elGhostSub.innerHTML = cfg.chapter2.realization.replace(/\\n/g, '<br>');
    }
  }

  // Chapter 3: Distance & Silence
  if (cfg.chapter3) {
    const elUser = document.getElementById('chat-user-label');
    const elLastSeen = document.getElementById('chat-last-seen');
    const elLead = document.getElementById('ch3-lead');
    const elPause = document.getElementById('ch3-pause');
    const elConclusion = document.getElementById('ch3-conclusion');

    if (elUser && cfg.chapter3.chatUser) elUser.textContent = cfg.chapter3.chatUser;
    if (elLastSeen && cfg.chapter3.lastSeen) elLastSeen.textContent = cfg.chapter3.lastSeen;
    if (elLead && cfg.chapter3.lead) elLead.textContent = cfg.chapter3.lead;
    if (elPause && cfg.chapter3.pauseText) elPause.textContent = cfg.chapter3.pauseText;
    if (elConclusion && cfg.chapter3.conclusion) elConclusion.textContent = cfg.chapter3.conclusion;
  }

  // Chapter 4: The Realization
  if (cfg.chapter4) {
    const elOpening = document.getElementById('ch4-opening');
    const elSub = document.getElementById('ch4-sub');
    const field = document.getElementById('ch4-fragments-field');
    const elClosingLead = document.getElementById('ch4-closing-lead');
    const elClosingNotJust = document.getElementById('ch4-closing-notjust');
    const elClosingFinal = document.getElementById('ch4-closing-final');

    if (elOpening && cfg.chapter4.opening) elOpening.textContent = cfg.chapter4.opening;
    if (elSub && cfg.chapter4.sub) elSub.textContent = cfg.chapter4.sub;
    if (elClosingLead && cfg.chapter4.closingLead) elClosingLead.textContent = cfg.chapter4.closingLead;
    if (elClosingNotJust && cfg.chapter4.closingNotJust) elClosingNotJust.textContent = cfg.chapter4.closingNotJust;
    if (elClosingFinal && cfg.chapter4.closingFinal) elClosingFinal.textContent = cfg.chapter4.closingFinal;

    if (field && Array.isArray(cfg.chapter4.fragments)) {
      field.innerHTML = '';
      cfg.chapter4.fragments.forEach(frag => {
        const tag = document.createElement('button');
        tag.className = 'r-fragment-tag';
        tag.type = 'button';
        tag.textContent = frag.text;
        tag.addEventListener('click', () => {
          tag.classList.toggle('tapped');
        });
        field.appendChild(tag);
      });
    }
  }

  // Chapter 5: The Apology
  if (cfg.chapter5) {
    const elTitle = document.getElementById('apology-title');
    const reasonsBox = document.getElementById('apology-reasons');
    const accBox = document.getElementById('apology-accountability');
    const elVerdict = document.getElementById('apology-verdict');

    if (elTitle && cfg.chapter5.title) elTitle.textContent = cfg.chapter5.title;
    if (elVerdict && cfg.chapter5.verdict) elVerdict.textContent = cfg.chapter5.verdict;

    if (reasonsBox && Array.isArray(cfg.chapter5.reasons)) {
      reasonsBox.innerHTML = '';
      cfg.chapter5.reasons.forEach(r => {
        const p = document.createElement('p');
        p.className = 'apology-reason-line';
        p.textContent = r;
        reasonsBox.appendChild(p);
      });
    }

    if (accBox && Array.isArray(cfg.chapter5.accountability)) {
      accBox.innerHTML = '';
      cfg.chapter5.accountability.forEach(a => {
        const p = document.createElement('p');
        p.className = 'apology-acc-line';
        p.textContent = a;
        accBox.appendChild(p);
      });
    }
  }

  // Chapter 6: No Pressure
  if (cfg.chapter6 && Array.isArray(cfg.chapter6.lines)) {
    const box = document.getElementById('ch6-lines');
    if (box) {
      box.innerHTML = '';
      cfg.chapter6.lines.forEach((line, idx) => {
        const p = document.createElement('p');
        p.className = 'np-line' + (idx >= 3 ? ' highlight' : '');
        p.textContent = line;
        box.appendChild(p);
      });
    }
  }

  // Chapter 7: Memory Box Keepsakes
  if (Array.isArray(cfg.memoryBox)) {
    const container = document.getElementById('memory-box-container');
    if (container) {
      container.innerHTML = '';
      cfg.memoryBox.forEach(item => {
        const card = document.createElement('div');
        card.className = 'keepsake-card';
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `View keepsake: ${item.caption}`);

        let mediaHtml = '';
        if (item.image && item.image.trim() !== '') {
          mediaHtml = `<img src="${item.image}" alt="${escapeHTML(item.caption)}" class="keepsake-img" loading="lazy">`;
        } else {
          mediaHtml = `
            <div class="keepsake-empty-slot">
              <span class="slot-icon">✦</span>
              <span>kept in memory</span>
            </div>
          `;
        }

        card.innerHTML = `
          <div class="keepsake-polaroid-frame">
            ${mediaHtml}
          </div>
          <span class="keepsake-date">${escapeHTML(item.date)}</span>
          <p class="keepsake-caption">${escapeHTML(item.caption)}</p>
        `;

        const openModal = () => showKeepsakeModal(item);
        card.addEventListener('click', openModal);
        card.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openModal();
          }
        });

        container.appendChild(card);
      });
    }
  }

  // Chapter 8: The Letter
  if (cfg.letter) {
    const body = document.getElementById('letter-body');
    if (body) {
      body.innerHTML = '';
      if (cfg.letter.salutation) {
        const sal = document.createElement('h3');
        sal.className = 'letter-salutation';
        sal.textContent = cfg.letter.salutation;
        body.appendChild(sal);
      }
      if (Array.isArray(cfg.letter.paragraphs)) {
        cfg.letter.paragraphs.forEach(para => {
          const p = document.createElement('p');
          p.className = 'letter-p';
          if (para.includes('thank you')) p.classList.add('emphasis');
          p.innerHTML = escapeHTML(para).replace(/\\n/g, '<br>');
          body.appendChild(p);
        });
      }
      if (cfg.letter.signoff) {
        const sign = document.createElement('div');
        sign.className = 'letter-signoff';
        sign.textContent = cfg.letter.signoff;
        body.appendChild(sign);
      }
    }
  }

  // Final Screen Content
  if (cfg.finalScreen) {
    const elLead = document.getElementById('final-lead');
    const elSub = document.getElementById('final-sub');
    const btnLeave = document.getElementById('btn-leave-here');
    const btnTalk = document.getElementById('btn-talk-to-me');
    const peaceLine1 = document.getElementById('peace-line-1');
    const peaceLine2 = document.getElementById('peace-line-2');
    const peaceSign = document.getElementById('peace-signoff');

    if (elLead && cfg.finalScreen.lead) elLead.textContent = cfg.finalScreen.lead;
    if (elSub && cfg.finalScreen.sub) {
      elSub.innerHTML = cfg.finalScreen.sub.replace(/\\n/g, '<br>');
    }
    if (btnLeave && cfg.finalScreen.leaveOption) {
      btnLeave.querySelector('span').textContent = cfg.finalScreen.leaveOption;
    }
    if (btnTalk && cfg.finalScreen.talkOption) {
      btnTalk.querySelector('span').textContent = cfg.finalScreen.talkOption;
    }

    if (cfg.finalScreen.dismissMessage) {
      if (peaceLine1) peaceLine1.textContent = cfg.finalScreen.dismissMessage.line1;
      if (peaceLine2) peaceLine2.textContent = cfg.finalScreen.dismissMessage.line2;
      if (peaceSign) peaceSign.textContent = cfg.finalScreen.dismissMessage.signature || `— ${cfg.senderName || 'Yusuf'}`;
    }
  }
}

function escapeHTML(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function showKeepsakeModal(item) {
  const modal = document.getElementById('keepsake-modal');
  const contentArea = document.getElementById('modal-content-area');
  if (!modal || !contentArea) return;

  let mediaHtml = '';
  if (item.image && item.image.trim() !== '') {
    mediaHtml = `<div class="keepsake-polaroid-frame"><img src="${item.image}" alt="${escapeHTML(item.caption)}" class="keepsake-img"></div>`;
  }

  contentArea.innerHTML = `
    ${mediaHtml}
    <span class="keepsake-date" style="margin-top: 10px;">${escapeHTML(item.date)}</span>
    <h3 class="keepsake-caption" style="font-size: 1.5rem; margin: 4px 0 10px;">${escapeHTML(item.caption)}</h3>
    <p style="font-family: var(--font-serif); font-size: 1.15rem; color: var(--plum); line-height: 1.5;">${escapeHTML(item.note)}</p>
  `;

  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
}

function closeKeepsakeModal() {
  const modal = document.getElementById('keepsake-modal');
  if (modal) {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
  }
}

function goToChapter(chapterIndex, immediate = false) {
  if (AppState.isTransitioning || (chapterIndex === AppState.currentChapter && !immediate)) return;

  const scenes = document.querySelectorAll('section.scene');
  const targetScene = scenes[chapterIndex];

  if (!targetScene) return;

  const theme = targetScene.getAttribute('data-theme') || 'warm';
  if (theme === 'quiet') {
    document.body.classList.add('theme-quiet');
  } else {
    document.body.classList.remove('theme-quiet');
  }

  const indicator = document.getElementById('chapter-indicator');
  if (indicator) {
    indicator.textContent = `${chapterIndex} / ${AppState.totalChapters}`;
  }

  scenes.forEach((s, idx) => {
    if (idx === chapterIndex) {
      s.classList.add('active');
      s.scrollTop = 0;
    } else {
      s.classList.remove('active');
    }
  });

  AppState.currentChapter = chapterIndex;
  AppState.isTransitioning = false;
  onChapterEnter(chapterIndex);
}

function onChapterEnter(idx) {
  if (idx === 3) {
    runSilenceSequence();
  }
}

function openEnvelopeAndProceed() {
  const env = document.getElementById('envelope');
  if (!env) {
    goToChapter(1);
    return;
  }
  env.classList.add('open');
  setTimeout(() => {
    goToChapter(1);
  }, 850);
}

function runSilenceSequence() {
  const typingBubble = document.getElementById('typing-bubble');
  const emptySpace = document.getElementById('chat-empty-space');
  const calCounter = document.getElementById('cal-counter');

  if (typingBubble && emptySpace) {
    typingBubble.style.opacity = '1';
    emptySpace.classList.remove('visible');

    setTimeout(() => {
      typingBubble.style.opacity = '0';
      setTimeout(() => {
        emptySpace.classList.add('visible');
      }, 300);
    }, 2400);
  }

  if (calCounter) {
    if (AppState.calendarInterval) clearInterval(AppState.calendarInterval);
    let day = 1;
    calCounter.textContent = 'Day 1...';
    AppState.calendarInterval = setInterval(() => {
      day += Math.floor(Math.random() * 8) + 4;
      if (day > 140) {
        calCounter.textContent = 'Months passed...';
        clearInterval(AppState.calendarInterval);
      } else {
        calCounter.textContent = `Day ${day}...`;
      }
    }, 180);
  }
}

function handleTalkToMe() {
  const cfg = window.MOMENT_CONFIG || {};
  const contact = cfg.contact || {};

  if (contact.customUrl && contact.customUrl.trim() !== '') {
    window.open(contact.customUrl, '_blank', 'noopener,noreferrer');
    return;
  }

  const phone = contact.whatsappNumber ? contact.whatsappNumber.replace(/[^0-9]/g, '') : '';
  const message = encodeURIComponent(contact.message || 'Hey Yusuf...');

  let url = '';
  if (phone) {
    url = `https://wa.me/${phone}?text=${message}`;
  } else {
    url = `https://wa.me/?text=${message}`;
  }

  window.open(url, '_blank', 'noopener,noreferrer');
}

function handleLeaveItHere() {
  const choiceCard = document.getElementById('final-card-choice');
  const peaceCard = document.getElementById('leave-peace-card');

  if (choiceCard && peaceCard) {
    choiceCard.style.opacity = '0';
    setTimeout(() => {
      choiceCard.style.display = 'none';
      peaceCard.classList.remove('hidden');
    }, 350);
  }
}

function initAudioEngine() {
  const btn = document.getElementById('btn-sound');
  const label = document.getElementById('sound-label');
  const iconOff = document.querySelector('.sound-icon-off');
  const iconOn = document.querySelector('.sound-icon-on');

  if (!btn) return;

  btn.addEventListener('click', () => {
    if (!AppState.audioActive) {
      startAmbientAudio();
      AppState.audioActive = true;
      btn.classList.add('active');
      if (label) label.textContent = 'ambient on';
      if (iconOff) iconOff.classList.add('hidden');
      if (iconOn) iconOn.classList.remove('hidden');
    } else {
      stopAmbientAudio();
      AppState.audioActive = false;
      btn.classList.remove('active');
      if (label) label.textContent = 'ambient off';
      if (iconOff) iconOff.classList.remove('hidden');
      if (iconOn) iconOn.classList.add('hidden');
    }
  });
}

function startAmbientAudio() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    if (!AppState.audioContext) {
      AppState.audioContext = new AudioContext();
    }
    if (AppState.audioContext.state === 'suspended') {
      AppState.audioContext.resume();
    }

    const ctx = AppState.audioContext;
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
    masterGain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 3.0);

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, ctx.currentTime);
    filter.Q.setValueAtTime(1.0, ctx.currentTime);

    const chord = [146.83, 185.00, 220.00, 277.18];
    const oscillators = [];

    chord.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(0.15 + (i * 0.05), ctx.currentTime);
      lfoGain.gain.setValueAtTime(1.2, ctx.currentTime);
      lfo.connect(osc.frequency);
      lfo.start();

      oscGain.gain.setValueAtTime(0.22, ctx.currentTime);
      osc.connect(oscGain);
      oscGain.connect(filter);
      osc.start();

      oscillators.push(osc);
    });

    filter.connect(masterGain);
    masterGain.connect(ctx.destination);

    AppState.audioNodes = { masterGain, oscillators };
  } catch (err) {
    console.warn('Ambient audio could not be initialized:', err);
  }
}

function stopAmbientAudio() {
  if (AppState.audioNodes && AppState.audioContext) {
    const { masterGain, oscillators } = AppState.audioNodes;
    const ctx = AppState.audioContext;
    try {
      masterGain.gain.setValueAtTime(masterGain.gain.value, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);
      setTimeout(() => {
        oscillators.forEach(osc => {
          try { osc.stop(); } catch (e) {}
        });
        AppState.audioNodes = null;
      }, 1300);
    } catch (e) {
      AppState.audioNodes = null;
    }
  }
}

function initParticles() {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const particles = [];
  const particleCount = Math.min(26, Math.floor(width / 35));

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.8 + 0.8,
      dx: (Math.random() - 0.5) * 0.3,
      dy: -Math.random() * 0.4 - 0.1,
      alpha: Math.random() * 0.45 + 0.15,
      pulse: Math.random() * Math.PI * 2
    });
  }

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  function render() {
    ctx.clearRect(0, 0, width, height);

    for (let p of particles) {
      p.x += p.dx;
      p.y += p.dy;
      p.pulse += 0.02;

      if (p.y < -10) {
        p.y = height + 10;
        p.x = Math.random() * width;
      }
      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;

      const currentAlpha = p.alpha + Math.sin(p.pulse) * 0.12;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(168, 140, 115, ${Math.max(0.04, currentAlpha)})`;
      ctx.fill();
    }

    requestAnimationFrame(render);
  }

  render();
}

function setupEventListeners() {
  const envWrapper = document.getElementById('envelope-wrapper');
  const btnOpenEnv = document.getElementById('cta-open-envelope');
  if (envWrapper) envWrapper.addEventListener('click', openEnvelopeAndProceed);
  if (btnOpenEnv) btnOpenEnv.addEventListener('click', openEnvelopeAndProceed);

  const cta1 = document.getElementById('cta-ch1');
  if (cta1) cta1.addEventListener('click', () => goToChapter(2));

  const cta2 = document.getElementById('cta-ch2');
  if (cta2) cta2.addEventListener('click', () => goToChapter(3));

  const cta3 = document.getElementById('cta-ch3');
  if (cta3) cta3.addEventListener('click', () => goToChapter(4));

  const cta4 = document.getElementById('cta-ch4');
  if (cta4) cta4.addEventListener('click', () => goToChapter(5));

  const cta5 = document.getElementById('cta-ch5');
  if (cta5) cta5.addEventListener('click', () => goToChapter(6));

  const cta6 = document.getElementById('cta-ch6');
  if (cta6) cta6.addEventListener('click', () => goToChapter(7));

  const cta7 = document.getElementById('cta-ch7');
  if (cta7) cta7.addEventListener('click', () => goToChapter(8));

  const cta8 = document.getElementById('cta-ch8');
  if (cta8) cta8.addEventListener('click', () => goToChapter(9));

  const modalClose = document.getElementById('modal-close');
  const modalBackdrop = document.getElementById('modal-backdrop');
  if (modalClose) modalClose.addEventListener('click', closeKeepsakeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeKeepsakeModal);
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeKeepsakeModal();
  });

  const btnTalk = document.getElementById('btn-talk-to-me');
  const btnLeave = document.getElementById('btn-leave-here');
  if (btnTalk) btnTalk.addEventListener('click', handleTalkToMe);
  if (btnLeave) btnLeave.addEventListener('click', handleLeaveItHere);
}

function initApp() {
  populateExperienceContent();
  setupEventListeners();
  initAudioEngine();
  initParticles();

  try {
    const params = new URLSearchParams(window.location.search);
    const startCh = parseInt(params.get('chapter'), 10);
    if (!isNaN(startCh) && startCh >= 0 && startCh <= AppState.totalChapters + 1) {
      goToChapter(startCh, true);
    }
  } catch (e) {}
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}