import type { ReactNode } from 'react';
import { motion, useTransform, type MotionValue } from 'motion/react';
import { BookOpen, Flask, Graph, TreeStructure, GameController, PencilSimple, ArrowRight } from '@phosphor-icons/react';
import type { Language } from './content';
import type { SceneId } from './scenes';

const copy = {
  en: { hypothesis: 'A hypothesis', build: 'Build', test: 'Test', revise: 'Revise', research: 'Agent research', idea: 'An open question', score: 'A smarter score?', environment: 'A learning environment', done: 'Done > perfect', scope: ['More features', 'More scope', 'A whole product'], keep: 'One hypothesis.', pilot: 'One pilot to test it.', inputs: 'Same inputs. Same model.', controls: 'Shared limits · shared tools*', tools: '* pipeline + agent', dimensions: 'More dimensions', question: 'Does this help learning?', measure: 'Matching · calibration', resources: 'Latency · cost', evidence: 'Evidence?', change: 'Propose a change', verify: 'Test whether it helped', unfinished: 'Still figuring it out.', mistake: 'The problem I thought was easy.', result: 'No award. A question that stayed.', notebook: 'Away from the code', personal: 'Games, films, quiet places.' },
  vi: { hypothesis: 'Một giả thuyết', build: 'Xây', test: 'Test', revise: 'Sửa', research: 'Nghiên cứu agent', idea: 'Một câu hỏi mở', score: 'Chấm tinh vi hơn?', environment: 'Một môi trường học', done: 'Done > perfect', scope: ['Thêm tính năng', 'Thêm scope', 'Cả một sản phẩm'], keep: 'Một giả thuyết.', pilot: 'Một pilot để test.', inputs: 'Cùng đầu vào. Cùng model.', controls: 'Chung giới hạn · chung tools*', tools: '* pipeline + agent', dimensions: 'Nhiều chiều hơn', question: 'Có giúp việc học không?', measure: 'Matching · calibration', resources: 'Latency · cost', evidence: 'Bằng chứng?', change: 'Đề xuất thay đổi', verify: 'Test xem có giúp ích không', unfinished: 'Vẫn đang tìm hiểu.', mistake: 'Bài mà mình tưởng là dễ.', result: 'Không có giải. Một câu hỏi ở lại.', notebook: 'Ngoài những dòng code', personal: 'Game, phim, chỗ yên tĩnh.' },
};
const ease = (v: number) => { const t = Math.max(0, Math.min(1, v)); return t * t * (3 - 2 * t); };
type Pose = { x?: number; y?: number; rotate?: number; scale?: number; opacity?: number };

function Piece({ progress, reduced, className, children, from = {}, to = {}, range = [.12, .5], action }: {
  progress: MotionValue<number>; reduced: boolean; className: string; children: ReactNode; from?: Pose; to?: Pose; range?: number[]; action?: string;
}) {
  const mix = useTransform(progress, v => ease((v - range[0]) / (range[1] - range[0])));
  const x = useTransform(mix, [0, 1], [from.x ?? 0, to.x ?? 0]);
  const y = useTransform(mix, [0, 1], [from.y ?? 0, to.y ?? 0]);
  const rotate = useTransform(mix, [0, 1], [from.rotate ?? 0, to.rotate ?? 0]);
  const scale = useTransform(mix, [0, 1], [from.scale ?? 1, to.scale ?? 1]);
  const opacity = useTransform(mix, [0, 1], [from.opacity ?? 1, to.opacity ?? 1]);
  return <motion.div className={className} data-action={action} style={reduced ? { ...to } : { x, y, rotate, scale, opacity }}>{children}</motion.div>;
}

function OpeningFolder({ progress, reduced, language }: { progress: MotionValue<number>; reduced: boolean; language: Language }) {
  const t = copy[language];
  const opening = useTransform(progress, v => -110 * ease((v - .08) / .42));
  return <div className="scene-illustration folder-study" data-illustration="open-folder">
    <div className="study-page"><BookOpen size={58} weight="duotone" /><strong>{t.environment}</strong><span>{t.done}</span></div>
    <motion.div className="study-cover" data-action="open" style={{ rotateY: reduced ? -110 : opening }}><BookOpen size={55} weight="duotone" /><strong>{t.score}</strong><span>D-Friend</span></motion.div>
  </div>;
}

