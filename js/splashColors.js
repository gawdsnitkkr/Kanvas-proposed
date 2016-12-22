/**
 *  @author : abhishek goswami ( hiro )
 *  abhishekg785@gmail.com
 *
 *  splashColor.js : Creates a color splashes on the canvas
 */

(function($, w, d) {
    var canvas,
        ctx,
        blend = 100,
        _Functions = {

            /*
             generates random hex color values each second
             */
            CreateAnimation : function() {
                w.requestAnimationFrame(_Functions.CreateAnimation);
                var px = Math.floor(Math.random() * canvas.width);
                var py = Math.floor(Math.random() * canvas.height);
                var pr = Math.floor(Math.random() * 50);
                var pCol = {
                    'r' : Math.floor(Math.random() * 255),
                    'g' : Math.floor(Math.random() * 255),
                    'b' : Math.floor(Math.random() * 255),
                    'a' : 1 / blend
                };
                _Functions.SpreadColors(px, py, pr, pCol);
            },

            SpreadColors : function(px, py, pr, pCol) {
                var i = 0,
                    x = px,
                    y = py,
                    r = pr,
                    col = pCol;

                function ink() {
                    w.requestAnimationFrame(ink);
                    _Functions.CreateSpot(x, y, r * (i / blend), col);
                    if(i == blend) {
                        w.cancelAnimationFrame(ink);
                    }
                    i++;
                }
                ink();

            },

            CreateSpot : function(x, y, r, col) {
                console.log('creating spot');
                ctx.fillStyle = 'rgba(' + col.r + ',' + col.g + ',' + col.b + ',' + col.a + ')';
                ctx.beginPath();
                ctx.arc(x, y, r, 0, Math.PI * 2, false);
                ctx.fill();
            }
        }

    /*
     *   Things to do bro :)
     *   Create canvas
     *   then create random colors
     *   create circles for the colors on the canvas
     */
    $(w).on('load', function() {
        canvas = document.getElementById('canv');
        ctx = canvas.getContext('2d');
        canvas.height = w.innerHeight;
        canvas.width = w.innerWidth;
        _Functions.CreateAnimation();
    });

    $(w).on('resize', function() {
        canvas.width = w.innerWidth;
        canvas.height = w.innerHeight;
    });

})(jQuery, window, document);