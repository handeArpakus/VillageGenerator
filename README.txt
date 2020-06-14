villageGenerator:

This program uses many code blocks from the example codes of lecture. At the beginning 
the program generates an empty canvas. After the user choose the minimum and maximum width of the river and 
click the 'Draw River' button, the river is generated with a random width between the maximumWidth 
and the minimumWidth in the middle of the canvas. Then, the user enter a circle number and clicks the draw circle and the 
program generates the circles around the river without collision. And the user choose an attractor kind and click the canvas 
as many time as he wants. When s/he click the 'Village' button shapes are drawn into the circles according to the attractors
probabilitically. Rocks' points are generated randomly. Fruits' places in trees are generated randomly and they are drawn whitout
collision.

Common files:

webgl-utils.js: standard utilities from google to set up a webgl context

MV.js: our matrix/vector package. Documentation on website

initShaders.js: functions to initialize shaders in the html file

initShaders2.js: functions to initialize shaders that are in separate files

 