export default function SceneArt({ id, progress, reduced, language }: { id: SceneId; progress: MotionValue<number>; reduced: boolean; language: Language }) {
  const t = copy[language];
  const discardedLabel = useTransform(progress, value => value > .28 ? 'hidden' : 'visible');
  if (id === 'approach') return <div className="scene-illustration approach-table" data-illustration="personal-workspace">
    <div className="approach-center"><span>Eric / Trình</span><p>{t.build}<ArrowRight size={12} />{t.test}<ArrowRight size={12} />{t.revise}</p></div>
    <Piece progress={progress} reduced={reduced} className="approach-piece approach-project" from={{ y: 38, scale: .8, opacity: 0 }} to={{ x: -72, y: -72, rotate: -9 }} range={[.02, .3]} action="reveal-project"><BookOpen size={31} weight="duotone" /><strong>D-Friend</strong></Piece>
    <Piece progress={progress} reduced={reduced} className="approach-piece approach-research" from={{ y: 38, scale: .8, opacity: 0 }} to={{ x: 75, y: -25, rotate: 7 }} range={[.12, .4]} action="reveal-research"><Graph size={29} /><strong>{t.research}</strong></Piece>
    <Piece progress={progress} reduced={reduced} className="approach-piece approach-question" from={{ y: 38, scale: .8, opacity: 0 }} to={{ x: -15, y: 94, rotate: -4 }} range={[.23, .54]} action="reveal-question"><TreeStructure size={27} /><strong>{t.idea}</strong></Piece>
  </div>;
  if (id === 'dfriend') return <OpeningFolder progress={progress} reduced={reduced} language={language} />;
  if (id === 'pilot') return <div className="scene-illustration scope-study" data-illustration="trim-scope">
    {t.scope.map((label, index) => <Piece key={label} progress={progress} reduced={reduced} className={`scope-extra extra-${index}`} from={{ rotate: [-7, 5, -2][index], y: [-8, 8, 0][index] }} to={{ x: [-74, 76, 48][index], y: [-70, -43, -94][index], rotate: [-19, 17, 12][index], opacity: .22 }} range={[.12 + index * .07, .43 + index * .05]} action="discard-scope"><motion.span style={{ visibility: reduced ? 'hidden' : discardedLabel }}>{label}</motion.span><i /><i /><i /></Piece>)}
    <Piece progress={progress} reduced={reduced} className="scope-keep" from={{ y: 28, rotate: -3 }} to={{ y: 16, rotate: 0 }} action="keep-hypothesis"><Flask size={52} weight="light" /><strong>{t.keep}</strong><span>{t.pilot}</span></Piece>
  </div>;
  if (id === 'research') return <div className="scene-illustration research-study" data-illustration="compare-orchestration">
    <div className="research-source"><Graph size={26} /><span>{t.inputs}</span></div>
    <Piece progress={progress} reduced={reduced} className="research-connections" from={{ opacity: 0 }} to={{ opacity: 1 }} range={[.2, .5]}><div /><i /><i /><i /></Piece>
    {['single-shot', 'fixed pipeline', 'bounded agent'].map((label, index) => <Piece key={label} progress={progress} reduced={reduced} className={`research-condition condition-${index}`} from={{ y: -8, scale: .8, opacity: .15 }} to={{ x: (index - 1) * 91, y: 32, scale: 1, opacity: 1 }} range={[.1, .48]} action="separate-condition"><span>{label}</span><div className={`condition-mark mark-${index}`}><i /><i /><i /></div></Piece>)}
    <div className="research-controls"><span>{t.controls}</span><small>{t.tools}</small><p>{t.measure}<br />{t.resources}</p></div>
  </div>;
  if (id === 'idea') return <div className="scene-illustration idea-study" data-illustration="unbuilt-question">
    <Piece progress={progress} reduced={reduced} className="idea-proposal" from={{ x: 40, y: -35, rotate: 12, opacity: 0 }} to={{ x: 0, y: 0, rotate: -4, opacity: 1 }} range={[.04, .38]} action="place-question"><TreeStructure size={56} weight="light" /><strong>{t.change}</strong><span>{t.verify}</span><em>{t.evidence}</em></Piece>
    <span className="idea-footnote">{t.unfinished}</span>
  </div>;
  if (id === 'scores') return <div className="scene-illustration scores-study" data-illustration="reconsider-scoring">
    <Piece progress={progress} reduced={reduced} className="score-before" from={{ rotate: -6 }} to={{ x: -53, y: -66, rotate: -14, opacity: .25 }} action="reconsider"><motion.span style={{ visibility: reduced ? 'hidden' : discardedLabel }}>{t.dimensions}</motion.span><i /><i /><i /></Piece>
    <Piece progress={progress} reduced={reduced} className="score-after" from={{ y: 55, opacity: .2 }} to={{ y: 22, rotate: 3, opacity: 1 }}><BookOpen size={45} weight="light" /><strong>{t.environment}</strong><span>{t.question}</span></Piece>
  </div>;
  if (id === 'seventeen') return <div className="scene-illustration competition-study" data-illustration="own-mistake">
    <div className="competition-page"><PencilSimple size={41} weight="light" /><strong>{t.mistake}</strong><div className="graph-sketch"><i /><i /><i /><i /></div></div>
    <Piece progress={progress} reduced={reduced} className="competition-note" from={{ x: 25, y: 65, rotate: 7, opacity: 0 }} to={{ y: 30, rotate: -4, opacity: 1 }} range={[.2, .54]}><span>{t.result}</span></Piece>
  </div>;
  return <div className="scene-illustration notebook-study" data-illustration="personal-notebook">
    <Piece progress={progress} reduced={reduced} className="notebook-leaf" from={{ x: -20, y: 20, rotate: -6 }} to={{ y: -5, rotate: 3 }}><span>Eric / Trình</span><GameController size={51} weight="light" /><strong>{t.notebook}</strong><small>{t.personal}</small></Piece>
  </div>;
}
