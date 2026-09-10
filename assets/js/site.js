/* ==========================================================================
   site.js — behaviour shared by every visual variant.
   No dependencies, no build step. Everything degrades gracefully: with
   JavaScript off the page is still readable and navigable.
   ========================================================================== */

(function () {
  'use strict';

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------- header state on scroll */

  var header = document.querySelector('.site-header');

  function updateHeader() {
    if (!header) return;
    header.classList.toggle('is-stuck', window.scrollY > 24);
  }

  /* --------------------------------------------------------- mobile navigation */

  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.site-nav');

  /* Jedno miejsce ustawiające stan menu. Wcześniej otwieranie i zamykanie
     robiły to osobno i mogły się rozjechać. Klasa na pasku jest tu istotna:
     zdejmuje z niego backdrop-filter, który sprawiał, że pełnoekranowe menu
     kotwiczyło się do paska zamiast do okna. */
  function setNav(open) {
    if (!toggle || !nav) return;
    toggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
    if (header) header.classList.toggle('nav-open', open);
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.removeProperty('overflow');
    }
  }

  function closeNav() { setNav(false); }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      setNav(toggle.getAttribute('aria-expanded') !== 'true');
    });

    nav.addEventListener('click', function (event) {
      if (event.target.closest('a')) closeNav();
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeNav();
    });

    // Po przekroczeniu progu mobilnego menu przestaje istnieć jako warstwa,
    // ale stan zostawał otwarty i blokował przewijanie strony.
    var wide = window.matchMedia('(min-width: 52.0625rem)');
    var onBreakpoint = function (event) { if (event.matches) closeNav(); };

    if (typeof wide.addEventListener === 'function') {
      wide.addEventListener('change', onBreakpoint);
    } else if (typeof wide.addListener === 'function') {
      wide.addListener(onBreakpoint);
    }
  }

  /* ----------------------------------------------------- reveal on scroll */

  var revealables = document.querySelectorAll('.reveal, .step');

  if ('IntersectionObserver' in window && !reducedMotion) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.1 });

    revealables.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealables.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ------------------------------------------- active section in the navbar */

  var sections = document.querySelectorAll('main section[id]');
  var navLinks = {};

  document.querySelectorAll('.site-nav a[href^="#"]').forEach(function (link) {
    navLinks[link.getAttribute('href').slice(1)] = link;
  });

  if ('IntersectionObserver' in window && sections.length) {
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var link = navLinks[entry.target.id];
        if (!link) return;
        if (entry.isIntersecting) {
          Object.keys(navLinks).forEach(function (id) {
            navLinks[id].classList.remove('is-active');
            navLinks[id].removeAttribute('aria-current');
          });
          link.classList.add('is-active');
          link.setAttribute('aria-current', 'true');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach(function (section) { navObserver.observe(section); });
  }

  /* ------------------------------------------------------ counting numbers */

  function runCounter(el) {
    var target = parseFloat(el.dataset.count);
    if (isNaN(target)) return;
    var duration = 1400;
    var start = performance.now();

    function tick(now) {
      var progress = Math.min((now - start) / duration, 1);
      // easeOutExpo, so the number lands softly instead of stopping dead
      var eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      el.textContent = String(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  var counters = document.querySelectorAll('[data-count]');

  if ('IntersectionObserver' in window && !reducedMotion) {
    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        runCounter(entry.target);
        counterObserver.unobserve(entry.target);
      });
    }, { threshold: 0.6 });

    counters.forEach(function (el) { counterObserver.observe(el); });
  } else {
    counters.forEach(function (el) { el.textContent = el.dataset.count; });
  }

  /* -------------------------------------------------------------- parallax */

  var parallaxLayers = document.querySelectorAll('[data-parallax]');
  var ticking = false;

  function applyParallax() {
    var offset = window.scrollY;
    parallaxLayers.forEach(function (layer) {
      var depth = parseFloat(layer.dataset.parallax) || 0.2;
      layer.style.transform = 'translate3d(0,' + (offset * depth).toFixed(2) + 'px,0)';
    });
  }

  function onScroll() {
    updateHeader();
    if (ticking || reducedMotion || !parallaxLayers.length) return;
    ticking = true;
    requestAnimationFrame(function () {
      applyParallax();
      ticking = false;
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  updateHeader();

  /* ----------------------------------------------------- magnetic buttons */

  if (!reducedMotion && window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('[data-magnetic]').forEach(function (btn) {
      btn.addEventListener('mousemove', function (event) {
        var box = btn.getBoundingClientRect();
        var x = event.clientX - box.left - box.width / 2;
        var y = event.clientY - box.top - box.height / 2;
        btn.style.transform = 'translate(' + x * 0.18 + 'px,' + (y * 0.18 - 2) + 'px)';
      });
      btn.addEventListener('mouseleave', function () {
        btn.style.removeProperty('transform');
      });
    });
  }

  /* ---------------------------------------------------------- mock form */

  var form = document.querySelector('.form');
  var status = document.querySelector('.form-status');

  if (form) {
    form.addEventListener('submit', function (event) {
      // Deliberate: this is a mockup. There is no backend and nothing is sent
      // anywhere. Wiring this up is a separate decision, not a silent default.
      event.preventDefault();
      if (!status) return;
      status.hidden = false;
      status.textContent =
        'To makieta — formularz niczego nie wysyła. Obsługę wiadomości ustalimy osobno.';
      status.focus();
    });
  }

  /* --------------------------------------------------- variant switcher */

  var here = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.switcher a[href]').forEach(function (link) {
    if (link.getAttribute('href') === here) link.setAttribute('aria-current', 'page');
  });

  /* ------------------------------------------------------- mock calendar */

  var calGrid = document.querySelector('.cal-grid');
  var calMonth = document.querySelector('.cal-month');

  if (calGrid) {
    var DOW = ['Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob', 'Nie'];
    var MONTHS = ['styczeń', 'luty', 'marzec', 'kwiecień', 'maj', 'czerwiec', 'lipiec',
                  'sierpień', 'wrzesień', 'październik', 'listopad', 'grudzień'];

    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth();
    var first = new Date(year, month, 1);
    var daysInMonth = new Date(year, month + 1, 0).getDate();
    // getDay() is Sunday-first; Polish calendars start on Monday.
    var leading = (first.getDay() + 6) % 7;

    if (calMonth) calMonth.textContent = MONTHS[month] + ' ' + year;

    DOW.forEach(function (name) {
      var cell = document.createElement('div');
      cell.className = 'cal-dow';
      cell.textContent = name;
      calGrid.appendChild(cell);
    });

    // Placeholder availability. Nothing here is real: it exists so the layout
    // can be judged. A booking module is a separate ticket.
    var freeDays = [3, 4, 8, 11, 15, 17, 22, 24, 29];
    var takenDays = [5, 10, 16, 23];

    for (var slot = 0; slot < leading; slot++) {
      var blank = document.createElement('div');
      blank.className = 'cal-day is-muted';
      calGrid.appendChild(blank);
    }

    for (var day = 1; day <= daysInMonth; day++) {
      var cell2 = document.createElement('div');
      cell2.className = 'cal-day';

      var num = document.createElement('span');
      num.textContent = String(day);
      cell2.appendChild(num);

      if (freeDays.indexOf(day) !== -1) {
        cell2.classList.add('is-free');
        cell2.appendChild(makeSlot('wolne'));
      } else if (takenDays.indexOf(day) !== -1) {
        cell2.classList.add('is-taken');
        cell2.appendChild(makeSlot('zajęte'));
      }

      calGrid.appendChild(cell2);
    }

    // Domknięcie ostatniego wiersza, żeby siatka nie kończyła się szarą dziurą.
    var placed = leading + daysInMonth;
    var trailing = (7 - (placed % 7)) % 7;

    for (var rest = 0; rest < trailing; rest++) {
      var tail = document.createElement('div');
      tail.className = 'cal-day is-muted';
      calGrid.appendChild(tail);
    }
  }

  /* ------------------------------------------------- karuzela opinii */

  /* Poziome przewijanie i przyciąganie robi CSS. Tutaj dokładamy tylko
     kropki: pokazują, ile jest opinii i którą się widzi. Na szerokim
     ekranie CSS je chowa, a siatka działa jak wcześniej. */
  var quotes = document.querySelector('.quotes');
  var slides = quotes ? Array.prototype.slice.call(quotes.children) : [];

  if (quotes && slides.length > 1) {
    var dots = document.createElement('div');
    dots.className = 'quotes-dots';

    var offsetOf = function (slide) {
      return slide.getBoundingClientRect().left
        - quotes.getBoundingClientRect().left
        + quotes.scrollLeft;
    };

    slides.forEach(function (slide, index) {
      var dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('aria-label', 'Opinia ' + (index + 1) + ' z ' + slides.length);
      dot.addEventListener('click', function () {
        quotes.scrollTo({
          left: offsetOf(slide),
          behavior: reducedMotion ? 'auto' : 'smooth'
        });
      });
      dots.appendChild(dot);
    });

    quotes.parentNode.insertBefore(dots, quotes.nextSibling);

    var syncDots = function () {
      var middle = quotes.scrollLeft + quotes.clientWidth / 2;
      var nearest = 0;
      var shortest = Infinity;

      slides.forEach(function (slide, index) {
        var distance = Math.abs(offsetOf(slide) + slide.offsetWidth / 2 - middle);
        if (distance < shortest) { shortest = distance; nearest = index; }
      });

      Array.prototype.forEach.call(dots.children, function (dot, index) {
        dot.setAttribute('aria-current', String(index === nearest));
      });
    };

    var pending = false;
    quotes.addEventListener('scroll', function () {
      if (pending) return;
      pending = true;
      requestAnimationFrame(function () { syncDots(); pending = false; });
    }, { passive: true });

    syncDots();
  }

  function makeSlot(text) {
    var slot = document.createElement('span');
    slot.className = 'cal-slot';
    slot.textContent = text;
    return slot;
  }
})();
