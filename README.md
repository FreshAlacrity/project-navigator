# Project Navigator
Hello and welcome! This project is very much a work in progress and has been for a while. It's finally collected up enough to become a repository of its own, so that's a big deal! Please pardon the mess while I dig into refactoring and relocating the scripts and project docs.

The idea is to merge the concept of an online portfolio and a folder for all my current and past projects, because my spreadsheet has too many columns and isn't very pretty. I also really like the idea of seeing how other people are viewing my work and showing other folks how I'm seeing at my work as I'm working.

Previous versions have been developed on CodePen; the current version is live on the home page on [my GitHub Pages site](https://freshalacrity.github.io/)

## Project Goals
- Easily navigate my ongoing and past work
  - Better organization
    - Intuitive & convenient open sourcing
    - Encourage prioritizing & avoid burnout
      - Encourage shipping in minimal/meaningful stages
        - Break down each stage into next steps
        - Keep design priorities and next steps for projects within easy reach
      - Focusing on relatively few projects at a time
      - Focusing on projects that are both meaningful and rewarding
      - Encourage rotation between topic areas and technologies
      - Allow easily tracking progress & keeping sources of inspiration handy
    - Quick, intuitive ways to find relevant projects
      - Searchable index of projects by name, type, technology used, etc
      - Links from project pages to similar projects
      - Ways to find projects for different moods/energy levels
        - By project stage?
        - By time committment to complete next segment
      - Automatically assess priority/set sort order
        - By best fit
          - Personal satisfaction, popularity
        - By activity level
          - Recent changes/project creation, quick tasks available
          - Revisit old but not archived projects
        - Urgent (private view up, public view down)
          - Issues
          - Approaching deadlines
          - Dependency/needs to be completed prior to other projects
      - URL parameters for showing different groups of projects for bookmarkable and shareable links
        - Hide private projects from public view/default to pubs only
          - require a password for each new machine (w/option to only apply to that session)
        - allow filtering the list by License, Type, Status, Tools/Tech, Next Steps, Subject, Category, Public/Private, Phase etc
    - Accessible project data
      - Better transparency and accountability
      - Easy to map, visualize & analyse
      - Easy to search and filter
      - Types of data:
        - Where projects link to and what tech they use
        - Relationships between projects by topic, dependency networks etc.
        - Goals
        - Future plans
        - Recent changes
        - Overall process & progress
        - Sources & implementation details
        - Known issues
- Showcase process and progress
  - Intuitive navigation within and between projects
    - For myself while working
    - For potential clients and supporters
    - For collaborators and people forking my projects for their own use
  - Show where I’ve been and where I plan to go next
    - Include all current and past work, both recreational and professional
      - Make as much of this public as I can
- Intuitive, accessible UI
  - Descriptions & plain-text versions
  - Visual cohesion & simplicity
    - Reduce colorful designs to monochrome when displaying in project view
  - Pinned project views that always show up in either public or private view
    - Show at the top of the page when browsing through project views, at the bottom of the page when viewing a single project in review mode/with a field at the top
  - Mobile friendly
  - Public and private sections with clear visual indication of which is which
    - Preview mode for public projects (default)

### Next
- work on moving more of these todo items to [GitHub Issues](https://github.com/FreshAlacrity/project-navigator/issues)
- set up the Project Navigator as a submodule of my GitHub Pages site, ex. as `freshalacrity.github.io/projects`
  - set up subdirectories for network view (/explore/?) and trello style /board/
  - decide on a file directory structure for projects with a collection of information to store (image gallery, readme etc) but not enough information to need their own repository
  - decide on how and where to store data for private projects, since websites can't freely access local files
- make a JavaScript version of the function for a new project ID, `=DEC2HEX(RANDBETWEEN(0, 4294967295), 8)`
- support for search, edit, & update functionality from web view
- prototype new project page from [mockup](https://designer.gravit.io/?token=OQwUbHc83kinSCEQKqKSD4fDa6q4SMIp)
  - start with just displaying the information from the spreadsheet with an image up top, then support interactive inline SVG with an option to make that fullscreen
- automatically filter public and private link types
  - show plaintext readout of public projects and which projects they link to
    - alert if a linked project cannot be found
- figure out link from the available links
  - prioritize live > codepen > mockup > github > brief > image url

## Known Issues
- current default project tile web view has editable project titles instead of linked project titles
- version 2 of the NIH research infographic - why is this broken?
- shabby pubs selection/unpolished display
  - many projects not ready to be published
    - briefs not edited with publication in mind

### Stretch Goals
- Make available as a public app/webapp
  - Make easy to fork for people that want a similar system
- Support for easily forking new project documents from existing and template project documents
- Log poms spent on projects and when to make nifty charts and see what I’ve been up to
  - have this incorporated into recent changes/allow assigning a pom weight to them?
- When adding a task that shares words with a project, suggest linking them
- Data analysis
  - Scanning the existing database for possible links between projects that haven't been recorded (say, by comparing words used in the readme)
  - [Network graph](https://codepen.io/eahartmann/pen/eYRqONM)
  - [Bubble graph](https://designer.gravit.io/?token=Ll-QPtC7GDClUCir_fjm15zlj2jMQK8u)
- Allow editing and exporting briefs directly from my website
  - Easy way to clone/fork new process documents and templates
- Quick and easy time tracking from brief view
  - Track and automatically log time spent editing/viewing briefs
    - Clock starts ticking when you open the brief in private view
      - Automatically keeps a log of that as time spent on the project
        - Allow quickly typing in what you were up to during that time
    - Chart views of time use? ex: what day, how much, what tasks
    - Move Next Steps that are checked off to Recent Changes and log any current timers to that entry; aggregate previous entries with the same name
- Star a commit/changelog entry to include in the public page (and potentially auto-tweet)
  - Does GitHub provide support for this? Check out existing solutions
  - Can I tie commits in with the time tracking?
- Include (annotated?) javascript for small js based projects
  - Allow editing, saving & updating the code from the project page
- Allow feedback & commenting on projects/briefs
  - Include testimonials
  - Let people add or vote for things to my task/project list
    - A code supporters can use to super-charge their votes
      - Auto-adding supporters to supported projects
      - Option to save the code used on a computer to be used whenever voting
- Intuitive ways to adjust project priority
- Visual indicator or grouping by what group/category a project belongs to (codebase, graphic design etc)

#### Possible Site Views
- Focused, polished homepage
  - Emphasize/front face a design each that does a good job showing something: Intuitive, Recent, Relevant
    - Pick from projects with rich process docs
- Columns of projects by next step type or overall category
  - Active projects in each phase - lists like a trello board
- Force directed network graph
  - make a bubble view with project titles visible
    - show highest priority projects by default
      - also allow search filters
    - display project details on click as a div/card
      - include a ‘x’ in the top corner to close the popup
      - button to edit values directly
        - also save that data to the spreadsheet
    - figure out how to show project images clipped to bubbles
      - replace project titles where available?
- Dashboard with analytics (as in the charts from the sheet of the same name)
  - Analytics (pageviews etc) - see https://twitter.com/PlausibleHQ
  - Trello/Kanban board style - show categories/how many things are in each category (by subject, group, and phase?)
  - Time spent per project this week etc?
  - Time spent learning to use a particular tool/tech or in a field and how much of that was on which projects
    - To support this it may help to add interests and tools as projects themselves?
  - All changes ordered by most recent/celebrate the wins view
    - moving from stage to stage as a change?
  - Number of active projects in each phase as a chart, click to go to filtered view
  - Ability to view most recent updates within a category of projects
- Button/settings to change the theme:
  - plain/no background (dark & light + high contrast)
  - starry
  - sunset (also with stars?)
  - koi pond

## History
- February 27, 2022
  - brief moved to readme.md and cleaned up
  - GitHub repo initialized
- October 11, 2021
  - project stage introduced to track complete/incomplete status etc
  - dashboard with shipping details & active projects added to Google Sheet doc
- October 9, 2021
  - auto logging for last shipped date and last update to row
- September 25, 2021
  - all projects not currently active are set to ‘Holding’ phase
- September 24, 2021
  - merged Considering phase into Holding
  - prioritization tweaks:
    - overall sorting priority is now a combination of satisfaction, estimated time required, and how urgent the work is
    - projects that are in the Holding phase are visibly de-emphasised to encourage focusing on completing the things that need work
    - phases are now color coded
- September 11, 2021
  - removed tasks fields and replaced with ‘Note’ field

## Resources
- [Details Element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details)
  - replacing: [CSS expand/collapse trick](https://stackoverflow.com/questions/13630229/can-i-have-an-onclick-effect-in-css)
### Inspiration
  - [Carrd](https://carrd.co/)
  - [Lope - App on Google Play](https://play.google.com/store/apps/details?id=com.twoorgu.lope)
  - [Toggl Time Tracker](https://toggl.com/)