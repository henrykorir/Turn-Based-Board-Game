[![Netlify Status](https://api.netlify.com/api/v1/badges/89a8f1a1-123c-4725-bbcb-5254e2f64d2e/deploy-status)](https://app.netlify.com/sites/vigilant-joliot-e93b16/deploys)
# Turn Based Board Game
An online game in which 2 players play each turn to compete. 
## Description
> **The Project uses Model-View-Controller (MVC) architecture** 

If players cross over adjacent squares (horizontally or vertically), a battle begins.
During combat, the game works as follows:
- Each player attacks in turn
- The damage depends on the player's weapon
- The player can choose to attack or defend against the next shot
- If the player chooses to defend themselves, they sustain 50% less damage than normal
- As soon as the life points of a player (initially 100) falls to 0, they lose. A message appears and the game is over.
Play online [tit4tat](https://tit4tat.netlify.app/)
## Installation
```
git clone https://github.com/henrykorir/Turn-Based-Board-Game.git
cd Turn-Based-Board-Game
npm install
gulp
```
1. `git clone https://github.com/henrykorir/Turn-Based-Board-Game.git` to clone the repo to local machine
2. `cd Turn-Based-Board-Game` change to the game repo directory
3. `npm install` install dependencies
4. `gulp`run the game
## Usage
## License
MIT License

Copyright (c) 2020 Henry Korir

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
