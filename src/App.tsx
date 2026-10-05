import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from 'motion/react';
import { ArrowUpRight, ArrowRight, X, Sun, Moon, GithubLogo, InstagramLogo, LinkedinLogo, EnvelopeSimple, GameController, FilmSlate, Headphones, ArrowLeft, BookOpen } from '@phosphor-icons/react';
import { allEntryIds, contact, entries, projectLinks, ui, type EntryId, type Language } from './content';
import Journey, { type JourneyHandle } from './Journey';
import { journeyUi } from './scenes';

type Theme = 'dark' | 'light';

function readPreference(key: string): string | null {
  try { return localStorage.getItem(key); } catch { return null; }
}
function savePreference(key: string, value: string) {
  try { localStorage.setItem(key, value); } catch { /* Preferences are optional. */ }
}
function readEntry(): EntryId | null {
  const candidate = window.location.hash.replace('#open/', '') as EntryId;
  return allEntryIds.includes(candidate) ? candidate : null;
}

function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.65, ease: [0.2, 0.7, 0.2, 1] }}>{children}</motion.div>;
}

function ObjectArrow() {
  return <span className="object-arrow" aria-hidden="true"><ArrowUpRight size={18} weight="bold" /></span>;
}

function LanguageSwitch({ language, onChange }: { language: Language; onChange: (language: Language) => void }) {
  return <div className="language-toggle" role="group" aria-label={language === 'vi' ? 'Ngôn ngữ' : 'Language'}>
    <button className={language === 'en' ? 'selected' : ''} aria-pressed={language === 'en'} aria-label="EN: English" onClick={() => onChange('en')}>EN</button>
    <button className={language === 'vi' ? 'selected' : ''} aria-pressed={language === 'vi'} aria-label="VI: Tiếng Việt" onClick={() => onChange('vi')}>VI</button>
  </div>;
}

function DeskObject({ className, children, reduced, x, y, rotate, tilt, onClick }: {
  className: string; children: ReactNode; reduced: boolean; x?: MotionValue<number>; y?: MotionValue<number>;
  rotate: number | MotionValue<number>; tilt: number; onClick: () => void;
}) {
  const hovered = useRef(false);
  const focused = useRef(false);
  const target = useMotionValue(0);
  const engagement = useSpring(target, { stiffness: 280, damping: 30, mass: .55 });
  const horizontal = useTransform(() => reduced ? 0 : x?.get() ?? 0);
  const vertical = useTransform(() => reduced ? 0 : (y?.get() ?? 0) - engagement.get() * 8);
  const angle = useTransform(() => (typeof rotate === 'number' ? rotate : rotate.get()) + (reduced ? 0 : engagement.get() * tilt));
  const update = () => target.set(hovered.current || focused.current ? 1 : 0);

  return <motion.button className={`desk-object ${className}`} style={{ x: horizontal, y: vertical, rotate: angle, willChange: reduced ? 'auto' : 'transform' }}
    onHoverStart={() => { hovered.current = true; update(); }}
    onHoverEnd={() => { hovered.current = false; update(); }}
    onFocus={event => { focused.current = event.currentTarget.matches(':focus-visible'); update(); }}
    onBlur={() => { focused.current = false; update(); }} onClick={onClick}>{children}</motion.button>;
}

