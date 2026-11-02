export const lessons = [
  {
    id: 'generative-ai', title: 'Intro to Generative AI', eyebrow: 'AI FUNDAMENTALS', tag: 'Foundations', category: 'AI essentials', minutes: 30, level: 'Beginner', icon: 'auto_awesome', theme: 'purple',
    description: 'Understand what generative AI is, how it works and where it can help you.',
    overview: 'Generative AI can create text, pictures, music and code by learning patterns from existing examples. It is powerful, but it is not a mind and it can make confident mistakes.',
    steps: [
      {title:'Start with the basics',body:'AI systems identify patterns in data. Generative models use those patterns to produce new responses to your instructions, also called prompts.'},
      {title:'Try a real-world task',body:'Imagine planning a community football tournament. Ask an AI assistant for a checklist, then look for missing information and revise your instructions.'},
      {title:'Check the output',body:'AI can invent facts or reflect bias. Verify important claims using reliable sources and keep personal information out of prompts.'}
    ],
    challenge:'Write one prompt that could save somebody 15 minutes, then improve it by adding context and an example.'
  },
  {
    id: 'prompting', title: 'Prompting with Purpose', eyebrow: 'CORE SKILL', tag:'Foundations', category:'AI essentials', minutes: 20, level: 'Beginner', icon:'edit_note', theme:'cyan',
    description:'Turn a rough question into a clear, useful instruction for an AI tool.',
    overview:'A good prompt is a clear brief. You do not need special jargon: being specific about the task, context and desired output gets you further.',
    steps:[
      {title:'Define the goal',body:'Say what you want the AI to help you accomplish. Explain who the response is for.'},
      {title:'Add useful context',body:'Include constraints, important details and what a successful result should look like. Avoid sharing private information.'},
      {title:'Review and iterate',body:'Ask for alternatives, check accuracy and edit until the result meets your needs.'}
    ], challenge:'Turn “help with my idea” into a short creative brief with audience, goal and constraints.'
  },
  {
    id:'ai-football', title:'AI in Football', eyebrow:'SPORTS & AI', tag:'Sports', category:'AI in action', minutes:25, level:'Beginner', icon:'sports_soccer', theme:'lime',
    description:'Explore how teams can use data, vision and human judgment together.',
    overview:'AI in sport can help teams understand match patterns and make training more useful, but coaches and players still make the decisions.',
    steps:[
      {title:'Find a meaningful question',body:'Choose a football problem: training attendance, scouting, match clips or helping grassroots teams improve.'},
      {title:'Think about the data',body:'What information could answer that question? Is it accurate and fair? Do you have permission to use it?'},
      {title:'Design for people',body:'Create an idea that gives coaches or players understandable suggestions, not an unexplained score.'}
    ], challenge:'Sketch an AI assistant for a grassroots football coach.'
  },
  {
    id:'creative-ai', title:'AI for Creators', eyebrow:'CREATIVE TECH', tag:'Creative', category:'AI in action', minutes:25, level:'Beginner', icon:'palette', theme:'pink',
    description:'Use AI to brainstorm stories, visuals and creative experiences.',
    overview:'Generative AI can be a creative collaborator. Your taste, story and choices are what make the work your own.',
    steps:[
      {title:'Choose a creative medium',body:'Start with music, film, design, photography or writing. Think about something you want to communicate.'},
      {title:'Brainstorm different directions',body:'Ask an AI tool to help generate three concepts with different moods or audiences.'},
      {title:'Make it yours',body:'Combine and revise ideas based on your vision. Consider copyright, consent and authenticity.'}
    ], challenge:'Create a three-scene storyboard for a positive change you want to see.'
  },
  {
    id:'responsible-ai', title:'AI, Trust & You', eyebrow:'RESPONSIBLE AI', tag:'Foundations', category:'AI essentials', minutes:20, level:'Beginner', icon:'verified_user', theme:'purple',
    description:'Learn to question outputs, spot risks and make thoughtful choices.',
    overview:'Responsible use means thinking about who a system helps, who might be left out, and how to verify that it is working safely.',
    steps:[
      {title:'Notice the limitations',body:'AI outputs can be inaccurate, unfair or misleading. A polished answer is not proof it is true.'},
      {title:'Protect people',body:'Avoid putting personal or sensitive data into public tools. Think about consent and how an AI output might affect other people.'},
      {title:'Keep humans in charge',body:'Build checks, feedback and the option to say no into AI-assisted processes.'}
    ], challenge:'List three checks you would add before using an AI idea in the real world.'
  },
  {
    id:'prototype', title:'From Idea to Prototype', eyebrow:'BUILD MODE', tag:'Build', category:'Make it real', minutes:35, level:'Beginner', icon:'deployed_code', theme:'cyan',
    description:'Turn your problem into an idea, a user journey and your first prototype.',
    overview:'A prototype can be a paper sketch, clickable mock-up or a simple working tool. Start by learning whether your idea is useful.',
    steps:[
      {title:'Pick one problem',body:'Describe the person you want to help and one specific moment that is difficult for them.'},
      {title:'Sketch the solution',body:'Draw three screens or steps that show how the person would use your idea.'},
      {title:'Get feedback',body:'Show someone your sketch. Ask what confuses them and what they would change.'}
    ], challenge:'Describe your first prototype in one sentence and sketch its first screen.'
  }
];

