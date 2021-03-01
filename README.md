What is react-cms

WHY
- React.js Application Framework 

- Component + Hooks framework
- State + Completely custom UI framework

Framework to build CMS style websites

- Sort of a component library, but its bigger

- [-] drag n drop
 - [x] basic example
 - [x] non-trivial example
 - [x] create component
 - [ ] style dragged element
- [ ] Very Generic Upload forms / pages
- [x] Scrollable pages
- [x] Fixed Element
 - just use position: sticky
- [~] Forms - decent state
  - [x] State ~ more
   - [x] validation ~ more
  - [x] Async shit
    - not sure what this means.. I think we already handle it
  - [x] UI
    - non-issue. We are making a hook, not a component
  - [x] labels
    - [x] label name
    - [x] label for

- [ ] Image stuff
  - [x] gallery layout
  - [x] image modals
    - [x] modal
    - [x] switching between images
    - [x] arrows
    - [ ] issue w image margins changing when rotating between images
  - [ ] horizontal scrolling

- dom utils
 - [x] onKey

- [ ] Cards ~

- [x] Overlay

- Core Object extensions
 - Object
  - [x] Object.mapValues

- [-] Component gallery
  - [x] prototype

# big ideas

- [ ] create new standard library
- [-] implement styled-components...
  - [x] basic featureset
  - [x] use stylesheets
  - [ ] transpile sass
- [x] implement react-router...
- [-] lib-ui
  - [x] Hello world
  - [x] nested elements
  - [x] props
  - [x] state
  - [x] put state in `useState` function instead of props
  - [ ] dom diffing
  - [-] stop render chain
  - [ ] context
  - [ ] implement hooks
    - [x] useState
    - [-] useEffect
  - [x] don't re mount/render the entire application
  - [ ] re-implement all above react components in this new library
    - [x] table

# BIG PROJECT #1

- video streaming website...
 - [-] nav
  - [x] basic layout
  - [x] opaque background on scroll
  - [ ] dropdown menus
 - [ ] video cards
 - [ ] 