function Desk({ language, onExplore }: { language: Language; onExplore: (id: EntryId) => void }) {
  const t = ui[language];
  const section = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  // Cover the desk's full height, even when it is exactly one viewport tall.
  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end start'] });
  const progress = useSpring(scrollYProgress, { stiffness: 240, damping: 30, mass: .65 });
  const folderX = useTransform(progress, [0, 1], [0, -25]);
  const folderRotate = useTransform(progress, [0, 1], [-10, -16]);
  const paperY = useTransform(progress, [0, 1], [0, -32]);
  const paperRotate = useTransform(progress, [0, 1], [8, 13]);
  const ideaX = useTransform(progress, [0, 1], [0, 26]);
  const notebookY = useTransform(progress, [0, 1], [0, 24]);

  return <section id="desk" className="desk-section" ref={section}>
    <div className="desk-sticky page-width">
      <div className="hero-grid">
        <motion.div className="hero-copy" initial={reduced ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <p className="intro-role"><span className="tiny-mark" aria-hidden="true">↳</span> {t.role}</p>
          <h1>Eric<br />Nguyen<span className="name-period">.</span></h1>
          <p className="vietnamese-name">{t.name}</p>
          <p className="hero-intro">{t.intro}</p>
          <button className="text-link hero-link" onClick={() => onExplore('dfriend')}>{t.heroLink}<ArrowRight size={19} /></button>
        </motion.div>

        <div className="desk-surface" aria-label={t.deskTitle}>
          <div className="desk-light" aria-hidden="true" />
          <div className="desk-cable" aria-hidden="true" />
          <div className="desk-pencil" aria-hidden="true"><span /></div>
          <DeskObject className="folder" reduced={!!reduced} x={folderX} rotate={reduced ? -10 : folderRotate} tilt={2} onClick={() => onExplore('dfriend')}>
            <span className="folder-tab" aria-hidden="true" />
            <span className="folder-inner" aria-hidden="true" />
            <span className="folder-cover">
              <span className="object-type">{t.learning}</span>
              <span className="folder-symbol" aria-hidden="true"><BookOpen weight="duotone" /></span>
              <strong>D-Friend</strong>
              <span className="object-caption">{t.folderCaption}</span>
              <span className="object-bottom"><span>{t.folderStatus}</span><ObjectArrow /></span>
            </span>
          </DeskObject>

          <DeskObject className="research-paper" reduced={!!reduced} y={paperY} rotate={reduced ? 8 : paperRotate} tilt={-2} onClick={() => onExplore('research')}>
            <span className="paper-clip" aria-hidden="true" />
            <span className="object-type">{t.researchLabel}</span>
            <strong>{t.researchCaption}</strong>
            <span className="research-diagram" aria-hidden="true">
              <span className="diagram-model">LLM</span>
              <span className="diagram-branches"><i /><i /><i /></span>
              <span className="diagram-paths"><span>single</span><span>fixed</span><span>agent</span></span>
              <span className="diagram-measure">value / cost</span>
            </span>
            <span className="object-bottom"><span>{t.researchStatus}</span><ObjectArrow /></span>
          </DeskObject>

          <DeskObject className="idea-note" reduced={!!reduced} x={ideaX} rotate={-6} tilt={2} onClick={() => onExplore('idea')}>
            <span className="note-tape" aria-hidden="true" />
            <span className="object-type">{t.ideaStatus}</span>
            <strong>{t.ideaTitle}</strong>
            <span className="idea-diagram" aria-hidden="true"><span>root</span><ArrowRight /><span>agent</span><span className="idea-question">?</span></span>
            <span className="object-bottom"><span>{t.ideaCaption}</span><ObjectArrow /></span>
          </DeskObject>

          <DeskObject className="notebook" reduced={!!reduced} y={notebookY} rotate={4} tilt={-2} onClick={() => onExplore('notebook')}>
            <span className="notebook-spine" aria-hidden="true" />
            <span className="notebook-content">
              <span className="object-type">{t.personalLabel}</span>
              <strong>{t.notebookTitle}</strong>
              <span className="notebook-icons" aria-hidden="true"><GameController /><FilmSlate /><Headphones /><span>…</span></span>
              <ObjectArrow />
            </span>
          </DeskObject>
          <span className="desk-caption">{t.deskHint}</span>
        </div>
      </div>
      <div className="desk-bottom">
        <span>{t.deskTitle}</span>
        <p>{t.deskBody}</p>
      </div>
    </div>
  </section>;
}

function Reader({ selected, language, onClose, onOpen, onLanguage }: { selected: EntryId | null; language: Language; onClose: () => void; onOpen: (id: EntryId) => void; onLanguage: (language: Language) => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const isOpen = selected !== null;
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    const element = dialog.current;
    if (!element || !isOpen) return;
    const previousOverflow = document.body.style.overflow;
    const focused = document.activeElement as HTMLElement | null;
    element.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      element.close();
      document.body.style.overflow = previousOverflow;
      if (focused?.isConnected) focused.focus({ preventScroll: true });
    };
  }, [isOpen]);

  useEffect(() => { content.current?.scrollTo({ top: 0 }); }, [selected]);
  const t = ui[language];
  const entry = selected ? entries[language][selected] : null;

  return <dialog ref={dialog} className="reader" aria-labelledby="reader-title" onCancel={event => { event.preventDefault(); closeRef.current(); }} onClick={event => { if (event.target === event.currentTarget) closeRef.current(); }}>
    {entry && <div className="reader-shell">
      <div className="reader-toolbar"><span>{entry.type}</span><div className="reader-tools"><LanguageSwitch language={language} onChange={onLanguage} /><button className="close-button" aria-label={t.close} autoFocus onClick={onClose}><X size={23} /></button></div></div>
      <div className="reader-content" ref={content}>
        <span className="entry-status">{entry.status}</span>
        <h2 id="reader-title">{entry.title}</h2>
        <p className="reader-subtitle">{entry.subtitle}</p>
        <p className="reader-intro">{entry.intro}</p>
        {selected === 'dfriend' && <a className="text-link reader-project-link" href={projectLinks.dfriend} target="_blank" rel="noopener noreferrer">{t.visitDfriend}<ArrowUpRight size={18} aria-hidden="true" /></a>}
        {entry.sections.map(section => <section className="reader-section" key={section.title}><h3>{section.title}</h3><p>{section.text}</p></section>)}
        {entry.related && <div className="related-entries"><p>{t.related}</p>{entry.related.map(link => <button key={link.id} onClick={() => onOpen(link.id)}>{link.label}<ArrowUpRight size={18} /></button>)}</div>}
        <button className="text-link reader-back" onClick={onClose}><ArrowLeft size={18} />{t.backToDesk}</button>
      </div>
    </div>}
  </dialog>;
}

