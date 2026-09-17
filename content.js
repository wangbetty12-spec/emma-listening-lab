/* Imported courseware data for the full IELTS Listening skill library. */
(function () {
  const audio = (name) => `audio/${name}.mp3`;
  const prompts = (items) => items.map((item, index) => `第 ${index + 1} 题${item ? ` · ${item}` : ''}`);
  const textTrack = (module, code, title, audioName, answers, itemPrompts, instruction) => ({
    id: audioName, module, code, title, meta: `${answers.length} 题 · 在线听写练习`, instruction: instruction || '请播放音频，根据听到的内容填写答案。', audio: audio(audioName), type: 'text', answers, prompts: itemPrompts || prompts(answers.map(() => ''))
  });
  const choiceTrack = (module, code, title, audioName, options, answers, itemPrompts, instruction) => ({
    id: audioName, module, code, title, meta: `${answers.length} 题 · 在线选择练习`, instruction: instruction || '请播放音频，根据听到的内容选择答案。', audio: audio(audioName), type: 'choice', options, answers, prompts: itemPrompts || prompts(answers.map(() => ''))
  });
  const multiTrack = (module, code, title, audioName, items, instruction) => ({
    id: audioName, module, code, title, meta: `${items.length} 题 · 多空听写练习`, instruction: instruction || '请播放音频，将听到的内容分别填写在各个空格中。', audio: audio(audioName), type: 'multi', items
  });

  const tracks = [];

  // B · 方位词
  const map = '方位词';
  tracks.push(
    textTrack(map, 'DIRECTION · 1.1', '基础练习 · 位置关系', 'b-1-1', ['C', 'A', 'B', 'D', 'B', 'B', 'C']),
    textTrack(map, 'DIRECTION · 1.2', '基础练习 · 移动介词', 'b-1-2', ['B', 'C', 'A', 'B', 'A']),
    textTrack(map, 'DIRECTION · 1.3', '基础练习 · 图片词汇', 'b-1-3', ['crossroads', 'junction', 'bend', 'flyover', 'traffic lights', 'roundabout', 'winding road', 'corridor', 'pavement', 'pedestrian crossing', 'footpath', 'the first exit']),
    textTrack(map, 'DIRECTION · 1.4', '基础练习 · 方位词归类', 'b-1-4', ['north', 'northern', 'top', 'upper side', 'south', 'southern', 'bottom', 'lower side', 'west', 'western', 'left', 'left-hand side', 'east', 'eastern', 'right', 'right-hand side', 'northwest', 'northwestern', 'top-left', 'upper left', 'northeast', 'northeastern', 'top-right', 'upper right', 'southwest', 'southwestern', 'bottom-left', 'lower left', 'southeast', 'southeastern', 'bottom-right', 'lower right', 'center', 'central', 'centered', 'middle']),
    textTrack(map, 'DIRECTION · 2.1', '综合练习 · 判断方位', 'b-2-1', ['→', '●', '↘', '↑', '↙', '↖', '↖', '●', '↙', '↘', '●', '←', '↘', '→', '↓', '↗', '↓', '↑', '↙', '→']),
    textTrack(map, 'DIRECTION · 2.2', '综合练习 · 建筑定位', 'b-2-2', ['G', 'A', 'D', 'E', 'E', 'G', 'G', 'B', 'F', 'B', 'E', 'G', 'C', 'A', 'D']),
    textTrack(map, 'DIRECTION · 2.3', '综合练习 · 房间定位', 'b-2-3', ['B', 'A', 'D', 'B', 'H', 'F', 'E', 'C', 'D', 'G', 'F', 'A', 'E', 'A/C', 'B']),
    textTrack(map, 'DIRECTION · 2.4', '综合练习 · 方位标记', 'b-2-4', ['G', 'C', 'F', 'A', 'K', 'D', 'H', 'I', 'E', 'B'])
  );
  tracks.filter((track) => track.module === map && track.code.includes('2.')).forEach((track) => { track.image = 'images/map-example.png'; });

  // C · 句子结构
  const structure = '句子结构';
  tracks.push(
    choiceTrack(structure, 'STRUCTURE · 1.1', '被动句 · 主动/被动识别', 'c-passive-1-1', ['主动', '被动'], ['主动', '被动', '被动', '主动', '被动', '被动', '被动', '被动', '主动', '主动', '主动', '被动', '主动', '被动', '主动', '主动', '被动', '主动', '主动', '被动']),
    textTrack(structure, 'STRUCTURE · 1.2', '被动句 · 动作接受者', 'c-passive-1-2', ['movie', 'house', 'suburb', 'interview', 'project', 'boy', 'house', 'shop', 'Beijing', 'time', 'dinner', 'rooms', 'shoes', 'English', 'data', 'passport', 'people', 'phone', 'oil / ashes', 'music']),
    textTrack(structure, 'STRUCTURE · 1.3', '被动句 · 完整动词结构', 'c-passive-1-3', ['are going to watch', 'will be cleaned', 'was destroyed', 'went in for', 'will be finished', 'was bitten', 'was painted', 'will be closed', "have travelled", 'wasted', 'is going to make', 'will be decorated', 'remove', "wasn't taught", 'can collect', 'had found', 'have been fired', "don't have", 'used / mixed with', 'was produced']),
    textTrack(structure, 'STRUCTURE · 2.1', '并列练习 · 信息类型', 'c-parallel-2-1', ['衣物', '国家', '食品', '乐器', '住宿', '包括的费用', '房间的用途', '正在做的事', '收集的数据', '形容词']),
    multiTrack(structure, 'STRUCTURE · 2.2', '并列练习 · 两个并列词', 'c-parallel-2-2', [
      { prompt: '第 1 句：两个并列词', answers: ['T-shirts', 'trousers'] }, { prompt: '第 2 句：两个并列词', answers: ['Australia', 'Russia'] }, { prompt: '第 3 句：两个并列词', answers: ['fruit', 'vegetables'] }, { prompt: '第 4 句：两个并列词', answers: ['piano', 'violin'] }, { prompt: '第 5 句：两个并列词', answers: ['hotel', 'hostel'] }, { prompt: '第 6 句：两个并列词', answers: ['meals', 'drinks'] }, { prompt: '第 7 句：两个并列词', answers: ['study', 'have meetings'] }, { prompt: '第 8 句：两个并列词', answers: ['watching movies', 'eating snacks'] }, { prompt: '第 9 句：两个并列词', answers: ['habits', 'emotions'] }, { prompt: '第 10 句：两个并列词', answers: ['physical', 'mental'] }
    ]),
    textTrack(structure, 'STRUCTURE · 2.3', '并列练习 · 综合信息类型', 'c-parallel-2-3', ['衣物', '国家', '食品 / 货物', '住宿', '食品 / 货物', '形容词', '形容词', '形容词', '收集的数据', '负责的项目', '学会的乐器', '包括的费用', '包括的费用', '丢失的物品', '正在做的事', '酒店的设施', '增长的部分', '地点的用途', '地点的用途', '客户的…']),
    textTrack(structure, 'STRUCTURE · 2.4', '并列练习 · 补出英文信息', 'c-parallel-2-4', ['scarves', 'China', 'water', 'cabins', 'wine', 'private', 'social', 'complex', 'location', 'deliveries', 'violin', 'insurance', 'accommodation', 'wallet', 'crying', 'pool', 'population', 'meetings', 'exhibition', 'attitudes']),
    choiceTrack(structure, 'STRUCTURE · 3.1', '句型练习 · 句型特点', 'c-sentence-3-1', ['从句', '代词', '举例'], ['从句', '从句 / 代词', '从句', '代词', '代词', '从句', '从句 / 代词', '从句 / 代词', '从句', '从句 / 代词 / 举例', '代词', '从句', '举例', '从句 / 代词', '从句 / 代词', '从句 / 代词', '从句', '从句', '从句', '从句 / 举例']),
    textTrack(structure, 'STRUCTURE · 3.2', '句型练习 · 关键词识别', 'c-sentence-3-2', ['Friday', 'Italy and France', 'opened and closed', 'bird', 'dogs', 'technical and well-organised', 'fish', 'hate', 'built and damaged', 'jobs, ones and hours', 'lizards', 'job', 'fridges, stoves and sinks', 'presentation', 'running', 'dislikes', 'better and positive', 'children and grandparents', 'environmental problems', 'club meetings']),
    textTrack(structure, 'STRUCTURE · 3.3', '句型练习 · 关键词填空', 'c-sentence-3-3', ['June 25th', 'France', 'curtains', 'bird', 'dogs', 'technical', 'protein', 'late', 'roads', 'flexible', 'tails', 'experience', 'equipment', 'presentation', 'accessible', 'personality', 'method', 'videos', 'sand', 'community activities'])
  );

  // D · 信号词
  const signal = '信号词';
  tracks.push(
    textTrack(signal, 'SIGNAL · 1.1', '否定 · 识别信号词', 'd-negative-1-1', ['not', 'no', 'none', 'neither', 'nowhere', 'without', 'few', 'little', 'never', 'hardly', 'rarely', 'barely', 'stop', 'fail', 'miss', 'dislike', 'deny', 'doubt', 'ignore', 'beyond']),
    textTrack(signal, 'SIGNAL · 1.2', '否定 · 判断意义', 'd-negative-1-2', ["wouldn't", 'none of it', 'neither of which', 'x', 'getting nowhere', 'without her knowing', 'x', 'rarely', 'has failed', 'x', 'x', 'doubts', 'far from', 'x', 'ignore', 'too to', 'x', 'rather', 'except for', 'x']),
    choiceTrack(signal, 'SIGNAL · 1.3', '否定 · 判断句意', 'd-negative-1-3', ['T', 'F'], ['F', 'F', 'F', 'F', 'T', 'T', 'T', 'F', 'T', 'T', 'T', 'F', 'T', 'T', 'T', 'F', 'T', 'F', 'F', 'F']),
    textTrack(signal, 'SIGNAL · 2.1', '指代 · 识别指代词', 'd-reference-2-1', ['it', 'them', 'that', 'these', 'those', 'one', 'ones', 'this', 'another', 'none', 'either', 'any', 'each', 'some', 'all', 'which', 'who', 'where', 'such', 'said']),
    textTrack(signal, 'SIGNAL · 2.2', '指代 · 找出被指代主体', 'd-reference-2-2', ['back door', 'the locals', 'the professors', 'natural gas', 'a toaster', 'horses', "Peter's", 'lessons', 'one teacher', 'books', 'many lights', 'buses', 'room', 'naps', 'sleep', 'the borrowing desk', 'telephone interviews', 'the personal guide', 'your listening skills', 'company']),
    textTrack(signal, 'SIGNAL · 2.3', '指代 · 写出对应代词', 'd-reference-2-3', ['it', 'their', 'they / their', 'which', 'one', 'their', 'his', 'any', 'another', 'one / each', 'some', 'those', 'one', 'each / which / each of which', 'it', 'that / where', 'that', 'who', 'that', 'said']),
    textTrack(signal, 'SIGNAL · 3.1', '转折 · 识别转折词', 'd-contrast-3-1', ['but', 'however', 'though', 'yet', 'despite', 'until', 'although', 'even though', 'even if', 'on the contrary', 'instead of', 'rather than', 'different from', 'nevertheless', 'unlike', 'in contrast', 'instead', 'while', 'whereas', 'otherwise']),
    textTrack(signal, 'SIGNAL · 3.2', '转折 · 句中转折词', 'd-contrast-3-2', ['until', 'however', 'however', 'though', 'yet', 'despite', 'even though', 'on the contrary', 'different from', 'while', 'although', 'otherwise', 'unlike the girls', 'on the other hand', 'still', 'but', 'instead', 'without', 'nevertheless', 'although']),
    choiceTrack(signal, 'SIGNAL · 3.3', '转折 · 预测句子续接', 'd-contrast-3-3', ['A', 'B', 'C'], ['C', 'B', 'C', 'C', 'C', 'A', 'C', 'C', 'C', 'B', 'C', 'C', 'B', 'C', 'A', 'C', 'B', 'A', 'A', 'B']),
    textTrack(signal, 'SIGNAL · 4.1', '递进并列 · 识别连接词', 'd-addition-4-1', ['and', 'then', 'also', 'besides', 'as well as', 'furthermore', 'moreover', 'not only but also', 'in addition', 'apart from that', 'plus', 'again', 'too', 'likewise', 'similarly', 'in the same way', 'together with', 'in fact', 'including', 'meanwhile']),
    textTrack(signal, 'SIGNAL · 4.2', '递进并列 · 句中连接词', 'd-addition-4-2', ['then', 'as well as', 'meanwhile', 'apart from', 'also', 'in addition', 'or', 'not only but also', 'as well as', 'besides', 'moreover', 'apart from', 'plus', 'likewise', 'in the same way', 'together with', 'including', 'in fact', 'in fact', 'meanwhile']),
    textTrack(signal, 'SIGNAL · 4.3', '递进并列 · 关键词理解', 'd-addition-4-3', ['north', 'listening', 'work at the bank', 'kites', 'traditional', 'fruit fly', 'injuries outside', 'compare', 'noise', "don't really like parties", 'flawed', 'villa', 'gear', 'unhappy', '正确', '错误', '正确', '错误', '正确', '错误']),
    textTrack(signal, 'SIGNAL · 5.1', '因果 · 识别连接词', 'd-cause-5-1', ['because', 'for', 'since', 'as', 'due to', 'while', 'considering', 'now that', 'for the reason that', 'on the grounds that', 'so', 'as a result', 'therefore', 'thus', 'hence', 'accordingly', 'consequently', 'so that', 'for this reason', 'with this in mind']),
    textTrack(signal, 'SIGNAL · 5.2', '因果 · 句中连接词', 'd-cause-5-2', ['because', 'so', 'so that', 'for', 'because', 'the reason that', 'as', 'since', 'due to', 'because of', "that's why", 'therefore', 'thus', 'in order to', 'consequently', 'now that', 'on the grounds that', 'accordingly', 'with this in mind', 'hence']),
    choiceTrack(signal, 'SIGNAL · 5.3', '因果 · 选择正确原因', 'd-cause-5-3', ['A', 'B', 'C'], ['C', 'B', 'C', 'A', 'B', 'C', 'A', 'C', 'A', 'C', 'A', 'C', 'B', 'B', 'B', 'B', 'C', 'C', 'A', 'A']),
    textTrack(signal, 'SIGNAL · 6.1', '无明显信号词 · 听写关键词', 'd-no-signal-6-1', ['originally known', 'were', 'wait, thought', 'no need', 'buy some', 'there is', 'new, introduced', 'no one', 'appointment, do this', 'difficult, no way', 'foreign, struggle', 'save, also', 'employees, busy', 'outside, shopping', 'stamp, official', 'benefit, real', 'original, realised', 'compared, conventional', 'true, equally true', 'if only']),
    choiceTrack(signal, 'SIGNAL · 6.2', '无明显信号词 · 预测结尾', 'd-no-signal-6-2', ['A', 'B', 'C', 'D', 'E'], ['C', 'B', 'A', 'E', 'D', 'D', 'C', 'B', 'E', 'A', 'C', 'A', 'B', 'D', 'E', 'A', 'E', 'D', 'B', 'C']),
    textTrack(signal, 'SIGNAL · 6.3', '无明显信号词 · 中文大意', 'd-no-signal-6-3', ['它后来改名了', '现在有促销', '我以为你讨厌它', '我找朋友来帮忙', '请前往入口处的书架获取', '有博物馆和湖边咖啡厅', '它更可靠', '整个计划失败了', '你可以用我们的线上表格', '我们两人不可能采访500个人', '如何用英语写学术论文', '这也可以极大的降低碳排放', '也许我们应该试试这个大学的学生', '我会提议开车载他们去', '这样一来大家就会觉得这个项目比较正式', '过去都是匿名的', '意识到岩石被侵蚀得很严重', '风筝可以产生两倍的能量', '同样可以说有才华的导演可以把好的剧本拍出优秀的电影', '如果这是正式的比赛就好了'])
  );

  // E · 同义替换
  const synonym = '同义替换';
  tracks.push(
    multiTrack(synonym, 'SYNONYM · 1.1', '同根词 · 动词和名词', 'e-root-1-1', [
      { prompt: '第 1 组', answers: ['imagine', 'imagination'] }, { prompt: '第 2 组', answers: ['organise', 'organisation'] }, { prompt: '第 3 组', answers: ['entertain', 'entertainment'] }, { prompt: '第 4 组', answers: ['add', 'addition'] }, { prompt: '第 5 组', answers: ['pay', 'payment'] }, { prompt: '第 6 组', answers: ['produce', 'product'] }, { prompt: '第 7 组', answers: ['consider', 'consideration'] }, { prompt: '第 8 组', answers: ['establish', 'establishment'] }, { prompt: '第 9 组', answers: ['arrive', 'arrival'] }, { prompt: '第 10 组', answers: ['set', 'setting'] }, { prompt: '第 11 组', answers: ['employ', 'employer'] }, { prompt: '第 12 组', answers: ['employ', 'employee'] }, { prompt: '第 13 组', answers: ['consume', 'consumption'] }, { prompt: '第 14 组', answers: ['begin', 'beginning'] }, { prompt: '第 15 组', answers: ['grow', 'growth'] }, { prompt: '第 16 组', answers: ['reduce', 'reduction'] }, { prompt: '第 17 组', answers: ['think', 'thought'] }, { prompt: '第 18 组', answers: ['exist', 'existence'] }, { prompt: '第 19 组', answers: ['lead', 'leader'] }, { prompt: '第 20 组', answers: ['create', 'creation'] }
    ]),
    multiTrack(synonym, 'SYNONYM · 1.2', '同根词 · 形容词和名词', 'e-root-1-2', [
      { prompt: '第 1 组', answers: ['confident', 'confidence'] }, { prompt: '第 2 组', answers: ['social', 'society'] }, { prompt: '第 3 组', answers: ['medical', 'medicine'] }, { prompt: '第 4 组', answers: ['commercial', 'commerce'] }, { prompt: '第 5 组', answers: ['valuable', 'value'] }, { prompt: '第 6 组', answers: ['advanced', 'advance'] }, { prompt: '第 7 组', answers: ['aware', 'awareness'] }, { prompt: '第 8 组', answers: ['wealthy', 'wealth'] }, { prompt: '第 9 组', answers: ['possible', 'possibility'] }, { prompt: '第 10 组', answers: ['theoretical', 'theory'] }, { prompt: '第 11 组', answers: ['selfish', 'self'] }, { prompt: '第 12 组', answers: ['necessary', 'necessity'] }, { prompt: '第 13 组', answers: ['healthy', 'health'] }, { prompt: '第 14 组', answers: ['active', 'activity'] }, { prompt: '第 15 组', answers: ['beneficial', 'benefit'] }, { prompt: '第 16 组', answers: ['regional', 'region'] }, { prompt: '第 17 组', answers: ['safe', 'safety'] }, { prompt: '第 18 组', answers: ['public', 'publicity'] }, { prompt: '第 19 组', answers: ['injured', 'injury'] }, { prompt: '第 20 组', answers: ['historical', 'history'] }
    ]),
    multiTrack(synonym, 'SYNONYM · 1.3', '同根词 · 综合听写', 'e-root-1-3', [
      { prompt: '第 1 组', answers: ['treat', 'treatment'] }, { prompt: '第 2 组', answers: ['broken', 'breakage'] }, { prompt: '第 3 组', answers: ['storage', 'store'] }, { prompt: '第 4 组', answers: ['memorable', 'memory'] }, { prompt: '第 5 组', answers: ['performance', 'perform'] }, { prompt: '第 6 组', answers: ['manager', 'management'] }, { prompt: '第 7 组', answers: ['real', 'reality'] }, { prompt: '第 8 组', answers: ['culture', 'cultural'] }, { prompt: '第 9 组', answers: ['office', 'official'] }, { prompt: '第 10 组', answers: ['absent', 'absence'] }, { prompt: '第 11 组', answers: ['communication', 'communicate'] }, { prompt: '第 12 组', answers: ['deep', 'depth'] }, { prompt: '第 13 组', answers: ['related', 'relationship'] }, { prompt: '第 14 组', answers: ['analyse', 'analysis'] }, { prompt: '第 15 组', answers: ['miner', 'mine'] }, { prompt: '第 16 组', answers: ['expansion', 'expand'] }, { prompt: '第 17 组', answers: ['boring', 'boredom'] }, { prompt: '第 18 组', answers: ['energetic', 'energy'] }, { prompt: '第 19 组', answers: ['suit', 'suitable'] }, { prompt: '第 20 组', answers: ['able', 'ability'] }
    ]),
    textTrack(synonym, 'SYNONYM · 2.1', '解释说明 · 单词与释义匹配', 'e-explain-2-1', ['official - d', 'refreshment - e', 'facility - c', 'prey - b', 'predator - a', 'dry - c', 'danger - b', 'pleasant - a', 'presentation - e', 'insurance - d', 'attention - a', 'article - c', 'primary school - d', 'wealth - e', 'reference - b', 'emergency - d', 'feedback - a', 'conserve - c', 'continent - b', 'innovation - e', 'personality - c', 'private - d', 'lively - b', 'constant - a', 'exhibition - e', 'confusion - a', 'control - d', 'reservation - c', 'variety - e', 'vision - b']),
    textTrack(synonym, 'SYNONYM · 2.2', '解释说明 · 听音频识别词语', 'e-explain-2-2', ['vegetarian', 'automatic', 'route', 'leadership', 'competition', 'communication', 'self-employed', 'vitamin', 'desert', 'assessment', 'destruction', 'demand', 'management', 'helmet', 'poverty', 'silent', 'permanent', 'temporary', 'absent', 'intact', 'fuel', 'cliff', 'canal', 'textile', 'concrete', 'migration', 'irrigation', 'reproduction', 'mammal', 'cattle farm']),
    multiTrack(synonym, 'SYNONYM · 3.1', '近反义词 · 成组近义词', 'e-near-3-1', [
      { prompt: '费用', answers: ['fee', 'cost'] }, { prompt: '进步', answers: ['improvement', 'progress'] }, { prompt: '快速地', answers: ['rapidly', 'fast'] }, { prompt: '能量', answers: ['power', 'energy'] }, { prompt: '结果', answers: ['finding', 'result'] }, { prompt: '影响', answers: ['effect', 'impact'] }, { prompt: '给/呈现', answers: ['give', 'present'] }, { prompt: '丢失/减少', answers: ['lose', 'reduce'] }, { prompt: '素食的', answers: ['vegetarian', 'meat-free'] }, { prompt: '文化/习俗', answers: ['culture', 'custom'] }, { prompt: '目标', answers: ['aim', 'target'] }, { prompt: '获得/赚得', answers: ['gain', 'earn'] }, { prompt: '完整的', answers: ['complete', 'full'] }, { prompt: '结构/提纲', answers: ['structure', 'outline'] }, { prompt: '建造', answers: ['build', 'construct'] }, { prompt: '著名的', answers: ['famous', 'well-known'] }, { prompt: '租', answers: ['hire', 'rent'] }, { prompt: '土壤', answers: ['soil', 'ground'] }, { prompt: '规则', answers: ['rule', 'regulation'] }, { prompt: '表演者', answers: ['performer', 'player'] }
    ]),
    textTrack(synonym, 'SYNONYM · 3.2', '近反义词 · 近义替换', 'e-near-3-2', ['good value for money', 'make the effort to', 'in the region', 'away', 'is related to', 'leading', 'different countries', 'select', 'sites', 'rare', 'device', 'exterior', 'marine', 'sufficient', 'injured', 'economical', 'durable', 'display', 'focus on', 'visualise']),
    textTrack(synonym, 'SYNONYM · 3.3', '近反义词 · 反义替换', 'e-near-3-3', ['limit', 'male', 'out of bounds', 'up-to-date', 'working age', 'plenty', 'charge', 'sick', 'shore', 'join', 'accident', 'suspicious', 'a wide range of', 'prefer', 'conflict', 'available', 'extra', 'misleading', 'expect', 'enough']),
    multiTrack(synonym, 'SYNONYM · 4.1', '上下义词 · 上义词与下义词', 'e-hyper-4-1', [
      { prompt: '第 1 组', answers: ['job', 'teacher'] }, { prompt: '第 2 组', answers: ['food', 'cake'] }, { prompt: '第 3 组', answers: ['clothes', 'sweater'] }, { prompt: '第 4 组', answers: ['language', 'German'] }, { prompt: '第 5 组', answers: ['hobby', 'hiking'] }, { prompt: '第 6 组', answers: ['weather', 'rainy'] }, { prompt: '第 7 组', answers: ['transport', 'taxi'] }, { prompt: '第 8 组', answers: ['major', 'biology'] }, { prompt: '第 9 组', answers: ['personality', 'confidence'] }, { prompt: '第 10 组', answers: ['furniture', 'couch'] }, { prompt: '第 11 组', answers: ['material', 'rubber'] }, { prompt: '第 12 组', answers: ['curved', 'shape'] }, { prompt: '第 13 组', answers: ['sports', 'cycling'] }, { prompt: '第 14 组', answers: ['place', 'hall'] }, { prompt: '第 15 组', answers: ['feeling', 'anxious'] }, { prompt: '第 16 组', answers: ['size', 'enormous'] }, { prompt: '第 17 组', answers: ['resource', 'energy'] }, { prompt: '第 18 组', answers: ['quality', 'honesty'] }, { prompt: '第 19 组', answers: ['musician', 'pianist'] }, { prompt: '第 20 组', answers: ['container', 'pot'] }
    ]),
    textTrack(synonym, 'SYNONYM · 4.2', '上下义词 · 分类词', 'e-hyper-4-2', ['banana, pencil, orange, apple', 'river, sea, lake, bed', 'dress, skirt, child, trousers', 'car, parents, uncle, grandmother', 'kitchen, road, bathroom, living room', 'plane, train, sky, subway', 'politics, physics, chemistry, windows', 'badminton, volleyball, coach, tennis', 'dancing, painting, wearing, singing', 'table, coffee, tea, juice', 'café, chocolate, bar, gym', 'brain, closet, tail, tongue', 'jazz, concert, classical, rock', 'comedy, documentary, printer, cartoon', 'piano, violin, steak, flute', 'tablet, laptop, avenue, smartphone', 'snack, wool, cotton, nylon', 'earrings, necklace, bracelet, waste', 'store assistant, chef, manner, electrician', 'cooking meals, sending emails, making phone calls, posting photos']),
    textTrack(synonym, 'SYNONYM · 4.3', '上下义词 · 找出上义词', 'e-hyper-4-3', ['水果', '风景', '衣物', '家庭成员', '房间', '交通工具', '学科', '体育运动', '休闲活动', '饮品', '地点', '身体部位', '音乐类型', '电视类型', '乐器', '电子设备', '布料', '珠宝', '职业', '手机操作'])
  );

  // F · 发音特质
  const pronunciation = '发音特质';
  tracks.push(
    textTrack(pronunciation, 'PRONUNCIATION · 1.1', '态度表达 · 肯定表达', 'f-att-express-1-1', ["I'm sure that", 'Sounds great', "That's a good point", 'Absolutely', "Couldn't agree more", 'I like the idea', "I'm with you on that", 'I feel the same', 'No doubt about it', "That's true", 'You have a point there', 'I see it that way too', 'Definitely', 'Exactly', "I'd go along with that", 'I have no objection', 'Tell me about it', 'I think so', 'I agree', "You're right"]),
    textTrack(pronunciation, 'PRONUNCIATION · 1.2', '态度表达 · 否定表达', 'f-att-express-1-2', ['Absolutely not', "I don't think I have the same opinion as you", 'Not necessarily', "That's not always the case", 'I beg to differ', "I'm afraid", 'I take a different view', "I'm sorry but", "I don't agree with you on that", 'What I object is', "I'd say the exact opposite", 'Actually', 'With all due respect', 'Not at all', 'On the contrary', "That's not the way I see it", "That's an interesting idea but", 'Well, as a matter of fact', "I don't think so", 'I think otherwise']),
    choiceTrack(pronunciation, 'PRONUNCIATION · 1.3', '态度表达 · 部分同意/惊讶/建议', 'f-att-express-1-3', ['PA', 'SP', 'SG'], ['SG', 'PA', 'PA', 'SG', 'SP', 'PA', 'PA', 'PA', 'SG', 'SG', 'SP', 'SG', 'PA', 'SP', 'PA', 'PA', 'SP', 'SP', 'PA', 'SG']),
    choiceTrack(pronunciation, 'PRONUNCIATION · 1.4', '态度语音 · 情绪辨识', 'f-att-voice-1-1', ['A', 'B', 'C'], Array(20).fill(''), null, '本组重点是语气和情绪辨识。请先选择你听到的情绪，再点击“显示答案”进行课堂核对。'),
    choiceTrack(pronunciation, 'PRONUNCIATION · 1.5', '态度语音 · 强烈/不感兴趣/疑问', 'f-att-voice-1-2', ['S', 'U', '?'], ['U', 'S', 'S', 'U', '?', 'U', 'S', 'S', 'U', '?', 'U', 'S', 'U', '?', 'U', 'S', '?', 'U', 'S', 'U']),
    choiceTrack(pronunciation, 'PRONUNCIATION · 1.6', '态度语音 · 综合态度', 'f-att-voice-1-3', ['P', 'C', 'U', 'S'], ['P', 'U', 'C', 'S', 'C', 'S', 'U', 'P', 'U', 'C', 'S', 'C', 'U', 'C', 'C', 'C', 'S', 'U', 'C', 'P']),
    textTrack(pronunciation, 'PRONUNCIATION · 2.1', '重读弱读 · 重音识别', 'f-stress-2-1', ['diversity', 'capacity', 'allergic', 'purpose', 'publicity', 'motivate', 'majority', 'renovate', 'restrict', 'occupation', 'typical', 'estate', 'preference', 'sculpture', 'demonstrate', 'reputation', 'donate', 'ingredient', 'urban', 'exhibition'], null, '请听音频，在考点词的重读音节下方标记。网页暂以输入框记录你的答案。'),
    textTrack(pronunciation, 'PRONUNCIATION · 2.2', '重读弱读 · 重音分类', 'f-stress-2-2', ['alter, engine, standard, migrate', 'amend, precise, cuisine, construct', 'minimal, medical, nurturing, prominent', 'potential, existence, explosion, ambition', 'superior, majority', 'adaptation, indication']),
    textTrack(pronunciation, 'PRONUNCIATION · 2.3', '重读弱读 · 句子重读识别', 'f-stress-2-3', ['How about we go for a coffee this afternoon?', 'Oh! This is a difficult thing to discuss!', 'Come and see us at our new apartment.', 'Yes, I suppose there’s no alternative.', 'Do you think it’ll be born on the eleventh, as you said?', 'I’m sorry, but I’m off to a meeting.', 'Forget it, I’ll repair it myself.', 'You can eat it for me, can’t you?', 'You can see them both at about six.', 'My phone’s broken, so I’m going to buy a new one.', 'Could you get some bread from the bakery on your way here?', 'He has no idea what he wants to do after he graduates.', 'I’ve never heard of that before, but it makes sense.', 'I love to see the shining moon on a cool, autumn night.', 'I do understand you.', 'They aren’t waiting for us.', 'We can’t rely on that.', 'We won’t be providing training for that.', 'I’d thought it’d be tiny, and actually that wasn’t the case at all.', 'They have hardly any contact with their parents.'], null, '请听音频并标记句中的重读单词。网页暂以输入框记录你的标记结果。'),
    textTrack(pronunciation, 'PRONUNCIATION · 3.1', '弱读 · 句中弱读词', 'f-weak-3-1', ['We need some salt and pepper.', 'They were at school yesterday.', 'She works at night.', 'That’s an apple.', 'The food is good but the service is terrible.', 'Can you come early?', 'Do you need help?', 'It’s a present for Linda.', 'That’s his last chance.', 'You should buy a new car.', 'That’s part of your problem.', 'We dropped them off at the airport.', 'It was a beautiful day.', 'She can play violin.', 'Does she work as a teacher?', 'I haven’t seen him for ages.', 'They hope to find it.', 'It’s in the bag.', 'How’s your family?', 'Why would I tell her?'], null, '请听音频并标出句中的弱读词。网页暂以输入框记录你的标记结果。'),
    textTrack(pronunciation, 'PRONUNCIATION · 3.2', '弱读 · 句子填空', 'f-weak-3-2', ['We have to go now', 'We don’t know what to do', 'I’ll see you at lunch', 'The meeting’s at one', 'Give it to me', 'Read it twice', 'Give it a try', 'I got it in London', 'This is for you', 'We planned it for later', 'There is a letter from Bob', 'I’ll be back in a minute', 'He’s an American', 'bread and butter', 'He did it over and over', 'more or less', 'Who’s the boss around here', 'You need a break', 'That’s the best of all', 'We can try it later']),
    textTrack(pronunciation, 'PRONUNCIATION · 3.3', '弱读 · 强弱读法辨识', 'f-weak-3-3', ['are', 'to', 'us', 'you', 'at', 'does', 'some', 'but', 'for', 'of', 'are', 'can', 'and', 'would', 'an', 'must', 'as', 'were'])
  );

  // F · 连读
  tracks.push(
    textTrack(pronunciation, 'LINKING · 1.1', '连读 · 连读标注', 'f-link-1-1', ['First of all', 'Did anything', 'come out of', 'How about', 'How old is', 'She is a', 'went on a', 'middle of an', 'opened at the end of', 'left it at', 'answer it', 'practice on your own', 'It is a', 'small industry after all', 'close attention', 'foot in the place again', 'as easy', 'get a formal education', 'find a way', 'advantage of AI']),
    textTrack(pronunciation, 'LINKING · 1.2', '连读 · 句子听写', 'f-link-1-2', ["'d like", 'leave at', 'he ate', 'do it', 'both of us', 'and air tickets', 'can afford a', 'fill in', 'personal information', 'tell us', 'hall of', 'call it', 'are always', 'a snack in', 'celebrate our', 'knew if', 'one of', 'goes out', 'for a day', 'time or']),
    textTrack(pronunciation, 'LINKING · 1.3', '连读 · 短语听写', 'f-link-1-3', ['think up', 'put on', 'mixed up', 'watch over', 'set up', 'get on with', 'put up with', 'feed on', 'get rid of', 'get in', 'up on', 'full of', 'build up', 'take a look at', 'focus on', 'draw on', 'at the back of', 'cut off', 'try out', 'a couple of'])
  );

  // G · 常见口音
  const accent = '常见口音';
  tracks.push(
    textTrack(accent, 'ACCENT · INDIA · 1.1', '印度口音 · 数字、单位与时间', 'g-india-1-1', ['£3.50', '30 years', '675 kilometers', '2020 litres', '21st October', '8 miles', '£10,000', '15%', '232 metres', '1988', '20%', '£1700', 'December 30th', 'Thursday', '$59.95', '65 minutes', '4.30pm', '$7.50', '£267', '10.15']),
    textTrack(accent, 'ACCENT · INDIA · 1.2', '印度口音 · 地名与地点', 'g-india-1-2', ['South Island', 'Australia', 'West Africa', 'Central Park', 'Main Road', 'Art Center', 'Tourist Office', 'Souvenir Shop', 'Ireland', 'Forest Area', 'Conference Centre', 'First Avenue', 'Main Hall', 'Science Museum', 'North America', 'Gift Shop', 'Student Service', 'Medical Services', 'Hill Street', 'Europe']),
    textTrack(accent, 'ACCENT · INDIA · 1.3', '印度口音 · 句子填空', 'g-india-1-3', ['public areas', 'shared kitchen', 'live music', 'department store', 'retail chains', 'special offers', 'Financial markets', 'promotion afterward', 'job interview', 'future career', 'stairs', 'twice a week', 'Free parking', 'catering for', 'feed animals', 'reference materials', 'agricultural produce', 'gold mine', 'food source', 'field trip']),
    textTrack(accent, 'ACCENT · JAPAN · 1.1', '日本口音 · 名称听写', 'g-japan-1-1', ['Simpson', 'Wilson', 'Paul', 'Charles', 'Evans', 'Jones', 'Ford', 'Michelle', 'Diana', 'Janet', 'Eagle Road', 'Long Beach', 'South Bay', 'Ocean Drive', 'Harbour Road', 'Adelaide', 'Dublin', 'Egypt', 'Christchurch', 'Vancouver']),
    textTrack(accent, 'ACCENT · JAPAN · 1.2', '日本口音 · 单词听写', 'g-japan-1-2', ['professor', 'facility', 'register', 'technique', 'handout', 'draft', 'reference', 'summary', 'incorrect', 'renew', 'journalism', 'version', 'private', 'decoration', 'programme', 'barbecue', 'chocolate', 'celebration', 'auditorium', 'salary']),
    textTrack(accent, 'ACCENT · JAPAN · 1.3', '日本口音 · 句子填空', 'g-japan-1-3', ['ocean cruises', 'larger seats', 'European passports', 'reopened in 2012', 'packed lunch', 'radio drama', 'fruit in her freezer', 'top floor', 'teaching staff', 'good shops and supermarkets', 'refund their items', 'take your medicines', 'think clearly', '32 athletes', 'different methods', 'part-time actress', 'free public services', 'a guitar string', 'special treat', 'virtual tours']),
    textTrack(accent, 'ACCENT · AUSTRALIA · 1.1', '澳洲口音 · 单词听写一', 'g-aus-1-1', ['maybe', 'waste', 'laid', 'race', 'trade', 'grade', 'mate', 'game', 'baby', 'pace', 'rate', 'scale', 'lady', 'replace', 'basis', 'chase', 'case', 'claim', 'straight', 'take']),
    textTrack(accent, 'ACCENT · AUSTRALIA · 1.2', '澳洲口音 · 单词听写二', 'g-aus-1-2', ['pipe', 'mild', 'reptile', 'timetable', 'slide', 'strike', 'trial', 'pride', 'lifestyle', 'assignment', 'symbolise', 'fine', 'guidance', 'realise', 'iceberg', 'ride', 'isolate', 'crime', 'private', 'mime']),
    textTrack(accent, 'ACCENT · AUSTRALIA · 1.3', '澳洲口音 · 句子填空', 'g-aus-1-3', ['hunts and eats other animals', 'enough money and technology', 'rely on to survive', 'landslides and heavy flooding', 'honor their ancestors', 'poor quality', 'body functions', 'inhabitants of the island of Crete', 'sunken settlements', 'injuries of hundreds more', 'farming hotline', 'rubber padding', 'shipping industry', 'job placement rates', 'unemployed youth', 'single-use plastics', 'close friends', 'the route', 'very low levels', 'pollinated by honeybees']),
    textTrack(accent, 'ACCENT · UKUS · 1.1', '英音美音 · 英式单词', 'g-ukus-1-1', ['vitamin', 'advertisement', 'privacy', 'schedule', 'garage', 'water', 'mobile', 'herbal', 'zebra', 'missile', 'bath', 'leisure', 'either', 'adult', 'path', 'laboratory', 'fertile', 'fragile', 'clerk', 'dance']),
    textTrack(accent, 'ACCENT · UKUS · 1.2', '英音美音 · 美式单词', 'g-ukus-1-2', ['vitamin', 'advertisement', 'privacy', 'schedule', 'garage', 'water', 'mobile', 'herbal', 'zebra', 'missile', 'bath', 'leisure', 'either', 'adult', 'path', 'laboratory', 'fertile', 'fragile', 'clerk', 'dance']),
    textTrack(accent, 'ACCENT · UKUS · 1.3', '英音美音 · 句子填空', 'g-ukus-1-3', ['hotter and hotter', 'better water heater', 'past year; turned; politics', 'survey; behalf', 'rich world; duties', 'hard work; determination; perseverance', 'harvest', 'exports; higher; forecasts', 'stronger; first class; services', 'military; ports; aircraft', 'rare comet', 'barriers; surveillance; border', 'call her', 'tell him', 'plastered; ladder', 'firms; market share', 'durable; safer', 'harness; generate', 'appear; endorse; certain', 'paper; journal; fires'])
  );

  const guidance = {
    'DIRECTION · 1.1': { instruction: '请根据听到的位置关系介词，把对应字母写在横线上。所有字母均可重复使用。', example: '如果录音中的位置关系对应图中字母 C，就填写 C；填写的是图中字母，不是介词本身。' },
    'DIRECTION · 1.2': { instruction: '请根据听到的与移动相关的介词，把对应字母写在横线上。所有字母均可重复使用。', example: '录音描述移动方向时，填写地图中对应的位置字母，例如 A 或 B。' },
    'DIRECTION · 1.3': { instruction: '请根据图片和音频写出道路、地点或交通设施词汇；每空填写听到的完整英文词语。', example: '如 crossroads、traffic lights；不要填写图中字母。' },
    'DIRECTION · 1.4': { instruction: '请听方位词，把它们写在对应意思的横线上；答案可以是方位词、形容词或表示图上位置的短语。', example: '正北可填写 north、northern、top 或 upper side；以音频中出现的表达为准。' },
    'DIRECTION · 2.1': { instruction: '请根据听力，把图中所示的方向标记在横线上；北方只写 ↑，不包含 ↖ 或 ↗。', example: '向右填写 →，中间位置填写 ●；请直接输入题目要求的方向符号。' },
    'DIRECTION · 2.2': { instruction: '请根据听力，把对应建筑的字母填写在横线上；字母可以重复使用。', example: '答案格式：G。填写建筑在图上的字母，不要填写建筑名称。' },
    'DIRECTION · 2.3': { instruction: '请根据听力，把对应房间的字母填写在横线上；字母可以重复使用。', example: '答案格式：A/C；如果录音要求两个位置，就按题目顺序填写两个字母。' },
    'DIRECTION · 2.4': { instruction: '请根据听力，把所指向的正确字母填写在横线上；每题填写一个图中字母。', example: '答案格式：K。先看清题目箭头或位置，再根据音频定位。' },
    'STRUCTURE · 1.1': { instruction: '请听句子，判断句子是主动句还是被动句，并选择对应选项。', example: 'The house was painted. → 被动；The boy painted the house. → 主动。' },
    'STRUCTURE · 1.2': { instruction: '再听一遍，写下动作的接受者；每个空填写一个词，必要时按录音填写专有名词。', example: 'The movie was watched… → movie；The house was painted… → house。' },
    'STRUCTURE · 1.3': { instruction: '请听录音，写出完整的动词结构；不要只写其中一个动词。', example: '示例格式：are going to watch、will be cleaned、was destroyed。' },
    'STRUCTURE · 2.1': { instruction: '请听录音，找出两个并列词共同的类型，并填写中文类别。', example: 'T-shirts and trousers → 衣物；piano and violin → 乐器。' },
    'STRUCTURE · 2.2': { instruction: '写出每句话出现的两个并列词，每个空填写一个英文词或短语。', example: '示例：T-shirts / trousers；请按两个空的顺序填写。' },
    'STRUCTURE · 2.3': { instruction: '请听句子，写出两个并列信息共同的类型；按题目要求填写中文类别。', example: 'food / goods → 食品或货物；physical / mental → 形容词。' },
    'STRUCTURE · 2.4': { instruction: '其中一个并列信息已用中文给出，请根据录音写出另一个英文原词或短语。', example: '中文提示：帽子；录音中另一个并列词是 scarves，就填写 scarves。' },
    'STRUCTURE · 3.1': { instruction: '请听录音，选择句型特点；根据题目说明，可选择从句、代词或举例等特点。', example: '可选特点：从句、代词、举例；例如含有 which 从句时选择“从句”。' },
    'STRUCTURE · 3.2': { instruction: '请听录音，写出与题目要求对应的关键词；每空填写一个词或一个短语。', example: '如 Friday、bird、job；如果答案由多个词组成，请完整填写。' },
    'STRUCTURE · 3.3': { instruction: '请根据录音填空；答案可能出现在你划出的关键词前面，每空填写一个词或短语。', example: '题目要求日期时可填写 June 25th；请按录音写完整信息。' },
    'SIGNAL · 1.1': { instruction: '请听录音，写出表达否定意义的词语或短语；每空填写录音中实际出现的表达。', example: '如 not、never、hardly、without；不要只写 not 来代替所有否定表达。' },
    'SIGNAL · 1.2': { instruction: '如果句子含有否定意义，请写出该词或短语；如果没有否定意义，请填写 x。', example: '句子没有否定词 → x；听到 rarely 或 none of it → 填写录音中的完整表达。' },
    'SIGNAL · 1.3': { instruction: '请判断录音句子与题干意思是否相同；相同选择 T，不同选择 F。', example: 'same meaning → T；meaning is different → F。' },
    'SIGNAL · 2.1': { instruction: '请听录音，写出表达指代的词；可以是代词、关系词或其他指示表达。', example: '如 it、them、which、those；填写单词本身，不要填写它所指的对象。' },
    'SIGNAL · 2.2': { instruction: '请写出句子中被指代的主体；每句话会读两遍，第二遍用于确认答案。', example: '指代词 it 指向 a toaster，就填写 a toaster；尽量写完整名词短语。' },
    'SIGNAL · 2.3': { instruction: '请再听一遍，写出用来指代这些主体的代词或指代表达。', example: '主体是 the room → it；主体是 the professors → they 或 their，按题目位置填写。' },
    'SIGNAL · 3.1': { instruction: '请听录音，写出表达转折的词语或短语；填写录音中实际听到的形式。', example: '如 but、however、although、instead；短语要完整填写。' },
    'SIGNAL · 3.2': { instruction: '请写出句中表达转折的词语或短语；每空对应一个转折信号。', example: '如 while、still、instead、on the other hand。' },
    'SIGNAL · 3.3': { instruction: '请根据节选预测最有可能的句子续接，并从 A、B、C 中选择一个。', example: '每题只选择一个选项，例如听完节选后选择 C。' },
    'SIGNAL · 4.1': { instruction: '请听录音，写出表达递进或并列的连接词；可以是单词或固定短语。', example: '如 and、also、moreover、in addition、as well as。' },
    'SIGNAL · 4.2': { instruction: '请写出句中表达递进并列的连接词或短语；按录音填写完整形式。', example: '如 as well as、in addition、likewise；不要只填写其中一个词。' },
    'SIGNAL · 4.3': { instruction: '请根据听力完成英文词语或判断正误；词语题写英文，判断题选择正确或错误。', example: '词语题如 north；判断题按录音选择“正确”或“错误”。' },
    'SIGNAL · 5.1': { instruction: '请听录音，写出表达原因或结果的连接词；注意区分原因信号和结果信号。', example: '原因：because；结果：therefore、as a result。' },
    'SIGNAL · 5.2': { instruction: '请写出句中表达因果关系的连接词或短语；填写录音中出现的完整形式。', example: '如 because of、consequently、that is why、in order to。' },
    'SIGNAL · 5.3': { instruction: '请根据录音选择正确的因果关系选项；每题从 A、B、C 中选择一个。', example: '每题只选一个字母，例如 A、B 或 C。' },
    'SIGNAL · 6.1': { instruction: '请听录音，写出横线上的词或短语；有些答案包含两个或多个词。', example: '答案可能是 two words，如 originally known；请完整填写。' },
    'SIGNAL · 6.2': { instruction: '请再听一遍，不看之前填空的内容，把句子与可能的结尾配对。', example: '每题从 A、B、C、D、E 中选择一个，不要填写整句。' },
    'SIGNAL · 6.3': { instruction: '请听完整句子，写出后半段的中文大意；重点是完整意思，不要求逐字翻译。', example: '如写出“它后来改名了”；表达完整意思即可，不必逐词对应英文。' },
    'SYNONYM · 1.1': { instruction: '请听音频，分别填写动词和名词形式；每组有两个空，按题目顺序填写。', example: '如 imagine / imagination；左空填写动词，右空填写名词。' },
    'SYNONYM · 1.2': { instruction: '请听音频，分别填写形容词和名词形式；每组有两个空，按题目顺序填写。', example: '如 confident / confidence；左空填写形容词，右空填写名词。' },
    'SYNONYM · 1.3': { instruction: '请听音频，填写同根词的一组词；每组有两个英文空格，按录音顺序填写。', example: '如 treat / treatment；注意词性和词尾变化。' },
    'SYNONYM · 2.1': { instruction: '请写出听到的单词，并与对应释义匹配；按“英文单词 - 字母”的格式填写。', example: '如 official - d；先写单词，再写它对应的释义字母。' },
    'SYNONYM · 2.2': { instruction: '请从音频内容中写出与中文释义最相符的英文词语；每空填写完整单词。', example: '答案写英文单词，如 vegetarian；不要填写中文翻译。' },
    'SYNONYM · 3.1': { instruction: '请听音频，填写每组近义词；中文意思用于理解，两个空都填写英文表达。', example: '费用 → fee / cost；按两个空的顺序填写听到的词。' },
    'SYNONYM · 3.2': { instruction: '请写出题目词语在录音中的近义词或近义表达；短语答案要完整填写。', example: 'cheap → good value for money；不要只填写 good。' },
    'SYNONYM · 3.3': { instruction: '请写出题目词语在录音中的反义词或反义表达；按音频填写完整英文。', example: 'closed → available；outdated → up-to-date。' },
    'SYNONYM · 4.1': { instruction: '请听两个词，分别填写上义词（左）和下义词（右）；每组有两个英文空格。', example: 'job | teacher；job 是上义词，teacher 是下义词。' },
    'SYNONYM · 4.2': { instruction: '请听写四个单词，并找出其中与另外三个不同类的词；按题目要求填写四个词。', example: '填写四个词，并在不同类词前加 *，例如 banana, pencil, *river, apple。' },
    'SYNONYM · 4.3': { instruction: '请再听一遍，找出这组词的上义词；每题填写一个中文类别。', example: 'teacher / chef / electrician → 职业；填写类别，不要重复抄写下义词。' },
    'PRONUNCIATION · 1.1': { instruction: '请听录音，完成表示肯定或积极态度的表达；每空填写听到的完整表达。', example: '如 Sounds great、Absolutely、I agree；注意表达的完整形式。' },
    'PRONUNCIATION · 1.2': { instruction: '请听录音，完成表示否定或不同意态度的表达；每空填写听到的完整表达。', example: '如 Absolutely not、Not necessarily、On the contrary。' },
    'PRONUNCIATION · 1.3': { instruction: '请听语气和表达，判断属于部分同意 PA、惊讶 SP 还是建议 SG，并选择对应代码。', example: '建议 → SG；部分同意 → PA；惊讶 → SP。' },
    'PRONUNCIATION · 1.4': { instruction: '请根据录音中的语气判断情绪，并从 A、B、C 中选择一个；同一个词的语气可能不同。', example: '同一个 Okay 可能表达不同情绪，请以实际语气选择 A、B 或 C。' },
    'PRONUNCIATION · 1.5': { instruction: '请判断表达的情绪是强烈 S、不感兴趣 U 还是疑问 ?，并选择对应符号。', example: '疑问语气 → ?；强烈语气 → S；不感兴趣 → U。' },
    'PRONUNCIATION · 1.6': { instruction: '请判断态度是积极 P、肯定 C、不确定 U 还是讽刺 S，并选择对应代码。', example: '积极 → P；肯定 → C；不确定 → U；讽刺 → S。' },
    'PRONUNCIATION · 2.1': { instruction: '请在考点词的重读音节下方标记；网页中用输入框记录你的重音标记结果。', example: '可输入你的重音标记，如 di-VER-si-ty，重点标出 VER。' },
    'PRONUNCIATION · 2.2': { instruction: '请将考点词按重音模式分类；“•”表示重读音节，短横线表示非重读音节。', example: '• -：alter / engine；请按音节重音模式填写或分类。' },
    'PRONUNCIATION · 2.3': { instruction: '请在句子中标出重读单词；网页中可以输入被重读的关键词，不必重写整句。', example: '可填写句中听起来最突出的关键词，例如 difficult、meeting、parents。' },
    'PRONUNCIATION · 3.1': { instruction: '请在句子中标出弱读词；网页中可以输入你听到的弱读功能词。', example: '可填写 at、to、a、for 等弱读词，按录音判断。' },
    'PRONUNCIATION · 3.2': { instruction: '请根据音频完成弱读单词或短语的填空；每空填写听到的完整词语。', example: '如 We have to go now；请完整填写句子中的缺失部分。' },
    'PRONUNCIATION · 3.3': { instruction: '请注意每个词的强读和弱读两种读法，写下录音中听到的词。', example: '如 are / to / us；每空填写单词本身，不必写音标。' },
    'LINKING · 1.1': { instruction: '请在出现连读的词与词之间用小横线或弧线标注；网页中输入你的连读标记结果。', example: '如 First_of_all、How_about；标出发生连读的词组。' },
    'LINKING · 1.2': { instruction: '请听音频，完成句子填空；答案可能包含连读后不明显的词，按语义和音频补全。', example: '如 I would like 可填写 ’d like；leave at 按录音完整填写。' },
    'LINKING · 1.3': { instruction: '请听音频，完成短语填空；每空填写完整英文短语。', example: '如 think up、put on；不要只填写其中一个单词。' },
    'ACCENT · INDIA · 1.1': { instruction: '请听印度口音录音，写出其中的数字、单位或时间；符号和数字按录音完整填写。', example: '如 £3.50、30 years、4.30pm；金额、百分号和单位不要漏写。' },
    'ACCENT · INDIA · 1.2': { instruction: '请听印度口音录音，写出常用地名或地点；每空填写完整英文名称。', example: '如 South Island、Central Park、Tourist Office。' },
    'ACCENT · INDIA · 1.3': { instruction: '请根据句子和音频填写缺失的词或短语；每空写出完整英文答案。', example: 'Mayors will get new powers to close ______ at night. → public areas。' },
    'ACCENT · JAPAN · 1.1': { instruction: '请听日本口音录音，完成听到的人名、地名或名称；专有名词按正常拼写填写。', example: '如 Simpson、Eagle Road、Christchurch；大小写不影响判分。' },
    'ACCENT · JAPAN · 1.2': { instruction: '请听日本口音录音，写出听到的单词；每空填写一个完整英文单词。', example: '如 professor、facility、handout；不要填写中文释义。' },
    'ACCENT · JAPAN · 1.3': { instruction: '请根据句子和音频填写缺失的词或短语；按录音写完整答案。', example: 'The gallery was closed in 2008 but ______ in 2012. → reopened。' },
    'ACCENT · AUSTRALIA · 1.1': { instruction: '请听澳洲口音录音，写下听到的单词；重点注意 /eɪ/ 等元音的发音差异。', example: '如 maybe、mate、race；根据声音辨认单词，再填写正常拼写。' },
    'ACCENT · AUSTRALIA · 1.2': { instruction: '请听澳洲口音录音，写下听到的单词；重点注意澳洲口音中的元音变化。', example: '如 pipe、mild、timetable；填写单词拼写，不写音标。' },
    'ACCENT · AUSTRALIA · 1.3': { instruction: '请根据句子和音频填写缺失的词或短语；按录音写出完整英文答案。', example: 'A predator is an animal that ______ other animals. → hunts and eats。' },
    'ACCENT · UKUS · 1.1': { instruction: '请听英式发音录音，写出对应的英文单词；重点关注英式和美式发音差异。', example: '如 vitamin、advertisement、schedule；填写单词的正常拼写。' },
    'ACCENT · UKUS · 1.2': { instruction: '请听美式发音录音，写出对应的英文单词；拼写通常相同，重点是识别发音。', example: '如 vitamin、advertisement、garage；听到后填写单词，不必写音标。' },
    'ACCENT · UKUS · 1.3': { instruction: '英音和美音各读一遍，请根据音频完成句子填空；每空填写完整词或短语。', example: 'It’s getting ______ and ______. → hotter / hotter。' }
  };
  tracks.forEach((track) => {
    const guide = guidance[track.code];
    if (guide) Object.assign(track, guide);
  });

  ['c-sentence-3-1', 'f-att-voice-1-1', 'f-stress-2-1', 'f-stress-2-3', 'f-weak-3-1', 'f-weak-3-2', 'f-link-1-1'].forEach((id) => {
    const track = tracks.find((item) => item.id === id);
    if (track) track.autoGrade = false;
  });

  window.EXTRA_TRACKS = tracks;
})();
