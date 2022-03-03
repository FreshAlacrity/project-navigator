function checkFor(terms) {
  let results = {}
  let titlesDict = stored._IDs_by_title
  let idsDict = stored._projects_by_ID
  if (idsDict.hasOwnProperty(terms)) {
    // exact ID match
    results[terms] = 1
  } else if (titlesDict.hasOwnProperty(terms.toLowerCase())) {
    // exact title or alias match
    results[titlesDict[terms.toLowerCase()]] = 1
  } else {
    // todo find best match
    //log(`no direct match for '${terms}'`)
    
  }
  return results
}


function testSearch() {
  function exampleNames() {
    let testSet = `Scalable Vector Graphics, SVG Collection Preview, Tarot, JavaScript, Short Bio(s), Dashboard, Force Directed Graphs, Project Board, Project Name Generator,  Single Project Popup View, Style and Process Manual, Google Sheets Butler, SVG Collection Preview, Demo: Bulleted Notes App, Template Design Brief, Project Navigator, Project Navigator, Education, , GitHub, Programming Methodology, GitHub Actions, Circular Pips, Body Map, Chiptune Music Composer, Intuitive Eating, Ice Cream and Other Staple Foods, Accessibility in Web Design, Rod for Kimono Top, Culinary Science/Food Chemistry, Sponsorship, Products, Force Directed Graphs, Font Explorer, Fullscreen SVG Template, Work In Progress Banner, Open Source Banner, Force Directed Graphs, Relationship Anarchy, Auto Flowcharts, Project Web, Self Care, Pico-8, Demo: Mosaic Builder, Collaboration, Code Demos, Demo: Orbit Transfers, Birthday Cards, Minecraft, Collaboration, Fullscreen SVG Template, Function: Data to Tree Structure, Bookmarks, Fullscreen SVG Template, Demo: Controls, Project Flags, Fiber Art, Generative Illustration, Deaf/Hard of Hearing, Languages, Reviews, Inspiration, Minecraft, Templates, Templates, Logo Design Preview Materials, Mechanics of Fish Locomotion, Tracking & Analytics, Finance, Pet Games, Recurring Time Blocks, Process, Political Manifesto, Personal Values, Dynamic Quotations, Relationships, Personal Vision, Relationships, Healthcare, Print Materials, Logo, Technomancy, Game Components, Fullscreen SVG Controls, Code Demos, Web Audio API Demo, Template, Evaluating Actions, Demo: Basic Menu, Music Theory, Graphic Design, Fearless Financial Gain, Dynamic 3D for SVG, Toki Pona, Dice/Globe Explorer in SVG, Fitness, Spaceblock, Generative Music, Rectangle Packing, Intuitive Eating, Nutrition Calculator, Culinary Science/Food Chemistry, Coffee, Tea, Scheduling, SVG Icon Editor, Timeline/History, Open Source Software, Collaboration, Alacrity Mini Library, GitHub Sponsors, Tea Flowchart, Function: Data to Tree Structure, Demo: Falling Particles, Infographics, Biology, Sigils, Knots, Sigils, Magic Square Based Sigil Generator, UI Elements, Personal Values, Game Design, Inspiration, How to Read Tea Leaves, Generative Illustration, Evaluating Actions, Political Manifesto, Graph Theory, Polycule, Travel Plans, Graphic Design, Logos, Aesthetic/Design Choices Slides, Program Page Arrangement, Distribution is Normal, Emotion Grid, In This Together Staff Fund, Logo Adopt - Crossed Scalpels, Products, Website, Radial Selection Menu, Demo: Basic Menu, SVG Icon Repository, Programming, House Stars Quick Add, Project Logs, SVG Flower Generator, Personal Vision, Relationships, Demo: Color Functions, The Ideal Client, Games, Demo: Keyboard Input Detection, Tracking Time Use, Slime Animations, Settings Menu, Style and Process Manual, Personal Values, Scheduling, The Ideal Client, Comparisons, Rest Activities, Self-Assessment, Personal Vision, Glossary, Evaluating Actions, Style and Process Manual, Typography, Human Mediated Sort Function, Typing Game, Dynamic Nested Circles, Origami 3D Models, Tea Leaves, Project Navigator, Website Reboot, House Stars Quick Add, Design/Infographics Posters, Libraries, Illustration, Chiptune Music Synthesizer, Auto Flowcharts, Tea, Interests, Force Directed Graphs, Assets, Body Modification, Occult, Edible and Medicinal Plants, Fullscreen SVG Template, Settings Menu, Game Components, JavaScript, File Export, Modules, Typography, Code Editors, Code Demos, Hydrodynamics, Graphic Design Portfolio, Nutrition, Demo: Loading Data from Google Sheets, Collaboration, Making a Living, Amazon Shops, Day Planner, Evaluating Actions, Week Planner, Day Planner, Wheel of the Year, Budgeting, Google Sheets Butler, localForage, Demo: Circular Rope, Style and Process Manual, Design Process Illustration, Auto Flowcharts, Tidbits Bot, Web APIs, All My Things, Digital Postcards, Needs/Wants/Desires, Style and Process Manual, Reviews, Tea, Flavor Wheel, Drafting/3D Design, Non-Profit Organizations, Human Sexuality, Dynamic SVG Tribute to Theo Van Doesburg's Alphabet, Force Directed Graphs, Function: Data to Tree Structure, Tea Flowchart, Coffee Preparation, Datavis, Workspace, Pet Games, Genetic Algorithm, Maze Algorithms & Pathfinding, Slime48, Coffee, Energy Work, Illustration, Design/Infographics Posters, Inspiration, Design Heroes, Font Biographies, Drawing, Google Drive Storage Analysis, Demo: Controls, Demo: Eisenhower Matrix, Project Navigator, Flexible Board Layout, Function: Data to Tree Structure, Homestars, Radial Alphabet, STL, Fullscreen SVG Controls, Demo: Basic Menu, Micronutrient Data Explorer, Meal Planning, UX Design, SVG Collection Preview, Origami, Magic Square Based Sigil Generator, Games, Game Development, Modules, Applied Mathematics, Wandering Library Online, Health, Deaf/Hard of Hearing, Tea, Reviews, Fursona Illustrations, Ethical Consumerism, Amazon Wishlists, Systems Analysis, Dashboard, Function: Data to Tree Structure, Psychology, Design, Grant Illustrations, Biomimetics, Algorithms, Graphs and Charts Infographic, Economics, Auto Flowcharts, Geneology, Languages, Architecture/Drafting, Barcode Breeding, Genetics, Latin, SVG Icon Editor, SVG Isometric Terrain Assets, Sitelen Telo Leko, Radial Alphabet, Mindfulness, Journaling, Personal Vision, Anti-Racism, Tax Reform, Automation, Carbon Rebate, Global Citizenship, open borders, the Fifth Amendment, Ethical Consumerism, Evidence Based Policy, Restorative Justice, Kid-Powered Education, Apollo 1201, Encryption for Everyone, Human Rights, Legalizing Drugs, Genetic Engineering, Desktop Publishing Final, Timeline/History, Web Design, External Libraries, Bedroom Congestion, SVG Isometric Terrain Assets, Logos, Algorithms, I Ching Casting, Tarot, Glowrunes, Finance, Statistical Analysis, Infographics, Research, Data, Datavis, Intuitive Data Analysis, Infographics, Mental Health, Preventive Medicine, Statistical Analysis, Game Mechanics, Software Development, Video Games, Psychology, Gamification, Genetic Engineering, BIRCHW Grant Application Illustrations, Typography, Try Lunacy, Graphic Design Portfolio, Positive Psychology, Consent Ethics, Mechanics of Fish Locomotion, Physics, Graphic Design, Illustration, Grant Illustrations, Infographic: The inner life of whips, Slavery in US History Infographic, Graphs and Charts Infographic, Design/Infographics Posters, Alcohol and Reproduction Diagram, Concepts Infographics, Conceptions by the Numbers Diagram, Training Programs Timeline, The Future of Science Without Funding, License Comparison Infographic, Impact of NIH Research Infographic, Impact of NIH Research (Version 2), Pass Along Project Diagram, Design Process Illustration, Data Architecture, Datavis, Force Directed Graphs, Infographics, Alacrity Mini Library, Programming, Evaluating Actions, Healthy Social Life, Food Preparation/Service, Mindfulness, Health, Psychology, Spaceblock, Plant Alchemy Datapack, Gliders Datapack, Video Games, Circle of Fifths, Volunteering, Ethics/Moral Philosophy, Demo: Bulleted Notes App, Style Manual, Project Navigator, Google Drive, CodePen, Gravit, Tea, CodePen, Amazon Shops, Project Navigator, Zazzle, How to Read Tea Leaves, Graphic Design, Hiring: Marketing Assistant, Patreon, Project Sponsorship, Marketing, CV/Resume, Dev Vlog, Fiverr, Signature, Monetization, Healthcare, Growth Mindset, Design Process, Policy, Growth Mindset, Problem Solving, Process Thinking, Process, Behavioral Modification, Counseling, Healthcare, Politics, Research, Principles of App Development, Programming Methodology, Policy, Datavis, Factor Analysis, Risk Assessment, Sustainable Design, Policy, Textiles, Sustainability, Architecture, Process Thinking, Technomancy, Illustration, Automation, Programming, Template Design Brief, Fullscreen SVG Template, Multi-Format Mockup Preview, Style and Process Manual, Programming Methodology, Unit Testing, Graphic Design Portfolio, Marketing, Graphic Design, Font Explorer, Font Biographies, Homage to Monoid, Dynamic SVG Tribute to Theo Van Doesburg's Alphabet, Radial Alphabet, Cheat Sheet: UI Elements, UI Concept: Color a Day Journal, Alacrity UI Elements, Demo: Bubbles, Tea Leaves, Games, Game Design, Game Development, Slime48, As If You Were Freelancing, Typing Game, Minecraft, Pocket Garden, The Refriendery, Round Pong Game Concept, Game Reviews Notebook, Pet Games, Cloud Bouncer, Soft Snake, Tetris Clone, Pico-8, Inform 7, Demo: Bulleted Notes App, Homestars, Magic Square Based Sigil Generator, Dashboard, Demo: Pixel Art Editor, Business Idea Web App, Skill Match - Find Collaborators, Browser Based Code Editor, Gmail App, "hello, I'm ______ and I exist!" digital sticker board, Auto Flowcharts, Query, Research, Writing, Chat Bots, Chronic Illness, Space Colonization, Planning, Policy, Inspiration, Reading, Video Games, Shipping, Languages, Mental Health, Calligraphy for Magic Square Poetry in Toki Pona, Sitelen Telo Leko, Toki Pona Lowen Isun/Lorem Ipsum, Tone Based 'Alphabet' for Toki Pona, Toki Pona Flashcards, Toki Pona Dictionary, Tracking Time Use, Statistical Analysis, UI Concept: Color a Day Journal, Self-Assessment, Behavioral Biology, Microbiology, Biomimetics, Buy Me a Coffee, Research, Machine Learning, Growth Mindset, Problem Solving, Pet Games, Game Design, Apps Script, Evaluating Actions, Algorithms, Applied Mathematics, Design, Systems Thinking, Architecture/Drafting, Teaching, History, Color Scheme for Code Editing, Browser Based Code Editor, Programming, Visual Studio Code, Presence, Zazzle, Clothing Design, Oversized Patches, Organizing Digital Assets, Multivote Poster Design, Origami 3D Models, Anatomy of a Pop Can, Concepts Poster Series, Dynamic Inline SVG Music Notation, Chord Decoder, Circle of Fifths, Sound Visualizations Demo, Drumming, Background Music Generator, Mini Music, JS Drumkit, Envelope/Instrument Editor, Chiptune Music Synthesizer, Music Player, Playlist Constructor, Synthesizer Functions, Natural Sciences, Cities, Communication, Evidence Based Policy, Engineering, Queer Active Chair User Pride Design, Platonic Stickers, Zazzle, Button: Do You Even Macro, Love In Your Chair Sticker Design, UM Lambda Shirt Design, T-shirts that tell people I do graphic design?, T-shirt: Vampires Anonymous, Gender Blender Event Logo, T-Shirt: Write-In Trans Agenda, T-shirt: trust me, I have a spreadsheet, T-shirts that tell people I do graphic design?, Vermont Frontier Nursing, T-Shirt: Rugby Bree, Faux Pocket Shirts, Demo: Color Functions, Round Pong Game Concept, Electrolysis, Gibbous Muroidea, Plague Doctor, Bedroom Congestion, Home Rescue, Homestars, Matrix Operations, Graph Theory, Relationship History, Needs/Wants/Desires, Healthy Social Life, Communication, Polycule, Crystals, Rocks & Ice, Coral Varieties, Coffee Cups from A to Z, Illustration, Illustrate old lampposts, Vector Illustrations of Vehicles, Tea, Wandering Library Online, Botanical Posters, Flavor Wheel, Style and Process Manual, Alacrity Game Design Manual, Accessibility, Programming, Statistical Analysis, Hiring: Marketing Assistant, Strategies for Procrastination Document, Pomodoro Timer, Daily Tasks Sidebar, Time, Autism Spectrum Speed Dating Event Packet, Manicure/Pedicure, Writing, UI, UX Design Principles, UX Design Fundamentals, UX Design Samples, Origami Crane, Tarot, SVG Media: Pencil, Gesture Drawing, Demo: Alchemical Chocolate Chip Cookie Recipe, Minimalist Animal Posters, Plague Doctor, Fursona Illustrations, Fursona Icons, Anatomical Studies, Rainbow T-Rex Emoji, Hero Portraits, Expressions, Generative Illustration, Relationships, Marketing, Relationship Skills, Compassionate Communication, Google Drive, Fursona Adopts, Small Bird, Bird at Dusk, Gazing Bird, Window Bird, Character Reference, Gibbous Muroidea, Climate, RGB Tam Tam, Barcode Breeding, Bodyweight Exercises, Dancersize, Dance, Health, Demo: Dungeon Generation Algorithm, Algorithms, Game Components, Graph Theory, Projects Backend, Demo: Loading Data from Google Sheets, Dragonfox Household, Style and Process Manual, Project Navigator, Bookmarks, Bookmarks Visualization, URL Parameters Demo, Demo: Loading Data from Google Sheets, Parallax Demo, SVG Iso Board Demo, Word Cloud Generator, Web Audio API Demo, JavaScript Sandbox, Color Scheme Preview, Demo: Local and Session Storage, Radial Selection Menu, Dynamic Styling, Dynamic Nested Circles, Rectangle Packing, Algorithms, Flexible Board Layout, Dice/Globe Explorer in SVG, Circular Pips, American Sign Language, Latin, French, German, UX Design, UI, First Aid, Code Editors, Project Sigils, Policy, Carbon Rebate, Compassionate Communication, Posture, Web Apps, Demo: Falling Particles, SVG Media: Ink, Demo: Infinite Jars, Demo: Biomimetic Fish Animation, Repeating Vector Patterns, Animated SVG Sparkle, SVG Flower Generator, Dynamic Ribbons, Mental Health, Nutrition, Programming Methodology, JavaScript, Apps Script, Space Colonization, Policy, Global Citizenship, Staying Informed, Design, Demo: Dungeon Generation Algorithm, Style and Process Manual, Strategies for Procrastination Document, Policy, Design, Accessibility in Web Design, Now With More, Project Name Generator, Bookmarks, Interests, Dynamic Quotations, Watchlist, Buddhism, Meditation, Robotics/Automation Engineering, Machine Ethics, Dynamic 3D for SVG, Print Function for Inline SVGs, Data Access Module, Function: Data to Tree Structure, SVG Function Library, Code Demos, Alacrity Mini Library, Work In Progress Banner, Global Citizenship, Clothing & Style, Google Sheets Butler, Textiles, Dev Vlog, Watch List, Inspiration, Google Sheets Butler, Project Navigator, Income Documentation, Fearless Financial Gain, Visual Budget, Ice Cream and Other Staple Foods, Budgeting, Game Development, Slime animations, Ink Slimes, Alecubies, Chiptune Music Composer, Game Shell/Engine/Framework, SVG Isometric Terrain Assets, Monetization, Algorithms, Style and Process Manual, Tidbits Bot, Resource and Utility Link Documents, Style and Process Manual, Shipping, Workspace, Inspiration, Evaluating Actions, Inspiration, Ethics/Moral Philosophy, Martial Arts, Healthcare, Herbalism, Biology, Fitness, Geology, Biology, Astronomy, Physics, Zen Buddhism, Landscaping, Economics, Worker Co-Ops, Coffee Preparation, JavaScript, Web Design, Apps Script, Demo: Biomimetic Fish Animation, Biomimetics, Psychology, Harm Reduction (Substance Use Policy), Political Manifesto, Neuroscience, Personal Values, Aesthetics, Global Citizenship, Social Justice, Perspective, Programming Methodology, Flowcharts, Clothing Design, Crafts, Culinary Science/Food Chemistry, Food Preparation, A Day of Perfect Meals, Grocery Shopping List Generator, Health, Career Development, Interactive Datavis, Housing Design, Machine Learning, Physics, Astronomy, Microbiology, Biology, Genetic Engineering, Microbiology, Engineering, Crafts, Body Map, Piercings, Marketing, Mobius Logo, Comparative Religion, Entrepreneurship, Resource and Utility Link Documents, Life Coaching, Career Growth, Making a Living, Life Coaching, Telegram Tidbit Bot, Wandering Library Discord Bot, Sigil Bot, Engineering, Chemistry, Homemaking, Cities, JavaScript, Python Script to Deduplicate Google Drive Files, Communication, Relationships, Compassionate Communication, Strategic Planning, Gardening, Negotiation, Business, Grammar, Homemaking, Design, Sewing, Restorative Justice, Baking, Cooking, Staying Informed, Teaching, Oregon Deaf and Hard of Hearing Services, American Sign Language, Accessibility, Dental Hygiene, Design Process, Graphic Design, Graphic Design, Illustration, Technology, Accessibility, Library Science, 3D Modeling, 3D Printed (Turkish) Drop Spindles, Homemaking, Sustainability, DIY, Sewing, Digital Security, Encryption, Occult, Tai Chi/Qui Gong, Zen Buddhism, Making a Living, Life/Transition Coaching, Biology, Healthcare, Budgeting, Ethics/Moral Philosophy, Compassionate Communication, Communication, Public Research, Policy, Political Manifesto, Psychology, Research, Modules, Luxon.js, localForage, First Aid, Healthcare, Interior Design, Homemaking, Zen Buddhism, Permaculture, Polycule, Micronutrient Data Explorer, Demo: Bubbles, Interactive Datavis, Criminal Justice/Corrections, Psychology, Carpentry, Upholstering, Cleaning, Gender Symbol Generator, Body Modification, Clothing & Style, Countries & Capitals, Heidelberg (Baden-Württemberg, Germany), Staying Informed, Grant Writing, Public Research, Grant Application Processes, Science Writing, Fitness, Electrolysis, Nutrition, Epidemiology, Housekeeping, Cleaning, 3D Design, Design, Mindfulness, Emotional Intelligence, Latin for Spellwork, Languages, Library Science, Libraries, Positive Psychology, Counseling, MIS - Management Information Systems, Systems Analysis, Problem Solving, Automation, Algorithmic Problem Solving, Machine Ethics, Robotics/Automation Engineering, Relationship Skills, Strategic Planning, Research, Aikido, Tai Chi/Qui Gong, Fitness, Teaching, Counseling, Biology, Chemistry, Positive Psychology, Meditation, Aesthetics, Zen Buddhism, Botany, Occult, Religion, Meditation, Design Software, Human Resources, Sociology, Social Psychology, Positive Psychology, Homemaking, Home Organization, Interior Design, Origami 3D Models, How to make an Origami Rose, Origami Crane, Papercrafts, Crafts, DIY, Business, Encryption, Code Demos, Relationships, Comparative Psychology, Politics, Economics, Aesthetics, Verlet Integration, Applied Mathematics, Anatomy, Criminal Justice/Corrections, Social Justice, Social Justice, Physics, Engineering, Printmaking, Design, Graphic Design, Market Research, Learning, Staying Informed, Science Fiction, Writing, Relationships, Market Research, Scientific Method, Harm Reduction (Substance Use Policy), Policy, Game Reviews Notebook, Tea Tasting Notebook, Writing, Communication, Ocean Currents, Marketing, Undergrad Thesis: PETSA meets REDCap, Scientific Method, Research, Science Writing, Encryption, Planning, Human Sexuality, Relationship Skills, Communication, Robotics/Automation Engineering, Automation, Planning, Occult, Overalls Sewing Pattern, Sewing, Overalls Sewing Pattern, Agriculture, Sociology, Counseling, Healthcare, Public Speaking, Business, Day Camp Instructing, Permaculture, Agriculture, Sustainability, Communication, Occult, Martial Arts, Project Navigator, Inspiration, Political Manifesto, Kid-Powered Education, Infographics, Counseling, Teaching, Education, Service, Counseling, Clothing Design, Sewing, Crochet, Counseling, Healthcare, Perspective, Timeline/History, Scheduling, Tracking Time Use, Rest Activities, Planning, Global Citizenship, YouTube Watch Later List, Painting, UI, UX, Programming, Making a Living, Fiverr, Shipping, Carbon Rebate, Culinary Science/Food Chemistry, Microbiology, Bodyweight Exercises, Illustration, Washed Flour Seitan, Cooking, Jewelry Design, Community Building, Relationships, Human Rights, Composting, Geology, Science Fiction, Economics, Political Manifesto, Print Materials, Chemistry, Psychology, Biology, Climate, Biology, Hydrodynamics, Knot Illustrations, Leaf Cable Ties, Make What You Use => Use What You Make' Sticker, T-shirt: trust me, I have a spreadsheet, If Exercise Was a Pill, T-shirt: Vampires Anonymous, Interior Elements Posters, Bangle style bracelets like mobius strips, Zazzle, Tarot, Income Documentation, Public Health, Culinary Science/Food Chemistry, Agriculture, Behavioral Biology, Security, Encryption, Digital Security, Compassionate Communication, Policy, Politics, Edible and Medicinal Plants, Homemaking, Agriculture, Drafting/3D Design, Engineering, Prototyping, Lil' Guppies Scuba School, Logo Design Preview Materials, Creative Arts & Beads Logotype, Tender Queers Logo, Carpentry, Compassionate Communication, Creative Writing, Science Writing, Gardening, Homemaking, Electrolysis, Microbiology, Healthcare, SVG Function Library, Needs/Wants/Desires, T-Shirt Prints, Alacrity, Raindrop SVG Animation, Ripples, Multi-Format Mockup Preview, Mental Health, Relationships, Public Speaking, Career Development, Life Coaching, Music, Illustration, Fursona Illustrations, Life Coaching, Psychology, Game Assets, , Process, Project Navigator, Degrees, Fearless Financial Gain, Project Navigator, Google Sheets Butler, About Me, Music, Scheduling, Minecraft, Relationship History, Graph Theory, 3D Modeling, Languages, Budgeting, Making a Living, Voice, Sponsorship, Project Navigator, Sigils, Style and Process Manual, Pet Games, Design, Animations, Infographics, Game Concepts, Healthy Social Life, Presence, Code Demos, Graph Theory, Coffee, Infographics, Assets, Illustration, Organizing Digital Assets, Applied Mathematics, Global Citizenship, SNHU, Energy Work, Fitness, Occult, Biology, Tracking Time Use, Targeting, Clothing & Style, Health, Education & Employment Timeline, Natural Sciences, Programming, UI, Accessibility, Web Design, Psychology, Technomancy, Martial Arts, Coffee, Google Sheets, Evidence Based Policy, Biology, Design, Body Modification, Communication, Business, Homemaking, Communication, Healthcare, DIY, Sewing, Personal Vision, Web Apps, Computer Science, Every Day Carry`
    let testArr = testSet.split(", ")
    return testArr
  }
  let allTestNames = exampleNames()
  for (var i = 0; i < allTestNames.length; i++) { 
    if (Object.keys(checkFor(allTestNames[i])).length === 0) {
      log(`no search results for ${allTestNames[i]}`)
    }
  }
  return ''
}

function combineSearchResults(oldObj, newObj) {
  // #todo have this take the larger of the values
  return Object.assign(oldObj, newObj)
}

function search(projectsObj, searchTerms = '') {
  if (searchTerms) {
    let searchTermsArr = [searchTerms]
    let searchResults = {}
    console.log(searchTermsArr)
    searchTermsArr.forEach(searchTerm => {
      searchResults = combineSearchResults(searchResults, checkFor(searchTerm))
    })
    projectsObj._showing = projectsObj._projects_list.filter(entry => {
      if (searchResults[entry['Project ID']] > 0.1) {
        return true
      } else {
        return false
      }
    })
    log(projectsObj._showing)
  } else {
    // there's no search input so return all projects
    // #todo sort by '_Test' for now
    projectsObj._showing = projectsObj._projects_list
  }
  stored = projectsObj // supports current project update function
  return projectsObj
}