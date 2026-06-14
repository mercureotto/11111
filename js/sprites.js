/* GELTION — hand-drawn pixel sprites, rendered to <canvas> at runtime.
   Each sprite is a pixel map; characters map to the palette below.
   Markup: <canvas data-sprite="hero" data-scale="7"></canvas> */
(function () {
  'use strict';

  var PAL = {
    '.': null,
    'K': '#241019',                                   // outline
    'h': '#e0a93a', 'g': '#a9761f', 'y': '#ffe07a',   // hair
    's': '#f1c39a', 'S': '#d2986e', 'i': '#ffd9b4',   // skin
    'e': '#33263a', 'W': '#f4f4ff', 'm': '#a85c46',   // eyes / mouth
    't': '#e6dfce', 'u': '#b3a988', 'w': '#f7f2e6',   // tunic
    'b': '#6e4a2c', 'n': '#e0b545',                   // belt / gold
    'p': '#5d4636', 'q': '#3f3026', 'o': '#3a2a1e',   // pants / boots
    'L': '#dfe3ec', 'l': '#a7aebb',                   // silver hair
    'V': '#6f63b0', 'v': '#4c4080',                   // robe
    'd': '#7a4d24', 'c': '#5a3415', 'G': '#e7b53e'    // chest wood / gold
  };

  var SPRITES = {
    hero: [
      "........................",
      "........KKKKKKKK........",
      "......KhhhhhhhhhhK......",
      ".....KhhhhhhhhhhhhK.....",
      ".....KyyyhhhhhhhhhK.....",
      "....KyyyhhhhhhhhhhgK....",
      "....KghhhhhhhhhhhhgK....",
      "....KghsssssssssshgK....",
      "....KghssWessWesshgK....",
      "....KghssssSSsssshgK....",
      ".....KsssssmmsssssK.....",
      ".....KSssssssssssSK.....",
      "......KSssssssssSK......",
      ".......KSssssssSK.......",
      ".........KSssSK.........",
      ".....KwtttttttttuuK.....",
      "....KsSwtttttttuuSsK....",
      "....KsSwtttttttuuSsK....",
      "....KSSbbbbnnbbbbSSK....",
      ".....KwttttttttttuK.....",
      ".....KpppppqqpppppK.....",
      "......KppppqqppppK......",
      "......KppppqqppppK......",
      "......KppppKKppppK......",
      "......KooooKKooooK......",
      "......KooooKKooooK......",
      "........................"
    ],
    companion: [
      "....................",
      ".......KKKKKK.......",
      ".....KKLLLLLLKK.....",
      "....KLLLLLLLLLLK....",
      "....KLlLLLLLLllK....",
      "....KlLssssssLlK....",
      "....KlLsessesLlK....",
      "....KlLssssssLlK....",
      "....KlLssmmssLlK....",
      "....KlSssssssSlK....",
      ".....KsssssssK......",
      "....KVVVVVVVVVVK....",
      "...KVvVVVVVVVVvVK...",
      "...KVvVVVVVVVVvVK...",
      "...KVvVVVVVVVVvVK...",
      "...KVvVVVVVVVVvVK...",
      "...KvvVVVVVVVVvvK...",
      "...KvVVVVVVVVVVvK...",
      "....KvoooooooovK....",
      "....Koooo..ooooK....",
      "....................",
      "...................."
    ],
    chest: [
      "......................",
      "....KKKKKKKKKKKKKK....",
      "...KddddddddddddddK...",
      "...KdGGGGGGGGGGGGdK...",
      "...KddddddddddddddK...",
      "..KddddddddddddddddK..",
      "..KdGGGGGGnnGGGGGGdK..",
      "..KdGGGGGGnnGGGGGGdK..",
      "..KddddddddddddddddK..",
      "..KccddddddddddddccK..",
      "..KccccccccccccccccK..",
      "...KKKKKKKKKKKKKKKK...",
      "......................",
      "......................"
    ]
  };

  function draw(canvas, name, scale) {
    var sprite = SPRITES[name];
    if (!sprite) return;
    var w = sprite[0].length, h = sprite.length;
    canvas.width = w * scale;
    canvas.height = h * scale;
    var ctx = canvas.getContext('2d');
    for (var y = 0; y < h; y++) {
      var row = sprite[y];
      for (var x = 0; x < row.length; x++) {
        var col = PAL[row[x]];
        if (col) { ctx.fillStyle = col; ctx.fillRect(x * scale, y * scale, scale, scale); }
      }
    }
  }

  function renderAll() {
    var nodes = document.querySelectorAll('canvas[data-sprite]');
    Array.prototype.forEach.call(nodes, function (cv) {
      draw(cv, cv.getAttribute('data-sprite'), parseInt(cv.getAttribute('data-scale'), 10) || 6);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderAll);
  } else {
    renderAll();
  }
  window.GELTION_SPRITES = { draw: draw, PAL: PAL, SPRITES: SPRITES };
})();
