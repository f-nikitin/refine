(function(){
"use strict";

var I18N={
  en:{
    title:"Refine",
    heroSub:"Rewrite your message into the right tone — instantly.",
    heroNote:"No signup. Just paste and improve.",
    placeholder:"Paste your message here…",
    emptyMsg:"Please enter some text first.",
    polishing:"Polishing…",
    copied:"Copied!",
    copyBtn:"Copy",
    sampleBtn:"Try sample",
    clearBtn:"Clear",
    inputLabel:"Enter your text",
    tonePolite:"Polite",
    toneProfessional:"Professional",
    toneShort:"Short",
    toneFirm:"Firm",
    benefit1Title:"Save time",
    benefit1Desc:"Stop rewriting manually.",
    benefit2Title:"Sound better",
    benefit2Desc:"Find the right words fast.",
    benefit3Title:"Reduce friction",
    benefit3Desc:"Communicate without conflict.",
    resultsEmpty:"Your polished versions will appear here",
    donateLabel:"Support the project",
    donateBtn:"Donate — Tonkeeper",
    donateTg:"Donate — Telegram",
    donateCopy:"Copy wallet",
    donateCopied:"Copied!",
    footerText:"Built by an indie creator",
    toneLabels:{
      polite:{name:"Polite",variants:["Gentle & Warm","Kind & Considerate","Soft & Thoughtful"]},
      professional:{name:"Professional",variants:["Formal & Clear","Business-like","Corporate & Precise"]},
      short:{name:"Short",variants:["Concise","Compact","Brief"]},
      firm:{name:"Firm",variants:["Direct & Clear","Assertive","Strong & Unambiguous"]}
    },
    sample:"Hey, you totally messed up the report. I can't believe you didn't check the numbers before sending it to the client. Fix this immediately and don't let it happen again."
  },
  ru:{
    title:"Редактор тона",
    heroSub:"Перепишите сообщение в нужном тоне — мгновенно.",
    heroNote:"Без регистрации. Вставьте и улучшите.",
    placeholder:"Вставьте ваше сообщение…",
    emptyMsg:"Пожалуйста, введите текст.",
    polishing:"Обрабатываем…",
    copied:"Скопировано!",
    copyBtn:"Копировать",
    sampleBtn:"Пример",
    clearBtn:"Очистить",
    inputLabel:"Введите текст",
    tonePolite:"Вежливо",
    toneProfessional:"Делово",
    toneShort:"Кратко",
    toneFirm:"Твёрдо",
    benefit1Title:"Экономьте время",
    benefit1Desc:"Не переписывайте вручную.",
    benefit2Title:"Звучите лучше",
    benefit2Desc:"Находите верные слова быстро.",
    benefit3Title:"Снижайте конфликтность",
    benefit3Desc:"Общайтесь без трений.",
    resultsEmpty:"Здесь появятся обработанные варианты",
    donateLabel:"Поддержите проект",
    donateBtn:"Пожертвовать — Tonkeeper",
    donateTg:"Пожертвовать — Telegram",
    donateCopy:"Скопировать кошелёк",
    donateCopied:"Скопировано!",
    footerText:"Создано независимым разработчиком",
    toneLabels:{
      polite:{name:"Вежливо",variants:["Мягко и тепло","Доброжелательно","Тактично"]},
      professional:{name:"Делово",variants:["Официально и ясно","Корпоративно","Строго и точно"]},
      short:{name:"Кратко",variants:["Лаконично","Компактно","Сжато"]},
      firm:{name:"Твёрдо",variants:["Прямо и ясно","Уверенно","Однозначно"]}
    },
    sample:"Ты вообще накосячил с отчётом. Не верю, что ты не проверил цифры перед отправкой клиенту. Исправь это немедленно и больше не повторяй."
  }
};

function replacePhrases(text,phrases){
  var result=text;
  var keys=Object.keys(phrases).sort(function(a,b){return b.length-a.length});
  for(var i=0;i<keys.length;i++){
    var k=keys[i];
    var v=phrases[k];
    var re=new RegExp("(^|[.!?]\\s*)("+k.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+")","gi");
    result=result.replace(re,function(m,pre,phrase){
      return pre+v;
    });
  }
  return result;
}

function replaceWords(text,map){
  var result=text;
  var keys=Object.keys(map).sort(function(a,b){return b.length-a.length});
  for(var i=0;i<keys.length;i++){
    var k=keys[i];
    var v=map[k];
    if(currentLang==="en"){
      var re=new RegExp("\\b"+k.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+"\\b","gi");
    }else{
      var re=new RegExp("(?<![а-яёА-ЯЁ])"+k.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+"(?![а-яёА-ЯЁ])","gi");
    }
    result=result.replace(re,v);
  }
  return result;
}

var EN_RULES={
  harsh:{"messed up":"could be improved","screwed up":"needs revision","fucked up":"requires attention","screwed":"encountered difficulties","can't believe":"was surprised","didn't check":"may have overlooked","fix this":"please address this","immediately":"at your earliest convenience","don't let it happen again":"let's ensure this is avoided going forward","stupid":"unfortunate","idiot":"concern","hate":"strongly dislike","useless":"ineffective","lazy":"unmotivated","crap":"substandard","damn":"rather","hell":"considerably","shut up":"please stop","you always":"there seems to be a pattern of","you never":"it appears that","obviously":"it seems","ridiculous":"questionable","whatever":"I understand","worst":"least favorable","terrible":"below expectations","awful":"unsatisfactory","nonsense":"debatable","unacceptable":"needs improvement","dumb":"uninformed","moron":"individual with a different perspective","jerk":"difficult person","asshole":"challenging individual","bastard":"problematic party","pissed off":"frustrated","pissed":"frustrated","fucking":"considerably","fuck":"this is","shit":"concerning","bullshit":"unsubstantiated","bitch":"unreasonable person","whore":"inappropriate remark","slut":"inappropriate remark","dick":"inconsiderate person","wanker":"unprofessional individual","piss":"express dissatisfaction","goddamn":"rather","dammit":"unfortunate","goddammit":"unfortunate","son of a bitch":"this is unfortunate","piss off":"please leave me be","suck":"is inadequate","sucks":"is suboptimal","blows":"is disappointing","lame":"underwhelming","pathetic":"below standard","hopeless":"challenging","disastrous":"far from ideal","horrible":"unsatisfactory","atrocious":"well below standard","abysmal":"significantly lacking","garbage":"of poor quality","trash":"substandard","disgusting":"highly objectionable","repulsive":"very unappealing","toxic":"harmful","poisonous":"detrimental","annoying":"troublesome","infuriating":"deeply frustrating","maddening":"highly frustrating","enraging":"upsetting","outrageous":"unacceptable","appalling":"deeply concerning","shocking":"surprising","incredible":"noteworthy","unbelievable":"difficult to comprehend","insane":"extreme","crazy":"highly unusual","nuts":"extreme","bananas":"extreme","wtf":"I am perplexed","omg":"goodness","omfg":"goodness","bruh":"I say","bro":"my friend","guys":"everyone","y'all":"everyone","folks":"everyone","noob":"newcomer","loser":"individual struggling","failure":"setback","fail":"setback","disaster":"significant issue","nightmare":"serious challenge","hellhole":"difficult situation","clusterfuck":"complex situation","shitshow":"chaotic situation","circus":"disorganized situation","dumpster fire":"troubled situation","hot mess":"disorganized situation","trainwreck":"significant problem","kill me":"this is difficult","end me":"this is difficult","I'm dead":"I am astonished","I'm dying":"I find this amusing","dead":"astonishing","rip":"unfortunate outcome","wasted":"ineffective","cheating":"acting improperly","rip off":"overpriced","scam":"questionable practice","fraud":"serious concern","fake":"inauthentic","phony":"inauthentic","bogus":"unfounded","shady":"questionable","sketchy":"questionable","iffy":"uncertain","sus":"suspicious","suspicious":"questionable","sketch":"questionable","creepy":"unsettling","weird":"unusual","strange":"unconventional","freak":"unconventional person","freaking":"rather","fricking":"rather","frigging":"rather","heck":"rather","darn":"rather","dang":"rather","shoot":"unfortunate","crapola":"substandard","crud":"substandard","yuck":"highly objectionable","ew":"I find this unappealing","gross":"highly objectionable","nasty":"highly objectionable","vile":"deeply objectionable","foul":"deeply objectionable","rotten":"well below standard","crappy":"substandard","shitty":"of poor quality","pissy":"frustrated","bitchy":"difficult","moody":"unpredictable","bratty":"immature","childish":"immature","immature":"unprofessional","petty":"small-minded","snobby":"elitist","pretentious":"overly ambitious","arrogant":"overly confident","cocky":"overly confident","smug":"excessively self-satisfied","bossy":"overly directive","controlling":"overly directive","pushy":"overly insistent","needy":"excessively demanding","clingy":"excessively attached","psycho":"unstable","crazy girl":"unstable person","crazy ex":"challenging former partner","stalker":"persistently intrusive person","creep":"unsettling person","pervert":"deeply inappropriate person","weirdo":"unconventional person","freak show":"distressing situation","lazy ass":"unmotivated individual","dumbass":"uninformed individual","smartass":"overly confident individual","badass":"impressive","jackass":"inconsiderate person","dipshit":"uninformed person","dumbfuck":"uninformed person","numbnuts":"uninformed individual","airhead":"uninformed individual","bimbo":"uninformed individual","meathead":"uninformed individual","knucklehead":"uninformed individual","bonehead":"uninformed individual","blockhead":"uninformed individual","thick":"slow to understand","dense":"slow to understand","clueless":"uninformed","ignorant":"uninformed","stupidity":"poor judgment","foolishness":"poor judgment","reckless":"imprudent","irresponsible":"negligent","careless":"negligent","sloppy":"substandard","half-assed":"incomplete","half-ass":"do inadequately","slapdash":"hastily done","shoddy":"below standard","botched":"improperly done","bungled":"improperly handled","messed":"encountered issues","ruined":"significantly damaged","destroyed":"severely compromised","wrecked":"severely compromised","trashed":"severely compromised","killed":"eliminated","murdered":"eliminated","slaughtered":"decisively defeated","massacred":"overwhelmingly defeated","obliterated":"completely removed","wiped out":"completely removed","annihilated":"completely removed","crushed":"overwhelmingly defeated","smashed":"overwhelmingly defeated","demolished":"completely removed","nuked":"drastically altered","nuclear":"extreme","extreme":"significant","insufferable":"very difficult","intolerable":"unacceptable","unbearable":"extremely difficult","excruciating":"extremely difficult","agonizing":"extremely difficult","torture":"very difficult experience","hellish":"extremely difficult","infernal":"extremely difficult","pain in the ass":"significant inconvenience","pain in the neck":"significant inconvenience","thorn in my side":"ongoing concern","headache":"significant concern","nightmare fuel":"deeply unsettling","gave me cancer":"I find this objectionable","absolute garbage":"entirely substandard","utter trash":"entirely substandard","complete disaster":"significant problem","total failure":"complete setback","utter failure":"complete setback","complete mess":"significant issue","utter mess":"significant issue","absolute joke":"not taken seriously","laughingstock":"subject of undesired attention","mockery":"improper representation","disgrace":"significant disappointment","shameful":"highly disappointing","embarrassing":"highly disappointing","humiliating":"deeply disappointing","degrading":"highly inappropriate","demeaning":"highly inappropriate","insulting":"highly offensive","offensive":"objectionable","disrespectful":"inappropriate","rude":"inappropriate","impolite":"inappropriate","uncalled for":"inappropriate","out of line":"inappropriate","crossed the line":"was inappropriate","over the top":"excessive","too much":"excessive","overkill":"excessive","exaggerated":"overstated","overblown":"overstated","melodramatic":"overstated","hysterical":"overly emotional","overreacting":"responding disproportionately","making a big deal":"overstating the concern","making a mountain out of a molehill":"overstating the concern","freaking out":"becoming very concerned","losing it":"becoming overwhelmed","snapping":"responding sharply","blowing up":"responding intensely","going off":"responding intensely","going crazy":"becoming very concerned","going mental":"becoming very concerned","going ballistic":"responding intensely","going berserk":"responding intensely","losing my mind":"becoming overwhelmed","losing my shit":"becoming overwhelmed","losing your shit":"becoming overwhelmed","tripping":"overreacting","bugging out":"becoming alarmed","flipping out":"responding intensely","spazzing":"responding intensely","spazzing out":"responding intensely","bugging":"troubling","getting on my nerves":"causing frustration","getting under my skin":"causing frustration","pissing me off":"causing significant frustration","making me mad":"causing frustration","making me angry":"causing concern","driving me crazy":"causing significant frustration","driving me nuts":"causing significant frustration","driving me insane":"causing significant frustration","driving me up the wall":"causing significant frustration","making me sick":"causing deep concern","sick and tired":"deeply frustrated","fed up":"deeply frustrated","had enough":"reached a limit","done with":"no longer willing to tolerate","over it":"no longer engaged","over this":"no longer engaged","can't stand":"find very difficult","can't take this":"find very difficult","can't deal":"find very difficult","can't even":"find very difficult","I can't even":"I find this very difficult","done for":"compromised","screwed over":"unfairly treated","thrown under the bus":"unfairly sacrificed","left out to dry":"unsupported","left hanging":"unsupported","abandoned":"left without support","betrayed":"acted against trust","backstabbed":"acted against trust","two-faced":"insincere","snake":"insincere person","rat":"untrustworthy person","scum":"deeply objectionable person","scumbag":"deeply objectionable person","dirtbag":"objectionable person","slimeball":"objectionable person","lowlife":"objectionable person","trashy":"objectionable","ghetto":"objectionable","sketchy":"questionable","white trash":"objectionable characterization","redneck":"objectionable characterization","hick":"objectionable characterization","hillbilly":"objectionable characterization","boomer":"older generation member","ok boomer":"I disagree with that perspective","karen":"unreasonably demanding person","boomer moment":"outdated perspective","simp":"overly accommodating person","cuck":"insecure characterization","incel":"troubled individual","simping":"overly accommodating","white knighting":"excessively defending","beta":"lacking confidence","alpha":"confident","chad":"impressive individual","based":"principled","cringe":"uncomfortable to observe","cringy":"uncomfortable to observe","cringeworthy":"uncomfortable to observe","second-hand embarrassment":"discomfort from observing","embarrassing themselves":"creating an unfavorable impression","making a fool of themselves":"creating an unfavorable impression","looking stupid":"appearing uninformed","looking dumb":"appearing uninformed","clown":"unserious person","clownery":"unserious behavior","circus":"unserious situation","joke":"not taken seriously","literal joke":"not taken seriously","absolute meme":"not taken seriously","brain dead":"uninformed","smooth brain":"uninformed","tiny brain":"uninformed","big brain":"impressive","galaxy brain":"overambitious","mind blown":"astonished","mind-blowing":"astonishing","jaw-dropping":"astonishing","eye-opening":"enlightening","woke":"socially aware","cancel":"hold accountable","canceled":"held accountable","canceling":"holding accountable","deplatform":"remove from discourse","problematic":"concerning","toxic":"harmful","gross":"highly objectionable","problematic fave":"concerning preference","yikes":"that is concerning","oof":"that is unfortunate","ouch":"that is painful","rip":"unfortunate","big yikes":"highly concerning","huge yikes":"highly concerning","yike":"concerning","smh":"disappointing","smh my head":"very disappointing","facepalm":"disappointing","facepalm moment":"disappointing situation","bruh moment":"unfortunate situation"},
  firm:{"could be improved":"must be corrected","needs revision":"requires immediate revision","requires attention":"must be addressed immediately","please address this":"this must be addressed","at your earliest convenience":"without delay","I would appreciate":"I expect","perhaps":"","maybe":"","might want to":"need to","suggest":"require","would be nice":"is required","if possible":"","kindly":"","unfortunately":"","sorry to say":"","it seems that":"","I feel like":"","I think":"","in my opinion":"","honestly":"","I believe":"","I suppose":"","I guess":"","I reckon":"","it appears":"","it would seem":"","arguably":"","possibly":"","presumably":"","apparently":"","allegedly":"","somewhat":"","slightly":"","a bit":"","a little":"","sort of":"","kind of":"","in a way":"","to some extent":"","more or less":"","roughly":"","approximately":"","might":"","could perhaps":"","would maybe":"","shall we":"","may I suggest":"","let me suggest":"","I'd recommend":"","I'd suggest":"","it might help to":"","consider perhaps":"","you might want to":"","you could possibly":"","it would be good if":"","it would be great if":"","it'd be nice if":"","if you could":"","when you get a chance":"","at some point":"","eventually":"","sometime":"","in due course":"","in time":"","no rush":"","whenever convenient":"","whenever you're ready":"","when possible":"","if it's not too much trouble":"","I don't want to be a bother but":"","I don't mean to be pushy but":"","not to pressure you but":"","just a friendly reminder":"","just checking in":"","just wanted to check":"","hate to bother you but":"","sorry to interrupt but":"","excuse me but":"","pardon me but":"","with all due respect":"","respectfully":"","if I may":"","if I might":"","allow me to":"","permit me to":"","please consider":"","kindly note":"","I'd be grateful if":"","I'd appreciate it if":"","it would mean a lot if":"","I'd love it if":"","I was hoping":"","I was wondering":"","I was thinking perhaps":"","do you think maybe":"","would you mind":"","could you maybe":"","would it be possible to":"","is there any chance":"","can we maybe":"","shall we perhaps":"","let's maybe":"","I politely request":"","we kindly ask":"","your attention to this matter":"","thank you for your understanding":"","thanks for your patience":"","I apologize for any inconvenience":"","sorry for the inconvenience":"","forgive the intrusion":"","please forgive me if":"","I hope this doesn't cause any issues":"","hopefully this won't be a problem":"","trust me":"","believe me":"","to be honest":"","to be fair":"","to be perfectly honest":"","to tell the truth":"","candidly":"","frankly":"","truthfully":"","as a matter of fact":"","indeed":"","certainly":"","absolutely":"","without question":"","undeniably":"","unquestionably":"","irrefutably"}},
  professional:{"hey":"Dear colleague,","hi":"Hello,","yo":"Greetings,","just wanted to say":"I would like to communicate that","I need":"It is necessary to","you should":"I recommend that you","ASAP":"at the earliest opportunity","btw":"Additionally,","gonna":"going to","wanna":"wish to","gotta":"must","can't":"am unable to","won't":"will not","don't":"do not","didn't":"did not","it's":"it is","that's":"that is","there's":"there is","I'm":"I am","we're":"we are","they're":"they are","you're":"you are","isn't":"is not","aren't":"are not","wasn't":"was not","couldn't":"could not","shouldn't":"should not","wouldn't":"would not","haven't":"have not","hasn't":"has not","hadn't":"had not","let's":"let us","I've":"I have","we've":"we have","they've":"they have","you've":"you have","I'll":"I will","you'll":"you will","we'll":"we will","they'll":"they will","he's":"he is","she's":"she is","who's":"who is","what's":"what is","where's":"where is","when's":"when is","why's":"why is","how's":"how is","ain't":"is not","y'all":"you all","gimme":"please provide","lemme":"allow me to","kinda":"somewhat","sorta":"somewhat","outta":"out of","dunno":"do not know","gotta":"have to","tryna":"attempting to","coulda":"could have","woulda":"would have","shoulda":"should have","musta":"must have","whatcha":"what are you","ima":"I am going to","imma":"I am going to","innit":"is it not","bruv":"colleague","mate":"colleague","buddy":"colleague","dude":"colleague","bro":"colleague","man":"sir","boy":"individual","girl":"individual","guys":"team","folks":"team","peeps":"colleagues","peeps":"team","sup":"greetings","wassup":"how are you","what's up":"how may I assist","nm":"satisfactory","nvm":"disregard","idk":"I do not know","idc":"I have no preference","tbh":"to be transparent","imo":"in my assessment","imho":"in my professional assessment","afaik":"as far as I am aware","fyi":"for your information","fwiw":"for what it is worth","iirc":"if I recall correctly","icymi":"in case you missed it","n/a":"not applicable","aka":"also known as","etc":"and so forth","vs":"versus","re":"regarding","w/":"with","w/o":"without","b/c":"because","cuz":"because","cause":"because","cos":"because","thru":"through","tho":"however","altho":"although","prolly":"probably","probly":"probably","def":"definitely","totes":"absolutely","rly":"really","rlly":"really","u":"you","ur":"your","r":"are","b":"be","n":"and","da":"the","dat":"that","dis":"this","dem":"those","dose":"those","dose":"those","der":"there","dere":"there","wat":"what","wen":"when","wen":"when","y":"why","k":"acknowledged","ok":"acceptable","okay":"acceptable","nvm":"please disregard","omg":"notably","wtf":"I must express confusion","lol":"notably","lmao":"notably","rofl":"notably","haha":"noted","hehe":"noted","yeet":"remove","oof":"unfortunate","bruh":"I say","sheesh":"remarkable","sheesh":"remarkable","wow":"remarkable","cool":"satisfactory","nice":"commendable","sweet":"excellent","sick":"impressive","dope":"impressive","fire":"impressive","lit":"impressive","based":"principled","goated":"exemplary","epic":"impressive","legendary":"exemplary","goat":"greatest of all time","gg":"commendable effort","ez":"straightforward","w":"victory","l":"setback","f":"respectful acknowledgment","rip":"unfortunate","rip":"unfortunate","oof":"unfortunate","big oof":"significant setback","yikes":"concerning","yeesh":"concerning","yike":"concerning","huh":"I have a question","hmm":"I am considering","ugh":"I am frustrated","argh":"I am frustrated","grr":"I am frustrated","bah":"I am dismissive","pfft":"I am dismissive","meh":"I am indifferent","bleh":"I am indifferent","eh":"I am indifferent","meh":"I am indifferent","whatever":"I defer","anyway":"moving forward","so yeah":"in conclusion","basically":"fundamentally","literally":"precisely","actually":"in fact","really":"truly","super":"extremely","mega":"extremely","ultra":"extremely","hyper":"extremely","uber":"extremely","hella":"extremely","mad":"extremely","wicked":"extremely","crazy":"highly","insane":"highly","nuts":"highly","wild":"highly","crazy":"highly","bonkers":"highly","bananas":"highly","fo sho":"certainly","for real":"certainly","for reals":"certainly","fr":"certainly","fr fr":"absolutely","no cap":"truthfully","cap":"dishonestly","bussin":"excellent","bussin":"excellent","slaps":"is excellent","hits different":"is notably effective","goes hard":"is impressive","is fire":"is impressive","is lit":"is engaging","is dope":"is impressive","bad af":"highly objectionable","good af":"highly commendable","cute af":"highly appealing","fun af":"highly engaging","boring af":"highly unengaging","weird af":"highly unusual","ugly af":"highly unappealing","dumb af":"highly uninformed","scary af":"highly alarming","gross af":"highly objectionable","cool af":"highly impressive","nice af":"highly commendable","cringe af":"highly uncomfortable","badass":"impressive","awesome":"excellent","amazing":"remarkable","incredible":"remarkable","fantastic":"excellent","fabulous":"excellent","wonderful":"excellent","brilliant":"excellent","splendid":"excellent","superb":"excellent","outstanding":"excellent","phenomenal":"excellent","exceptional":"excellent","magnificent":"excellent","marvelous":"excellent","terrific":"excellent","tremendous":"excellent","stellar":"excellent","top-notch":"first-rate","first-class":"premium","world-class":"exemplary","next-level":"advanced","cutting-edge":"advanced","state-of-the-art":"advanced","best-in-class":"exemplary","gold standard":"exemplary"},
  politeWrap:[
    function(s){return "I wanted to gently mention that "+s+" Thank you for your understanding."},
    function(s){return "I'd like to kindly point out that "+s+" I appreciate your attention to this."},
    function(s){return "May I respectfully note that "+s+" I hope we can work through this together."}
  ],
  politeAlt:[
    function(s){return "I hope this doesn't come across the wrong way, but "+s.replace(/I'm concerned that/gi,"I'm concerned that")},
    function(s){return "If I may suggest — "+s},
    function(s){return "Just a thought — "+s}
  ],
  profWrap:[
    function(s){return "Regarding this matter: "+s+" Please advise on next steps."},
    function(s){return "For the record: "+s+" Please review and respond accordingly."},
    function(s){return "In reference to the above: "+s+" A response is requested."}
  ],
  firmSuffix:[
    ". This requires your immediate attention and action.",
    ". This needs to be resolved promptly — no exceptions.",
    ". I expect this to be handled immediately."
  ]
};


var RU_PHRASES={
  polite:{
    "пошёл ты на хуй":"прошу вас, не нужно так",
    "пошла ты на хуй":"прошу вас, не нужно так",
    "пошли на хуй":"прошу вас, не нужно так говорить",
    "пошёл на хуй":"прошу вас, не нужно так говорить",
    "пошла на хуй":"прошу вас, не нужно так говорить",
    "иди на хуй":"прошу вас, не нужно так говорить",
    "идите на хуй":"прошу вас, не нужно так говорить",
    "послал на хуй":"отказался обсуждать",
    "послала на хуй":"отказалась обсуждать",
    "какого хуя":"прошу прощения, но почему",
    "что за хуйня":"это совершенно непонятно",
    "че за хуйня":"это совершенно непонятно",
    "ни хуя себе":"весьма удивительно",
    "ни хрена себе":"весьма удивительно",
    "ни фига себе":"весьма удивительно",
    "ёб твою мать":"поразительно",
    "ебать копать":"поразительно",
    "ебать в рот":"поразительно",
    "хуй с ним":"не имеет значения",
    "хуй с ней":"не имеет значения",
    "хуй с ними":"не имеет значения",
    "пиздец какой":"крайне неприятная ситуация",
    "полный пиздец":"критическая ситуация",
    "полный хрен":"крайне неудовлетворительно",
    "полный финиш":"крайне неудовлетворительно",
    "крыша едет":"тяжело справляться",
    "крыша поехала":"тяжело справляться",
    "какого хрена":"прошу прощения, но почему",
    "какого нахрена":"прошу прощения, но почему",
    "какого нафига":"прошу прощения, но почему",
    "какого фига":"прошу прощения, но почему",
    "какого блина":"прошу прощения, но почему",
    "какого чёрта":"прошу прощения, но почему",
    "че за фигня":"это требует уточнения",
    "че за хрень":"это требует уточнения",
    "да какой нахрен":"прошу прощения, но вряд ли",
    "какой нахрен":"прошу прощения, но вряд ли",
    "какой нафиг":"прошу прощения, но вряд ли",
    "да какой нафиг":"прошу прощения, но вряд ли",
    "да ну нахрен":"пожалуйста, не нужно",
    "да ну нафиг":"пожалуйста, не нужно",
    "на фига":"зачем, прошу прощения",
    "на хрена":"зачем, прошу прощения",
    "какого hell":"прошу прощения, но почему",
    "откуда нахрен":"прошу прощения, откуда",
    "откуда нафиг":"прошу прощения, откуда",
    "зачем нахрен":"зачем, прошу прощения",
    "зачем нафиг":"зачем, прошу прощения",
    "где нахрен":"где, прошу прощения",
    "где нафиг":"где, прошу прощения",
    "кто нахрен":"кто, прошу прощения",
    "кто нафиг":"кто, прошу прощения",
    "больше не повторяй":"давайте постараемся, чтобы это не повторилось",
    "больше не повторяйте":"давайте постараемся, чтобы это не повторилось",
    "вообще накосячил":"в целом допустил неточность",
    "исправь немедленно":"пожалуйста, исправь как можно скорее",
    "исправь это":"пожалуйста, исправь это",
    "ты тупой":"мне кажется, это можно сделать иначе",
    "ты идиот":"меня беспокоит этот подход",
    "тупой идиот":"меня серьёзно беспокоит",
    "какой бред":"это спорный момент",
    "что за хрень":"это требует уточнения",
    "иди к чёрту":"прошу вас, не нужно так",
    "хуже не бывает":"ситуация непростая",
    "как можно скорее":"в удобное для вас время",
    "по барабану":"не имеет значения",
    "до фонаря":"не имеет значения",
    "до лампочки":"не имеет значения",
    "параллельно мне":"не имеет для меня значения",
    "на халяву":"бесплатно",
    "вывел из себя":"сильно расстроил",
    "вывела из себя":"сильно расстроила",
    "вывели из себя":"сильно расстроили",
    "конец блин":"крайне неприятный итог",
    "господи блин":"прошу прощения",
    "блин блинский":"весьма",
    "заткнись":"пожалуйста, прекратите",
    "иди вон":"пожалуйста, отойдите",
    "пошёл вон":"прошу вас уйти",
    "пошла вон":"прошу вас уйти",
    "отстань":"давайте спокойно обсудим",
    "отвали":"пожалуйста, дайте пространство",
    "заебись":"превосходно",
    "заебало":"весьма утомило",
    "заебал":"очень утомил",
    "заебала":"очень утомила",
    "заебали":"очень утомили",
    "заебётся":"очень утомит",
    "заебаться":"сильно устать",
    "охуенно":"весьма впечатляюще",
    "ахуенно":"весьма впечатляюще",
    "ахуеть":"не может быть",
    "охуеть":"поразительно",
    "охренеть":"поразительно",
    "офигеть":"поразительно",
    "обалдеть":"поразительно",
    "офигенно":"весьма впечатляюще",
    "обалденно":"весьма впечатляюще",
    "охрененно":"весьма впечатляюще",
    "охуительно":"весьма впечатляюще",
    "хуёвый":"неудовлетворительный",
    "хуёво":"неудовлетворительно",
    "хуёвая":"неудовлетворительная",
    "хуёвое":"неудовлетворительное",
    "хуёвые":"неудовлетворительные",
    "хуйня":"совершенно незначительно",
    "похуй":"не имеет значения",
    "похер":"не имеет значения",
    "пофиг":"не имеет большого значения",
    "нихуя":"совершенно нет",
    "нихрена":"совершенно нет",
    "нифига":"совсем нет",
    "нахрен":"пожалуйста, не нужно",
    "нафиг":"пожалуйста, не нужно",
    "хрен":"весьма",
    "хреново":"неудовлетворительно",
    "хреновый":"неудовлетворительный",
    "хреновая":"неудовлетворительная",
    "хреновое":"неудовлетворительное",
    "фигня":"совершенно незначительно",
    "фигово":"неудовлетворительно",
    "фиговый":"неудовлетворительный",
    "фиговая":"неудовлетворительная",
    "пиздец":"критическая ситуация",
    "пиздёж":"недостоверная информация",
    "пиздит":"говорит неправду",
    "пизданул":"сообщил неправду",
    "пизданула":"сообщила неправду",
    "пизданулся":"утратил самообладание",
    "пизданулась":"утратила самообладание",
    "ёбнулся":"утратил самообладание",
    "ёбнулась":"утратила самообладание",
    "хуета":"совершенно незначительно",
    "пиздятина":"недостоверная информация",
    "ебать":"поразительно",
    "ебаный":"весьма сомнительный",
    "ёбаный":"весьма сомнительный",
    "ебучий":"весьма сомнительный",
    "ебучая":"весьма сомнительная",
    "ебучее":"весьма сомнительное",
    "ебанина":"сомнительная ситуация",
    "еблище":"сомнительная ситуация",
    "блядь":"к сожалению",
    "блядский":"сомнительный",
    "блядская":"сомнительная",
    "блядское":"сомнительное",
    "бля":"к сожалению",
    "сука":"прошу прощения",
    "говно":"неудовлетворительного качества",
    "дерьмо":"неудовлетворительного качества",
    "говённый":"неудовлетворительного качества",
    "говённая":"неудовлетворительного качества",
    "говённое":"неудовлетворительного качества",
    "дерьмовый":"неудовлетворительного качества",
    "дерьмовая":"неудовлетворительного качества",
    "хуй":"совершенно не",
    "пизда":"критическая ситуация",
    "пиздуй":"прошу удалиться",
    "идиот":"человек с иной точкой зрения",
    "идиотка":"женщина с иной точкой зрения",
    "дебил":"человек с ограниченным пониманием",
    "дебилка":"женщина с ограниченным пониманием",
    "придурок":"легкомысленный человек",
    "придура":"легкомысленная женщина",
    "лох":"неопытный человек",
    "лошара":"неопытный человек",
    "козёл":"неприятный человек",
    "мразь":"глубоко неприятный человек",
    "мразота":"глубоко неприятный человек",
    "сволочь":"неприятный человек",
    "подонок":"человек без принципов",
    "урод":"неприятный человек",
    "уродище":"крайне неприятный человек",
    "тупой":"не вполне понимающий",
    "тупица":"не вполне понимающий человек",
    "дурак":"не вполне понимающий человек",
    "дура":"не вполне понимающая",
    "дурачок":"легкомысленный человек",
    "бабник":"легкомысленный мужчина",
    "алкаш":"человек с зависимостью",
    "алкашка":"женщина с зависимостью",
    "пидор":"неприятный человек",
    "пидорас":"неприятный человек",
    "гандон":"неприятный человек",
    "гондон":"неприятный человек",
    "чмо":"неприятный человек",
    "мудак":"неприятный человек",
    "мудила":"неприятный человек",
    "псих":"эмоциональный человек",
    "душнила":"слишком серьёзный человек",
    "клоун":"несерьёзный человек",
    "неадекват":"человек с необычным поведением",
    "долбоёб":"человек с ограниченным пониманием",
    "долбоёбица":"женщина с ограниченным пониманием",
    "тормоз":"медлительный человек",
    "лоботряс":"немотивированный человек",
    "лентяй":"немотивированный человек",
    "бездельник":"немотивированный человек",
    "тунеядец":"немотивированный человек",
    "сучка":"неприятная женщина",
    "стерва":"неприятная женщина",
    "подлец":"непорядочный человек",
    "подлянка":"непорядочная женщина",
    "мерзавец":"непорядочный человек",
    "мерзавка":"непорядочная женщина",
    "негодяй":"непорядочный человек",
    "негодяйка":"непорядочная женщина",
    "гад":"неприятный человек",
    "гадина":"неприятный человек",
    "падла":"непорядочный человек",
    "шваль":"неприятный человек",
    "шкура":"непорядочная женщина",
    "редиска":"неприятный человек",
    "жесть":"крайне неприятно",
    "пипец":"весьма удивительно",
    "капец":"весьма удивительно",
    "кирдык":"критическая ситуация",
    "хана":"критическая ситуация",
    "амба":"критическая ситуация",
    "крышка":"критическая ситуация",
    "облом":"неприятный сюрприз",
    "кайф":"большое удовольствие",
    "отстой":"неудовлетворительно",
    "лажа":"недостоверная информация",
    "забей":"не обращайте внимания",
    "блин":"весьма",
    "короче":"иными словами",
    "типа":"вроде бы",
    "как бы":"словно",
    "реально":"действительно",
    "внатуре":"действительно",
    "чувак":"молодой человек",
    "чёт":"несколько",
    "ща":"сейчас",
    "ваще":"в целом",
    "норм":"приемлемо",
    "окей":"принято",
    "чувиха":"молодая женщина",
    "бабки":"деньги",
    "лавэ":"деньги",
    "баблос":"деньги",
    "рулит":"функционирует отлично",
    "фурычит":"функционирует",
    "пашет":"работает",
    "хавать":"принимать пищу",
    "жрать":"принимать пищу",
    "рубать":"принимать пищу",
    "шамать":"принимать пищу",
    "погнали":"давайте начнём",
    "рвём":"действуем оперативно",
    "горим":"действуем оперативно",
    "шевелись":"пожалуйста, поторопитесь",
    "гони":"пожалуйста, ускорьтесь",
    "качай":"прошу ускорить",
    "дохрена":"очень много",
    "дофига":"очень много",
    "прет":"преуспевает",
    "тащит":"преуспевает",
    "кайфово":"очень приятно",
    "кайфно":"очень приятно",
    "хавает":"принимает пищу",
    "жрёт":"принимает пищу",
    "зависает":"не функционирует",
    "тупит":"работает медленно",
    "тормозит":"работает медленно",
    "глючит":"не функционирует корректно",
    "косячит":"допускает ошибки",
    "лагает":"не функционирует корректно",
    "крашится":"прекращает работу",
    "багует":"не функционирует корректно",
    "фигачит":"делает",
    "чиллит":"отдыхает",
    "тусит":"отдыхает в компании",
    "тусуется":"отдыхает в компании",
    "отстойный":"неудовлетворительный",
    "бесит":"вызывает раздражение",
    "достало":"утомило",
    "достал":"утомил",
    "достала":"утомила",
    "достали":"утомили",
    "задолбало":"весьма утомило",
    "задолбал":"весьма утомил",
    "задолбала":"весьма утомила",
    "задолбали":"весьма утомили",
    "надоело":"утомило",
    "истерит":"переживает",
    "психует":"переживает",
    "орёт":"громко говорит",
    "орет":"громко говорит",
    "ревёт":"плачет",
    "ревет":"плачет",
    "достанет":"утомит",
    "задолбает":"весьма утомит",
    "бешеный":"очень эмоциональный",
    "бешеная":"очень эмоциональная",
    "взбесил":"сильно расстроил",
    "взбесила":"сильно расстроила",
    "взбесили":"сильно расстроили",
    "жопа":"затруднительная ситуация",
    "бардак":"беспорядок",
    "хаос":"беспорядок",
    "срач":"конфликт",
    "каша":"неразбериха",
    "прогнило":"пришло в негодность",
    "рухнуло":"перестало функционировать",
    "накрылось":"перестало функционировать",
    "сдохло":"перестало функционировать",
    "упало":"прекратило работу",
    "загнулся":"перестал функционировать",
    "загнулась":"перестала функционировать",
    "копец":"критическая ситуация",
    "писец":"критическая ситуация",
    "трындец":"критическая ситуация",
    "накосячил":"допустил неточность",
    "накосячила":"допустила неточность",
    "накосячили":"допустили неточность",
    "облажался":"допустил серьёзную ошибку",
    "облажалась":"допустила серьёзную ошибку",
    "облажались":"допустили серьёзную ошибку",
    "прошляпил":"не заметил",
    "прошляпила":"не заметила",
    "прошляпили":"не заметили",
    "проморгал":"не заметил",
    "проморгала":"не заметила",
    "проморгали":"не заметили",
    "профукал":"упустил",
    "профукала":"упустила",
    "профукали":"упустили",
    "пролетел":"не достиг результата",
    "пролетела":"не достигла результата",
    "пролетели":"не достигли результата",
    "косяк":"ошибка",
    "ненавижу":"мне очень не нравится",
    "бесполезный":"неэффективный",
    "ленивый":"немотивированный",
    "ужасный":"ниже ожиданий",
    "недопустимо":"требует улучшения",
    "худший":"наименее благоприятный",
    "очевидно":"кажется",
    "срочно":"при первой возможности",
    "немедленно":"при первой возможности",
    "исправь":"пожалуйста, исправь",
    "переделай":"пожалуйста, переделай",
    "разберись":"пожалуйста, разберись",
    "не верю":"удивлён, что",
    "не проверил":"возможно, не заметил",
    "не проверила":"возможно, не заметила",
    "не проверили":"возможно, не заметили",
    "стрёмный":"вызывающий опасения",
    "стрёмная":"вызывающая опасения",
    "стрёмно":"вызывает опасения",
    "угарный":"весьма забавный",
    "угарная":"весьма забавная",
    "угар":"весьма забавно",
    "ржач":"весьма забавно",
    "ржачка":"весьма забавно",
    "понт":"претенциозность",
    "понтовый":"претенциозный",
    "понтовая":"претенциозная",
    "понты":"претенциозность",
    "фуфло":"недостоверная информация",
    "параллельно":"не имеет значения",
    "до фига":"очень много",
    "до хрена":"очень много",
    "халява":"бесплатно",
    "халявный":"бесплатный",
    "халявная":"бесплатная",
    "стрём":"вызывает опасения",
    "жуткий":"крайне неприятный",
    "жуткая":"крайне неприятная",
    "жутко":"крайне неприятно",
    "кошмарный":"крайне неприятный",
    "кошмарная":"крайне неприятная",
    "кошмарно":"крайне неприятно",
    "ужасно":"крайне неприятно",
    "ужасная":"крайне неприятная",
    "ужасный":"крайне неприятный",
    "кринж":"вызывает неловкость",
    "кринжовый":"вызывающий неловкость",
    "кринжовая":"вызывающая неловкость",
    "кринжово":"вызывает неловкость",
    "мутный":"неясный",
    "мутная":"неясная",
    "мутно":"неясно",
    "левый":"нестандартный",
    "левая":"нестандартная",
    "левое":"нестандартное",
    "тупо":"неэффективно",
    "ни разу":"совсем нет",
    "впритык":"едва достаточно",
    "на шару":"случайно"
  },
  professional:{
    "здарова":"Здравствуйте,",
    "дарова":"Здравствуйте,",
    "здорово":"Здравствуйте,",
    "салют":"Здравствуйте,",
    "приветик":"Здравствуйте,",
    "привет":"Уважаемый коллега,",
    "йо":"Приветствую,",
    "хай":"Приветствую,",
    "ку":"Приветствую,",
    "хелло":"Приветствую,",
    "хэллоу":"Приветствую,",
    "хэй":"Приветствую,",
    "йоу":"Приветствую,",
    "здрасте":"Здравствуйте,",
    "дратути":"Здравствуйте,",
    "заебись":"превосходно",
    "заебало":"вызывает серьёзные затруднения",
    "заебал":"существенно затруднил работу",
    "заебала":"существенно затруднила работу",
    "заебали":"существенно затруднили работу",
    "охуенно":"весьма впечатляюще",
    "ахуенно":"весьма впечатляюще",
    "ахуеть":"не может быть",
    "охуеть":"весьма удивительно",
    "охренеть":"весьма удивительно",
    "офигеть":"весьма удивительно",
    "обалдеть":"весьма удивительно",
    "офигенно":"весьма впечатляюще",
    "обалденно":"весьма впечатляюще",
    "охрененно":"весьма впечатляюще",
    "хуёвый":"неудовлетворительный",
    "хуёво":"неудовлетворительно",
    "хуйня":"не соответствует требованиям",
    "похуй":"не имеет значения для данного вопроса",
    "похер":"не имеет значения для данного вопроса",
    "пофиг":"не имеет существенного значения",
    "нихуя":"совершенно нет",
    "нихрена":"совершенно нет",
    "нифига":"совершенно нет",
    "нахрен":"не требуется",
    "нафиг":"не требуется",
    "пиздец":"критическая ситуация",
    "блядь":"обратите внимание",
    "бля":"обратите внимание",
    "сука":"прошу прощения",
    "говно":"неудовлетворительного качества",
    "дерьмо":"неудовлетворительного качества",
    "ебать":"весьма удивительно",
    "хрен":"весьма",
    "хреново":"неудовлетворительно",
    "фигня":"не существенно",
    "фигово":"неудовлетворительно",
    "хуй":"совершенно не",
    "пох":"не имеет значения",
    "жесть":"крайне серьёзная ситуация",
    "пипец":"весьма удивительно",
    "капец":"весьма удивительно",
    "кирдык":"критическая ситуация",
    "надо":"Необходимо",
    "нужно":"Требуется",
    "срочно":"в кратчайшие сроки",
    "ща":"в настоящее время",
    "ваще":"в целом",
    "чё":"что",
    "чтоб":"чтобы",
    "норм":"приемлемо",
    "ок":"принято",
    "блин":"весьма",
    "короче":"иными словами",
    "кайф":"высокий уровень удовлетворения",
    "отстой":"неудовлетворительно",
    "лажа":"недостоверная информация",
    "кайфово":"весьма удовлетворительно",
    "кайфно":"весьма удовлетворительно",
    "прет":"преуспевает",
    "тащит":"преуспевает",
    "хавать":"принимать пищу",
    "жрать":"принимать пищу",
    "рубать":"принимать пищу",
    "шамать":"принимать пищу",
    "погнали":"прошу приступить",
    "рвём":"действуем оперативно",
    "горим":"действуем оперативно",
    "шевелись":"прошу ускорить работу",
    "гони":"прошу ускорить процесс",
    "качай":"прошу ускорить",
    "дохрена":"значительное количество",
    "дофига":"значительное количество",
    "забей":"не обращайте внимания",
    "зависает":"не функционирует",
    "тупит":"работает медленно",
    "тормозит":"работает медленно",
    "глючит":"не функционирует корректно",
    "косячит":"допускает ошибки",
    "лагает":"не функционирует корректно",
    "крашится":"прекращает работу",
    "багует":"не функционирует корректно",
    "фигачит":"выполняет",
    "чиллит":"находится в состоянии отдыха",
    "тусит":"присутствует на мероприятии",
    "тусуется":"присутствует на мероприятии",
    "бесит":"вызывает раздражение",
    "достало":"существенно утомило",
    "задолбало":"существенно утомило",
    "надоело":"утомило",
    "жопа":"затруднительная ситуация",
    "бардак":"беспорядок",
    "хаос":"отсутствие организации",
    "срач":"конфликт",
    "каша":"отсутствие ясности",
    "стрёмный":"вызывающий опасения",
    "стрёмная":"вызывающая опасения",
    "стрёмно":"вызывает опасения",
    "рулит":"функционирует отличным образом",
    "фурычит":"функционирует надлежащим образом",
    "пашет":"работает",
    "босс":"руководитель",
    "шеф":"руководитель",
    "манагер":"менеджер",
    "менагер":"менеджер",
    "прогер":"разработчик",
    "прог":"разработчик",
    "кодер":"разработчик",
    "кодир":"разработчик",
    "технарь":"технический специалист",
    "админ":"системный администратор",
    "диз":"дизайнер",
    "дез":"дизайнер",
    "пиарщик":"специалист по связям с общественностью",
    "сеошник":"специалист по поисковой оптимизации",
    "эсэмэмщик":"специалист по маркетингу",
    "бух":"бухгалтер",
    "бухгалтерша":"бухгалтер",
    "кадровичка":"специалист по кадрам",
    "айтишник":"специалист в области информационных технологий",
    "хакер":"специалист по кибербезопасности",
    "линейка":"линейный руководитель",
    "топчик":"высшее руководство",
    "топ":"высшее руководство",
    "ващет":"в целом",
    "ващето":"в целом",
    "вообщем":"в общем",
    "вощем":"в общем",
    "короч":"иными словами",
    "нормально":"приемлемо",
    "окей":"принято",
    "угу":"принято",
    "ага":"принято",
    "мгм":"принято",
    "неа":"нет",
    "йеп":"да",
    "йя":"да",
    "ноуп":"нет",
    "щасть":"сейчас",
    "счас":"сейчас",
    "сичас":"сейчас",
    "типа":"подобным образом",
    "внатуре":"действительно",
    "реально":"действительно",
    "чёт":"несколько",
    "чёта":"несколько",
    "впритык":"едва достаточно",
    "походу":"вероятно",
    "походя":"вероятно",
    "как бы":"подобным образом",
    "ну типа":"подобным образом",
    "вродь":"вероятно",
    "вродибы":"вероятно",
    "наверно":"вероятно",
    "пожалуста":"пожалуйста",
    "плиз":"пожалуйста",
    "плз":"пожалуйста",
    "спс":"спасибо",
    "спасиб":"спасибо",
    "пасиб":"спасибо",
    "пасиба":"спасибо",
    "офигенно":"весьма впечатляюще",
    "кринж":"вызывает неловкость",
    "кринжовый":"вызывающий неловкость",
    "кринжовая":"вызывающая неловкость",
    "кринжово":"вызывает неловкость",
    "ничё":"приемлемо",
    "ничё такого":"приемлемо",
    "нормалёк":"приемлемо",
    "шикарно":"превосходно",
    "шикардос":"превосходно",
    "ну":"итак",
    "в принципе":"в целом",
    "вроде бы":"вероятно",
    "наверное":"вероятно",
    "пожалуй":"вероятно",
    "кажется":"представляется",
    "если можно":"если вас не затруднит",
    "когда будет время":"при удобной возможности",
    "по возможности":"при удобной возможности",
    "собсно":"собственно",
    "собсна":"собственно",
    "есичо":"если честно",
    "есчо":"ещё",
    "мутный":"неясный",
    "мутная":"неясная",
    "мутно":"неясно",
    "тупо":"неэффективно",
    "левый":"нестандартный",
    "левая":"нестандартная",
    "левое":"нестандартное",
    "халявный":"бесплатный",
    "халявная":"бесплатная",
    "халява":"бесплатное предоставление",
    "на халяву":"бесплатно",
    "по блату":"по знакомству",
    "идиот":"человек с иной точкой зрения",
    "дебил":"человек с ограниченным пониманием",
    "придурок":"легкомысленный сотрудник",
    "лох":"неопытный сотрудник",
    "козёл":"неконструктивный коллега",
    "мразь":"крайне неконструктивный коллега",
    "сволочь":"неконструктивный коллега",
    "подонок":"лицо, не соблюдающее корпоративную этику",
    "урод":"неконструктивный коллега",
    "тупой":"с ограниченным пониманием",
    "тупица":"с ограниченным пониманием",
    "дурак":"с ограниченным пониманием",
    "дура":"с ограниченным пониманием",
    "чмо":"неконструктивный коллега",
    "мудак":"неконструктивный коллега",
    "алкаш":"лицо с зависимостью",
    "пидор":"неконструктивный коллега",
    "пидорас":"неконструктивный коллега",
    "гандон":"неконструктивный коллега",
    "гондон":"неконструктивный коллега",
    "долбоёб":"лицо с ограниченным пониманием",
    "долбоёбица":"лицо с ограниченным пониманием",
    "редиска":"неконструктивный коллега",
    "стерва":"неконструктивная коллега",
    "ты должен":"рекомендую вам",
    "сделай":"прошу выполнить",
    "исправь":"необходимо исправить",
    "переделай":"необходимо переделать",
    "разберись":"необходимо разобраться",
    "давай":"прошу",
    "накосячил":"допустил неточность",
    "накосячила":"допустила неточность",
    "накосячили":"допустили неточность",
    "не проверил":"не осуществил проверку",
    "не проверила":"не осуществила проверку",
    "не проверили":"не осуществили проверку",
    "не верю":"вынужден отметить, что",
    "больше не повторяй":"прошу избегать повторения",
    "больше не повторяйте":"прошу избегать повторения",
    "облажался":"допустил грубую ошибку",
    "облажалась":"допустила грубую ошибку",
    "облажались":"допустили грубую ошибку",
    "прошляпил":"не заметил",
    "прошляпила":"не заметила",
    "проморгал":"не заметил",
    "проморгала":"не заметила",
    "профукал":"упустил",
    "профукала":"упустила",
    "провал":"неудача",
    "косяк":"ошибка",
    "накосячу":"допущу неточность",
    "накосячишь":"допустишь неточность",
    "накосячит":"допустит неточность",
    "испортил":"ухудшил",
    "испортила":"ухудшила",
    "запорол":"исполнил неудовлетворительно",
    "запорола":"исполнила неудовлетворительно",
    "завалил":"не справился с задачей",
    "завалила":"не справилась с задачей",
    "завалили":"не справились с задачей",
    "сдохло":"перестало функционировать",
    "накрылось":"перестало функционировать",
    "рухнуло":"перестало функционировать",
    "прогнило":"пришло в негодность",
    "загнулся":"перестал функционировать",
    "загнулась":"перестала функционировать",
    "живой":"функционирует",
    "мёртвый":"не функционирует",
    "живая":"функционирует",
    "мёртвая":"не функционирует",
    "сырой":"требующий доработки",
    "сырая":"требующая доработки",
    "костыль":"временное решение",
    "костыли":"временные решения",
    "затычка":"временное решение",
    "горит":"требует оперативного вмешательства",
    "хайп":"ажиотаж",
    "скилл":"компетенция",
    "скиллы":"компетенции",
    "вайб":"атмосфера",
    "флекс":"демонстрация преимуществ",
    "жиза":"сочуствую",
    "чилл":"отдых",
    "мув":"действие",
    "голимый":"низкокачественный",
    "голимая":"низкокачественная",
    "гон":"недостоверная информация",
    "развод":"обман",
    "наебал":"обманул",
    "наебала":"обманула",
    "наебали":"обманули",
    "впарил":"навязал",
    "впарила":"навязала",
    "втюхал":"навязал",
    "втюхала":"навязала"
  },
  firm:{
    "допустил неточность":"необходимо исправить ошибку",
    "допустила неточность":"необходимо исправить ошибку",
    "пожалуйста, исправь":"исправь",
    "пожалуйста, переделай":"переделай",
    "при первой возможности":"незамедлительно",
    "в удобное для вас время":"незамедлительно",
    "давайте постараемся":"обеспечьте",
    "я не уверен что":"",
    "я не уверена что":"",
    "я не уверен":"",
    "я не уверена":"",
    "не уверен":"",
    "не уверена":"",
    "не факт что":"",
    "не исключено что":"",
    "не исключено":"",
    "может быть":"",
    "может стоит":"",
    "давайте попробуем":"",
    "как-нибудь потом":"",
    "когда-нибудь потом":"",
    "мне бы хотелось":"",
    "мне бы очень хотелось":"",
    "мне хотелось бы":"",
    "я бы очень хотел":"",
    "я бы очень хотела":"",
    "я бы хотел":"",
    "я бы хотела":"",
    "я хотел бы":"",
    "я хотела бы":"",
    "очень бы хотелось":"",
    "было бы неплохо":"",
    "было бы хорошо":"",
    "хорошо бы":"",
    "неплохо бы":"",
    "недурно бы":"",
    "было бы здорово":"",
    "было бы классно":"",
    "было бы супер":"",
    "было бы замечательно":"",
    "было бы чудесно":"",
    "было бы прекрасно":"",
    "хотелось бы":"",
    "я полагаю что":"",
    "я полагаю":"",
    "я считаю что":"",
    "я считаю":"",
    "на мой взгляд":"",
    "с моей точки зрения":"",
    "я бы сказал что":"",
    "я бы хотел отметить что":"",
    "по моему мнению":"",
    "лично я":"",
    "по-моему":"",
    "по-моему,":"",
    "по моему":"",
    "я думаю что":"",
    "я думаю":"",
    "я думаю,":"",
    "честно говоря":"",
    "честно говоря,":"",
    "по правде говоря":"",
    "откровенно говоря":"",
    "по совести говоря":"",
    "если честно":"",
    "мне кажется":"",
    "мне кажется,":"",
    "мне кажется что":"",
    "кажется":"",
    "кажется,":"",
    "кажется что":"",
    "возможно":"",
    "возможно,":"",
    "наверное":"",
    "пожалуй":"",
    "пожалуй,":"",
    "как бы":"",
    "типа":"",
    "в принципе":"",
    "вроде бы":"",
    "вроде":"",
    "если можно":"",
    "если возможно":"",
    "если не сложно":"",
    "когда будет время":"",
    "по возможности":"",
    "следовало бы":"",
    "надо бы":"",
    "нужно бы":"",
    "стоит бы":"",
    "пора бы":"",
    "вряд ли":"",
    "сомневаюсь":"",
    "я не знаю":"",
    "не знаю":"",
    "без понятия":"",
    "вероятно":"",
    "предположим":"",
    "допустим":"",
    "скорее всего":"",
    "якобы":"",
    "мол":"",
    "казалось бы":"",
    "кстати":"",
    "между прочим":"",
    "к слову":"",
    "впрочем":"",
    "однако":"",
    "тем не менее":"",
    "несмотря на":"",
    "всё же":"",
    "всё-таки":"",
    "тем более":"",
    "к тому же":"",
    "притом":"",
    "причём":"",
    "более того":"",
    "помимо этого":"",
    "кроме того":"",
    "сверх того":"",
    "помимо прочего":"",
    "мало того":"",
    "итого":"",
    "итак":"",
    "таким образом":"",
    "следовательно":"",
    "значит":"",
    "стало быть":"",
    "в итоге":"",
    "в конечном счёте":"",
    "наконец":"",
    "в конце концов":"",
    "под конец":"",
    "напоследок":"",
    "получается":"",
    "выходит":"",
    "в общем":"",
    "ладно":"",
    "ну ладно":"",
    "идёт":"",
    "договорились":"",
    "хорошо":"",
    "ок":"",
    "окей":"",
    "угу":"",
    "ага":"",
    "угумс":"",
    "мгм":"",
    "как-нибудь":"",
    "как-то":"",
    "когда-нибудь":"",
    "потом":"",
    "позже":"",
    "позднее":"",
    "впоследствии":"",
    "в дальнейшем":"",
    "со временем":"",
    "попозже":"",
    "пожалуйста,":"",
    "может":"",
    "могло бы":"",
    "должно быть":"",
    "я бы сказал":"",
    "я бы сказала":"",
    "можно подумать":""
  },
  short:{
    "давайте постараемся, чтобы это не повторилось":"не повторяй",
    "пожалуйста, исправь как можно скорее":"исправь срочно",
    "пожалуйста, дайте пространство":"дай пространство",
    "давайте спокойно обсудим":"обсудим",
    "прошу вас, не нужно так говорить":"хватит",
    "прошу вас, не нужно так":"хватит",
    "крайне неприятная ситуация":"кошмар",
    "критическая ситуация":"кризис",
    "крайне неудовлетворительно":"плохо",
    "неудовлетворительного качества":"хлам",
    "человек с иной точкой зрения":"ошибается",
    "человек с ограниченным пониманием":"не понимает",
    "глубоко неприятный человек":"плохой",
    "неприятный человек":"плохой",
    "человек без принципов":"беспринципный",
    "не вполне понимающий":"не понимает",
    "не вполне понимающая":"не понимает",
    "легкомысленный человек":"легкомысленный",
    "немотивированный человек":"ленивый",
    "непорядочный человек":"непорядочный",
    "медлительный человек":"медленный",
    "неопытный человек":"новичок",
    "не имеет значения":"неважно",
    "не имеет большого значения":"неважно",
    "совершенно незначительно":"ерунда",
    "совершенно нет":"нет",
    "совсем нет":"нет",
    "вызывает раздражение":"бесит",
    "очень утомил":"достал",
    "очень утомила":"достала",
    "очень утомили":"достали",
    "пожалуйста, исправь":"исправь",
    "пожалуйста, переделай":"переделай",
    "пожалуйста, разберись":"разберись",
    "при первой возможности":"срочно",
    "в удобное для вас время":"скоро",
    "как можно скорее":"срочно",
    "весьма впечатляюще":"круто",
    "большое удовольствие":"кайф",
    "не обращайте внимания":"забей",
    "затруднительная ситуация":"косяк",
    "накосячил":"ошибся",
    "накосячила":"ошиблась",
    "накосячили":"ошиблись",
    "облажался":"провалил",
    "облажалась":"провалила",
    "облажались":"провалили",
    "прошляпил":"прозевал",
    "прошляпила":"прозевала",
    "проморгал":"прозевал",
    "проморгала":"прозевала",
    "профукал":"упустил",
    "профукала":"упустила",
    "пролетел":"провалил",
    "пролетела":"провалила",
    "облом":"провал",
    "кирдык":"конец",
    "хана":"конец",
    "амба":"конец",
    "крышка":"конец",
    "пипец":"конец",
    "капец":"конец",
    "жесть":"жуть",
    "неудовлетворительно":"плохо",
    "недостоверная информация":"ложь",
    "вызывает опасения":"страшно",
    "не функционирует":"сломано",
    "работает медленно":"тормозит",
    "допускает ошибки":"косячит",
    "прекращает работу":"упало",
    "принимает пищу":"ест",
    "крыша едет":"сходит с ума",
    "крыша поехала":"свихнулся",
    "весьма утомило":"достало",
    "вызывает сильное раздражение":"бесит",
    "сильно расстроил":"взбесил",
    "сильно расстроила":"взбесила",
    "не может быть":"невероятно",
    "весьма удивительно":"удивительно",
    "поразительно":"удивительно",
    "пришло в негодность":"сломано",
    "перестало функционировать":"сломано",
    "крайне неприятный сюрприз":"провал",
    "крайне неприятно":"ужасно",
    "ни хрена себе":"надо же",
    "ни фига себе":"надо же",
    "ни хуя себе":"надо же",
    "обалдеть":"офигеть",
    "охренеть":"офигеть",
    "ахуеть":"вау",
    "охуеть":"вау",
    "не верю":"сомневаюсь",
    "удивлён, что":"сомневаюсь, что",
    "возможно, не заметил":"прозевал",
    "возможно, не заметила":"прозевала",
    "допустил неточность":"ошибся",
    "допустила неточность":"ошиблась",
    "допустили неточность":"ошиблись",
    "давайте начнём":"погнали",
    "действуем оперативно":"быстро",
    "пожалуйста, поторопитесь":"быстрее",
    "пожалуйста, ускорьтесь":"быстрее",
    "прошу ускорить":"быстрее",
    "очень много":"много",
    "значительное количество":"много",
    "допустила серьёзную ошибку":"провалила",
    "допустил серьёзную ошибку":"провалил",
    "не заметил":"прозевал",
    "не заметила":"прозевала",
    "упустил":"прошляпил",
    "упустила":"прошляпила",
    "не достиг результата":"провал",
    "не достигла результата":"провал",
    "пожалуйста, прекратите":"хватит",
    "зависает":"висит",
    "не функционирует корректно":"глючит"
  }
};

var RU_WRAP={
  polite:[
    function(s){return "Хотел бы мягко отметить, что "+s+" Спасибо за понимание."},
    function(s){return "Позвольте обратить внимание на то, что "+s+" Буду признателен за сотрудничество."},
    function(s){return "Если позволите, замечу, что "+s+" Надеюсь на конструктивное решение."}
  ],
  professional:[
    function(s){return "По данному вопросу: "+s+" Прошу сообщить о дальнейших шагах."},
    function(s){return "Для протокола: "+s+" Прошу рассмотреть и дать ответ."},
    function(s){return "В отношении вышеизложенного: "+s+" Ожидаю обратной связи."}
  ],
  firmSuffix:[
    ". Это требует немедленного внимания и действий.",
    ". Ожидаю незамедлительного решения — без исключений.",
    ". Прошу принять меры немедленно."
  ]
};

var currentLang="en";

var $=function(s){return document.querySelector(s)};
var $$=function(s){return document.querySelectorAll(s)};

var inputEl=$("#inputText");
var resultsEl=$("#results");
var resultsEmptyEl=$("#resultsEmpty");
var loaderEl=$("#loader");
var validationEl=$("#validationMsg");
var toneButtons=$$(".btn-tone");
var langSelect=$("#langSelect");

function t(key){var parts=key.split(".");var obj=I18N[currentLang];for(var i=0;i<parts.length;i++){if(obj==null)return key;obj=obj[parts[i]]}return obj}

function applyLang(){
  var lang=I18N[currentLang];
  document.documentElement.lang=currentLang;
  document.title=t("title")+" — "+(currentLang==="ru"?"Редактор тона":"Rewrite Your Text Instantly");
  $("#heroTitle").textContent=lang.title;
  $("#heroSub").textContent=lang.heroSub;
  $("#heroNote").textContent=lang.heroNote;
  inputEl.placeholder=lang.placeholder;
  $("#sampleBtn").textContent=lang.sampleBtn;
  $("#clearBtn").textContent=lang.clearBtn;
  $("#loaderText").textContent=lang.polishing;
  $$("[data-i18n]").forEach(function(el){
    var key=el.getAttribute("data-i18n");
    var val=t(key);
    if(val!==key)el.textContent=val;
  });
}

function showToast(msg){
  validationEl.textContent=msg;
  clearTimeout(showToast._t);
  showToast._t=setTimeout(function(){validationEl.textContent=""},3000);
}

function showLoader(){$("#loaderText").textContent=t("polishing");loaderEl.classList.add("active")}
function hideLoader(){loaderEl.classList.remove("active")}

function cleanSpaces(s){return s.replace(/  +/g," ").replace(/^ +| +$/gm,"").replace(/\n{3,}/g,"\n\n")}

function cap(s){return s.charAt(0).toUpperCase()+s.slice(1)}

function soften(text){
  text=text.replace(/!/g,".");
  text=text.replace(/\.{2,}/g,".");
  return text;
}

function shortenRu(s,limit){
  limit=limit||50;
  var sentences=s.split(/[.!?]\s*/);
  var out=[];
  for(var i=0;i<sentences.length;i++){
    var l=sentences[i].trim();
    if(!l)continue;
    if(l.length>limit){
      var words=l.split(" ");
      l=words.slice(0,Math.ceil(words.length*.55)).join(" ");
    }
    out.push(l);
  }
  return out.join(". ")+".";
}

function shortenEn(s,limit){
  limit=limit||40;
  var lines=s.split(/\.\s*/);
  var out=[];
  for(var i=0;i<lines.length;i++){
    var l=lines[i].trim();
    if(!l)continue;
    if(l.length>limit){
      var words=l.split(" ");
      var half=words.slice(0,Math.ceil(words.length*.6));
      l=half.join(" ");
    }
    out.push(l);
  }
  return out.join(". ")+".";
}

function rewriteEn(text,tone){
  var r=EN_RULES;
  var s=cap(text.trim());

  if(tone==="polite"){
    var base=replaceWords(s,r.harsh);
    base=soften(base);
    base=cleanSpaces(base);
    var v1=r.politeWrap[0](base);
    var v2=base;
    v2=replaceWords(v2,{"I can't":"I'm concerned that","fix":"help resolve"});
    v2=r.politeAlt[0](v2);
    v2=cleanSpaces(v2);
    var v3=base;
    v3=replaceWords(v3,{"you":"we","your":"our"});
    v3=r.politeAlt[2](v3);
    v3=cleanSpaces(v3);
    return [v1,v2,v3];
  }

  if(tone==="professional"){
    var base=replaceWords(s,r.professional);
    base=replaceWords(base,r.harsh);
    base=cleanSpaces(base);
    var p1=r.profWrap[0](base);
    var p2=replaceWords(base,{"you":"the team","your":"the","this is":"this constitutes","needs":"requires"});
    p2=r.profWrap[1](p2);
    var p3=r.profWrap[2](base);
    return [p1,p2,p3];
  }

  if(tone==="short"){
    var base=replaceWords(s,r.harsh);
    base=cleanSpaces(base);
    var sh1=shortenEn(base);
    var sh2=shortenEn(base).split(". ").filter(function(x){return x.trim()}).slice(0,3).join(". ")+".";
    var sh3=base.split(". ").filter(function(x){return x.trim()}).map(function(x){return x.trim().split(" ").slice(0,5).join(" ")}).slice(0,2).join(". ")+".";
    return [sh1,sh2,sh3];
  }

  if(tone==="firm"){
    var base=replaceWords(s,r.harsh);
    base=replaceWords(base,r.firm);
    base=cleanSpaces(base);
    base=base.replace(/\.$/,"");
    return [cap(base)+r.firmSuffix[0],cap(base)+r.firmSuffix[1],cap(base)+r.firmSuffix[2]];
  }

  return [s,s,s];
}

function rewriteRu(text,tone){
  var s=cap(text.trim());

  if(tone==="polite"){
    var base=replacePhrases(s,RU_PHRASES.polite);
    base=soften(base);
    base=cleanSpaces(base);
    var v1=RU_WRAP.polite[0](base);
    var v2=RU_WRAP.polite[1](base);
    var v3=RU_WRAP.polite[2](base);
    return [v1,v2,v3];
  }

  if(tone==="professional"){
    var base=replacePhrases(s,RU_PHRASES.professional);
    base=cleanSpaces(base);
    var p1=RU_WRAP.professional[0](base);
    var p2=RU_WRAP.professional[1](base);
    var p3=RU_WRAP.professional[2](base);
    return [p1,p2,p3];
  }

  if(tone==="short"){
    var base=replacePhrases(s,RU_PHRASES.short);
    base=cleanSpaces(base);
    var sh1=shortenRu(base);
    var sh2=shortenRu(base).split(/\. /).filter(function(x){return x.trim()}).slice(0,3).join(". ")+".";
    var sh3=base.split(/\. /).filter(function(x){return x.trim()}).map(function(x){return x.trim().split(" ").slice(0,4).join(" ")}).slice(0,2).join(". ")+".";
    return [sh1,sh2,sh3];
  }

  if(tone==="firm"){
    var base=replacePhrases(s,RU_PHRASES.polite);
    base=replacePhrases(base,RU_PHRASES.firm);
    base=cleanSpaces(base);
    base=base.replace(/\.$/,"");
    return [cap(base)+RU_WRAP.firmSuffix[0],cap(base)+RU_WRAP.firmSuffix[1],cap(base)+RU_WRAP.firmSuffix[2]];
  }

  return [s,s,s];
}

function rewrite(text,tone){
  var result=currentLang==="ru"?rewriteRu(text,tone):rewriteEn(text,tone);
  for(var i=0;i<result.length;i++){
    result[i]=cleanSpaces(result[i]);
    result[i]=result[i].replace(/\.+/g,".");
    result[i]=result[i].replace(/\.\./g,".");
    result[i]=result[i].replace(/  +/g," ");
  }
  return result;
}

function renderResults(variants,tone){
  var labels=t("toneLabels."+tone+".variants");
  if(typeof labels==="string")labels=[labels,labels,labels];
  var copyLabel=t("copyBtn");
  var html="";
  for(var i=0;i<variants.length;i++){
    html+='<div class="result-card">'
      +'<div class="result-title">'+labels[i]+'</div>'
      +'<div class="result-text">'+escHtml(variants[i])+'</div>'
      +'<div class="result-copy"><button class="copy-btn" data-text="'+escAttr(variants[i])+'" type="button">'+copyLabel+'</button></div>'
      +'</div>';
  }
  resultsEl.innerHTML=html;
  resultsEl.hidden=false;
  resultsEmptyEl.style.display="none";
  resultsEl.scrollIntoView({behavior:"smooth",block:"nearest"});
}

function escHtml(s){return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}
function escAttr(s){return s.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"&#10;")}

function handleTone(tone){
  var text=inputEl.value.trim();
  if(!text){showToast(t("emptyMsg"));return}
  validationEl.textContent="";
  resultsEl.hidden=true;
  resultsEmptyEl.style.display="none";
  showLoader();
  var delay=700+Math.random()*500;
  setTimeout(function(){
    hideLoader();
    var variants=rewrite(text,tone);
    renderResults(variants,tone);
  },delay);
}

toneButtons.forEach(function(btn){
  btn.addEventListener("click",function(){
    handleTone(this.getAttribute("data-tone"));
  });
});

$("#sampleBtn").addEventListener("click",function(){
  inputEl.value=t("sample");
  inputEl.focus();
  validationEl.textContent="";
});

$("#clearBtn").addEventListener("click",function(){
  inputEl.value="";
  resultsEl.hidden=true;
  resultsEl.innerHTML="";
  resultsEmptyEl.style.display="";
  validationEl.textContent="";
  inputEl.focus();
});

resultsEl.addEventListener("click",function(e){
  var btn=e.target.closest(".copy-btn");
  if(!btn)return;
  var text=btn.getAttribute("data-text").replace(/&#10;/g,"\n").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"');
  if(navigator.clipboard){
    navigator.clipboard.writeText(text).then(function(){
      btn.textContent=t("copied");
      btn.classList.add("copied");
      setTimeout(function(){btn.textContent=t("copyBtn");btn.classList.remove("copied")},1500);
    });
  }
});

$("#themeToggle").addEventListener("click",function(){
  var html=document.documentElement;
  var current=html.getAttribute("data-theme")||"light";
  html.setAttribute("data-theme",current==="light"?"dark":"light");
});

langSelect.addEventListener("change",function(){
  currentLang=this.value;
  applyLang();
  resultsEl.hidden=true;
  resultsEl.innerHTML="";
  resultsEmptyEl.style.display="";
  validationEl.textContent="";
});

$("#copyWallet").addEventListener("click",function(){
  var addr="UQCWCZlue77-gwED9UzUSCWgysoVgRilIaFgKUMofo0wCYE6";
  var btn=this;
  if(navigator.clipboard){
    navigator.clipboard.writeText(addr).then(function(){
      btn.textContent=t("donateCopied");
      btn.classList.add("copied");
      setTimeout(function(){btn.textContent=t("donateCopy");btn.classList.remove("copied")},1500);
    });
  }
});

applyLang();

})();