export const challenges = [
  { id:'future', title:'Build for a better tomorrow', tag:'OPEN CHALLENGE', icon:'emoji_events', theme:'pink', category:'Social impact', duration:'Self-paced', description:'Take something your community cares about and turn it into an AI-powered solution.', brief:'Think of a small, everyday issue that matters in your community. Design an AI-powered idea that could help one group of people in a meaningful way.', prompt:'How might we use AI to make everyday life better for someone in our community?', ideas:['Accessible local services','Making learning easier','Helping small community groups'] },
  { id:'football', title:'The Future of Football', tag:'SPORTS CHALLENGE', icon:'sports_soccer', theme:'lime', category:'Sport', duration:'Self-paced', description:'Reimagine the beautiful game with creative, human-centred AI ideas.', brief:'Explore how AI could help grassroots clubs, players or fans. Focus on a real need and explain how a person stays in control.', prompt:'How might AI make football more accessible, inclusive or enjoyable?', ideas:['Better grassroots training','Smarter match highlights','Welcoming new fans'] },
  { id:'creative', title:'Creative Futures', tag:'CREATIVE CHALLENGE', icon:'palette', theme:'cyan', category:'Creativity', duration:'Self-paced', description:'Create a new experience for the next generation of artists and storytellers.', brief:'Design an experience where a creator uses AI to do something that was previously out of reach, while keeping their own voice.', prompt:'What could artists create if AI removed one barrier?', ideas:['Interactive stories','Accessible design tools','New community experiences'] },
  { id:'wellbeing', title:'Health, Made Human', tag:'IDEA CHALLENGE', icon:'favorite', theme:'purple', category:'Health', duration:'Self-paced', description:'Explore how technology can support healthier, more connected communities.', brief:'Find a non-clinical wellbeing challenge, such as access to trustworthy information or healthy routines. Design something simple and supportive, not a diagnostic tool.', prompt:'How might AI make everyday wellbeing support easier to access?', ideas:['Finding local resources','Helping people build healthy habits','Clearer public information'] }
];

export const categories = [
  { title:'Sport', icon:'sports_soccer', color:'lime', description:'Train smarter. Play fairer.' },
  { title:'Creative', icon:'palette', color:'pink', description:'Make imagination tangible.' },
  { title:'Health', icon:'favorite', color:'cyan', description:'Build ideas with people in mind.' },
  { title:'Everyday life', icon:'public', color:'purple', description:'Solve what matters to you.' }
];
