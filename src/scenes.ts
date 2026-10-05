import type { EntryId, Language } from './content';

export type SceneCopy = { title: string; paragraphs: [string, string]; label: string; question: string };
export type SceneId = EntryId;
export const defaultPath: SceneId[] = ['dfriend', 'pilot', 'research', 'idea', 'notebook'];
export const continuations: Record<SceneId, SceneId[]> = {
  dfriend: ['dfriend', 'pilot', 'research', 'idea', 'notebook'],
  seventeen: ['seventeen', 'scores', 'pilot', 'research', 'idea', 'notebook'],
  scores: ['scores', 'pilot', 'research', 'idea', 'notebook'],
  pilot: ['pilot', 'research', 'idea', 'notebook'],
  research: ['research', 'idea', 'notebook'],
  idea: ['idea', 'notebook'],
  notebook: ['notebook'],
};
export const connections: Record<SceneId, SceneId[]> = {
  dfriend: ['seventeen', 'scores', 'pilot'],
  seventeen: ['scores', 'dfriend'],
  scores: ['pilot', 'dfriend'],
  pilot: ['research', 'scores', 'dfriend'],
  research: ['idea', 'pilot'],
  idea: ['notebook', 'research'],
  notebook: ['dfriend', 'idea'],
};

// Preserve the route already travelled. A forward branch replaces only its unread tail.
// A previously visited node is a return, so it never creates an automatic loop.
export function branchPath(path: SceneId[], index: number, target: SceneId): { path: SceneId[]; index: number } {
  const prefix = path.slice(0, index + 1);
  const visited = prefix.indexOf(target);
  if (visited !== -1) return { path, index: visited };
  return { path: [...prefix, ...continuations[target].filter(id => !prefix.includes(id))], index: prefix.length };
}

export const journeyUi = {
  en: {
    title: 'Follow a thought.', subtitle: 'Keep going, or take a different thread.',
    full: 'Read the full story', branches: 'Connected thoughts', next: 'Next thought', previous: 'Previous thought',
    return: 'Back to the desk', forward: 'Continue to', finish: 'Say hello', explore: 'Explore',
    origin: 'Why it started', nextLabel: 'Where it led', research: 'A question to test',
    path: 'Your path through the desk', branch: 'Take this thread', resume: 'Continue exploring',
  },
  vi: {
    title: 'Theo một dòng suy nghĩ.', subtitle: 'Cứ đi tiếp, hoặc rẽ sang một câu chuyện khác.',
    full: 'Đọc đầy đủ', branches: 'Những ý nối với nhau', next: 'Ý tiếp theo', previous: 'Ý trước đó',
    return: 'Về bàn làm việc', forward: 'Đi tiếp tới', finish: 'Bắt chuyện', explore: 'Khám phá',
    origin: 'Vì sao nó bắt đầu', nextLabel: 'Nó dẫn tới đâu', research: 'Một câu hỏi để test',
    path: 'Đường bạn vừa đi', branch: 'Rẽ sang câu chuyện này', resume: 'Khám phá tiếp',
  },
};

