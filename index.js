module.exports = function DreadspireGuide(mod) {	
	const config = require('./config.json');
    const mapID = 9034;
        
    // BossAction[TempalateId][Skill]
    const BossActions = {
        // Akasha 
        1000: {
			enabled: config.boss1,
            1102: {msg: 'Spin', checkDouble: true, setting: "akashaSpin"}, // Charge attack
            1304: {msg: 'Backpedal + Spin', setting: "akashaBackpedalSpin"},         
            1105: {msg: 'Puke', setting: "akashaPuke"}, 
            1203: {msg: 'Sleep', setting: "akashaSleep"},
        },
        // Kaprima
        2000: {
			enabled: config.boss2,
            1101: {msg: 'Smash inc', setting: "kaprimaSmash"},
            1102: {msg: 'Spin', setting: "kaprimaSpin"},
            1105: {msg: 'Back spin', setting: "kaprimaBackSpin"}, // breath attack before backspin
            1107: {msg: 'Back', setting: "kaprimaBackStun"}, // stun
            1108: {msg: 'Front', setting: "kaprimaFront"},
//            1109: {msg: 'Back spin'}, // backspin as it's happening
            1110: {msg: 'Get Out', setting: "kaprimaGetOut"},
            1122: {msg: 'Get In', setting: "kaprimaGetIn"},
            1119: {msg: 'Leash', setting: "kaprimaLeash"},
        },
        // Dakuryon
        3000: {
			enabled: config.boss3,
            1112: {msg: 'Stab + Knockup'},
            1134: {msg: 'Debuff (closest)'},         
            1502: {msg: 'Pushback + Cage'}, 
            1130: {msg: 'Left swipe', func: dakuryonLeftSwipe}, 
            1131: {msg: 'Right swipe', func: dakuryonRightSwipe},
            1122: {isCage: true, cages: [PizzaOne, PizzaInner, PizzaOuter, PizzaTwo, PizzaLast], delay: 0}, 
            1123: {isCage: true, cages: [PizzaTwo, PizzaOne, PizzaOuter, PizzaInner, PizzaLast], delay: 200}, 
            1124: {isCage: true, cages: [PizzaInner, PizzaTwo, PizzaOne, PizzaOuter, PizzaLast], delay: 0}, 
            1127: {isCage: true, cages: [PizzaOne, PizzaTwo, PizzaInner, PizzaOuter, PizzaLast], delay: 200},
        },
        // Meldita
        4000: {            
			enabled: config.boss4,
            1102: {msg: 'Inner rings'},
            1103: {msg: 'Outer rings'},
            1107: {msg: 'Front'},
            1108: {msg: 'Lines', func: MelditaLines}, 
            1109: {msg: 'Single Laser'},
            1114: {msg: 'Secondary'},
            1205: {msg: '360 Laser + Worms'},
            1206: {msg: 'Triple Laser'}, 
            // TODO Specify who is targetted with single laser?
        },
        // Kelsaik
        5000: {
			enabled: config.boss5,
//            1101: {msg: 'Fire paw'},
//            1102: {msg: 'Ice paw'},
            1103: {msg: 'Tail'},
            1104: {msg: 'Ice', func: IceAoe},
            1105: {msg: 'Fire', func: FireAoe},
            1107: {msg: 'Double Paw'},
//            1108: {msg: 'Fire Backswing'
//            1109: {msg: 'Ice Backswing'},
//            1110: {msg: 'Fire paw 2'},
//            1112: {msg: 'Ice paw 2'},
            1118: {msg: 'Big Jump + Adds'},
            1119: {msg: 'Stun?'},
            1120: {msg: 'Stun'},
            1124: {msg: 'Small Jump', startTimer: true, delay: 25000, timerMsg: 'Small Jump soon...'},
        },
        // Ice Jinn
        5002: {
			enabled: config.boss5,
           3106: {func: JinnAttack},
        },
        // Fire Jinn
        5003: {
			enabled: config.boss5,
            3106: {func: JinnAttack},
        },
        // Krakatox
        6000: {
			enabled: config.boss6,
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
			enabled: config.boss7,
            1136: {msg: 'Claw'},
            1138: {func: BegoneRange}, // Begone
            1152: {msg: 'Stun + Back'},
            1154: {msg: 'Out + In', func: BegoneOutIn},
            1155: {msg: 'In + Out', func: BegoneInOut},
            1240: {msg: 'Donuts'},
            1401: {msg: 'plague/regress'},     // Shield normal to inverse
            1402: {msg: 'sleep'},              // Shield inverse to normal
            1701: {msg: "Back + Stab"},
            // Normal
            1901: {msg: '(Marks) Debuff (closest)',    next: 1905,    prev: 1903,   func: LaserStarNormal},
            1905: {msg: '(Circles) Spread',            next: 1903,    prev: 1901,   func: LaserStarNormal},
            1903: {msg: '(Bombs) Gather + cleanse',    next: 1901,    prev: 1905,   func: LaserStarNormal},
            // Inversed
            1902: {msg: '(Marks) Debuff (farthest)',   next: 1906,    prev: 1904,   func: LaserStarInverted},
            1906: {msg: '(Circles) Gather',            next: 1904,    prev: 1902,   func: LaserStarInverted},
            1904: {msg: '(Bombs) Gather + no cleanse', next: 1902,    prev: 1906,   func: LaserStarInverted},
        },
        // Desolarus
        8000: {
			enabled: config.boss8,
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
			enabled: config.boss9,
            1101: {func: DarkanLeftAuto}, //left hand auto, right hand out
            1102: {func: DarkanRightAuto}, //right hand auto, left hand out 
//            1103: {}, //left hand eviscerate slam, right hand out 
//            1104: {}, //right swipe
//            1105: {}, //right hand eviscerate uppercut
//            1106: {}, //right hand eviscerate slam, left hand out 
//            1107: {}, //left swipe
//            1108: {}, //left hand eviscerate uppercut
//            1109: {}, //left hand back attack
//            1110: {}, //right hand back attack
//            1111: {}, //spin,
//            1112: {}, //move back
//            1113: {}, //dash
            1114: {msg: 'Rake'},
            1115: {msg: 'Puddles', startTimer: true, delay: 55000, timerMsg: 'Puddles soon...'},
            1301: {msg: 'Shout', startTimer: true, delay: 55000, timerMsg: 'Shout soon...'},
            1302: {msg: 'Bomb'},
//            1303: {}, //drill
//            1304: {}, //up in air, swords orbiting (cage + donuts)
//            1305: {}, //descent from air
            1306: {msg: 'Ghost', startTimer: true, delay: 55000, timerMsg: 'Ghost soon...'},
            1401: {func: DarkanSwipeLeft}, // left crouch, right out
            1402: {func: DarkanSwipeRight}, // right crouch, right out
            // TODO spin messages
            /*
            left auto, right auto, left auto  -> random swing?
            right auto, left auto -> spin + right eviscerate + right uppercut?
            left evis + right uppercut, right evis + left uppercut => spin spin drill
            right evis = nothing?
            */
        },
        // Shandra Manaya
        10000: {
			enabled: config.boss10,
            1102: {msg: 'Donut'},
//            1103: {msg: 'Slap'},
//            1104: {msg: 'Jump'},  
//            1105: {msg: 'Metamorphic'}, // Front side
//            1106: {msg: 'Grenade'}, 
//            1107: {msg: 'Trample'},
//            1108: {msg: 'Flying'},
            1109: {msg: 'Puddle'},
            1111: {msg: 'Cage'}, 
            1112: {msg: 'Stand', startTimer: true, delay: 45000, timerMsg: 'Stand soon...'}, // every ~50s
//            1113: {msg: 'L-Metamorphic'}, //  Left side
//            1114: {msg: 'R-Metamorphic'}, // Right side   
            1115: {msg: 'Tail'},             
//            1201: {msg: 'Staggered'},
//            1202: {msg: 'Trample'},
            1203: {msg: 'Walk'}, 
            1204: {msg: 'Curl', startTimer: true, delay: 40000, timerMsg: 'Curl soon...'}, // every ~45s
//            1205: {msg: 'Dive'}, 
//            1206: {msg: 'Backstep'}, 
//            13??: {msg: 'Plague/regress', startTimer: true, delay: 55000, timerMsg: 'Plague/regress soon...'}, // Great ones, every ~60s
//            1305: {msg: 'Staggered'}, 
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
        9034901: {msg: 'FAST Swipe inc', checkEnrage: true}, // "I!"
//        9034902: {), // "Will!"
//        9034903: {), // "tear you apart!"
    };    
    
    const BossAbnormalities = {
        // Akasha
        90340105: {msg: 'Stun it!', startTimer: true, delay: 60000, timerMsg: 'Stun soon...'},
    };
    
    const Mobs = [
        { // Ice Jinn
            templateId: 5002,
            huntingZoneId: 434
        },
        { // Fire Jinns
            templateId: 5003,
            huntingZoneId: 434
        },
    ];
    
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
    const LakanLaserSafespots = [18, 54, 90, 126, 162, 198, 234, 270, 306, 342];
    const LakanLaserNormalDangerOne = [0, 72, 144, 216, 288];
    const LakanLaserInvertedDangerOne = [36, 108, 180, 252, 324];
    
    // Desolarus adds
    const NpcSpawns = {
        8100: {msg: 'Curses'}, // Rokdos
        8200: {msg: 'Yellow Circles + Carpet'}, // Viyor
        // Alternative: Use QuestBalloon instead of SpawnNPC?
    }
   
	let hooks = [],
        enabled = config.enabled,
        insidemap = false,
        streamMode = config.streamMode,
        bossInfo = undefined,
      //  timer = undefined, 
        timers = {},
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
        isEnraged = false, 
        currentMobs = [];        
            
    mod.command.add('ds', (arg) => {

        if (arg === undefined) {
            mod.settings.enabled = !mod.settings.enabled;
            mod.command.message(enabled ? 'Enabled' : 'Disabled');
        }
        else if(arg.toLowerCase() === "off")
        {
            mod.settings.enabled = false;
            mod.command.message(enabled ? 'Enabled' : 'Disabled');
        }
        else if(arg.toLowerCase() === "on")
        {
            mod.settings.enabled = true;
            mod.command.message(enabled ? 'Enabled' : 'Disabled');
        }
        else if(arg.toLowerCase() === "stream")
        {
            mod.settings.streamMode = ! mod.settings.streamMode;
            mod.command.message('Stream Mode: ' + (mod.settings.streamMode ? 'Enabled.' : 'Disabled.'));
        }
        mod.saveSettings();
    });
    
    mod.game.me.on('change_zone', (zone, quick) => { 
        if (zone === mapID) {
            if (!insidemap) mod.command.message('Welcome to Dreadspire');
            insidemap = true;
            load();
        } else {
            insidemap = false;
            unload();
        }
    })
    
	function sendMessage(msg) {
        if (!enabled) return;
        
		if(config.streamMode) {
			mod.command.message(msg);
		} else {
			mod.send('S_CHAT', 1, {
                channel: 21, //21 = p-notice, 1 = party
                authorName: 'DG-Guide',
                message: msg
			});
		}
	}
    
    function bossHealth() {
        return bossInfo.curHp / bossInfo.maxHp;
    }
	
	function startTimer(message, delay, id = 'default') {
        if (timers[id]) clearTimeout(timers[id]);
        timers[id] = setTimeout(() => {
			sendMessage(message);
			timers[id] = null;
		}, delay);	
        
		// if (timer) clearTimeout(timer);
		// timer = setTimeout(() => {
			// sendMessage(message);
			// timer = null;
		// }, delay);	
	}

	function SpawnFlower(position, despawnDelay = 1200, collectionId = 559){
        if (config.streamMode) return;
		if (!config.showSignsAndFlowers) return;
        
		mod.send('S_SPAWN_COLLECTION', 4, {
			gameId: flowerId,
			id: collectionId,
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
        mod.send('S_DESPAWN_COLLECTION', 2, {
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
    
    // Dakuryon 
    function dakuryonLeftSwipe() {
		// danger zone
        for (let i = 0; i < 12; i++ ) {
            SpawnFlower(SpawnLoc(90, 100*i));
        }	

		// safespots
        // for (let i = 1; i < 3; i++) {
            // SpawnFlower(SpawnLoc(240,100*i));
            // SpawnFlower(SpawnLoc(265,100*i));
            // SpawnFlower(SpawnLoc(270,100*i));
            // SpawnFlower(SpawnLoc(285,100*i));
            // SpawnFlower(SpawnLoc(300,100*i));
        // }

    }
    function dakuryonRightSwipe() {
		// danger zone
        for (let i = 0; i < 12; i++ ) {
            SpawnFlower(SpawnLoc(270, 100*i));
        }		
		
		// safespots
        // for (let i = 1; i < 3; i++) {
            // SpawnFlower(SpawnLoc(60,100*i));
            // SpawnFlower(SpawnLoc(75,100*i));
            // SpawnFlower(SpawnLoc(90,100*i));
            // SpawnFlower(SpawnLoc(105,100*i));
            // SpawnFlower(SpawnLoc(120,100*i));
        // }
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
                SpawnFlower(SpawnLoc(15,175), 1600);
                SpawnFlower(SpawnLoc(105,175), 1600);
                SpawnFlower(SpawnLoc(195,175), 1600);
                SpawnFlower(SpawnLoc(285,175), 1600);
            } else {
                SpawnFlower(SpawnLoc(45,175), 1600);
                SpawnFlower(SpawnLoc(75,175), 1600);
                SpawnFlower(SpawnLoc(135,175), 1600);
                SpawnFlower(SpawnLoc(165,175), 1600);
                SpawnFlower(SpawnLoc(225,175), 1600);
                SpawnFlower(SpawnLoc(255,175), 1600);
                SpawnFlower(SpawnLoc(315,175), 1600);
                SpawnFlower(SpawnLoc(345,175), 1600);
            }
        }, delay);
	} 
    
    // Meldita
    function MelditaLines() {        
        for (let i = 1; i < 6; i++) {
            SpawnFlower(SpawnLoc(0, i*50), 1500, 556);
            SpawnFlower(SpawnLoc(0, i*-50), 1500, 556);
        }
    }
    
    // Kelsaik
    function IceAoe() {
        for (let degree = 0; degree < 360; degree += 360 / 36) {
            SpawnFlower(SpawnLoc(degree,450), 5000, 556);
        }
    }
    function FireAoe() {
        for (let degree = 0; degree < 360; degree += 360 / 36) {
            SpawnFlower(SpawnLoc(degree,250), 2000, 556);
        }
        
        SpawnFlower(SpawnLoc(0,500), 5000, 556);
        SpawnFlower(SpawnLoc(180,500), 5000, 556);
        SpawnFlower(SpawnLoc(50,480), 5000, 556);
        SpawnFlower(SpawnLoc(-50,480), 5000, 556);
        SpawnFlower(SpawnLoc(130,480), 5000, 556);
        SpawnFlower(SpawnLoc(-130,480), 5000, 556);
    }
    function JinnAttack() {
        for (let i = 1; i < 10; i++) {
            SpawnFlower(SpawnLoc(0, i*50), 2500, 556);
        }
    }
    
    // Lakan safespots
    function BegoneRange() {
        for (let degree = 0; degree < 360; degree += 360 / 20) {
            SpawnFlower(SpawnLoc(degree,250), 6000, 556);
        }
    }
    function BegoneInOut() {
        //for (let degree = 0; degree < 360; degree += 360 / 60) {
        //    SpawnFlower(SpawnLoc(degree,100), 3000);
        //}
    }
    function BegoneOutIn() {
        //for (let degree = 0; degree < 360; degree += 360 / 45) {
        //    SpawnFlower(SpawnLoc(degree,400), 3000);
        //}
    }
        
    function LaserStarNormal() {
        for (let i = 0; i < LakanLaserSafespots.length; i++) {
            SpawnFlower(SpawnLoc(LakanLaserSafespots[i], 450), 5000)
        }
        for (let i = 0; i < LakanLaserNormalDangerOne.length; i++) {
            for (let radius = 100; radius < 1000; radius += 50) {
                SpawnFlower(SpawnLoc(LakanLaserNormalDangerOne[i], radius), 2500, 556);
            }
        }
    }
    function LaserStarInverted() {
        for (let i = 0; i < LakanLaserSafespots.length; i++) {
            SpawnFlower(SpawnLoc(LakanLaserSafespots[i], 450), 5000)
        }
        for (let i = 0; i < LakanLaserInvertedDangerOne.length; i++) {
            for (let radius = 100; radius < 1000; radius += 50) {
                SpawnFlower(SpawnLoc(LakanLaserInvertedDangerOne[i], radius), 2500, 556);
            }
        }
    }
    
    // Darkan
    function DarkanLeftAuto() {
        // if lastSkill was not a right auto
//        if (![1102, 2102].includes(lastSkill)) sendMessage('Single Swipe');
        if (![1102].includes(lastSkill)) sendMessage('Swipe inc');
    }
    function DarkanRightAuto() {
        // if lastSkill was not a left auto
        if (![1101, 2101].includes(lastSkill)) sendMessage('Spin');
    }
    function DarkanSwipeLeft() {
        SpawnFlower(SpawnLoc(240,100));
        SpawnFlower(SpawnLoc(265,100));
//        SpawnFlower(SpawnLoc(270,100));
        SpawnFlower(SpawnLoc(285,100));
        SpawnFlower(SpawnLoc(300,100));
        
        for (let i = 0; i < 12; i++ ) {
            SpawnFlower(SpawnLoc(270, 100*i), 1500);
        }
    }
    function DarkanSwipeRight() {
        // if lastSkill was not a swipe and not an uppercut
//        if (![1105, 1108, 1104, 1107, 2105, 2108, 2104, 2107].includes(lastSkill)) sendMessage('Spin Spin Drill');
//        else {
            SpawnFlower(SpawnLoc(60,100));
            SpawnFlower(SpawnLoc(75,100));
//            SpawnFlower(SpawnLoc(90,100));
            SpawnFlower(SpawnLoc(105,100));
            SpawnFlower(SpawnLoc(120,100));

            for (let i = 0; i < 12; i++ ) {
                SpawnFlower(SpawnLoc(90, 100*i), 1500);
            }
//        }
    }
    
    // Hooks
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
                    //if (timer) clearTimeout(timer);
                    for (timer in timers) {
                        clearTimeout(timer);
                    }
                    timers = {};
                    playerDebuffs = [];
                    flowerId = 999999999;
                    bossHpWarningsNotified = [];
                }
            });
            
            hook('S_ACTION_STAGE', 8, (event) => {         
                if (!bossInfo) return;
                /* KLUDGE: Unable to find uint64 in array with .includes() ??? Converting to string for comparison atm...  */
                //if (!mod.game.me.is(event.gameId) && !currentMobs.includes(event.gameId.toString())) return;  
                if (!BossActions[event.templateId]) return;
                if (event.stage != 0) return;

                
                let bossAction = BossActions[event.templateId][event.skill.id];
                if (!bossAction) bossAction = BossActions[event.templateId][event.skill.id - 1000]; // check if skill is enraged
                
                if (bossAction) 
                {
					if (!BossActions[event.templateId].enabled) return;
					
                    bossLoc = event.loc;
                    bossLoc.w = event.w;
                    
                    // Double attacks into something
                    if (bossAction.checkDouble) {
                        if (event.skill.id === lastSkill) {
                            sendMessage(bossAction.msg);
                            lastSkill = undefined;
                        } else {
                            lastSkill = event.skill.id;
                        }
                        return;
                    }
                    // Dakuryon cage
                    if (bossAction.isCage) {
                        setTimeout(()=> {
                            for(let i = 0; i < bossAction.cages.length; i++) {
                                if (playerDebuffs[i]) bossAction.cages[i](playerDebuffs[i], PizzaSliceDelay * i);
                            }
                        }, bossAction.delay);
                    }
                    if (bossAction.startTimer) startTimer(bossAction.timerMsg, bossAction.delay);
                    if (bossAction.func) bossAction.func();
                    if (bossAction.msg) sendMessage(bossAction.msg);
                    
                    // Lakan stuff
                    if (bossInfo.templateId === 7000) {
                        let nextMessage;
                        if (event.skill.id == 1401 || event.skill.id == 2401) {                              // normal to inverse aka soul world
                            inSoulWorld = true;
                            if (lastNextAction) {
                                nextMessage = BossActions[7000][InversedAction[lastNextAction]].msg;
                                startTimer('Next: ' + nextMessage, LakanNextMessageDelay, 'Lakan');
                            }
                            lastInversionTime = Date.now();
                            shieldWarned = false;
                        } else if (event.skill.id == 1402 || event.skill.id == 2402) {                       // inverse to normal
                            inSoulWorld = false;
                            if (lastNextAction) {
                                nextMessage = BossActions[7000][InversedAction[lastNextAction]].msg;
                                startTimer('Next: ' + nextMessage, LakanNextMessageDelay, 'Lakan');
                            }
                            lastInversionTime = Date.now();
                            shieldWarned = false;
                        } else if (!isReversed && bossAction.next) {                                         // normal "next"
                            nextMessage = BossActions[7000][bossAction.next].msg;
                            startTimer('Next: ' + nextMessage, LakanNextMessageDelay, 'Lakan');
                            lastNextAction = bossAction.next;
                        } else if (isReversed && bossAction.prev) {                                          // reversed "next"
                            nextMessage = BossActions[7000][bossAction.prev].msg;
                            startTimer('Next: ' + nextMessage, LakanNextMessageDelay, 'Lakan');
                            lastNextAction = bossAction.prev;
                        }
                    }
                    
                }
                lastSkill = event.skill.id;
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
                else if(mod.game.me.is(event.target)) {
                //else if (event.target.equals(gameId)) {
                    if (bossInfo.templateId === 3000) {
                        if (DakuryonDebuffTake.includes(event.id) || DakuryonDebuffSkip.includes(event.id))
                            playerDebuffs.unshift(event.id);
/* 
                        if (DakuryonDebuffTake.includes(event.id)) dakuryonDebuffMessage = 'Take ' + dakuryonDebuffMessage;
                        else if (DakuryonDebuffSkip.includes(event.id)) dakuryonDebuffMessage = 'Skip ' + dakuryonDebuffMessage;
                        else return;
                        
                        if ([90340306, 90340307].includes(event.id)) {
//                            sendMessage(dakuryonDebuffMessage);
                            dakuryonDebuffMessage = '';
                        }
 */
                    }
                }
            });
	
            hook('S_DUNGEON_EVENT_MESSAGE', 2, (event) => {	
                if (!bossInfo) return;
                
                let msgId = parseInt(event.message.replace('@dungeon:', ''));
                if (BossMessages[msgId]) {
                    for (timer in timers) {
                        console.log('clearing lakan timer');
                        clearTimeout(timer);
                    }
                    
                    
                    if (bossInfo.templateId === 7000) {
                        lastNextAction = undefined;
                        isReversed = (bossHealth() < 0.5) ? true : false;
                        if (inSoulWorld) {
                            sendMessage('Next: ' + BossActions[7000][InversedAction[BossMessages[msgId]]].msg);
                        } else {
                            sendMessage('Next: ' + BossActions[7000][BossMessages[msgId]].msg);
                        }
                    }
                    else if (bossInfo.templateId === 9000) {
                        if (BossMessages[msgId].checkEnrage && isEnraged) {
                            if (BossMessages[msgId].msg) sendMessage(BossMessages[msgId].msg);
                        }
                    }
                }
            });
	
/*     
            hook('S_QUEST_BALLOON', 1, (event) => {	
                if (!bossInfo) return;
                
                let msgId = parseInt(event.message.replace('@monsterBehavior:', ''));
                if (BossMessages[msgId]) {
                    if (BossMessages[msgId].msg) sendMessage(BossMessages[msgId].msg);
                }
            });
*/
            
            hook('S_NPC_STATUS', 1, (event) => {	
                if (!bossInfo) return;                
                isEnraged = event.enraged;
            });
            
            
            hook('S_SPAWN_NPC', 8, event => {
                if (!bossInfo) return;
                                
                if  (bossInfo.templateId == 5000) {
					if (!BossActions[5000].enabled) return;
                    for (let i = 0; i < Mobs.length; i++) {
                        if(Mobs[i].templateId == event.templateId && Mobs[i].huntingZoneId == event.huntingZoneId) {
                            currentMobs.push(event.gameId.toString());
                        }                                        
                    }  
                }   
                else if (bossInfo.templateId == 8000) {
					if (!BossActions[8000].enabled) return;
                    if (NpcSpawns[event.templateId]) {
                        sendMessage(NpcSpawns[event.templateId].msg);
                    }
                }
                
             
                
            });
            
        }
    }
	
	function unload() {
		if(hooks.length) {
			for(let h of hooks) mod.unhook(h)

			hooks = []
		}
	}

	function hook() {
		hooks.push(mod.hook(...arguments))
	}
        
}
