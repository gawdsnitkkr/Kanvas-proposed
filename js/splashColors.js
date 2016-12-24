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
        time = 0,
        animationTime, // time for which the aimation of splash color will run
        doAnimation = true,
        _Functions = {

            /*
             generates random hex color values each second
             */
            CreateAnimation : function() {
                function hailAnimate() {
                    if(doAnimation) {
                        w.requestAnimationFrame(hailAnimate);
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
                        if(time == animationTime) {
                            // w.cancelAnimationFrame(hailAnimate);
                            doAnimation = false;
                            return;
                        }
                        time++;
                    }
                }
                if(doAnimation == true) {
                    hailAnimate();
                }
            },

            SpreadColors : function(px, py, pr, pCol) {
                var i = 0,
                    x = px,
                    y = py,
                    r = pr,
                    col = pCol;

                function ink() {
                    if(doAnimation) {
                        w.requestAnimationFrame(ink);
                        _Functions.CreateSpot(x, y, r * (i / blend), col);
                        if(i == blend) {
                            w.cancelAnimationFrame(ink);
                        }
                        i++;
                    }
                }
                ink();

            },

            CreateSpot : function(x, y, r, col) {
                // console.log('creating spot');
                ctx.fillStyle = 'rgba(' + col.r + ',' + col.g + ',' + col.b + ',' + col.a + ')';
                ctx.beginPath();
                ctx.arc(x, y, r, 0, Math.PI * 2, false);
                ctx.fill();
            },

            /*
            *   the request animation frame for canvas created shit bro :P
            *   so have to put some limit on splashing the colors on the screen
            *   after all it is running on a browser :P
            */
            SetTimeForAnimation : function() {
                if(w.innerWidth <= 500) {
                    animationTime = 500;
                }
                else if(w.innerWidth > 500 && w.innerWidth < 1000) {
                    animationTime = 800;
                }
                else {
                    animationTime = 1000;
                }
                // console.log(animationTime);
            }
        }

    /*
     *   Things to do bro :)
     *   Create canvas
     *   then create random colors
     *   create circles for the colors on the canvas
     */
    $(w).on('load', function() {
        _Functions.SetTimeForAnimation();
        canvas = document.getElementById('canv');
        ctx = canvas.getContext('2d');
        canvas.height = w.innerHeight;
        canvas.width = w.innerWidth;
        _Functions.CreateAnimation();
    });

    $(w).on('resize', function() {
        canvas.width = w.innerWidth;
        canvas.height = w.innerHeight;
        _Functions.SetTimeForAnimation();
    });


})(jQuery, window, document);