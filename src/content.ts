export type Language = 'en' | 'vi';
export type EntryId = 'dfriend' | 'research' | 'idea' | 'notebook' | 'seventeen' | 'scores' | 'pilot';
export type Entry = {
  id: EntryId;
  type: string;
  status: string;
  title: string;
  subtitle: string;
  intro: string;
  sections: { title: string; text: string }[];
  related?: { id: EntryId; label: string }[];
};

export const contact = {
  email: 'trinhkhanh15082007@gmail.com',
  github: 'https://github.com/trinhkhanh15',
  instagram: 'https://www.instagram.com/ericnguyen_in/',
  linkedin: 'https://www.linkedin.com/in/etnguyen1508/',
};

export const projectLinks = { dfriend: 'https://www.dfriend.online/' };

export const ui = {
  en: {
    skip: 'Skip to content', desk: 'The desk', notes: 'Some notes', contact: 'Say hello',
    intro: 'I’m a computer science student in Vietnam. I build products, experiment with agents, and learn by testing ideas.',
    name: 'Nguyễn Khánh Trình', role: 'A builder, figuring things out.',
    heroLink: 'Take a look around', deskTitle: 'A few things left open.',
    deskBody: 'Some are being built. Some are being tested. One is still just a thought.',
    open: 'Open', openObject: 'Open this object', deskHint: 'Scroll to follow a thought. Pick an object to start there.',
    folderStatus: 'In pilot', folderCaption: 'A different way to learn.',
    visitDfriend: 'Visit D-Friend',
    researchStatus: 'Research in progress', researchCaption: 'When is an agent worth it?',
    ideaStatus: 'Just a thought', ideaTitle: 'Agents improving agents?', ideaCaption: 'A question, not a claim.',
    notebookTitle: 'Away from the code', notebookCaption: 'The other tabs in my head.',
    notesTitle: 'Things I’ve changed my mind about.',
    notesBody: 'A few mistakes, decisions, and questions that stuck around.',
    read: 'Read the note', noteOf: 'A note on',
    contactTitle: 'Something in common?',
    contactBody: 'If you’re building something, thinking about agents, or just want to talk, my inbox is open.',
    emailAction: 'Drop me an email', footer: 'Still figuring it out. Still building.',
    close: 'Close', related: 'Also on the desk', light: 'Switch to light appearance', dark: 'Switch to dark appearance',
    backToDesk: 'Continue exploring', language: 'Switch to Vietnamese',
    learning: 'Education', researchLabel: 'Financial agents', thoughtLabel: 'Open question', personalLabel: 'Personal',
  },
  vi: {
    skip: 'Đến nội dung', desk: 'Bàn làm việc', notes: 'Vài ghi chú', contact: 'Bắt chuyện',
    intro: 'Mình học Khoa học máy tính ở Việt Nam. Mình xây sản phẩm, thử nghiệm với agent và học bằng cách kiểm chứng ý tưởng.',
    name: 'Nguyễn Khánh Trình', role: 'Thích xây, vẫn đang tìm đường.',
    heroLink: 'Ghé xem một chút', deskTitle: 'Vài thứ vẫn đang mở.',
    deskBody: 'Có thứ đang xây. Có thứ đang kiểm chứng. Có thứ mới chỉ là một suy nghĩ.',
    open: 'Mở', openObject: 'Mở nội dung này', deskHint: 'Cuộn để đi tiếp. Chọn một thứ để bắt đầu từ đó.',
    folderStatus: 'Đang pilot', folderCaption: 'Một cách khác để học.',
    visitDfriend: 'Ghé D-Friend',
    researchStatus: 'Đang nghiên cứu', researchCaption: 'Khi nào agent đáng chi phí?',
    ideaStatus: 'Mới là ý tưởng', ideaTitle: 'Agent cải tiến agent?', ideaCaption: 'Một câu hỏi đang mở.',
    notebookTitle: 'Ngoài những dòng code', notebookCaption: 'Những tab khác trong đầu.',
    notesTitle: 'Những điều mình đã nghĩ lại.',
    notesBody: 'Vài sai lầm, lựa chọn và câu hỏi mình vẫn còn mang theo.',
    read: 'Đọc ghi chú', noteOf: 'Một ghi chú về',
    contactTitle: 'Có gì chung không?',
    contactBody: 'Nếu bạn đang xây thứ gì đó, nghĩ về agent, hay đơn giản muốn nói chuyện, cứ nhắn mình.',
    emailAction: 'Gửi mình một email', footer: 'Vẫn đang tìm hiểu. Vẫn đang làm.',
    close: 'Đóng', related: 'Cũng trên bàn này', light: 'Chuyển sang nền sáng', dark: 'Chuyển sang nền tối',
    backToDesk: 'Khám phá tiếp', language: 'Chuyển sang tiếng Anh',
    learning: 'Giáo dục', researchLabel: 'Financial agents', thoughtLabel: 'Câu hỏi mở', personalLabel: 'Cá nhân',
  },
};

