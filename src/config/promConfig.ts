// Assets – keep existing images as placeholders; swap when real prom assets are ready.
import heroImg from '../assets/hero.png';           // replace with prom hero photo
import heroDesktopImg from '../assets/hero_desktop.png';
import locationImg from '../assets/kyustendil.jpg';  // replace with venue photo
import desktopVideo from '../assets/desktop.mp4';
import desktopImage from '../assets/desktop.png';
import mobileVideo from '../assets/mobile.mp4';
import mobileImage from '../assets/mobile.png';

import ordinaryMusic from '../assets/ordinary.mp3';

export const promConfig = {
  // ─── General ────────────────────────────────────────────────
  meta: {
    title: "Дани - Абитуриентски бал",
    language: "bg", // 'bg' | 'en'
    music: ordinaryMusic,
  },

  // ─── Graduate / Celebrant ──────────────────────────────────
  graduate: {
    name: "Дани Бацанов",
    classOf: "Випуск 2026",
    initials: "ДБ",
    hashtag: "#PromDani2026",
  },

  // ─── Date & Time ───────────────────────────────────────────
  date: {
    isoDate: "2026-05-30T18:00:00",
    displayDate: "Събота, 30 Май 2026",
    timeOnly: "18:00",
    year: "2026",
  },

  contact: {
    phone: "+359 896700780",
  },

  // ─── Hero Section ──────────────────────────────────────────
  hero: {
    subtitle: "Абитуриентски бал",
    bgImage: {
      mobile: heroImg,
      desktop: heroDesktopImg,
    },
  },

  // ─── Countdown ─────────────────────────────────────────────
  countdown: {
    sectionLabel: "Броим до",
    mainTitle: "Голямoто парти",
    dateDisplay: "Май 30, 2026 • 18:00",
    labels: {
      days: "Дни",
      hours: "Часове",
      minutes: "Минути",
      seconds: "Секунди",
    },
  },

  // ─── Location ──────────────────────────────────────────────
  location: {
    title: "Мястото",
    city: "Хотел \"Велбъжд\"",
    image: locationImg,
    mapUrl: "", // Optional Google Maps URL
  },

  // ─── Survival Guide ────────────────────────────────────────
  survivalGuide: {
    title: "Survival Guide",
    subtitle: "Наръчник за оцеляване",
    items: [
      {
        id: 1,
        text: "Удобни обувки в багажника – задължително!",
        icon: "shoe",
      },
      {
        id: 2,
        text: "Аспирин за следващата сутрин – препоръчително.",
        icon: "pill",
      },
      {
        id: 3,
        text: "Диетите се прекъсват в 20:00 ч.",
        icon: "pizza",
      },
    ],
  },

  // ─── RSVP ──────────────────────────────────────────────────
  rsvp: {
    sectionTitle: "Ще присъстваш ли?",
    mainTitle: "Потвърждение",
    description:
      "Ще се радвам да споделиш тази специална вечер с мен. Моля, потвърди присъствието си, като попълниш формата по-долу.",
    form: {
      nameLabel: "Вашето име *",
      namePlaceholder: "Въведете вашето име",
      attendingLabel: "Ще присъствате ли? *",
      attendingOptionYes: "С радост приемам",
      attendingOptionNo: "За съжаление отказвам",
      guestsCountLabel: "Брой гости *",
      additionalGuestsLabel: "Имена на допълнителните гости *",
      additionalGuestPlaceholderPrefix: "Гост",
      messageLabel: "Послание към абитуриента",
      messagePlaceholder: "Споделете вашите пожелания или съобщение...",
      submitButton: "Изпрати",
      submitButtonLoading: "Изпращане...",
      deadlineText: "Моля, отговорете до 10 май 2026",
      successTitle: "Благодарим Ви!",
      successMessage:
        "Вашият отговор беше получен. Нямаме търпение да празнуваме заедно!",
      successButton: "Изпрати друг отговор",
      errorMessage:
        "Възникна грешка. Моля, опитайте отново или се свържете директно с нас.",
    },
  },

  // ─── Envelope (intro animation) ────────────────────────────
  envelope: {
    hintText: "Натисни за отваряне",
    video: {
      desktop: desktopVideo,
      mobile: mobileVideo,
    },
    image: {
      desktop: desktopImage,
      mobile: mobileImage,
    },
  },

  // ─── Panic Button ──────────────────────────────────────────
  panicButton: {
    label: "ПАНИКА",
    message: "СПОКОЙНО! Дипломата е взета, костюмът става, всичко е под контрол. Просто елате!",
  },

  // ─── Footer ────────────────────────────────────────────────
  footer: {
    copyrightMeta: "Designed by vibeinvite.bg",
    navItems: [
      { label: 'Начало', href: 'home' },
      { label: 'Локация', href: 'location' },
      { label: 'Survival Guide', href: 'survival-guide' },
      { label: 'Потвърждение', href: 'rsvp' },
    ],
  },
};