export default function App() {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = readPreference('eric-language');
    return saved === 'vi' || saved === 'en' ? saved : 'en';
  });
  const [theme, setTheme] = useState<Theme>(() => readPreference('eric-theme') === 'light' ? 'light' : 'dark');
  const [selected, setSelected] = useState<EntryId | null>(readEntry);
  const previousHash = useRef('');
  const journey = useRef<JourneyHandle>(null);
  const t = ui[language];

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = language === 'vi' ? 'Eric Nguyen | Bàn làm việc còn mở' : 'Eric Nguyen | An open desk';
    document.querySelector('meta[name="description"]')?.setAttribute('content', language === 'vi' ? 'Eric Nguyen / Nguyễn Khánh Trình. Những sản phẩm đang xây, nghiên cứu đang làm, và ý tưởng còn dở.' : 'Eric Nguyen / Nguyễn Khánh Trình. Products, agent research, unfinished ideas, and things I’m learning.');
    savePreference('eric-language', language);
  }, [language]);

  useEffect(() => { document.documentElement.dataset.theme = theme; savePreference('eric-theme', theme); document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#171b19' : '#e9ede6'); }, [theme]);

  useEffect(() => {
    const onHistory = () => setSelected(readEntry());
    window.addEventListener('hashchange', onHistory);
    window.addEventListener('popstate', onHistory);
    return () => { window.removeEventListener('hashchange', onHistory); window.removeEventListener('popstate', onHistory); };
  }, []);

  function open(id: EntryId) {
    if (!selected) {
      previousHash.current = window.location.hash;
      window.history.pushState({ deskEntry: true }, '', `#open/${id}`);
    } else window.history.replaceState(window.history.state, '', `#open/${id}`);
    setSelected(id);
  }
  function close() {
    if (window.history.state?.deskEntry) window.history.back();
    else window.history.replaceState(null, '', window.location.pathname + window.location.search + previousHash.current);
    setSelected(null);
  }

  return <>
    <a href="#desk" className="skip-link">{t.skip}</a>
    <header className="site-header">
      <div className="header-inner page-width">
        <a className="wordmark" href="#desk" aria-label="Eric Nguyen">e<span>.</span></a>
        <nav className="main-nav" aria-label={language === 'vi' ? 'Điều hướng chính' : 'Main navigation'}><a href="#desk">{t.desk}</a><a href="#journey">{journeyUi[language].explore}</a><a href="#contact">{t.contact}<ArrowUpRight size={13} /></a></nav>
        <div className="header-tools"><LanguageSwitch language={language} onChange={setLanguage} /><button className="theme-toggle" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label={theme === 'dark' ? t.light : t.dark}>{theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}</button></div>
      </div>
    </header>
    <main>
      <Desk language={language} onExplore={id => journey.current?.enter(id)} />
      <Journey ref={journey} language={language} paused={selected !== null} onOpen={open} />
      <section id="contact" className="contact-section page-width">
        <Reveal><span className="contact-doodle" aria-hidden="true"><EnvelopeSimple size={51} weight="light" /></span><h2>{t.contactTitle}</h2><p className="section-intro">{t.contactBody}</p><a className="email-link" href={`mailto:${contact.email}`}>{t.emailAction}<ArrowUpRight size={29} /></a></Reveal>
        <div className="contact-bottom"><span className="footer-name">Eric Nguyen <span>/ Nguyễn Khánh Trình</span></span><div className="social-links"><a href={contact.github} target="_blank" rel="noopener noreferrer"><GithubLogo size={18} />GitHub<ArrowUpRight size={13} /></a><a href={contact.linkedin} target="_blank" rel="noopener noreferrer"><LinkedinLogo size={18} />LinkedIn<ArrowUpRight size={13} /></a><a href={contact.instagram} target="_blank" rel="noopener noreferrer"><InstagramLogo size={18} />Instagram<ArrowUpRight size={13} /></a></div></div>
      </section>
    </main>
    <footer className="site-footer page-width"><span>{t.footer}</span><span className="footer-mark" aria-hidden="true">e.</span></footer>
    <Reader selected={selected} language={language} onClose={close} onOpen={open} onLanguage={setLanguage} />
  </>;
}