export const entries: Record<Language, Record<EntryId, Entry>> = {
  en: {
    dfriend: {
      id: 'dfriend', type: 'Product', status: 'In pilot', title: 'D-Friend',
      subtitle: 'What would learning look like if the score wasn’t the point?',
      intro: 'An education product I’m building. It started with a personal frustration, then kept changing as I learned more about the problem.',
      sections: [
        { title: 'Where it started', text: 'At 17, I put three months into preparing for a national algorithm competition. I made a mistake on a graph problem I thought was easy, and the disappointment followed me into the next day. I left without an award. At the time, I called it unfair. Looking back, my own decisions were part of it. But a question stayed: should one score get to say so much about a person?' },
        { title: 'A better score was still a score', text: 'My first instinct was to build a smarter assessment system with more dimensions. Eventually I realized I was still making another score. That pushed D-Friend toward a learning environment and a philosophy I wanted to explore: trying, finishing, and learning through the process.' },
        { title: 'Where it is now', text: 'D-Friend is in pilot, with a focus on a teacher copilot. I’ve moved away from treating a full product as the starting point. The immediate job is to test a specific idea with teachers, learn from what actually happens, and decide what deserves to be built next.' },
        { title: 'What I do', text: 'I work across the product and the system behind it: agent routing, state, backend services, infrastructure, and the trade-offs around cost and latency. My usual tools include Python, NestJS, SQL, MongoDB, Docker, and AWS EC2.' },
      ],
      related: [{ id: 'seventeen', label: 'The competition at 17' }, { id: 'scores', label: 'Rethinking scores' }, { id: 'pilot', label: 'Building too much' }],
    },
    research: {
      id: 'research', type: 'Research', status: 'Work in progress', title: 'When is an agent worth it?',
      subtitle: 'A controlled comparison of orchestration strategies for financial research.',
      intro: 'I’m the tech lead for a team working on this paper. It’s my first time writing one. We’re still doing the work; there’s no demo or result to show yet.',
      sections: [
        { title: 'The question', text: 'If an autonomous agent performs better than a fixed pipeline, what caused the gain? Adaptive control? A stronger model? More information or tool calls? A different evaluation setup? We want to separate those explanations.' },
        { title: 'Three ways to do the same job', text: 'We’re comparing a single-shot LLM, a fixed financial-research pipeline, and a bounded autonomous agent. The planned controls include the same timestamped event inputs, base-model snapshot, output schema, feedback history, resource ceilings, and data interfaces. The pipeline and agent share the same callable tools.' },
        { title: 'What we plan to measure', text: 'The systems will forecast sector-adjusted U.S. equity returns over 1, 5, and 20 trading days. Primary measures are a deterministic matching score, probabilistic calibration, end-to-end latency, and monetary cost. A blinded LLM rubric with a four-person human audit will provide secondary evidence about research quality.' },
        { title: 'Evidence before conclusions', text: 'The primary experiment is planned around a frozen, time-gated historical corpus. A smaller live forward study will test external validity. The goal is to find when adaptive control adds enough forecasting or reasoning value to justify its operational cost. This is a study design, not a claim of performance or a trading strategy.' },
      ],
      related: [{ id: 'idea', label: 'Another question about agents' }],
    },
    idea: {
      id: 'idea', type: 'Unfinished idea', status: 'Thinking stage', title: 'Agents improving agents?',
      subtitle: 'Could a root agent help improve another agent system?',
      intro: 'This is just an idea I’ve been thinking about. I haven’t built or validated it.',
      sections: [
        { title: 'What interests me', text: 'Instead of one agent improving itself through its own feedback loop, could a separate root agent inspect another agent system, find a weakness, propose a change, and test whether that change actually helps?' },
        { title: 'The ambitious part', text: 'I’m interested in whether this could work across different systems and domains. That’s the ambition, not an established capability. Different domains have different goals, failure modes, and ways to judge an improvement.' },
        { title: 'The question before the architecture', text: 'How would it know that it made the target system better? A convincing improvement needs a reliable evaluation of the target system. How to do that across different domains is still an open question.' },
        { title: 'An open invitation', text: 'If you’re thinking about evaluation, agent debugging, or systems that help build other systems, I’d like to compare notes.' },
      ],
      related: [{ id: 'research', label: 'Measuring the value of autonomy' }],
    },
    notebook: {
      id: 'notebook', type: 'Personal notebook', status: 'Always open', title: 'Away from the code',
      subtitle: 'A few things that don’t fit in a project description.',
      intro: 'I’m Nguyễn Khánh Trình, or Eric Nguyen. A CS student in Vietnam, building things and figuring out where I want to take them.',
      sections: [
        { title: 'Games I stick with', text: 'I like difficult games. Hollow Knight and Silksong are finished. Sekiro is still unfinished. That one is staying on the list for now.' },
        { title: 'Films', text: 'The Godfather and Interstellar. Very different films; both are ones I’m drawn to.' },
        { title: 'The setting', text: 'Quiet places. Somewhere airy when I want to chill, softer light when I need to focus. Music depends on the mood. I’m into technology and gadgets, and I don’t take many photos.' },
        { title: 'How I learn', text: 'Usually just in time. A project needs something, so I go learn it, try it, and see what breaks. I like understanding the loop, routing, and state of an agent system myself, then choosing where deterministic logic should do the job.' },
        { title: 'What I’m betting on', text: 'I care about D-Friend, but I’m betting more on myself than on one project. I’m interested in what I’ll learn to build next, and the people I’ll get to build it with.' },
      ],
      related: [{ id: 'dfriend', label: 'What I’m building now' }],
    },
    seventeen: {
      id: 'seventeen', type: 'Personal note', status: 'Looking back', title: 'The problem I thought was easy.',
      subtitle: 'On being 17, making a bet, and getting it wrong.',
      intro: 'I was in my last year of high school. I hadn’t learned algorithms before joining the team, and I put three months I could have used for graduation prep into the national competition instead.',
      sections: [
        { title: 'The part I got wrong', text: 'I worked day and night, especially on graph algorithms. On the first competition day, I saw a graph problem, thought it was easy, and moved on convinced I had the full score. After leaving the room, I read it again and realized my solution was wrong.' },
        { title: 'Then the second day', text: 'The disappointment carried over. There were difficult problems and material I hadn’t learned. I spent time on a partial solution that I didn’t finish in time. I ended up without an award.' },
        { title: 'What I believed then', text: 'I thought it was unfair. I wanted to be in charge of the game instead of following a path where a score decided the outcome. There was a lot of frustration in that thought, and some immaturity too.' },
        { title: 'What stayed', text: 'I can acknowledge my own mistakes and still question how much weight we give scores. That question became an early starting point for D-Friend. It wasn’t a complete theory of education. It was something I wanted to investigate by building.' },
      ],
      related: [{ id: 'dfriend', label: 'Where that question went' }],
    },
    scores: {
      id: 'scores', type: 'Product note', status: 'A change in thinking', title: 'A smarter score is still a score.',
      subtitle: 'A moment when the thing I was building started to look familiar.',
      intro: 'I wanted to build something that didn’t reduce a person to a score. Then I found myself designing a more sophisticated scoring system.',
      sections: [
        { title: 'More dimensions', text: 'At first, more dimensions seemed like the answer. We could assess more things, be more nuanced, and call it better. But I began to wonder whether I was refining the same mechanism I had wanted to move away from.' },
        { title: 'Changing the starting point', text: 'So I stepped back from scores as the center of the product. I started thinking in terms of an environment, a framework, and a philosophy for learning. D-Friend became a way to explore my own expectations of education.' },
        { title: 'Done > perfect', text: 'That’s one of the ideas I keep coming back to. Try, finish, learn, and revise. I’m still working out how to make that useful in a product rather than leave it as a nice sentence.' },
      ],
      related: [{ id: 'dfriend', label: 'D-Friend today' }, { id: 'pilot', label: 'Applying that idea to building' }],
    },
    pilot: {
      id: 'pilot', type: 'Founder note', status: 'A lesson from pilot', title: 'I built a lot. What was I testing?',
      subtitle: 'The gap between shipping a product and testing an idea.',
      intro: 'I kept building. Then pilot arrived, and I couldn’t clearly say what I was piloting or what I should measure.',
      sections: [
        { title: 'The first pilot', text: 'I shipped the student module before the teacher module was there. The teacher side was supposed to create the value that made the student experience useful. The first pilot failed to put that full loop in place.' },
        { title: 'The second one', text: 'I shipped the teacher module. But when I looked at the scope, it was closer to a full product than an MVP. I burned out and cut things back.' },
        { title: 'A different question', text: 'What do I actually need to build to test this bet? What would count as evidence? That shift felt like moving from only being a builder toward being a founder. Cost, latency, and runway started to matter much more.' },
        { title: 'What I’m trying to practice', text: 'Build what the next test needs. Decide what to measure before the pilot starts. Let the evidence decide what comes next. I understand it more clearly now; consistently doing it is still work.' },
      ],
      related: [{ id: 'dfriend', label: 'The product behind the lesson' }, { id: 'research', label: 'Another attempt to test a clear question' }],
    },
  },
  vi: {
    dfriend: {
      id: 'dfriend', type: 'Sản phẩm', status: 'Đang pilot', title: 'D-Friend',
      subtitle: 'Việc học sẽ thế nào nếu điểm số không phải đích đến?',
      intro: 'Một sản phẩm giáo dục mình đang xây. Nó bắt đầu từ một sự khó chịu rất cá nhân, rồi thay đổi nhiều lần khi mình hiểu thêm về vấn đề.',
      sections: [
        { title: 'Nó bắt đầu từ đâu', text: 'Năm 17 tuổi, mình dành ba tháng để ôn thi học sinh giỏi quốc gia môn Tin. Mình sai một bài đồ thị tưởng là dễ, rồi mang tâm lý đó sang ngày thi tiếp theo. Cuối cùng không có giải. Lúc đó mình thấy bất công. Nhìn lại, những quyết định của mình cũng góp phần tạo ra kết quả ấy. Nhưng một câu hỏi vẫn ở lại: có nên để một điểm số nói quá nhiều về một con người?' },
        { title: 'Chấm tinh vi hơn vẫn là chấm điểm', text: 'Phản xạ đầu tiên của mình là xây một hệ thống đánh giá thông minh hơn, nhiều chiều hơn. Rồi mình nhận ra mình vẫn đang tạo ra một điểm số khác. Thế là D-Friend chuyển dần sang một môi trường học và một triết lý mình muốn thử: làm, hoàn thành, và học ngay trong quá trình đó.' },
        { title: 'Hiện tại', text: 'D-Friend đang ở giai đoạn pilot, tập trung vào teacher copilot. Mình bớt xem một sản phẩm đầy đủ là điểm bắt đầu. Việc trước mắt là kiểm chứng một giả thuyết cụ thể với giáo viên, nhìn điều thực sự xảy ra, rồi quyết định thứ gì đáng xây tiếp.' },
        { title: 'Mình làm gì', text: 'Mình làm cả sản phẩm lẫn hệ thống phía sau: routing và state của agent, backend, hạ tầng, cùng các đánh đổi về cost và latency. Những công cụ quen thuộc gồm Python, NestJS, SQL, MongoDB, Docker và AWS EC2.' },
      ],
      related: [{ id: 'seventeen', label: 'Lần thi năm 17 tuổi' }, { id: 'scores', label: 'Nghĩ lại về điểm số' }, { id: 'pilot', label: 'Khi mình xây quá nhiều' }],
    },
    research: {
      id: 'research', type: 'Nghiên cứu', status: 'Đang thực hiện', title: 'Khi nào agent đáng chi phí?',
      subtitle: 'So sánh có kiểm soát các cách điều phối LLM trong nghiên cứu tài chính.',
      intro: 'Mình là tech lead của team đang làm paper này. Đây là lần đầu mình viết paper. Team vẫn đang làm, chưa có demo hay kết quả để đưa ra.',
      sections: [
        { title: 'Câu hỏi', text: 'Nếu một autonomous agent tốt hơn một pipeline cố định, điều gì tạo ra chênh lệch? Khả năng tự điều phối? Model mạnh hơn? Nhiều thông tin hoặc tool call hơn? Hay cách đánh giá khác nhau? Team muốn tách những lời giải thích này ra.' },
        { title: 'Ba cách làm cùng một việc', text: 'Team so sánh single-shot LLM, một pipeline nghiên cứu tài chính cố định, và một autonomous agent có giới hạn. Thiết kế dự kiến giữ chung dữ liệu sự kiện có timestamp, phiên bản model, schema đầu ra, lịch sử feedback, trần tài nguyên và giao diện dữ liệu. Pipeline và agent dùng cùng các tool có thể gọi.' },
        { title: 'Dự định đo gì', text: 'Các hệ thống sẽ dự báo lợi suất cổ phiếu Mỹ đã điều chỉnh theo ngành ở các khoảng 1, 5 và 20 ngày giao dịch. Các thước đo chính là matching score xác định, calibration xác suất, latency toàn trình và chi phí. Một rubric LLM chấm ẩn danh cùng bốn người audit sẽ cung cấp bằng chứng bổ sung về chất lượng nghiên cứu.' },
        { title: 'Có bằng chứng rồi mới kết luận', text: 'Thí nghiệm chính dự kiến dùng corpus lịch sử đóng băng, giới hạn thông tin theo thời gian. Một nghiên cứu forward nhỏ hơn sẽ kiểm tra tính áp dụng thực tế. Mục tiêu là xem khi nào khả năng tự điều phối tạo đủ giá trị để bù chi phí vận hành. Đây là thiết kế nghiên cứu, chưa phải kết quả hay chiến lược giao dịch.' },
      ],
      related: [{ id: 'idea', label: 'Một câu hỏi khác về agent' }],
    },
    idea: {
      id: 'idea', type: 'Ý tưởng còn dở', status: 'Đang suy nghĩ', title: 'Agent cải tiến agent?',
      subtitle: 'Liệu một root agent có thể giúp cải tiến một hệ thống agent khác?',
      intro: 'Đây mới là một ý tưởng mình đang nghĩ. Mình chưa xây hay kiểm chứng nó.',
      sections: [
        { title: 'Điều khiến mình tò mò', text: 'Thay vì một agent tự cải tiến bằng feedback loop của chính nó, liệu một root agent riêng có thể xem xét hệ thống khác, tìm điểm yếu, đề xuất thay đổi, rồi kiểm tra thay đổi đó có thực sự giúp ích không?' },
        { title: 'Phần tham vọng', text: 'Mình quan tâm liệu cách này có thể áp dụng cho nhiều hệ thống và domain khác nhau. Đó là tham vọng, chưa phải khả năng đã được chứng minh. Mỗi domain có mục tiêu, kiểu lỗi và cách đánh giá cải tiến khác nhau.' },
        { title: 'Câu hỏi trước cả kiến trúc', text: 'Làm sao nó biết nó đã khiến hệ thống đích tốt hơn? Một cải tiến đáng tin cần phép đánh giá đáng tin cho hệ thống đích. Làm điều đó trên nhiều domain khác nhau vẫn là câu hỏi đang mở.' },
        { title: 'Muốn trao đổi thêm', text: 'Nếu bạn cũng nghĩ về evaluation, debug agent, hay hệ thống giúp xây hệ thống khác, mình muốn nghe cách bạn nhìn vấn đề.' },
      ],
      related: [{ id: 'research', label: 'Đo giá trị của khả năng tự điều phối' }],
    },
    notebook: {
      id: 'notebook', type: 'Sổ cá nhân', status: 'Luôn mở', title: 'Ngoài những dòng code',
      subtitle: 'Vài thứ không nằm vừa trong mô tả dự án.',
      intro: 'Mình là Nguyễn Khánh Trình, cũng dùng tên Eric Nguyen. Sinh viên CS ở Việt Nam, thích xây đồ và vẫn đang tìm xem mình muốn đi tới đâu.',
      sections: [
        { title: 'Game mình chơi', text: 'Mình thích game khó. Hollow Knight và Silksong đã xong. Sekiro thì vẫn còn dang dở. Tạm thời cứ để nó trên danh sách vậy.' },
        { title: 'Phim', text: 'Bố già và Interstellar. Hai phim rất khác nhau, nhưng đều là những phim mình thích.' },
        { title: 'Không gian', text: 'Yên tĩnh. Thoáng mát lúc muốn chill, ánh sáng dịu hơn khi cần tập trung. Nhạc tùy mood. Mình thích đồ công nghệ và không chụp ảnh nhiều lắm.' },
        { title: 'Cách mình học', text: 'Thường là just-in-time. Dự án cần gì thì mình học, thử, rồi xem nó hỏng ở đâu. Với agent, mình thích tự hiểu loop, routing và state, sau đó chọn chỗ nào nên dùng logic xác định.' },
        { title: 'Mình đặt cược vào đâu', text: 'Mình quan tâm D-Friend, nhưng đặt cược vào bản thân nhiều hơn vào một dự án. Mình tò mò những thứ tiếp theo mình sẽ học cách xây, và những người mình sẽ cùng xây chúng.' },
      ],
      related: [{ id: 'dfriend', label: 'Thứ mình đang xây' }],
    },
    seventeen: {
      id: 'seventeen', type: 'Ghi chú cá nhân', status: 'Nhìn lại', title: 'Bài mà mình tưởng là dễ.',
      subtitle: 'Về năm 17 tuổi, một lần đặt cược, và chuyện làm sai.',
      intro: 'Năm đó mình học lớp 12. Trước khi vào đội tuyển mình chưa học thuật toán. Mình đặt ba tháng có thể dùng để ôn tốt nghiệp vào việc thi học sinh giỏi quốc gia.',
      sections: [
        { title: 'Chỗ mình sai', text: 'Mình cày ngày đêm, đặc biệt là thuật toán đồ thị. Ngày thi đầu, gặp bài đồ thị mình thấy dễ, nghĩ đã full điểm rồi chuyển sang bài khác. Ra khỏi phòng đọc lại đề mới biết lời giải của mình sai.' },
        { title: 'Rồi đến ngày thứ hai', text: 'Tâm lý ngày đầu vẫn còn đó. Bài khó, có phần mình chưa học. Mình dành thời gian cho một lời giải lấy điểm phần mà cuối cùng không kịp hoàn thành. Kết quả là không có giải.' },
        { title: 'Lúc đó mình nghĩ gì', text: 'Mình thấy bất công. Mình muốn làm chủ cuộc chơi thay vì đi theo một con đường mà điểm số quyết định kết quả. Suy nghĩ ấy có nhiều thất vọng, và cũng có phần trẻ con.' },
        { title: 'Điều còn ở lại', text: 'Mình có thể thừa nhận lỗi của bản thân mà vẫn đặt câu hỏi về sức nặng của điểm số. Câu hỏi đó trở thành một điểm khởi đầu của D-Friend. Nó chưa phải một lý thuyết giáo dục hoàn chỉnh. Chỉ là thứ mình muốn tìm hiểu bằng cách xây.' },
      ],
      related: [{ id: 'dfriend', label: 'Câu hỏi ấy đi tới đâu' }],
    },
    scores: {
      id: 'scores', type: 'Ghi chú sản phẩm', status: 'Một lần nghĩ lại', title: 'Chấm tinh vi hơn vẫn là chấm điểm.',
      subtitle: 'Khi thứ mình đang xây bắt đầu trông quen thuộc.',
      intro: 'Mình muốn xây thứ gì đó không thu gọn con người vào điểm số. Rồi mình lại đi thiết kế một hệ thống chấm điểm tinh vi hơn.',
      sections: [
        { title: 'Thêm nhiều chiều', text: 'Ban đầu, nhiều chiều hơn nghe có vẻ là câu trả lời. Đánh giá nhiều thứ hơn, chi tiết hơn, rồi gọi nó là tốt hơn. Nhưng mình bắt đầu tự hỏi liệu có phải mình đang làm mượt lại đúng cơ chế mình muốn rời khỏi.' },
        { title: 'Đổi điểm bắt đầu', text: 'Thế là mình bớt đặt điểm số ở trung tâm sản phẩm. Mình nghĩ về môi trường, framework và triết lý học. D-Friend trở thành một cách để mình thử những điều bản thân mong đợi ở giáo dục.' },
        { title: 'Done > perfect', text: 'Đây là một trong những ý mình cứ quay lại. Thử, hoàn thành, học, rồi sửa. Mình vẫn đang tìm cách khiến nó có ích trong sản phẩm, thay vì chỉ là một câu nghe hay.' },
      ],
      related: [{ id: 'dfriend', label: 'D-Friend hiện tại' }, { id: 'pilot', label: 'Áp dụng vào việc xây sản phẩm' }],
    },
    pilot: {
      id: 'pilot', type: 'Ghi chú founder', status: 'Bài học từ pilot', title: 'Xây nhiều. Nhưng đang test cái gì?',
      subtitle: 'Khoảng cách giữa ship sản phẩm và kiểm chứng một ý tưởng.',
      intro: 'Mình cứ xây. Đến lúc pilot, mình lại không nói rõ được mình đang pilot cái gì, và nên đo cái gì.',
      sections: [
        { title: 'Pilot đầu', text: 'Mình ship student module trước khi teacher module có mặt. Phía giáo viên mới là bên tạo ra giá trị để trải nghiệm học sinh có ích. Pilot đầu fail vì chưa đặt được cả vòng đó vào đúng chỗ.' },
        { title: 'Lần thứ hai', text: 'Mình ship teacher module. Nhưng nhìn lại scope thì nó gần như một full product hơn là MVP. Mình burnout rồi quyết định cắt bớt.' },
        { title: 'Một câu hỏi khác', text: 'Mình thực sự cần xây gì để kiểm chứng lần đặt cược này? Điều gì sẽ được tính là bằng chứng? Sự thay đổi đó giống việc đi từ chỉ là builder sang bắt đầu nghĩ như founder. Cost, latency và runway trở nên quan trọng hơn nhiều.' },
        { title: 'Điều mình đang tập làm', text: 'Xây thứ cần cho lần test tiếp theo. Quyết định đo gì trước khi pilot. Để bằng chứng quyết định bước sau. Bây giờ mình hiểu rõ hơn, nhưng làm được đều đặn vẫn là một việc phải tập.' },
      ],
      related: [{ id: 'dfriend', label: 'Sản phẩm phía sau bài học' }, { id: 'research', label: 'Một lần khác thử đặt câu hỏi rõ hơn' }],
    },
  },
};

export const noteIds: EntryId[] = ['seventeen', 'scores', 'pilot'];
export const allEntryIds = Object.keys(entries.en) as EntryId[];
