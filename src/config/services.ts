import type { Localized } from '@/lib/types';
import type { Locale } from '@/i18n/routing';
import type { IconName } from '@/components/icons/icon-set';

export interface ServiceFaq {
  question: Localized;
  answer: Localized;
}

export interface ServiceFeature {
  title: Localized;
  description: Localized;
}

export interface Service {
  id: string;
  /** Locale-specific URL slug (used by the [slug] route + hreflang mapping). */
  slug: Localized;
  icon: IconName;
  order: number;
  title: Localized;
  tagline: Localized;
  summary: Localized;
  intro: Localized;
  forWhom: Localized<string[]>;
  problems: Localized<string[]>;
  includes: ServiceFeature[];
  process: ServiceFeature[];
  outcomes: Localized<string[]>;
  faqs: ServiceFaq[];
  related: string[];
  seo: {
    title: Localized;
    description: Localized;
    primaryKeyword: Localized;
    /** Documented primary search intent for the SEO keyword map. */
    intent: string;
  };
}

export const services: Service[] = [
  {
    id: 'web-development',
    slug: { de: 'webentwicklung', en: 'web-development' },
    icon: 'browser',
    order: 1,
    title: { de: 'Webentwicklung', en: 'Web development' },
    tagline: {
      de: 'Websites und Web‑Apps, die schnell laden und Ergebnisse bringen.',
      en: 'Websites and web apps that load fast and earn their keep.',
    },
    summary: {
      de: 'Von der Unternehmenswebsite bis zur individuellen Web‑Applikation – performant, barrierearm und gut auffindbar.',
      en: 'From a company website to a bespoke web application — fast, accessible and easy to find.',
    },
    intro: {
      de: 'Wir entwickeln Websites und Web‑Anwendungen, die nicht nur gut aussehen, sondern messbar funktionieren: kurze Ladezeiten, saubere Struktur für Suchmaschinen und eine Bedienung, die auf jedem Gerät klar bleibt. Statt fertiger Baukästen schreiben wir wartbaren Code, der zu Ihren Inhalten und Prozessen passt.',
      en: 'We build websites and web applications that look right and measurably perform: short load times, a clean structure for search engines and an interface that stays clear on every device. Instead of generic page builders we write maintainable code that fits your content and processes.',
    },
    forWhom: {
      de: [
        'Unternehmen, die eine professionelle, schnelle Website brauchen',
        'Teams, die eine bestehende Seite ablösen oder neu aufstellen',
        'Projekte mit individuellen Funktionen statt Standard‑Baukasten',
      ],
      en: [
        'Companies that need a professional, fast website',
        'Teams replacing or rebuilding an existing site',
        'Projects that need custom features, not a template',
      ],
    },
    problems: {
      de: [
        'Die aktuelle Seite lädt langsam oder wirkt veraltet',
        'Inhalte lassen sich nur umständlich pflegen',
        'Auf dem Smartphone bricht das Layout oder wird unleserlich',
        'Die Seite wird bei Google kaum gefunden',
      ],
      en: [
        'The current site is slow or feels dated',
        'Content is awkward to maintain',
        'The layout breaks or becomes unreadable on phones',
        'The site is hard to find on Google',
      ],
    },
    includes: [
      {
        title: { de: 'Konzept & Informationsarchitektur', en: 'Concept & information architecture' },
        description: {
          de: 'Wir strukturieren Inhalte und Nutzerführung, bevor eine Zeile Code entsteht.',
          en: 'We structure content and user flow before a line of code is written.',
        },
      },
      {
        title: { de: 'Design‑System & Umsetzung', en: 'Design system & build' },
        description: {
          de: 'Ein konsistentes, barrierearmes Interface – responsiv von 360 px bis Desktop.',
          en: 'A consistent, accessible interface — responsive from 360 px up to desktop.',
        },
      },
      {
        title: { de: 'Redaktionelle Pflege', en: 'Editable content' },
        description: {
          de: 'Inhalte pflegen Sie selbst – mit klaren Strukturen statt Baukasten‑Wildwuchs.',
          en: 'You maintain content yourself — with clear structures, not page-builder sprawl.',
        },
      },
      {
        title: { de: 'Technisches SEO‑Fundament', en: 'Technical SEO foundation' },
        description: {
          de: 'Saubere Metadaten, strukturierte Daten, Sitemap und schnelle Core Web Vitals.',
          en: 'Clean metadata, structured data, sitemap and fast Core Web Vitals.',
        },
      },
    ],
    process: [
      {
        title: { de: '1 · Verstehen', en: '1 · Understand' },
        description: {
          de: 'Ziele, Zielgruppe und Inhalte klären. Ergebnis ist ein konkreter Umfang.',
          en: 'Clarify goals, audience and content. The result is a concrete scope.',
        },
      },
      {
        title: { de: '2 · Gestalten', en: '2 · Design' },
        description: {
          de: 'Struktur und Oberfläche entstehen als überprüfbares Design‑System.',
          en: 'Structure and interface take shape as a reviewable design system.',
        },
      },
      {
        title: { de: '3 · Entwickeln', en: '3 · Build' },
        description: {
          de: 'Umsetzung in sauberem Code, regelmäßig sicht‑ und testbar.',
          en: 'Implementation in clean code, regularly visible and testable.',
        },
      },
      {
        title: { de: '4 · Live & Betreuung', en: '4 · Launch & care' },
        description: {
          de: 'Start, Übergabe und – auf Wunsch – laufende Wartung.',
          en: 'Launch, handover and — if you want — ongoing maintenance.',
        },
      },
    ],
    outcomes: {
      de: [
        'Schnelle, stabile Website auf aktueller Technik',
        'Bessere Auffindbarkeit durch sauberes technisches SEO',
        'Inhalte, die Ihr Team selbst pflegen kann',
      ],
      en: [
        'A fast, stable website on current technology',
        'Better discoverability through clean technical SEO',
        'Content your team can maintain itself',
      ],
    },
    faqs: [
      {
        question: { de: 'Arbeitet ihr mit WordPress oder individuell?', en: 'Do you use WordPress or build custom?' },
        answer: {
          de: 'Beides ist möglich. Wir wählen die Technik nach Ihrem Bedarf – ein wartbares CMS, wenn Sie viel selbst pflegen, oder eine individuelle Lösung, wenn Funktionen im Vordergrund stehen.',
          en: 'Both are possible. We choose the technology to fit your needs — a maintainable CMS when you edit a lot yourself, or a custom build when features come first.',
        },
      },
      {
        question: { de: 'Kann ich Inhalte selbst ändern?', en: 'Can I change content myself?' },
        answer: {
          de: 'Ja. Wir richten die Pflege so ein, dass typische Änderungen ohne Entwickler möglich sind, und erklären die Bedienung.',
          en: 'Yes. We set up editing so typical changes are possible without a developer, and we explain how it works.',
        },
      },
    ],
    related: ['custom-software', 'maintenance', 'automation-integration'],
    seo: {
      title: {
        de: 'Webentwicklung Wien – Websites & Web‑Apps | DevHash',
        en: 'Web development in Vienna – websites & web apps | DevHash',
      },
      description: {
        de: 'Professionelle Webentwicklung aus Wien: schnelle, barrierearme Websites und individuelle Web‑Applikationen mit sauberem technischem SEO.',
        en: 'Professional web development from Vienna: fast, accessible websites and custom web applications with a clean technical SEO foundation.',
      },
      primaryKeyword: { de: 'Webentwicklung Wien', en: 'web development Vienna' },
      intent: 'Commercial — find a web development partner in Vienna/Austria.',
    },
  },
  {
    id: 'custom-software',
    slug: { de: 'softwareentwicklung', en: 'custom-software' },
    icon: 'code',
    order: 2,
    title: { de: 'Softwareentwicklung', en: 'Custom software' },
    tagline: {
      de: 'Individuelle Software für genau Ihren Ablauf – nicht von der Stange.',
      en: 'Custom software shaped around your exact workflow — not off the shelf.',
    },
    summary: {
      de: 'Maßgeschneiderte Anwendungen, interne Tools und Portale, die echte Arbeitsabläufe abbilden statt Kompromisse zu erzwingen.',
      en: 'Tailored applications, internal tools and portals that mirror real workflows instead of forcing compromises.',
    },
    intro: {
      de: 'Wenn Standardsoftware an ihre Grenzen stößt, bauen wir individuelle Anwendungen, die genau Ihre Abläufe abbilden. Wir starten klein und überprüfbar, liefern in nachvollziehbaren Schritten und achten von Anfang an auf Wartbarkeit, damit die Lösung mit Ihnen mitwachsen kann.',
      en: 'When standard software hits its limits, we build custom applications that mirror your exact processes. We start small and verifiable, deliver in clear steps and design for maintainability from the outset, so the solution can grow with you.',
    },
    forWhom: {
      de: [
        'Unternehmen mit Abläufen, die kein Standardprodukt sauber abbildet',
        'Teams, die mehrere Tabellen und Insellösungen ablösen wollen',
        'Organisationen, die ein internes Portal oder Dashboard brauchen',
      ],
      en: [
        'Companies whose processes no standard product maps cleanly',
        'Teams replacing scattered spreadsheets and point solutions',
        'Organisations that need an internal portal or dashboard',
      ],
    },
    problems: {
      de: [
        'Wichtige Abläufe hängen an fragilen Excel‑Dateien',
        'Daten liegen verstreut in mehreren Systemen',
        'Standardsoftware erzwingt umständliche Workarounds',
        'Manuelle Schritte kosten täglich Zeit und verursachen Fehler',
      ],
      en: [
        'Key processes depend on fragile spreadsheets',
        'Data is scattered across several systems',
        'Standard software forces clumsy workarounds',
        'Manual steps cost time daily and cause errors',
      ],
    },
    includes: [
      {
        title: { de: 'Anforderungs‑Klärung', en: 'Requirements discovery' },
        description: {
          de: 'Wir übersetzen Ihren Ablauf in einen klaren, priorisierten Umfang.',
          en: 'We translate your workflow into a clear, prioritised scope.',
        },
      },
      {
        title: { de: 'Datenmodell & Architektur', en: 'Data model & architecture' },
        description: {
          de: 'Ein tragfähiges Fundament, das spätere Erweiterungen erlaubt.',
          en: 'A solid foundation that allows for later extension.',
        },
      },
      {
        title: { de: 'Schrittweise Lieferung', en: 'Incremental delivery' },
        description: {
          de: 'Funktionierende Teilstände statt langer Black‑Box‑Phasen.',
          en: 'Working increments instead of long black-box phases.',
        },
      },
      {
        title: { de: 'Tests & Dokumentation', en: 'Tests & documentation' },
        description: {
          de: 'Automatisierte Tests und eine Übergabe, die Sie unabhängig macht.',
          en: 'Automated tests and a handover that keeps you independent.',
        },
      },
    ],
    process: [
      {
        title: { de: '1 · Discovery', en: '1 · Discovery' },
        description: {
          de: 'Abläufe, Daten und Prioritäten aufnehmen und einen ersten Schnitt definieren.',
          en: 'Capture processes, data and priorities and define a first slice.',
        },
      },
      {
        title: { de: '2 · Prototyp', en: '2 · Prototype' },
        description: {
          de: 'Ein schmaler, lauffähiger Durchstich bestätigt die Richtung früh.',
          en: 'A thin, working slice confirms the direction early.',
        },
      },
      {
        title: { de: '3 · Ausbau', en: '3 · Build out' },
        description: {
          de: 'Funktionen kommen in Iterationen dazu – mit klarer Priorisierung.',
          en: 'Features arrive in iterations — with clear prioritisation.',
        },
      },
      {
        title: { de: '4 · Betrieb', en: '4 · Operate' },
        description: {
          de: 'Stabiler Betrieb, Monitoring und Weiterentwicklung nach Bedarf.',
          en: 'Stable operation, monitoring and further development as needed.',
        },
      },
    ],
    outcomes: {
      de: [
        'Weniger manuelle Schritte und Medienbrüche',
        'Ein System, das genau zu Ihrem Ablauf passt',
        'Eine wartbare Basis, die sich erweitern lässt',
      ],
      en: [
        'Fewer manual steps and data hand-offs',
        'A system that fits your workflow exactly',
        'A maintainable base that can be extended',
      ],
    },
    faqs: [
      {
        question: { de: 'Wie stellt ihr sicher, dass das Budget hält?', en: 'How do you keep the budget under control?' },
        answer: {
          de: 'Wir schneiden das Projekt in kleine, lieferbare Schritte. Nach jedem Schritt sehen Sie ein Ergebnis und entscheiden über den nächsten – das hält Risiko und Kosten überschaubar.',
          en: 'We slice the project into small, deliverable steps. After each step you see a result and decide on the next — keeping risk and cost manageable.',
        },
      },
      {
        question: { de: 'Gehört der Code uns?', en: 'Do we own the code?' },
        answer: {
          de: 'Ja. Sie erhalten den Quellcode und eine Dokumentation, sodass Sie nicht von uns abhängig sind.',
          en: 'Yes. You receive the source code and documentation, so you are not dependent on us.',
        },
      },
    ],
    related: ['web-development', 'automation-integration', 'maintenance'],
    seo: {
      title: {
        de: 'Softwareentwicklung Wien – individuelle Software | DevHash',
        en: 'Custom software development in Austria | DevHash',
      },
      description: {
        de: 'Individuelle Softwareentwicklung aus Wien: maßgeschneiderte Anwendungen, interne Tools und Portale – schrittweise geliefert und wartbar gebaut.',
        en: 'Custom software development from Vienna: tailored applications, internal tools and portals — delivered incrementally and built to maintain.',
      },
      primaryKeyword: { de: 'Softwareentwicklung Wien', en: 'custom software development Austria' },
      intent: 'Commercial — find a partner for individual/custom software in Austria.',
    },
  },
  {
    id: 'automation-integration',
    slug: { de: 'automatisierung-integration', en: 'automation-integration' },
    icon: 'flow',
    order: 3,
    title: { de: 'Automatisierung & Integration', en: 'Automation & integration' },
    tagline: {
      de: 'Systeme verbinden, wiederkehrende Arbeit automatisieren.',
      en: 'Connect systems, automate repetitive work.',
    },
    summary: {
      de: 'Workflow‑Automatisierung, API‑Integration und Systemintegration, damit Ihre Tools zusammenarbeiten statt nebeneinander.',
      en: 'Workflow automation, API integration and systems integration so your tools work together instead of side by side.',
    },
    intro: {
      de: 'Viele Stunden gehen für Aufgaben verloren, die sich wiederholen: Daten von A nach B kopieren, Listen abgleichen, Bescheide erstellen. Wir verbinden Ihre Systeme über ihre Schnittstellen und automatisieren wiederkehrende Abläufe – zuverlässig, nachvollziehbar und mit klaren Fehlermeldungen, wenn doch einmal etwas hakt.',
      en: 'A lot of hours disappear into repetitive tasks: copying data from A to B, reconciling lists, generating documents. We connect your systems through their interfaces and automate recurring processes — reliably, transparently, and with clear error reporting when something does go wrong.',
    },
    forWhom: {
      de: [
        'Teams, die Daten manuell zwischen Tools übertragen',
        'Unternehmen mit mehreren Systemen, die nicht miteinander reden',
        'Abläufe mit vielen gleichförmigen, wiederkehrenden Schritten',
      ],
      en: [
        'Teams moving data manually between tools',
        'Companies with several systems that do not talk to each other',
        'Processes with many uniform, repetitive steps',
      ],
    },
    problems: {
      de: [
        'Dieselben Daten werden mehrfach eingegeben',
        'Schnittstellen zwischen Tools fehlen',
        'Wiederkehrende Aufgaben binden teure Arbeitszeit',
        'Fehler durch manuelle Übertragung schleichen sich ein',
      ],
      en: [
        'The same data is entered more than once',
        'Interfaces between tools are missing',
        'Recurring tasks tie up expensive working time',
        'Manual transfer introduces errors',
      ],
    },
    includes: [
      {
        title: { de: 'Ablauf‑Analyse', en: 'Process analysis' },
        description: {
          de: 'Wir identifizieren, welche Schritte sich wirklich lohnen zu automatisieren.',
          en: 'We identify which steps are genuinely worth automating.',
        },
      },
      {
        title: { de: 'API‑ & Systemintegration', en: 'API & systems integration' },
        description: {
          de: 'Sichere Verbindungen zwischen Ihren Anwendungen und Datenquellen.',
          en: 'Secure connections between your applications and data sources.',
        },
      },
      {
        title: { de: 'Robuste Automatisierung', en: 'Robust automation' },
        description: {
          de: 'Mit Protokollierung und Benachrichtigung, falls etwas nicht durchläuft.',
          en: 'With logging and notifications in case something does not complete.',
        },
      },
      {
        title: { de: 'Übergabe & Kontrolle', en: 'Handover & control' },
        description: {
          de: 'Sie behalten Überblick und Kontrolle über jeden automatisierten Schritt.',
          en: 'You keep oversight and control over every automated step.',
        },
      },
    ],
    process: [
      {
        title: { de: '1 · Aufnehmen', en: '1 · Map' },
        description: {
          de: 'Den Ist‑Ablauf dokumentieren und Engpässe sichtbar machen.',
          en: 'Document the current process and surface the bottlenecks.',
        },
      },
      {
        title: { de: '2 · Priorisieren', en: '2 · Prioritise' },
        description: {
          de: 'Dort beginnen, wo Aufwand und Nutzen am besten stehen.',
          en: 'Start where effort and benefit line up best.',
        },
      },
      {
        title: { de: '3 · Umsetzen', en: '3 · Implement' },
        description: {
          de: 'Integration bauen, testen und gegen Fehlerfälle absichern.',
          en: 'Build the integration, test it and guard against failure cases.',
        },
      },
      {
        title: { de: '4 · Überwachen', en: '4 · Monitor' },
        description: {
          de: 'Laufende Überwachung, damit Automatisierung verlässlich bleibt.',
          en: 'Ongoing monitoring so automation stays dependable.',
        },
      },
    ],
    outcomes: {
      de: [
        'Spürbar weniger manuelle Routinearbeit',
        'Weniger Übertragungsfehler zwischen Systemen',
        'Tools, die als ein zusammenhängender Ablauf funktionieren',
      ],
      en: [
        'Noticeably less manual routine work',
        'Fewer transfer errors between systems',
        'Tools that work as one coherent process',
      ],
    },
    faqs: [
      {
        question: { de: 'Müssen wir unsere Tools wechseln?', en: 'Do we have to switch tools?' },
        answer: {
          de: 'Meist nicht. Wir setzen auf den vorhandenen Schnittstellen auf. Einen Wechsel empfehlen wir nur, wenn er sich klar rechnet.',
          en: 'Usually not. We build on the interfaces you already have. We only suggest switching when it clearly pays off.',
        },
      },
      {
        question: { de: 'Was passiert, wenn eine Automatisierung fehlschlägt?', en: 'What happens if an automation fails?' },
        answer: {
          de: 'Jeder Ablauf wird protokolliert und benachrichtigt im Fehlerfall, sodass niemand stillschweigend auf falsche Daten vertraut.',
          en: 'Every flow is logged and notifies you on failure, so no one silently relies on incorrect data.',
        },
      },
    ],
    related: ['custom-software', 'it-support', 'web-development'],
    seo: {
      title: {
        de: 'Workflow‑Automatisierung & API‑Integration | DevHash',
        en: 'Workflow automation & API integration | DevHash',
      },
      description: {
        de: 'Workflow‑Automatisierung, API‑Integration und Systemintegration aus Wien: Systeme verbinden und wiederkehrende Arbeit zuverlässig automatisieren.',
        en: 'Workflow automation, API integration and systems integration from Vienna: connect systems and automate repetitive work reliably.',
      },
      primaryKeyword: { de: 'Workflow‑Automatisierung', en: 'workflow automation & API integration' },
      intent: 'Commercial — automate workflows / integrate systems and APIs.',
    },
  },
  {
    id: 'it-support',
    slug: { de: 'it-support', en: 'it-support' },
    icon: 'support',
    order: 4,
    title: { de: 'IT‑Support & Betreuung', en: 'IT support & care' },
    tagline: {
      de: 'Ein verlässlicher Ansprechpartner für die IT Ihres Unternehmens.',
      en: 'A dependable point of contact for your company’s IT.',
    },
    summary: {
      de: 'IT‑Support und laufende Betreuung für KMU – pragmatisch, erreichbar und auf Ihre Systeme abgestimmt.',
      en: 'IT support and ongoing care for SMEs — pragmatic, reachable and tuned to your systems.',
    },
    intro: {
      de: 'Nicht jedes Unternehmen braucht eine eigene IT‑Abteilung – aber jedes braucht jemanden, der erreichbar ist, wenn etwas klemmt. Wir übernehmen die laufende technische Betreuung Ihrer Systeme: als fester Ansprechpartner, der Ihre Umgebung kennt und im Problemfall schnell den Kontext hat.',
      en: 'Not every company needs an in-house IT department — but every company needs someone reachable when something breaks. We take on the ongoing technical care of your systems: as a named contact who knows your environment and already has the context when a problem arises.',
    },
    forWhom: {
      de: [
        'Kleine und mittlere Unternehmen ohne eigene IT‑Abteilung',
        'Teams, die einen festen technischen Ansprechpartner suchen',
        'Unternehmen, die ihre bestehende IT verlässlich betreut haben wollen',
      ],
      en: [
        'Small and medium businesses without an in-house IT team',
        'Teams looking for a single technical point of contact',
        'Companies that want their existing IT dependably looked after',
      ],
    },
    problems: {
      de: [
        'Bei Problemen ist niemand klar zuständig',
        'Wissen über die eigene IT ist nirgends dokumentiert',
        'Updates und Sicherheit bleiben liegen',
        'Externe Hilfe kennt den Kontext jedes Mal neu nicht',
      ],
      en: [
        'When problems arise, no one is clearly responsible',
        'Knowledge about your own IT is documented nowhere',
        'Updates and security keep getting postponed',
        'External help never knows the context',
      ],
    },
    includes: [
      {
        title: { de: 'Fester Ansprechpartner', en: 'A named contact' },
        description: {
          de: 'Eine Person, die Ihre Systeme kennt – nicht jedes Mal jemand Neues.',
          en: 'One person who knows your systems — not someone new each time.',
        },
      },
      {
        title: { de: 'Dokumentation Ihrer IT', en: 'Documentation of your IT' },
        description: {
          de: 'Wir halten fest, was wo läuft, damit Wissen nicht verloren geht.',
          en: 'We record what runs where, so knowledge is not lost.',
        },
      },
      {
        title: { de: 'Updates & Sicherheit', en: 'Updates & security' },
        description: {
          de: 'Regelmäßige Aktualisierungen und ein wachsames Auge auf Sicherheit.',
          en: 'Regular updates and a watchful eye on security.',
        },
      },
      {
        title: { de: 'Hilfe im Problemfall', en: 'Help when things break' },
        description: {
          de: 'Strukturierte Bearbeitung statt hektischer Einzelaktionen.',
          en: 'Structured handling instead of frantic one-off fixes.',
        },
      },
    ],
    process: [
      {
        title: { de: '1 · Bestandsaufnahme', en: '1 · Take stock' },
        description: {
          de: 'Ihre Systeme, Zugänge und Risiken aufnehmen und dokumentieren.',
          en: 'Record and document your systems, access and risks.',
        },
      },
      {
        title: { de: '2 · Stabilisieren', en: '2 · Stabilise' },
        description: {
          de: 'Offene Updates und sichtbare Risiken zuerst angehen.',
          en: 'Address pending updates and visible risks first.',
        },
      },
      {
        title: { de: '3 · Betreuen', en: '3 · Care' },
        description: {
          de: 'Laufende Betreuung mit klaren Kanälen und Reaktionswegen.',
          en: 'Ongoing care with clear channels and response paths.',
        },
      },
      {
        title: { de: '4 · Verbessern', en: '4 · Improve' },
        description: {
          de: 'Schritt für Schritt Schwachstellen reduzieren statt nur reagieren.',
          en: 'Reduce weak points step by step instead of only reacting.',
        },
      },
    ],
    outcomes: {
      de: [
        'Ein klarer Ansprechpartner statt diffuser Zuständigkeit',
        'Dokumentierte, aktuell gehaltene Systeme',
        'Weniger Überraschungen durch vernachlässigte Wartung',
      ],
      en: [
        'A clear contact instead of diffuse responsibility',
        'Documented systems kept up to date',
        'Fewer surprises from neglected maintenance',
      ],
    },
    faqs: [
      {
        question: { de: 'Betreut ihr auch Systeme, die ihr nicht gebaut habt?', en: 'Do you support systems you did not build?' },
        answer: {
          de: 'Ja. Wir beginnen mit einer Bestandsaufnahme, um Ihre Umgebung zu verstehen, und übernehmen die Betreuung darauf aufbauend.',
          en: 'Yes. We start with an inventory to understand your environment and take over care from there.',
        },
      },
      {
        question: { de: 'Gibt es feste Reaktionszeiten?', en: 'Are there fixed response times?' },
        answer: {
          de: 'Reaktionszeiten vereinbaren wir individuell und halten sie schriftlich fest, damit beide Seiten wissen, woran sie sind.',
          en: 'We agree response times individually and record them in writing, so both sides know where they stand.',
        },
      },
    ],
    related: ['maintenance', 'automation-integration', 'custom-software'],
    seo: {
      title: {
        de: 'IT‑Support für Unternehmen in Wien – IT‑Betreuung für KMU | DevHash',
        en: 'IT support for businesses in Vienna – SME IT care | DevHash',
      },
      description: {
        de: 'IT‑Support und laufende IT‑Betreuung für KMU in Wien: fester Ansprechpartner, Updates, Sicherheit und dokumentierte Systeme.',
        en: 'IT support and ongoing IT care for SMEs in Vienna: a named contact, updates, security and documented systems.',
      },
      primaryKeyword: { de: 'IT‑Support für Unternehmen Wien', en: 'IT support for businesses Vienna' },
      intent: 'Commercial — find ongoing IT support/care for an SME in Vienna.',
    },
  },
  {
    id: 'maintenance',
    slug: { de: 'wartung-pflege', en: 'maintenance-care' },
    icon: 'shield',
    order: 5,
    title: { de: 'Wartung & Pflege', en: 'Maintenance & care' },
    tagline: {
      de: 'Damit Website und Software dauerhaft sicher und aktuell bleiben.',
      en: 'So your website and software stay secure and up to date.',
    },
    summary: {
      de: 'Website‑Wartung und Software‑Wartung mit Updates, Monitoring, Backups und einem festen Ansprechpartner.',
      en: 'Website and software maintenance with updates, monitoring, backups and a named contact.',
    },
    intro: {
      de: 'Eine Website oder Anwendung ist mit dem Launch nicht fertig – sie braucht Pflege, damit sie sicher, schnell und aktuell bleibt. Wir übernehmen die laufende Wartung: Updates und Sicherheits‑Patches, Monitoring, regelmäßige Backups und kleine Anpassungen, ohne dass Sie jedes Mal ein neues Projekt starten müssen.',
      en: 'A website or application is not finished at launch — it needs care to stay secure, fast and current. We take on ongoing maintenance: updates and security patches, monitoring, regular backups and small changes, without you having to start a new project each time.',
    },
    forWhom: {
      de: [
        'Betreiber von Websites, die sicher und aktuell bleiben müssen',
        'Unternehmen mit einer Anwendung, die zuverlässig laufen muss',
        'Teams, die regelmäßige kleine Anpassungen brauchen',
      ],
      en: [
        'Owners of websites that must stay secure and current',
        'Companies with an application that has to run reliably',
        'Teams that need regular small adjustments',
      ],
    },
    problems: {
      de: [
        'Updates werden aufgeschoben, bis etwas bricht',
        'Niemand prüft regelmäßig, ob Backups funktionieren',
        'Kleine Änderungen bleiben mangels Zuständigkeit liegen',
        'Sicherheitslücken fallen erst spät auf',
      ],
      en: [
        'Updates are postponed until something breaks',
        'No one regularly checks that backups actually work',
        'Small changes stall for lack of an owner',
        'Security gaps are noticed too late',
      ],
    },
    includes: [
      {
        title: { de: 'Updates & Patches', en: 'Updates & patches' },
        description: {
          de: 'Regelmäßige Aktualisierungen, bevor aus kleinen Lücken große werden.',
          en: 'Regular updates before small gaps become big ones.',
        },
      },
      {
        title: { de: 'Monitoring', en: 'Monitoring' },
        description: {
          de: 'Verfügbarkeit und Auffälligkeiten im Blick, möglichst bevor Sie es merken.',
          en: 'Availability and anomalies watched, ideally before you notice them.',
        },
      },
      {
        title: { de: 'Backups', en: 'Backups' },
        description: {
          de: 'Regelmäßige Sicherungen, die im Ernstfall auch wirklich greifen.',
          en: 'Regular backups that actually work when it matters.',
        },
      },
      {
        title: { de: 'Kleine Anpassungen', en: 'Small changes' },
        description: {
          de: 'Laufende kleinere Änderungen ohne separaten Projektaufwand.',
          en: 'Ongoing minor changes without separate project overhead.',
        },
      },
    ],
    process: [
      {
        title: { de: '1 · Übernahme', en: '1 · Onboard' },
        description: {
          de: 'Zugänge, Stand und Risiken aufnehmen und einen Wartungsplan festlegen.',
          en: 'Record access, status and risks and set a maintenance plan.',
        },
      },
      {
        title: { de: '2 · Absichern', en: '2 · Secure' },
        description: {
          de: 'Backups, Updates und Monitoring verlässlich einrichten.',
          en: 'Set up backups, updates and monitoring reliably.',
        },
      },
      {
        title: { de: '3 · Pflegen', en: '3 · Maintain' },
        description: {
          de: 'Regelmäßige Wartung in einem vereinbarten Rhythmus.',
          en: 'Regular maintenance on an agreed cadence.',
        },
      },
      {
        title: { de: '4 · Berichten', en: '4 · Report' },
        description: {
          de: 'Nachvollziehbare Rückmeldung, was getan wurde und was ansteht.',
          en: 'Clear reporting on what was done and what is next.',
        },
      },
    ],
    outcomes: {
      de: [
        'Sichere, aktuell gehaltene Website oder Software',
        'Funktionierende Backups statt böser Überraschungen',
        'Ein fester Ansprechpartner für laufende Änderungen',
      ],
      en: [
        'A secure, up-to-date website or piece of software',
        'Working backups instead of nasty surprises',
        'A named contact for ongoing changes',
      ],
    },
    faqs: [
      {
        question: { de: 'Wartet ihr auch Projekte von anderen Anbietern?', en: 'Do you maintain projects built by others?' },
        answer: {
          de: 'In der Regel ja. Wir starten mit einer Übernahme‑Analyse, um den Stand zu verstehen, und legen darauf aufbauend den Wartungsumfang fest.',
          en: 'Usually yes. We begin with a takeover review to understand the current state and define the maintenance scope from there.',
        },
      },
      {
        question: { de: 'Wie wird Wartung abgerechnet?', en: 'How is maintenance billed?' },
        answer: {
          de: 'Wartung läuft meist als laufende Betreuung mit vereinbartem Umfang. Den genauen Rahmen halten wir vor Beginn schriftlich fest.',
          en: 'Maintenance usually runs as ongoing care with an agreed scope. We put the exact terms in writing before we start.',
        },
      },
    ],
    related: ['it-support', 'web-development', 'custom-software'],
    seo: {
      title: {
        de: 'Website‑Wartung & Software‑Wartung Wien | DevHash',
        en: 'Website & software maintenance, Vienna | DevHash',
      },
      description: {
        de: 'Website‑Wartung und Software‑Wartung aus Wien: Updates, Sicherheits‑Patches, Monitoring, Backups und kleine Anpassungen mit festem Ansprechpartner.',
        en: 'Website and software maintenance from Vienna: updates, security patches, monitoring, backups and small changes with a named contact.',
      },
      primaryKeyword: { de: 'Website‑Wartung', en: 'website & software maintenance' },
      intent: 'Commercial — ongoing maintenance for a website or software product.',
    },
  },
];

export function getServiceBySlug(slug: string, locale: Locale): Service | undefined {
  return services.find((s) => s.slug[locale] === slug);
}

export function getServiceById(id: string): Service | undefined {
  return services.find((s) => s.id === id);
}

export const servicesInOrder = [...services].sort((a, b) => a.order - b.order);
