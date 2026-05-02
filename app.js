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
    "накосячил":"допустил неточность",
    "накосячила":"допустила неточность",
    "накосячили":"допустили неточность",
    "не верю":"удивлён, что",
    "не проверил":"возможно, не заметил",
    "не проверила":"возможно, не заметила",
    "исправь это":"пожалуйста, исправь это",
    "исправь немедленно":"пожалуйста, исправь как можно скорее",
    "больше не повторяй":"давайте постараемся, чтобы это не повторилось",
    "больше не повторяйте":"давайте постараемся, чтобы это не повторилось",
    "вообще накосячил":"в целом допустил неточность",
    "заткнись":"пожалуйста, прекратите",
    "иди вон":"пожалуйста, отойдите",
    "отстань":"давайте спокойно обсудим",
    "отвали":"пожалуйста, дайте пространство",
    "ты тупой":"мне кажется, это можно сделать иначе",
    "ты идиот":"меня беспокоит этот подход",
    "какой бред":"это спорный момент",
    "что за хрень":"это требует уточнения",
    "иди к чёрту":"прошу вас, не нужно так",
    "какого чёрта":"прошу прощения, но",
    "какогоhell":"прошу прощения, но",
    "пошёл вон":"прошу вас уйти",
    "пошла вон":"прошу вас уйти",
    "тупой идиот":"меня серьёзно беспокоит",
    "хуже не бывает":"ситуация непростая",
    "ненавижу":"мне очень не нравится",
    "бесполезный":"неэффективный",
    "ленивый":"немотивированный",
    "ужасный":"ниже ожиданий",
    "отстойный":"неудовлетворительный",
    "недопустимо":"требует улучшения",
    "худший":"наименее благоприятный",
    "очевидно":"кажется",
    "срочно":"при первой возможности",
    "немедленно":"при первой возможности",
    "как можно скорее":"в удобное для вас время",
    "исправь":"пожалуйста, исправь",
    "переделай":"пожалуйста, переделай",
    "разберись":"пожалуйста, разберись"
  },
  professional:{
    "привет":"Уважаемый коллега,",
    "йо":"Приветствую,",
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
    "ты должен":"рекомендую вам",
    "сделай":"прошу выполнить",
    "исправь":"необходимо исправить",
    "переделай":"необходимо переделать",
    "разберись":"необходимо разобраться",
    "давай":"прошу",
    "качай":"прошу ускорить",
    "накосячил":"допустил неточность",
    "накосячила":"допустила неточность",
    "не проверил":"не проверил",
    "не верю":"вынужден отметить, что",
    "больше не повторяй":"прошу избегать повторения",
    "больше не повторяйте":"прошу избегать повторения"
  },
  firm:{
    "допустил неточность":"необходимо исправить ошибку",
    "допустила неточность":"необходимо исправить ошибку",
    "пожалуйста, исправь":"исправь",
    "пожалуйста, переделай":"переделай",
    "при первой возможности":"незамедлительно",
    "в удобное для вас время":"незамедлительно",
    "давайте постараемся":"обеспечьте",
    "пожалуйста,":"",
    "возможно,":"",
    "кажется, что":"",
    "я думаю, что":"",
    "по-моему,":"",
    "честно говоря,":"",
    "мне кажется,":""
  },
  short:{
    "накосячил":"ошибся",
    "накосячила":"ошиблась",
    "допустил неточность":"ошибся",
    "возможно, не заметил":"не проверил",
    "пожалуйста, исправь":"исправь",
    "при первой возможности":"срочно",
    "давайте постараемся, чтобы это не повторилось":"не повторяй",
    "не верю":"сомневаюсь",
    "удивлён, что":"сомневаюсь, что"
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
