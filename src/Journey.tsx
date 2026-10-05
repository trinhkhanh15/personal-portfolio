import { forwardRef, useEffect, useImperativeHandle, useLayoutEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from 'motion/react';
import { ArrowLeft, ArrowRight, ArrowUpRight, ArrowBendUpRight } from '@phosphor-icons/react';
import { entries, projectLinks, ui, type EntryId, type Language } from './content';
import { branchPath, connections, continuations, defaultPath, journeyUi, scenes, type SceneId } from './scenes';
import SceneArt from './SceneArt';
import './journey.css';
import './scene-art.css';

export type JourneyHandle = { enter: (id: SceneId) => void };
type Props = { language: Language; paused: boolean; onOpen: (id: EntryId) => void };
const transitionStart = .76;
const transitionSpan = 1 - transitionStart;
const sceneScrollVh = 180;
const ease = (value: number) => { const t = Math.max(0, Math.min(1, value)); return t * t * (3 - 2 * t); };

const cameraPoses: Record<SceneId, { x: number; y: number; scale: number; rotate: number }> = {
  approach: { x: 0, y: 25, scale: .98, rotate: 0 },
  dfriend: { x: 0, y: 56, scale: .84, rotate: -3 },
  pilot: { x: 0, y: 35, scale: 1.08, rotate: 1 },
  research: { x: 0, y: 45, scale: .95, rotate: -1 },
  idea: { x: 44, y: -38, scale: .88, rotate: 5 },
  notebook: { x: -24, y: 55, scale: .95, rotate: -3 },
  seventeen: { x: 0, y: 48, scale: .96, rotate: -2 },
  scores: { x: -32, y: 40, scale: .97, rotate: 3 },
};

function ConnectedPages({ id, index, next, language, onBranch }: { id: SceneId; index: number; next?: SceneId; language: Language; onBranch: (index: number, id: SceneId) => void }) {
  const t = journeyUi[language];
  const targets = connections[id];
  return <aside className="connected-pages" aria-label={t.branches}>
    <p className="connections-label">{t.branches}</p>
    <div className="connection-graph">
      <svg className="connection-lines" viewBox="0 0 300 370" preserveAspectRatio="none" aria-hidden="true">
        {targets.map((target, targetIndex) => <path key={target} d={`M 10 185 C 62 185, 36 ${55 + targetIndex * 125}, 82 ${55 + targetIndex * 125}`} className={target === next ? 'default-connection' : ''} />)}
      </svg>
      <div className="branch-pages">
        {targets.map((target, targetIndex) => <button key={target} className={`branch-page ${next === target ? 'branch-next' : ''}`} data-branch={target} style={{ rotate: `${[3, -3, 2][targetIndex]}deg` }} onClick={() => onBranch(index, target)}>
          <span className="branch-type">{next === target ? t.forward : target === 'approach' ? t.status : entries[language][target].type}</span>
          <span className="branch-title">{scenes[language][target].label}</span>
          <ArrowUpRight size={20} aria-hidden="true" />
        </button>)}
      </div>
    </div>
  </aside>;
}

function Scene({ id, index, active, last, next, position, language, reduced, onOpen, onBranch }: {
  id: SceneId; index: number; active: boolean; last: boolean; next?: SceneId; position: MotionValue<number>;
  language: Language; reduced: boolean; onOpen: (id: EntryId) => void; onBranch: (index: number, id: SceneId) => void;
}) {
  const copy = scenes[language][id];
  const t = journeyUi[language];
  const readingWindow = useRef<HTMLDivElement>(null);
  const readingCopy = useRef<HTMLDivElement>(null);
  const [readDistance, setReadDistance] = useState(0);

  useLayoutEffect(() => {
    const update = () => {
      if (readingCopy.current && readingWindow.current) setReadDistance(Math.max(0, readingCopy.current.scrollHeight - readingWindow.current.clientHeight));
    };
    const observer = new ResizeObserver(update);
    if (readingWindow.current) observer.observe(readingWindow.current);
    if (readingCopy.current) observer.observe(readingCopy.current);
    update();
    return () => observer.disconnect();
  }, [language]);

  const localProgress = useTransform(position, value => value - index);
  const camera = useTransform(position, value => {
    const local = value - index;
    if (local < 0) return -(1 - ease((local + transitionSpan) / transitionSpan));
    if (last || local <= transitionStart) return 0;
    return ease((local - transitionStart) / transitionSpan);
  });
  const pose = cameraPoses[id];
  const x = useTransform(camera, value => value < 0 ? -value * pose.x : value * -pose.x * .4);
  const y = useTransform(camera, value => value < 0 ? -value * pose.y : value * -24);
  const angle = useTransform(camera, value => value < 0 ? -value * pose.rotate : value * -pose.rotate * .4);
  const scale = useTransform(camera, value => 1 + (value < 0 ? -value * (pose.scale - 1) : value * .035));
  // Let the outgoing text clear before revealing the next page's text.
  const opacity = useTransform(camera, value => value < 0 ? ease((value + 1 - .48) / .52) : 1 - ease(value / .52));
  const visibility = useTransform(camera, value => Math.abs(value) > .999 ? 'hidden' : 'visible');
  const bodyY = useTransform(position, value => {
    const reading = ease((value - index - .04) / .51);
    return 22 - reading * (readDistance + 22);
  });
  return <motion.article className={`journey-scene scene-${id}`} data-scene={id} data-active={active} aria-hidden={!reduced && !active} inert={!reduced && !active} style={reduced ? undefined : { x, y, rotate: angle, scale, opacity, visibility, zIndex: index + 1, pointerEvents: active ? 'auto' : 'none', willChange: active ? 'transform, opacity' : 'auto' }}>
    <div className="scene-paper">
      <div className="scene-heading"><span className="scene-type">{id === 'approach' ? t.personal : entries[language][id].type}</span><span className="scene-status">{id === 'approach' ? t.status : entries[language][id].status}</span></div>
      <h2 tabIndex={-1} className="scene-title">{copy.title}</h2>
      <div className="scene-main">
        <div className="scene-reading-window" ref={readingWindow}>
          <motion.div className="scene-reading-copy" ref={readingCopy} style={reduced ? undefined : { y: bodyY }}>
            {copy.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
          </motion.div>
        </div>
        <div className="scene-art-wrap" aria-hidden="true"><SceneArt id={id} progress={localProgress} reduced={reduced} language={language} /></div>
      </div>
      <div className="scene-paper-bottom">{id === 'approach' ? <button className="scene-full" data-start-work onClick={() => onBranch(index, 'dfriend')}>{t.work}<ArrowRight size={18} /></button> : <button className="scene-full" data-detail={id} onClick={() => onOpen(id)}>{t.full}<ArrowUpRight size={18} /></button>}{id === 'dfriend' ? <a className="scene-site" href={projectLinks.dfriend} target="_blank" rel="noopener noreferrer" aria-label={ui[language].visitDfriend}>dfriend.online<ArrowUpRight size={15} aria-hidden="true" /></a> : <span className="paper-signature">Eric Nguyen</span>}</div>
    </div>
    <ConnectedPages id={id} index={index} next={next} language={language} onBranch={onBranch} />
  </motion.article>;
}

export default forwardRef<JourneyHandle, Props>(function Journey({ language, paused, onOpen }, apiRef) {
  const root = useRef<HTMLElement>(null);
  const [path, setPath] = useState<SceneId[]>([...defaultPath]);
  const [active, setActive] = useState(0);
  const [pending, setPending] = useState<{ index: number; ticket: number } | null>(null);
  const focusDestination = useRef<number | null>(null);
  const reduced = !!useReducedMotion();
  const { scrollYProgress } = useScroll({ target: root, offset: ['start start', 'end end'] });
  const rawPosition = useTransform(scrollYProgress, [0, 1], [0, path.length]);
  const targetPosition = useMotionValue(rawPosition.get());
  // Smooth the scene transforms only. The document keeps its native scroll behavior.
  const position = useSpring(targetPosition, { stiffness: 240, damping: 30, mass: .65, restDelta: .0001, restSpeed: .0001 });
  const t = journeyUi[language];
  const current = path[Math.min(active, path.length - 1)];

  useLayoutEffect(() => {
    if (paused) position.stop();
    else {
      targetPosition.set(rawPosition.get());
      position.set(rawPosition.get());
    }
  }, [paused, position, rawPosition, targetPosition]);

  useMotionValueEvent(rawPosition, 'change', value => {
    if (!paused) targetPosition.set(value);
  });

  useMotionValueEvent(position, 'change', value => {
    if (!reduced) {
      const next = Math.max(0, Math.min(path.length - 1, Math.floor(value)));
      setActive(previous => previous === next ? previous : next);
    }
  });

  useEffect(() => {
    if (focusDestination.current !== active) return;
    root.current?.querySelectorAll<HTMLElement>('.scene-title')[active]?.focus({ preventScroll: true });
    focusDestination.current = null;
  }, [active, path]);

  useEffect(() => {
    if (!reduced || !root.current) return;
    const observer = new IntersectionObserver(changes => {
      const visible = changes.find(change => change.isIntersecting);
      if (visible) setActive(path.indexOf(visible.target.getAttribute('data-scene') as SceneId));
    }, { rootMargin: '-20% 0px -55% 0px' });
    root.current.querySelectorAll('.journey-scene').forEach(scene => observer.observe(scene));
    return () => observer.disconnect();
  }, [reduced, path]);

  useLayoutEffect(() => {
    if (!pending || !root.current) return;
    const frame = requestAnimationFrame(() => {
      if (!root.current) return;
      focusDestination.current = pending.index;
      if (reduced) {
        root.current.querySelectorAll<HTMLElement>('.journey-scene')[pending.index]?.scrollIntoView({ block: 'start', behavior: 'instant' });
        setActive(pending.index);
      } else {
        const top = root.current.getBoundingClientRect().top + window.scrollY;
        const distance = (root.current.offsetHeight - window.innerHeight) / path.length;
        window.scrollTo({ top: top + (pending.index + .09) * distance, behavior: 'smooth' });
      }
      if (active === pending.index) {
        root.current.querySelectorAll<HTMLElement>('.scene-title')[pending.index]?.focus({ preventScroll: true });
        focusDestination.current = null;
      }
      setPending(null);
    });
    return () => cancelAnimationFrame(frame);
  }, [pending, path, reduced]);

  function jump(index: number) { setPending({ index, ticket: Date.now() }); }
  function branch(index: number, target: SceneId) {
    const result = branchPath(path, index, target);
    setPath(result.path);
    setPending({ index: result.index, ticket: Date.now() });
  }
  useImperativeHandle(apiRef, () => ({ enter(id) {
    setPath([...continuations[id]]);
    setActive(0);
    setPending({ index: 0, ticket: Date.now() });
    window.history.replaceState(null, '', '#journey');
  } }), []);

  return <section id="journey" ref={root} className={`journey ${reduced ? 'journey-static' : ''}`} data-path={path.join(',')} data-current={current} style={reduced ? undefined : { height: `${100 + path.length * sceneScrollVh}svh` }} aria-label={t.title}>
    <div className="journey-frame">
      <div className="journey-toolbar page-width">
        <a href="#desk" className="journey-back"><ArrowLeft size={16} /><span>{t.return}</span></a>
        <span className="journey-current" aria-live="polite">{scenes[language][current].label}</span>
        <div className="journey-navigation"><button aria-label={t.previous} disabled={active === 0} onClick={() => jump(Math.max(0, active - 1))}><ArrowLeft size={19} /></button>{active < path.length - 1 ? <button aria-label={t.next} onClick={() => jump(active + 1)}><ArrowRight size={19} /></button> : <a href="#contact" aria-label={t.finish}><ArrowBendUpRight size={19} /></a>}</div>
      </div>
      <div className="journey-stage">
        {path.map((id, index) => <Scene key={id} id={id} index={index} active={index === active} last={index === path.length - 1} next={path[index + 1]} position={position} language={language} reduced={reduced} onOpen={onOpen} onBranch={branch} />)}
      </div>
      <nav className="journey-path page-width" aria-label={t.path}>{path.map((id, index) => <button key={id} className={index === active ? 'path-active' : ''} aria-current={index === active ? 'step' : undefined} onClick={() => jump(index)}><span>{scenes[language][id].label}</span>{index < path.length - 1 && <ArrowRight size={12} aria-hidden="true" />}</button>)}</nav>
    </div>
  </section>;
});
