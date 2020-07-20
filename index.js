const fetch = require ("node-fetch");
const mongoose = require('mongoose');

mongoose.connect('mongo db key', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('connected', ()=>{
  console.log("MONGOOSE CONNECTION ESTABLISHED!");
});

var postSchema = new mongoose.Schema({
  ups: Number,
  title: String,
  created_utc: Number,
  url: String,
  subreddit: String,
  rate: Number
});

var post = mongoose.model('Post', postSchema);

async function poster(){

    post.deleteMany({}, function(err){
      if(err) console.log(err);
    });

    let subredditList = [
      "announcements","funny","AskReddit","gaming","aww","pics","science","worldnews","Music","videos","movies","todayilearned","news","Showerthoughts","IAmA","gifs","EarthPorn","askscience","food","Jokes","explainlikeimfive","books","LifeProTips","Art","mildlyinteresting","DIY","sports","nottheonion","space","gadgets","television","Documentaries","photoshopbattles","GetMotivated","UpliftingNews","tifu","InternetIsBeautiful","history","philosophy","Futurology","dataisbeautiful","OldSchoolCool","WritingPrompts","personalfinance","nosleep","creepy","TwoXChromosomes","memes","technology","AdviceAnimals","Fitness","wholesomememes","politics","WTF","interestingasfuck","bestof","BlackPeopleTwitter","oddlysatisfying","travel","leagueoflegends","facepalm","me_irl","lifehacks","NatureIsFuckingLit","pcmasterrace","dankmemes","Tinder","Whatcouldgowrong","Minecraft","relationship_advice","BikiniBottomTwitter","trippinthroughtime","PS4","nba","AnimalsBeingBros","tattoos","woahdude","AnimalsBeingJerks","reactiongifs","FoodPorn","Overwatch","photography","PewdiepieSubmissions","Unexpected","relationships","dadjokes","boardgames","gardening","instant_regret","programming","mildlyinfuriating","atheism","pokemon","PublicFreakout","nextfuckinglevel","AnimalsBeingDerps","pokemongo","WatchPeopleDieInside","ContagiousLaughter","Damnthatsinteresting","gameofthrones","buildapc","europe","iphone","Games","drawing","Parenting","malefashionadvice","itookapicture","rarepuppers","YouShouldKnow","nonononoyes","loseit","BetterEveryLoop","Android","GifRecipes","CrappyDesign","Coronavirus","Wellthatsucks","AmItheAsshole","NintendoSwitch","slowcooking","soccer","xboxone","trashy",
      "woodworking","Eyebleach","EatCheapAndHealthy","confession","MakeupAddiction","cats","MadeMeSmile","offmychest","pcgaming","teenagers","AskMen","HighQualityGifs","IdiotsInCars","NetflixBestOf","RoastMe","Cooking","raspberry_pi","nfl","HumansBeingBros","ChoosingBeggars","HistoryPorn","hiphopheads","cars","blackmagicfuckery","streetwear","Roadcam","keto","MurderedByWords","rickandmorty","BeAmazed","DnD","cursedcomments","backpacking","recipes","insanepeoplefacebook","frugalmalefashion","OutOfTheLoop","biology","NoStupidQuestions","KidsAreFuckingStupid","Awwducational","MovieDetails","coolguides","horror","mac","dating_advice","socialskills","battlestations","therewasanattempt","WhitePeopleTwitter","scifi","nintendo","youseeingthisshit","whatisthisthing","electronicmusic","anime","HistoryMemes","entertainment","wow","nevertellmetheodds","howto","dogs","sex","FiftyFifty","DestinyTheGame","MealPrepSunday","natureismetal","bodyweightfitness","trees","blursedimages","apple","AskWomen","learnprogramming","madlads","StarWars","instantkarma","hmmm","Bitcoin","JusticeServed","zelda","PrequelMemes","camping","yesyesyesyesno","hearthstone","DunderMifflin","JUSTNOMIL","youtubehaiku","starterpacks","Design","unpopularopinion","DeepIntoYouTube","quityourbullshit","assholedesign","shittyfoodporn","rareinsults","comics","foodhacks","educationalgifs","likeus","femalefashionadvice","CozyPlaces","Sneakers","podcasts","iamverysmart","Astronomy","cursedimages","MemeEconomy","wallpaper","wallstreetbets","GamePhysics","thewalkingdead","legaladvice","FortNiteBR","AnimalCrossing","holdmycosmo","indieheads","Physics","tipofmytongue","writing","Frugal","literature","PeopleFuckingDying","CasualConversation","savedyouaclick","conspiracy",
      "JapanTravel","comicbooks","WeAreTheMusicMakers","hardware","baseball","comedyheaven","ATBGE","ProgrammerHumor","cringepics","ThriftStoreHauls","ArtefactPorn","entitledparents","thatHappened","breakingbad","math","PUBATTLEGROUNDS","niceguys","AskHistorians","hacking","progresspics","MMA","2meirl4meirl","HomeImprovement","SkincareAddiction","nasa","cringe","crafts","manga","4chan","holdmybeer","confusing_perspective","homestead","Rainbow6","GlobalOffensive","MaliciousCompliance","MachineLearning","ShittyLifeProTips","freefolk","CatastrophicFailure","spaceporn","technicallythetruth","Watches","meirl","UnethicalLifeProTips","investing","UnresolvedMysteries","meme","marvelstudios","insaneparents","CampingandHiking","Metal","changemyview","childfree","chemistry","iamatotalpieceofshit","DiWHY","southpark","AbandonedPorn","rpg","toptalent","CryptoCurrency","Health","bodybuilding","hockey","carporn","RoomPorn","solotravel","PoliticalHumor","Filmmakers","TIHI","greentext","google","KerbalSpaceProgram","classicalmusic","ProRevenge","MapPorn","gifsthatkeepongiving","oldpeoplefacebook","maybemaybemaybe","suggestmeabook","EDM","javascript","DoesAnybodyElse","apexlegends","formula1","hiking","DeepFriedMemes","softwaregore","techsupport","running","self","ShouldIbuythisgame","audiophile","iamverybadass","DesignPorn","somethingimade","powerwashingporn","Fantasy","AsianBeauty","nutrition","awfuleverything","SweatyPalms","WinStupidPrizes","HolUp","motorcycles","Justrolledintotheshop","OopsDidntMeanTo","LivestreamFail","specializedtools","ANormalDayInRussia","skyrim","ksi","compsci","fakehistoryporn","TooAfraidToAsk","BoneAppleTea","Animemes","fightporn","PornhubComments","Bossfight","Steam","privacy","pettyrevenge","truegaming","woooosh",
      "NoFap","talesfromtechsupport","TrueOffMyChest","SubredditDrama","antiMLM","MechanicalKeyboards","aviation","suicidebywords","evilbuildings","clevercomebacks","StardewValley","Python","holdmyfries","woof_irl","Guitar","shittyrobots","getdisciplined","theydidthemath","lego","combinedgifs","outside","raisedbynarcissists","SuddenlyGay","PraiseTheCameraMan","TalesFromRetail","PenmanshipPorn","goddesses","EngineeringPorn","CityPorn","Breath_of_the_Wild","IASIP","anime_irl","dontdeadopeninside","Memes_Of_The_Dank","wallpapers","StrangerThings","worldbuilding","sbubby","AMA","disneyvacation","agedlikemilk","gentlemanboners","notliketheothergirls","CasualUK","discordapp","guns","fantasyfootball","business","dndmemes","polandball","Piracy","brooklynninenine","cosplaygirls","LateStageCapitalism","offbeat","jailbreak","linux","blackpeoplegifs","malelivingspace","ihavesex","Terraria","lgbt","Patriots","indianpeoplefacebook","comedyhomicide","TikTokCringe","TheSilphRoad","PandR","Meditation","calvinandhobbes","kpop","seduction","Cele"
      ,"DecidingToBeBetter","Simulated","netflix","HumansAreMetal","Autos","spacex","ketorecipes","webdev","watchpeoplesurvive","delusionalartists","VALORANT","SquaredCircle","destiny2","australia","QuotesPorn","2007scape","SandersForPresident","IsItBullshit","BokuNoHeroAcademia","pussypassdenied","3Dprinting","shittymoviedetails","Cyberpunk","TumblrInAction","engrish","Amd","sysadmin","HadToHurt","2healthbars","TrueReddit","OnePiece","NoahGetTheBoat","vegan","AteTheOnion","NASCAR","shortscarystories","web_design","bestoflegaladvice","britishproblems","AmateurRoomPorn","ethereum","StockMarket","tennis","gamedev","h3h3productions","halo","FORTnITE","HongKong","antimeme","GoCommitDie","beermoney"
      ,"howtonotgiveafuck","LSD","lostredditors","startups","tooktoomuch","findareddit","productivity","IllegalLifeProTips","minimalism","AccidentalRacism","vinyl","techsupportgore","TwoSentenceHorror","youtube","TheMonkeysPaw","ABoringDystopia","Baking","Warframe","corgi","Advice","rimjob_steve","Celebhub","lotr","ClashRoyale","classicwow","CombatFootage","SCP","graphic_design","Bad_Cop_No_Donut","summonerschool","ThatLookedExpensive","gamernews","creepyasterisks","donthelpjustfilm","Instantregret","FIFA","RetroFuturism","everymanshouldknow","oddlyspecific","circlejerk","happy","doctorwho","Naruto","beer","magicTCG","MonsterHunterWorld","curlyhair","rage","Libertarian","puns","marvelmemes","cscareerquestions","ThingsCutInHalfPorn","Kanye","Brawlstars","MechanicAdvice","brasil","InternetStars","creepypasta","tf2","WatchandLearn","learnpython","finance","xxfitness","MonsterHunter","weed","badwomensanatomy","13or30","TrumpCriticizesTrump","Conservative","wholesomebpt","Chonkers","wikipedia","needadvice","dontyouknowwhoiam","community","pewdiepie","2busty2hide","civ","apolloapp","ffxiv","netsec","SequelMemes","Anxiety","AutoDetailing","BoJackHorseman","vexillology","FUCKYOUINPARTICULAR","1200isplenty","houseplants","france","Gamingcirclejerk","Botchedsurgeries","pathofexile","india","PropagandaPosters","outrun","rupaulsdragrace","patientgamers","Coffee","menwritingwomen","FashionReps","NoMansSkyTheGame","TalesFromYourServer","csgo","edmproduction","nvidia","SmashBrosUltimate","EscapefromTarkov","dndnext","cosplay","ActualPublicFreakouts","Breadit","ItemShop","MilitaryPorn","Neverbrokeabone","UnsentLetters","forwardsfromgrandma","borderlands3","godtiersuperpowers","Cursed_Images","selfimprovement","jobs","thedivision","UrbanHell",
      "wholesomeanimemes","darksouls3","serialkillers","jacksepticeye","Philippines","knitting","CallOfDuty","LucidDreaming","fo4","headphones","cyberpunkgame","StarWarsBattlefront","TheSimpsons","thesims","fasting","blackmirror","mallninjashit","cordcutters","playstation","PixelArt","r4r","povertyfinance","CrackheadCraigslist","AskCulinary","TrueCrime","DungeonsAndDragons","smallbusiness","DCcomics","whowouldwin","CODWarzone","homelab","engineering","vaxxhappened","DnDBehindTheScreen","RobinHood","musictheory","DnDGreentext","fatlogic","succulents","OnePunchMan","LeopardsAteMyFace","medicine","SelfAwarewolves","Stoicism","ufc","toastme","booksuggestions","college","MURICA","Thetruthishere","CitiesSkylines","NBA2k","batman","pyrocynical","unitedkingdom","PoliticalCompassMemes","TalesFromTheFrontDesk","IRLgirls","Borderlands","yoga","help","languagelearning","nhaa","btc","restofthefuckingowl","forhonor","Minecraftbuilds","submechanophobia","acturnips","Aquariums","StardustCrusaders","assassinscreed","thenetherlands","dbz","NeutralPolitics","sweden","PrettyGirls","realasians","DMAcademy","Warhammer40k","Psychonaut","EDC","PS5","gainit","skateboarding","options","InteriorDesign","ZeroWaste","drunk","ElderScrolls","elderscrollsonline","bisexual","darksouls","ireland","medizzy","whatsthisplant","RBI","de","shittyrainbow6","Catswhoyell","KitchenConfidential","GTAV","golf","adventuretime","Blackops4","quotes","lastimages","IllegallySmolCats","AAAAAAAAAAAAAAAAA","veganrecipes","deadbydaylight","stevenuniverse","COVID19","marketing","socialism","FortniteCompetitive","ComedyNecrophilia","bigtitsinbikinis","WorkOnline","architecture","TopMindsOfReddit","ClashOfClans","raimimemes","animegifs","Windows10",
      "dating","MensRights","DeadBedrooms","EngineeringStudents","fullmoviesonyoutube","Pizza","LadyBoners","ukpolitics","theyknew","Seaofthieves","Diablo","Military","blender","InsanePeopleQuora","Competitiveoverwatch","gundeals","LearnJapanese","fo76","actuallesbians","starcraft","tiktokthots","LiverpoolFC","GrandTheftAutoV","Buddhism","gaybros","UnsolvedMysteries","oculus","seriouseats","DataHoarder","learnart","arresteddevelopment","simpleliving","ArcherFX","socialanxiety","OTMemes","roosterteeth","coaxedintoasnafu","startrek","EntitledBitch","TrueFilm","HowToHack","reddeadredemption2","pennystocks","MemeTemplatesOfficial","japan","singapore","weightroom","sewing","fitmeals","unixporn","totalwar","StonerEngineering","reddevils","ShitAmericansSay","AppleWatch","datascience","london","Christianity","wokekids","mexico","fireemblem","WouldYouRather","newzealand","CODZombies","vegetarian","lakers","shrooms","Guildwars2","skyrimmods","Persona5","MakeNewFriendsHere","PokemonSwordAndShield","whatsthisbug","TalesFromTheCustomer","NintendoSwitchDeals","boomershumor","disney","ShingekiNoKyojin","stopdrinking","arduino","GooglePixel","PS4Deals","tattoo","askwomenadvice","Repsneakers","RimWorld","AskDocs","nyc","ethtrader","Battlefield","betterCallSaul","Doom","TrueAskReddit","OverwatchUniversity","LeagueOfMemes","Anticonsumption","torontoraptors","runescape","gamegrumps","geopolitics","webcomics","medicalschool","Ghosts","Nootropics","UFOs","mycology","Stellaris","Animesuggest","StreetFights","askgaybros","occult","answers","ifyoulikeblank","cookingforbeginners","offlineTV","ACQR","CrackWatch","Satisfyingasfuck","Iamactuallyverybadass","EliteDangerous","spotify","FinalFantasy","Idubbbz","TopGear","Seattle"
    ];

  let urls = [];

  for(let x=0;x<subredditList.length;x++){
    urls.push('http://www.reddit.com/r/' + subredditList[x] + '/.json?limit=50');
  }

    let requests = urls.map(url => fetch(url));

    Promise.all(requests)
    .then(responses => {
      return responses;
    })
    .then(responses => Promise.all(responses.map(r => r.json())))
    .then(dataset => {

      let posts = [];

      dataset.forEach(data => {
        data.data.children.forEach(post =>{
          posts.push({
            "ups": post.data.ups,
            "title": post.data.title,
            "created_utc": post.data.created_utc,
            "url": post.data.url,
            "subreddit": post.data.subreddit,
            "rate": post.data.ups/((Math.round((new Date().getTime()/1000)-post.data.created_utc)/60))
          });
        });
      });

      post.collection.insertMany(posts, function(err, docs){
        if(err) throw err;
        console.log("new data added!");
      });
    });
}

setInterval(function(){
  poster();
}, 120000);