export const scenes: Record<Language, Record<SceneId, SceneCopy>> = {
  en: {
    dfriend: { label: 'D-Friend', title: 'What if the score wasn’t the point?', question: 'What does it mean to learn?', paragraphs: [
      'D-Friend started with a frustration about how we judge learning. My first answer was a smarter scoring system. Then I noticed I was still turning a person into a score, just with more dimensions.',
      'So I changed the starting point: a learning environment where trying, finishing, and revising matter. It’s now in pilot, focused on a teacher copilot. The idea is still being tested, and so am I.',
    ] },
    pilot: { label: 'Learning from pilot', title: 'I built a lot. What was I testing?', question: 'What would count as evidence?', paragraphs: [
      'The first pilot had a student module before the teacher side was ready to create the value. The next one had the teacher module, but the scope had grown closer to a whole product than an MVP.',
      'Burnout made me cut things back and change the question: what do I need for the next test, what should I measure, and what does it cost to find out? Cost, latency, and runway became part of the work.',
    ] },
    research: { label: 'Financial-agent research', title: 'When is an agent worth it?', question: 'Does autonomy earn its cost?', paragraphs: [
      'I’m the tech lead for a team working on my first paper. We’re comparing a single-shot LLM, a fixed pipeline, and a bounded autonomous agent for financial research, with shared inputs and controlled resources.',
      'The question is whether adaptive control adds enough value to justify its latency and cost. Forecast quality and calibration are part of the planned evaluation. We’re still doing the work; there are no results or demo yet.',
    ] },
    idea: { label: 'Agents improving agents', title: 'Could an agent improve another agent?', question: 'How would it know it helped?', paragraphs: [
      'I’ve been thinking about a root agent that could inspect another agent system, find a weakness, propose a change, and test whether the change helped. This is an idea, not something I’ve built.',
      'The ambition is to work across systems and domains. The hard question comes first: how would it reliably judge an improvement? Different domains need different evidence. I don’t have a validated answer yet.',
    ] },
    notebook: { label: 'Away from the code', title: 'The other tabs in my head.', question: 'What will I try next?', paragraphs: [
      'Hard games, quiet places, and things I can take apart in my head. Hollow Knight and Silksong are finished. Sekiro is still on the list. The Godfather and Interstellar are two films I’m drawn to.',
      'I usually learn when something I’m building needs it. I care about D-Friend, but I’m betting more on myself than on one project: what I’ll learn to build next, and the people I’ll get to build it with.',
    ] },
    seventeen: { label: 'The competition at 17', title: 'The problem I thought was easy.', question: 'How much can one result say?', paragraphs: [
      'At 17, I put three months into learning algorithms for the national competition. On the first day, I thought a graph problem was easy and moved on convinced I had solved it. Outside the room, I realized I was wrong.',
      'That disappointment followed me into the second day. I left without an award. At the time I called it unfair; now I can acknowledge my own mistakes and still ask why one score gets to carry so much weight.',
    ] },
    scores: { label: 'Rethinking scores', title: 'A smarter score is still a score.', question: 'Was I changing the right thing?', paragraphs: [
      'I wanted a product that didn’t reduce people to a number. Adding more dimensions seemed like progress, until I wondered whether I was polishing the very mechanism I wanted to move away from.',
      'I started thinking about an environment and a philosophy instead. Done > perfect became one of the ideas I kept returning to: try, finish, learn, revise. Making that useful in a product is still something I’m working on.',
    ] },
  },
  vi: {
    dfriend: { label: 'D-Friend', title: 'Nếu điểm số không phải đích đến?', question: 'Thế nào là thực sự học?', paragraphs: [
      'D-Friend bắt đầu từ sự khó chịu với cách chúng ta đánh giá việc học. Câu trả lời đầu tiên của mình là một hệ thống chấm điểm thông minh hơn. Rồi mình nhận ra mình vẫn thu gọn con người vào điểm số, chỉ là nhiều chiều hơn.',
      'Thế là mình đổi điểm bắt đầu: một môi trường học coi trọng việc thử, hoàn thành và sửa. Hiện tại D-Friend đang pilot với teacher copilot. Ý tưởng vẫn đang được kiểm chứng, và mình cũng đang học ngay trong quá trình đó.',
    ] },
    pilot: { label: 'Bài học từ pilot', title: 'Xây nhiều. Nhưng đang test cái gì?', question: 'Điều gì được tính là bằng chứng?', paragraphs: [
      'Pilot đầu có student module trước khi phía giáo viên sẵn sàng tạo ra giá trị. Lần sau có teacher module rồi, scope lại gần thành cả một sản phẩm hơn là MVP.',
      'Burnout khiến mình cắt bớt và đổi câu hỏi: cần xây gì cho lần test tiếp theo, đo gì, và mất bao nhiêu để biết mình có đúng không? Cost, latency và runway trở thành một phần của việc xây sản phẩm.',
    ] },
    research: { label: 'Nghiên cứu financial agents', title: 'Khi nào agent đáng chi phí?', question: 'Tự điều phối có đáng chi phí?', paragraphs: [
      'Mình là tech lead của team đang làm paper đầu tiên của mình. Team so sánh single-shot LLM, pipeline cố định và autonomous agent có giới hạn trong nghiên cứu tài chính, với đầu vào chung và tài nguyên được kiểm soát.',
      'Câu hỏi là khả năng tự điều phối có tạo đủ giá trị để bù latency và cost không. Chất lượng dự báo và calibration nằm trong thiết kế đánh giá. Team vẫn đang làm, chưa có kết quả hay demo.',
    ] },
    idea: { label: 'Agent cải tiến agent', title: 'Agent có thể cải tiến agent khác?', question: 'Làm sao biết nó đã giúp ích?', paragraphs: [
      'Mình đang nghĩ về một root agent có thể xem xét hệ thống agent khác, tìm điểm yếu, đề xuất thay đổi và kiểm tra thay đổi ấy có giúp ích không. Đây mới là ý tưởng, mình chưa xây nó.',
      'Tham vọng là áp dụng cho nhiều hệ thống và domain. Nhưng câu hỏi khó nằm trước cả kiến trúc: đánh giá cải tiến thế nào cho đáng tin? Mỗi domain cần bằng chứng khác nhau. Mình chưa có câu trả lời được kiểm chứng.',
    ] },
    notebook: { label: 'Ngoài những dòng code', title: 'Những tab khác trong đầu.', question: 'Tiếp theo mình sẽ thử gì?', paragraphs: [
      'Game khó, không gian yên tĩnh và những thứ mình có thể mày mò. Hollow Knight và Silksong đã xong. Sekiro vẫn còn trên danh sách. Bố già và Interstellar là hai phim mình thích.',
      'Mình thường học khi thứ đang xây cần đến nó. Mình quan tâm D-Friend, nhưng đặt cược vào bản thân nhiều hơn vào một dự án: những thứ tiếp theo mình sẽ học cách xây, và những người mình sẽ cùng xây chúng.',
    ] },
    seventeen: { label: 'Lần thi năm 17 tuổi', title: 'Bài mà mình tưởng là dễ.', question: 'Một kết quả nói được bao nhiêu?', paragraphs: [
      'Năm 17 tuổi, mình đặt ba tháng vào việc học thuật toán để thi học sinh giỏi quốc gia. Ngày đầu, gặp bài đồ thị mình thấy dễ, nghĩ đã làm đúng rồi chuyển sang bài khác. Ra khỏi phòng mới biết mình sai.',
      'Tâm lý ấy theo sang ngày thứ hai. Cuối cùng mình không có giải. Lúc đó mình thấy bất công; bây giờ mình có thể thừa nhận lỗi của mình mà vẫn tự hỏi vì sao một điểm số lại có sức nặng lớn đến thế.',
    ] },
    scores: { label: 'Nghĩ lại về điểm số', title: 'Chấm tinh vi hơn vẫn là chấm điểm.', question: 'Mình có đang đổi đúng thứ không?', paragraphs: [
      'Mình muốn sản phẩm không thu gọn con người vào một con số. Thêm nhiều chiều nghe có vẻ là tiến bộ, cho tới khi mình tự hỏi có phải đang làm mượt lại đúng cơ chế mình muốn rời khỏi.',
      'Mình bắt đầu nghĩ về môi trường và triết lý học. Done > perfect là một ý mình cứ quay lại: thử, hoàn thành, học rồi sửa. Làm cho nó có ích trong sản phẩm vẫn là việc mình đang tìm hiểu.',
    ] },
  },
};
