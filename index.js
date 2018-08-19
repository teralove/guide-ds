const Command = require('command');

module.exports = function DreadspireGuide(dispatch) {	
    const command = Command(dispatch);
    const mapID = 9034;
        
    // BossAction[TempalateId][Skill]
    const BossActions = {
        // Akasha 
        1000: {
            1102: {msg: 'Spin', checkDouble: true}, // Charge attack
            1304: {msg: 'Backpedal + Spin'},         
            1105: {msg: 'Puke'}, 
            1203: {msg: 'Sleep'},
        },
        // Kaprima
        2000: {
            1101: {msg: 'Smash inc'},
            1102: {msg: 'Spin'},
            1107: {msg: 'Back'}, // stun
            1108: {msg: 'Front'},
            1109: {msg: 'Back spin'},
            1110: {msg: 'Get Out'},
            1122: {msg: 'Get In'},
            1119: {msg: 'Leash'},
        },
        // Dakuryon
        3000: {
            1112: {msg: 'Stab + Knockup'},
            1134: {msg: 'Debuff (closest)'},         
            1502: {msg: 'Pushback + Cage'}, 
            1130: {msg: 'Left swipe', spawnFlowers: true, func: dakuryonLeftSwipe}, 
            1131: {msg: 'Right swipe', spawnFlowers: true, func: dakuryonRightSwipe},
            1122: {isCage: true, cages: [PizzaOne, PizzaInner, PizzaOuter, PizzaTwo, PizzaLast], delay: 0}, 
            1123: {isCage: true, cages: [PizzaTwo, PizzaOne, PizzaOuter, PizzaInner, PizzaLast], delay: 200}, 
            1124: {isCage: true, cages: [PizzaInner, PizzaTwo, PizzaOne, PizzaOuter, PizzaLast], delay: 0}, 
            1127: {isCage: true, cages: [PizzaOne, PizzaTwo, PizzaInner, PizzaOuter, PizzaLast], delay: 200},
        },
        // Meldita
        4000: {            
            1102: {msg: 'Inner rings'},
            1103: {msg: 'Outer rings'},
            1107: {msg: 'Front'},
            1108: {msg: 'Lines'}, 
            1109: {msg: 'Single Laser'},
            1114: {msg: 'Secondary'},
            1205: {msg: '360 Laser + Worms'},
            1206: {msg: 'Triple Laser'}, 
            // TODO Specify who is targetted with single laser?
        },
        // Kelsaik
        5000: {
            1103: {msg: 'Tail'},
            1104: {msg: 'Ice'},
            1105: {msg: 'Fire'},
            1107: {msg: 'Double Paw'},
            1108: {msg: 'Fire AOE'},
            1109: {msg: 'Ice AOE'},
            1118: {msg: 'Big Jump + Adds'},
            1119: {msg: 'Stun?'},
            1120: {msg: 'Stun'},
            1124: {msg: 'Small Jump', startTimer: true, delay: 25000, timerMsg: 'Small Jump soon...'},
        },
        // Krakatox
        6000: {
            1101: {msg: 'Prison'},
            1103: {msg: 'Slam'},
            1104: {msg: 'Slam + Back'},
            1106: {msg: 'Barrage + Slam'},
            1107: {msg: 'Bomb'},
            1108: {msg: 'Triple Bomb'},
            1109: {msg: 'Single Swing'},
            1110: {msg: 'Double Swing'},
            1113: {msg: 'Laser'},
            1133: {msg: 'Slam'},
            1134: {msg: 'Slam + Back'},
            4107: {msg: 'Plague/Regress', startTimer: true, delay: 55000, timerMsg: 'Plague/Regress soon...'},
        },
        // Lakan
        7000: {
            1136: {msg: 'Claw'},
            1138: {spawnFlowers: true, func: BegoneRange}, // Begone
            1152: {msg: 'Stun + Back'},
            1154: {msg: 'Out + In'},
            1155: {msg: 'In + Out'},
            1240: {msg: 'Donuts'},
            1401: {msg: 'plague/regress'},     // Shield normal to inverse
            1402: {msg: 'sleep'},              // Shield inverse to normal
            1701: {msg: "Back + Stab"},
            // Normal
            1901: {msg: '(Marks) Debuff (closest)',    next: 1905,    prev: 1903},
            1905: {msg: '(Circles) Spread',            next: 1903,    prev: 1901},
            1903: {msg: '(Bombs) Gather + cleanse',    next: 1901,    prev: 1905},
            // Inversed
            1902: {msg: '(Marks) Debuff (farthest)',   next: 1906,    prev: 1904},
            1906: {msg: '(Circles) Gather',            next: 1904,    prev: 1902},
            1904: {msg: '(Bombs) Gather + no cleanse', next: 1902,    prev: 1906},
        },
        // Desolarus
        8000: {
            1101: {msg: 'Push'},
            1102: {msg: 'Pull'},
//            1106: {msg: 'Balls'},
//            1107: {msg: 'Balls'},
//            1108: {msg: 'Balls'},
//            1109: {msg: 'Balls'},            
            1110: {msg: 'Lightning'},
            3105: {msg: 'Red Circles'},
            // TODO Balls and target pylon?
            // TODO Viyor direction breaking pylons?
        },
        // Darkan
        9000: {
//            1101: {}, // Normal attack (left down, right out)
//            1102: {}, // Normal attack (right down, left out)
            1103: {msg: 'Right swipe inc'}, //eviscerate (left down, right out)
            1106: {msg: 'Left swipe inc'}, //eviscerate (right down, left out)
            1111: {msg: 'Drill', checkDouble: true}, // 1111 = Spin, 2xSpins = Drill
//            1112: {}, //flying back
            1114: {msg: 'Rake'},
            1115: {msg: 'Puddles'},
            1302: {msg: 'Bomb'},
//            1303: {msg: 'Drill'},
            // TODO spin messages
            // TODO Shouts
            // TODO Ghost
            // TODO Swipe safepots?
        },
        // Shandra Manaya
        10000: {
            1102: {msg: 'Donut'},
//            1103: {msg: 'Slap'},
            1104: {msg: 'Jump'},  
//            1105: {msg: 'Metamorphic'}, // Front side
            1106: {msg: 'Grenade'}, 
            1107: {msg: 'Trample'},
            1108: {msg: 'Flying'},
            1109: {msg: 'Puddle'},
            1111: {msg: 'Cage'}, 
            1112: {msg: 'Stand', startTimer: true, delay: 45000, timerMsg: 'Stand soon...'},
//            1113: {msg: 'L-Metamorphic'}, //  Left side
//            1114: {msg: 'R-Metamorphic'}, // Right side   
            1115: {msg: 'Tail'},             
//            1201: {msg: 'Staggered'},
            1202: {msg: 'Trample'},
            1203: {msg: 'Walk'}, 
            1204: {msg: 'Curl'},
            1205: {msg: 'Dive'}, 
//            1206: {msg: 'Backstep'}, 
//            13??: {msg: 'Plague/regress', startTimer: true, delay: 55000, timerMsg: 'Plague/regress soon...'}, // Great ones
            1305: {msg: 'Staggered'}, 
            // TODO Plague mechanic?
            // TODO Stand and debuff mechanic?
            // TODO safespots?
        },
    };

     const BossHpWarnings = {
        5000: [
            {hp: 0.85, msg: 'Pushing 85%... Big Jump + Adds soon'},
            {hp: 0.55, msg: 'Pushing 55%... Big Jump + Adds soon'},
            {hp: 0.25, msg: 'Pushing 25%... Big Jump + Adds soon'},
            {hp: 0.10, msg: 'Pushing 10%... Big Jump + Adds soon'},
        ],
        6000: [
            {hp: 0.80, msg: 'Pushing 80%... Plague/regress soon' }
        ],
        7000: [
            {hp: 0.50, msg: 'Pushing 50%... Reverse order soon' }
        ],
        8000: [
            {hp: 0.50, msg: 'Pushing 50%... Double balls soon' }
        ],
        9000: [
//            {hp: 0.90, msg: 'Pushing 90%... Summoning outer ghosts' }
            {hp: 0.75, msg: 'Pushing 75%... Puddles soon' },
            {hp: 0.70, msg: 'Pushing 70%... Ghost soon' },
            {hp: 0.50, msg: 'Pushing 50%... Shouts and eviscerate swipes soon' },
        ],
        10000: [
            {hp: 0.90, msg: 'Pushing 90%... Stand soon' },
            {hp: 0.50, msg: 'Pushing 50%... Plague/regress soon' },
            {hp: 0.08, msg: 'Pushing 8%... Walk soon' },
        ]
    }
    const HpDiffBeforeWarning = 0.05;    
    
    //MessageId: BossAction
    const BossMessages = {
        // Lakan (DG Event Messages)
        90340703: 1901,   // Lakan has noticed you.
        90340704: 1905,   // Lakan is trying to take you on one at a time.	
        90340705: 1903,   // Lakan intends to kill all of you at once.
        // Darkan (Quest Balloon)
        9034901: {msg: 'Double inc', checkEnrage: true}, // "I!"
//        9034902: {), // "Will!"
//        9034903: {), // "tear you apart!"
    };    
    
    const BossAbnormalities = {
        // Akasha
        90340105: {msg: 'Stun it!', startTimer: true, delay: 60000, timerMsg: 'Stun soon...'},
    };

    // Dakuryon
    const PizzaSliceDelay = 1000;
    const DakuryonDebuffSkip = [90340315, 90340313, 90340311, 90340309, 90340307];
    const DakuryonDebuffTake = [90340314, 90340312, 90340310, 90340308, 90340306];
        
    // Lakan stuff  
    const InversedAction = {
        1901: 1902,
        1905: 1906,
        1903: 1904,
        1902: 1901,
        1906: 1905,
        1904: 1903
    };
    const LakanNextMessageDelay = 5000;
    const ShieldWarningTime = 80000; //ms
    const ShieldWarningMessage = 'Ring soon';
    
    // Desolarus adds
    const NpcSpawns = {
        8100: {msg: 'Curses'}, // Rokdos
        8200: {msg: 'Yellow Circles + Carpet'}, // Viyor
        // Alternative: Use QuestBalloon instead of SpawnNPC?
    }
   
	let hooks = [],
        gameId = undefined,
        enabled = true,
        insidemap = false,
        streamMode = false,
        bossInfo = undefined,
        timer = undefined, 
        bossLoc = undefined,
        flowerId = 999999999,
        playerDebuffs = [],
        bossHpWarningsNotified = [],
        // Akasha,Darkan
        lastSkill = undefined,
        // Dakuryon
        dakuryonDebuffMessage = '',
        // Krakatox
        krakatoxPlagueWarning = false,
        // Lakan
        shieldWarned = false,
		timerNextMechanic = undefined, 
		lastNextAction = undefined,
		lastInversionTime = undefined,
		isReversed = false, // below 50% hp
		inSoulWorld = false,
        // Darkan
        isEnraged = false;        
        
    dispatch.hook('S_LOGIN', 10, (event) => {
        gameId = event.gameId;
    });
    
    command.add('ds', (arg) => {
        if (arg === undefined) {
            enabled = !enabled;
            command.message('DS Guide ' + (enabled ? 'Enabled' : 'Disabled') + '.');
        }
        else if(arg.toLowerCase() === "off")
        {
            enabled = false;
            command.message('DS Guide ' + (enabled ? 'Enabled' : 'Disabled') + '.');
        }
        else if(arg.toLowerCase() === "on")
        {
            enabled = true;
            command.message('DS Guide ' + (enabled ? 'Enabled' : 'Disabled') + '.');
        }
        else if(arg.toLowerCase() === "stream")
        {
            streamMode = !streamMode;
            command.message('DS Guide - Stream Mode: ' + (streamMode ? 'Enabled.' : 'Disabled.'));
        }
    });
    
    dispatch.hook('S_LOAD_TOPO', 1, (event) => {
        if (event.zone === mapID) {
            if (!insidemap) command.message('Welcome to Dreadspire');
            insidemap = true;
            load();
        } else {
            insidemap = false;
            unload();
        }
    });
    
	function sendMessage(msg) {
        if (!enabled) return;
        
		if(streamMode) {
			command.message(msg);
		} else {
			dispatch.toClient('S_CHAT', 1, {
                channel: 21, //21 = p-notice, 1 = party
                authorName: 'DG-Guide',
                message: msg
			});
		}
	}
    
    function bossHealth() {
        return bossInfo.curHp / bossInfo.maxHp;
    }
	
	function startTimer(message, delay) {
		if (timer) clearTimeout(timer);
		timer = setTimeout(() => {
			sendMessage(message);
			timer = null;
		}, delay);	
	}

	function SpawnFlower(position, despawnDelay = 1200){
		dispatch.toClient('S_SPAWN_COLLECTION', 4, {
			gameId: flowerId,
			id: 559,
			amount: 1,
            loc: {x: position.x, y: position.y, z: bossLoc.z},
			w: 0,
			extractor: false,
            extractorDisabled: false,
            extractorDisabledTime: 0
		});
		setTimeout(DespawnFlower, despawnDelay, flowerId)
		flowerId--;
	}
	
	function DespawnFlower(id){
        dispatch.toClient('S_DESPAWN_COLLECTION', 2, {
            gameId: id,
            collected: false
        });
	}
    
	function SpawnLoc(degrees, radius) {
        let rads = (degrees * Math.PI/180);
        let finalrad = bossLoc.w - rads;
        
        let spawnx = bossLoc.x + radius * Math.cos(finalrad);
        let spawny = bossLoc.y + radius * Math.sin(finalrad);
        return {x:spawnx,y:spawny};
	}
    
    // Dakuryon Safespots 
    function dakuryonLeftSwipe() {
        SpawnFlower(SpawnLoc(240,100));
        SpawnFlower(SpawnLoc(265,100));
        SpawnFlower(SpawnLoc(270,100));
        SpawnFlower(SpawnLoc(285,100));
        SpawnFlower(SpawnLoc(300,100));
    }
    function dakuryonRightSwipe() {
        SpawnFlower(SpawnLoc(60,100));
        SpawnFlower(SpawnLoc(75,100));
        SpawnFlower(SpawnLoc(90,100));
        SpawnFlower(SpawnLoc(105,100));
        SpawnFlower(SpawnLoc(120,100));
    }    
    
    function skipPizzaSlice(abnormalityId) {
        return DakuryonDebuffSkip.includes(abnormalityId) ? true : false;
    }
    
    function PizzaOne(abnormalityId, delay){
        setTimeout(()=>{
            if (skipPizzaSlice(abnormalityId)) {
                for (let i = 0; i < 6; i++) {
                    SpawnFlower(SpawnLoc(i*60+45, 200));
                }
            } else {
                for (let i = 0; i < 6; i++) {
                    SpawnFlower(SpawnLoc(i*60+15, 200));
                }
            }
        }, delay);
	}
	function PizzaTwo(abnormalityId, delay){
        setTimeout(()=>{
            if (skipPizzaSlice(abnormalityId)) {
                for (let i = 0; i < 6; i++) {
                    SpawnFlower(SpawnLoc(i*60+15, 200));
                }
            } else {
                for (let i = 0; i < 6; i++) {
                    SpawnFlower(SpawnLoc(i*60+45, 200));
                }
            }
        }, delay);
	}
	function PizzaOuter(abnormalityId, delay){ 
        setTimeout(()=>{
            if (skipPizzaSlice(abnormalityId)) {
                for (let i = 0; i < 12; i++) {
                    SpawnFlower(SpawnLoc(i*30+15, 150));
                }
            } else {
                for (let i = 0; i < 12; i++) {
                    SpawnFlower(SpawnLoc(i*30+15, 275));
                }
            }
        }, delay);
	}
	function PizzaInner(abnormalityId, delay){ 
        setTimeout(()=>{
            if (skipPizzaSlice(abnormalityId)) {
                for (let i = 0; i < 12; i++) {
                    SpawnFlower(SpawnLoc(i*30+15, 275));
                }
            } else {
                for (let i = 0; i < 12; i++) {
                    SpawnFlower(SpawnLoc(i*30+15, 150));
                }           
            }
        }, delay);
	}
	function PizzaLast(abnormalityId, delay){
        setTimeout(()=>{
            if (skipPizzaSlice(abnormalityId)) {        
                SpawnFlower(SpawnLoc(15,175));
                SpawnFlower(SpawnLoc(105,175));
                SpawnFlower(SpawnLoc(195,175));
                SpawnFlower(SpawnLoc(285,175));
            } else {
                SpawnFlower(SpawnLoc(45,175));
                SpawnFlower(SpawnLoc(75,175));
                SpawnFlower(SpawnLoc(135,175));
                SpawnFlower(SpawnLoc(165,175));
                SpawnFlower(SpawnLoc(225,175));
                SpawnFlower(SpawnLoc(255,175));
                SpawnFlower(SpawnLoc(315,175));
                SpawnFlower(SpawnLoc(345,175));
            }
        }, delay);
	} 
    
    // Lakan safespots
    function BegoneRange() {
        for (let degree = 0; degree < 360; degree += 360 / 20) {
            SpawnFlower(SpawnLoc(degree,250), 6000);
        }
    }
    
    function load() {
        if(!hooks.length) {

            hook('S_BOSS_GAGE_INFO', 3, event => {
                bossInfo = event;
                
                let bossHp = bossHealth();
                
                // Boss HP Warnings
                if (BossHpWarnings[bossInfo.templateId]) {
                    for(let i = 0; i < BossHpWarnings[bossInfo.templateId].length; i++) {
                        if (!bossHpWarningsNotified.includes(i)) {
                            if (bossHp < BossHpWarnings[bossInfo.templateId][i].hp + HpDiffBeforeWarning) {
                                bossHpWarningsNotified.push(i);
                                sendMessage(BossHpWarnings[bossInfo.templateId][i].msg);
                            }
                        }
                    }
                }                
                                
                // Reset Lakan
                if (bossInfo.templateId === 7000) {
                    if (bossHp <= 0 || bossHp >= 1) {
                        lastNextAction = undefined;
                        isReversed = false;
                        inSoulWorld = false;
                        shieldWarned = false;
                        lastInversionTime = undefined;
                    } else {
                        if (!lastInversionTime) lastInversionTime = Date.now();
                    }
                    
                    if (Date.now() > (lastInversionTime + ShieldWarningTime) && !shieldWarned) {
                        let hint = (!inSoulWorld ? BossActions[7000][1401].msg : BossActions[7000][1402].msg);
                        sendMessage(ShieldWarningMessage + ' -> ' + hint);
                        shieldWarned = true;
                    }
                }
                
                // Reset all bosses
                if (bossHp <= 0) {
                    bossInfo = undefined;
                    if (timer) clearTimeout(timer);
                    playerDebuffs = [];
                    flowerId = 999999999;
                    bossHpWarningsNotified = [];
                }
            });
            
            hook('S_ACTION_STAGE', 6, (event) => {  //TODO CHECK Correct version             
                if (!bossInfo) return;
                if (!event.gameId.equals(bossInfo.id)) return;
                if (!BossActions[bossInfo.templateId]) return;
                if (event.stage != 0) return;
                
                let bossAction = BossActions[bossInfo.templateId][event.skill.id];
                if (!bossAction) bossAction = BossActions[bossInfo.templateId][event.skill.id - 1000]; // check if skill is enraged
                                
                if (bossAction) 
                {
                    bossLoc = event.loc;
                    bossLoc.w = event.w;
                    
                    // Double attacks into something
                    if (bossAction.checkDouble) {
                        if (event.skill.id === lastSkill) {
                            sendMessage(bossAction.msg);
                            lastSkill = undefined;
                            return;
                        }
                    }
                    // Start timer
                    else if (bossAction.startTimer) {
                        startTimer(bossAction.timerMsg, bossAction.delay);
                        if (bossAction.msg) sendMessage(bossAction.msg);
                    }
                    // Dakuryon cage
                    else if (bossAction.isCage) {
                        setTimeout(()=> {
                            for(let i = 0; i < bossAction.cages.length; i++) {
                                bossAction.cages[i](playerDebuffs[i], PizzaSliceDelay * i);
                            }
                        }, bossAction.delay);
                    }
                    // Spawn Flowers
                    else if (bossAction.spawnFlowers) {
                        if (bossAction.func) bossAction.func();
                        if (bossAction.msg) sendMessage(bossAction.msg);
                    }
                    // Normal messages
                    else if (bossAction.msg) {
                        sendMessage(bossAction.msg);
                    }
                    // Debug?
                    else {
                        console.log('(DS-Guide) Debug: Unhandled Action... Boss: ' + bossInfo.templateId + ', SkillId: ' + event.skill.id);
                    }
                    
                    // Lakan stuff
                    if (bossInfo.templateId === 7000) {
                        let nextMessage;
                        if (event.skill.id == 1401 || event.skill.id == 2401) {                              // normal to inverse aka soul world
                            inSoulWorld = true;
                            nextMessage = BossActions[7000][InversedAction[lastNextAction]].msg;
                            startTimer('Next: ' + nextMessage, LakanNextMessageDelay);
                            lastInversionTime = Date.now();
                            shieldWarned = false;
                        } else if (event.skill.id == 1402 || event.skill.id == 2402) {                       // inverse to normal
                            inSoulWorld = false;
                            nextMessage = BossActions[7000][InversedAction[lastNextAction]].msg;
                            startTimer('Next: ' + nextMessage, LakanNextMessageDelay);
                            lastInversionTime = Date.now();
                            shieldWarned = false;
                        } else if (!isReversed && bossAction.next) {                                         // normal "next"
                            nextMessage = BossActions[7000][bossAction.next].msg;
                            startTimer('Next: ' + nextMessage, LakanNextMessageDelay);
                            lastNextAction = bossAction.next;
                        } else if (isReversed && bossAction.prev) {                                          // reversed "next"
                            nextMessage = BossActions[7000][bossAction.prev].msg;
                            startTimer('Next: ' + nextMessage, LakanNextMessageDelay);
                            lastNextAction = bossAction.prev;
                        }
                    }
                    
                }
                lastSkill = event.skill.id;
            });
            
            hook('S_SPAWN_NPC', 8, event => {
                if (!bossInfo) return;
                
                if (bossInfo.templateId === 8000) {
                    if (NpcSpawns[event.templateId]) {
                        sendMessage(NpcSpawns[event.templateId].msg);
                    }
                }
            });

            hook('S_ABNORMALITY_BEGIN', 2, event => {  
                if (!bossInfo) return;
                
                // Abnormality on boss
                if (event.target.equals(bossInfo.id)) {
                    let bossAbnormality = BossAbnormalities[event.id];
                    if (bossAbnormality) {
                        sendMessage(bossAbnormality.msg);
                        if (bossAbnormality.startTimer) {
                            startTimer(bossAbnormality.timerMsg, bossAbnormality.delay);
                        }
                    }
                }                
                // Abnormality on player
                else if (event.target.equals(gameId)) {
                    if (bossInfo.templateId === 3000) {
                        if (DakuryonDebuffTake.includes(event.id)) dakuryonDebuffMessage = 'Take ' + dakuryonDebuffMessage;
                        else if (DakuryonDebuffSkip.includes(event.id)) dakuryonDebuffMessage = 'Skip ' + dakuryonDebuffMessage;
                        else return;
                                                
                        playerDebuffs.unshift(event.id);

                        if ([90340306, 90340307].includes(event.id)) {
                            sendMessage(dakuryonDebuffMessage);
                            dakuryonDebuffMessage = '';
                        }
                    }
                }
            });
	
            hook('S_DUNGEON_EVENT_MESSAGE', 2, (event) => {	
                if (!bossInfo) return;
                
                let msgId = parseInt(event.message.replace('@dungeon:', ''));
                if (BossMessages[msgId]) {
                    if (timer) clearTimeout(timer);
                    if (bossInfo.templateId === 7000) {
                        isReversed = (bossHealth() < 0.5) ? true : false;
                        if (inSoulWorld) {
                            sendMessage(BossActions[7000][InversedAction[BossMessages[msgId]]].msg);
                        } else {
                            sendMessage(BossActions[7000][BossMessages[msgId]].msg);
                        }
                    }
                }
            });
	
            hook('S_QUEST_BALLOON', 1, (event) => {	
                if (!bossInfo) return;
                
                let msgId = parseInt(event.message.replace('@dungeon:', ''));
                if (BossMessages[msgId]) {
                    if (BossMessages[msgId].checkEnrage && isEnraged) {
                        if (BossMessages[msgId].msg) sendMessage(BossMessages[msgId].msg);
                    }
                }
            });
            
            hook('S_NPC_STATUS', 1, (event) => {	
                if (!bossInfo) return;                
                isEnraged = event.enraged;
            });
        }
    }
	
	function unload() {
		if(hooks.length) {
			for(let h of hooks) dispatch.unhook(h)

			hooks = []
		}
	}

	function hook() {
		hooks.push(dispatch.hook(...arguments))
	}
    
}
