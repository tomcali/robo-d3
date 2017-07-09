# robo-d3
D3 for Robo Project

## Sample code sources
From the bootcamp course, we note the structure of an initial React component from 07-MyFirstComponent.

Regarding D3, there have been massive changes from v3 to v4. We will attempt to use v4.

From a forthcoming book D3.js in Action (second edition), we draw on sample code from Chapter 9, which is part of this GitHub repository:

https://github.com/emeeks/d3_in_action_2 

See Meeks' online discussion at 
https://medium.com/@Elijah_Meeks/interactive-applications-with-react-d3-f76f7b3ebc71


D3 programming techniques are well documented in the following book, an early release from O-Reilly:

Murray, Scott. 2017. Interactive Data Visualization for the Web: An Introduction to Designing with D3 (second ed.). Sebastopol, Calif.: O'Reilly. [ISBN13: 978-1491921289] Print version expected August 2017.  Early release available at  http://shop.oreilly.com/product/0636920037316.do 
Code available from Scott Murray's GitHub repository at   https://github.com/alignedleft/d3-book 

A simple bar chart example with D3 v3 is provided by Mike Bostock at https://bl.ocks.org/mbostock/7555321

And a D3 v4 example is provided at
https://bl.ocks.org/d3noob/bdf28027e0ce70bd132edc64f1dd7ea4

## Objective
The goal of the D3 visualization is to provide an interactive visualization for the client, showing the percentage of total assets assigned across five security classes: cash (money markets), real estate, bonds, stocks selected by Smart Robo Investments, and stocks selected by the individual investor.  A bar chart is used to manage the percentages in unit increments with the total percentage across asset classes being 100.

## Initializing the App
Working under the robo-d3-work directory, we initialize and start the app with

npm install
npm start

