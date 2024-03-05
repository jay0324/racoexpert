(function($) {
    var app = window.app || {};
    var isMobile = detectMobile();
    var ratio = screenRatio();
    var scaleRatio = window.innerWidth / 1920;

    app = {
        init: function(){
            this.loader();
        },
        data: {
            files: [
                'img/africa_smith.png',
                'img/anna.png',
                'img/bg_top_2.jpg',
                'img/bg_top.jpg',
                'img/bg.jpg',
                'img/blade.png',
                'img/doctor.png',
                'img/firestar.png',
                'img/gorilla_hand.png',
                'img/lightning-1.png',
                'img/lightning-2.png',
                'img/lou.png',
                'img/mask.png',
                'img/Q.png',
                'img/robot_hand.png',
                'img/smith.png',
                'img/tool.png',
            ],
            loaded: [],
            snowBitmap: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAGAGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMTUtMDctMDNUMTg6NTk6MjIrMDI6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDE5LTAxLTEyVDE1OjE0OjQwKzAxOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE5LTAxLTEyVDE1OjE0OjQwKzAxOjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOmIzMzBlMWI0LTk5ZDctNGU2NS05MGQ2LTNmYjFiYmE2ZTE0MCIgeG1wTU06RG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjAyNThjNzMxLTQ4ZjQtYTA0MS1hNGFkLTQ4MTA2MTVjY2FlYSIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjJjY2VkMTUyLTRjNzAtNDFlZC1hMzcyLWRlOWY4NjgyZTcwMSI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6MmNjZWQxNTItNGM3MC00MWVkLWEzNzItZGU5Zjg2ODJlNzAxIiBzdEV2dDp3aGVuPSIyMDE1LTA3LTAzVDE4OjU5OjIyKzAyOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6YjMzMGUxYjQtOTlkNy00ZTY1LTkwZDYtM2ZiMWJiYTZlMTQwIiBzdEV2dDp3aGVuPSIyMDE5LTAxLTEyVDE1OjE0OjQwKzAxOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz50mbqsAAAToElEQVR4nOVbW49dR5X+VlXtc2v3Ne52N6bTTnAc0u02GRJQwEhYQkJ5QhmhPPOUl0iBB/4AP4JfMA95IEIaJEYiQhlesCZMEE1iGxJHIjK21XbSwX1xd5+zd9Va87BrVdfefWwI4xEaUVJpn7PPPnVqfbUu31pVh0QE/8zN/KMn8I9uTl+8+uqrAAARgYgghIBer4dnnnkGAPDFL34RANDr9eiJJ55AVVUgIhhjwMwYDAbY3Nyk8+fPP/DHdnd3ZWtr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',
            develope: true,
        },
        loader() {
            const xhr = [];
            $("#total").text(this.data.files.length);
            $("#complete").text(this.data.loaded.length);
            var color = 'rgba(97, 236, 120, 1)';
            var circle = document.getElementById('circle');
            var ctx = circle.getContext('2d');
            var size = ctx.canvas.width;
            var middle = size / 2;
            var lineWidth = ctx.lineWidth = 2;
            ctx.strokeStyle = color;
            ctx.fillStyle = color;
            ctx.textAlign = 'center';
            ctx.font = "3vw VT323";
            ctx.textBaseline = 'middle';
            var pi = Math.PI;
            var anglePerPercent = 2 * pi / 100;
            var percentComplete = 0;
            var angleComplete, startAngle = 0;
            updatePercent();

            this.data.files.forEach((item, idx)=>{
                xhr[idx] = new XMLHttpRequest();
                xhr[idx].open('GET', item)
                xhr[idx].send()
                xhr[idx].onprogress = event => {
                    percentComplete = Math.round((event.loaded / event.total) * 100);
                    updatePercent();
                }
                xhr[idx].onload = () => {
                    this.data.loaded.push(this.data.files[idx]);
                    $("#complete").text(this.data.loaded.length);
                    if (this.data.loaded.length == this.data.files.length) this.loadStage();
                }
            })
            
            function updatePercent(){
              angleComplete = (anglePerPercent * percentComplete).toFixed(5);
              ctx.clearRect(0, 0, size, size);
              ctx.beginPath();
              ctx.arc(middle, middle, middle - lineWidth - 2 , -pi/2, angleComplete - pi/2);
              ctx.fillText(percentComplete+'%', middle, middle, middle);
              ctx.stroke();
            }
 
        },
        loadStage(){
            if(!this.data.develope) window.scrollTo(0, 0);
            setTimeout(()=>{
                this.loadComplete();
            },1000)
            if (ratio > 1) this.stage1();
            this.stage2();
            this.stage3();
            this.stage4();
            this.stage5();
            this.snow();
            this.fire();
            this.spark();
        },
        loadComplete(){
            let ts = gsap.timeline()

            ts
            .to("#meter", {
                scale: 0,
                duration: 1 
            }, 'stage1')
            .to("#loader", {
                opacity: 0,
                duration: 3 
            }, 'stage2')
            
            if (ratio < 1){
                ts
                .from("#gorilla_hand", {
                    left: '-50vw',
                    duration: 1
                }, 'stage4')
                .from("#robot_hand", {
                    right: '-50vw',
                    duration: 1
                }, 'stage4')
                .from("#tool", {
                    opacity: 0,
                    duration: 2 
                }, 'stage5')
                .from("#lightning", {
                    opacity: 0,
                    duration: 2 
                }, 'stage6');
            }

            $("body").removeClass('loading');
        },
        stage1() {
            gsap.timeline({
                scrollTrigger: {
                    trigger: "#storyBlock1",
                    endTrigger: "#since_1",
                    start: "top top",
                    end: "center bottom",
                    markers: false,
                    scrub: 10,
                }
            })
            .from("#gorilla_hand", {
                left: '-50vw',
                duration: 1
            }, 'stage2')
            .from("#robot_hand", {
                right: '-50vw',
                duration: 1
            }, 'stage2')
            .from("#tool", {
                opacity: 0,
                duration: 2 
            }, 'stage2')
            .from("#lightning", {
                opacity: 0,
                duration: 2 
            }, 'stage3');
        },
        stage2() {
            gsap.timeline({
                scrollTrigger: {
                    trigger: "#storyBlock2",
                    start: "top bottom",
                    end: "top center",
                    markers: false,
                    scrub: 0,
                }
            })
            .from("#storyBlock2", {
                opacity: 0,
                duration: 1 
            }, 'stage1');

            gsap.timeline({
                scrollTrigger: {
                    trigger: "#since_2",
                    start: "top center",
                    end: "bottom top",
                    markers: false,
                    scrub: 0.5,
                }
            })
            .to("#anna", {
                scale: 0.85,
                bottom: '5vw',
                duration: 1
            }, 'stage2')
            .to("#Q", {
                scale: 0.85,
                bottom: '20vw',
                right: '-1vw',
                duration: 1
            }, 'stage2')
            .to("#land", {
                scale: 0.85,
                bottom: '10vw',
                left: '-1vw',
                duration: 1
            }, 'stage2');
        },
        stage3() {
            gsap.timeline({
                scrollTrigger: {
                    trigger: "#storyBlock3",
                    start: "top bottom",
                    end: "top center",
                    markers: false,
                    scrub: 2,
                }
            })
            .from("#storyBlock3", {
                opacity: 0,
                duration: 1 
            }, 'stage1')

            gsap.timeline({
                scrollTrigger: {
                    trigger: "#storyBlock3",
                    endTrigger: "#since_3",
                    start: "top center",
                    end: "center bottom",
                    markers: false,
                    scrub: 2,
                }
            })
            .from("#africa_smith", {
                left: '-60vw',
                duration: 1
            }, 'stage2')
            .from("#smith", {
                opacity: 0,
                duration: 1
            }, 'stage2')
            .from("#doctor", {
                right: '-40vw',
                duration: 1
            }, 'stage2');
        },
        stage4() {
            gsap.timeline({
                scrollTrigger: {
                    trigger: "#storyBlock4",
                    start: "top bottom",
                    end: "top center",
                    markers: false,
                    scrub: 2,
                }
            })
            .from("#storyBlock4", {
                opacity: 0,
                duration: 1 
            }, 'stage1')

            gsap.timeline({
                scrollTrigger: {
                    trigger: "#storyBlock4",
                    endTrigger: "#since_4",
                    start: "top center",
                    end: "center center",
                    markers: false,
                    scrub: 2,
                }
            })
            .from("#text_1", {
                opacity: 0,
                duration: 1
            }, 'stage1')
            .from("#lou", {
                opacity: 0,
                scale: 0.8,
                duration: 1
            }, 'stage2')
            .from("#blade", {
                opacity: 0,
                duration: 1
            }, 'stage3')
            .from("#bladeLight", {
                opacity: 0,
                duration: 1
            }, 'stage3')
            .from("#text_2", {
                opacity: 0,
                duration: 1
            }, 'stage4')
        },
        stage5() {
            gsap.timeline({
                scrollTrigger: {
                    trigger: "#storyBlock5",
                    start: "top bottom",
                    end: "center bottom",
                    markers: false,
                    scrub: 2,
                }
            })
            .from("#logo", {
                opacity: 0,
                duration: 1 
            }, 'stage1')
        },
        spark(){
            // when animating on canvas, it is best to use requestAnimationFrame instead of setTimeout or setInterval
            // not supported in all browsers though and sometimes needs a prefix, so we need a shim
            // window.requestAnimFrame = (() => {
            //     return window.requestAnimationFrame;
            // })();

            // now we will setup our basic variables for the demo
            var canvas = document.getElementById( 'spark' ),
                    ctx = canvas.getContext( '2d' ),
                    // full screen dimensions
                    cw = window.innerWidth,
                    ch = window.innerWidth*1.5,
                    // firework collection
                    fireworks = [],
                    // particle collection
                    particles = [],
                    // starting hue
                    hue = 0,
                    // when launching fireworks with a click, too many get launched at once without a limiter, one launch per 5 loop ticks
                    limiterTotal = 5,
                    limiterTick = 0,
                    // this will time the auto launches of fireworks, one launch per 80 loop ticks
                    timerTotal = 80,
                    timerTick = 0,
                    mousedown = false,
                    // mouse x coordinate,
                    mx,
                    // mouse y coordinate
                    my;
                    
            // set canvas dimensions
            canvas.width = cw;
            canvas.height = ch;

            // now we are going to setup our function placeholders for the entire demo

            // get a random number within a range
            function random( min, max ) {
                return Math.random() * ( max - min ) + min;
            }

            // calculate the distance between two points
            function calculateDistance( p1x, p1y, p2x, p2y ) {
                var xDistance = p1x - p2x,
                        yDistance = p1y - p2y;
                return Math.sqrt( Math.pow( xDistance, 2 ) + Math.pow( yDistance, 2 ) );
            }

            // create firework
            function Firework( sx, sy, tx, ty ) {
                // actual coordinates
                this.x = sx;
                this.y = sy;
                // starting coordinates
                this.sx = sx;
                this.sy = sy;
                // target coordinates
                this.tx = tx;
                this.ty = ty;
                // distance from starting point to target
                this.distanceToTarget = calculateDistance( sx, sy, tx, ty );
                this.distanceTraveled = 0;
                // track the past coordinates of each firework to create a trail effect, increase the coordinate count to create more prominent trails
                this.coordinates = [];
                this.coordinateCount = 3;
                // populate initial coordinate collection with the current coordinates
                while( this.coordinateCount-- ) {
                    this.coordinates.push( [ this.x, this.y ] );
                }
                this.angle = Math.atan2( ty - sy, tx - sx );
                this.speed = 2;
                this.acceleration = 1.05;
                this.brightness = random( 50, 70 );
                // circle target indicator radius
                this.targetRadius = 1;
            }

            // update firework
            Firework.prototype.update = function( index ) {
                // remove last item in coordinates array
                this.coordinates.pop();
                // add current coordinates to the start of the array
                this.coordinates.unshift( [ this.x, this.y ] );
                
                // cycle the circle target indicator radius
                if( this.targetRadius < 8 ) {
                    this.targetRadius += 0.3;
                } else {
                    this.targetRadius = 1;
                }
                
                // speed up the firework
                this.speed *= this.acceleration;
                
                // get the current velocities based on angle and speed
                var vx = Math.cos( this.angle ) * this.speed,
                        vy = Math.sin( this.angle ) * this.speed;
                // how far will the firework have traveled with velocities applied?
                this.distanceTraveled = calculateDistance( this.sx, this.sy, this.x + vx, this.y + vy );
                
                // if the distance traveled, including velocities, is greater than the initial distance to the target, then the target has been reached
                if( this.distanceTraveled >= this.distanceToTarget ) {
                    createParticles( this.tx, this.ty );
                    // remove the firework, use the index passed into the update function to determine which to remove
                    fireworks.splice( index, 1 );
                } else {
                    // target not reached, keep traveling
                    this.x += vx;
                    this.y += vy;
                }
            }

            // draw firework
            Firework.prototype.draw = function() {
                ctx.beginPath();
                // move to the last tracked coordinate in the set, then draw a line to the current x and y
                ctx.moveTo( this.coordinates[ this.coordinates.length - 1][ 0 ], this.coordinates[ this.coordinates.length - 1][ 1 ] );
                ctx.lineTo( this.x, this.y );
                ctx.strokeStyle = 'hsl(' + hue + ', 100%, ' + this.brightness + '%)';
                ctx.stroke();
                
                ctx.beginPath();
                // draw the target for this firework with a pulsing circle
                ctx.arc( this.tx, this.ty, this.targetRadius, 0, Math.PI * 2 );
                ctx.stroke();
            }

            // create particle
            function Particle( x, y ) {
                this.x = x;
                this.y = y;
                // track the past coordinates of each particle to create a trail effect, increase the coordinate count to create more prominent trails
                this.coordinates = [];
                this.coordinateCount = 4 ;
                while( this.coordinateCount-- ) {
                    this.coordinates.push( [ this.x, this.y ] );
                }
                // set a random angle in all possible directions, in radians
                this.angle = random( 2, Math.PI * 10 );
                this.speed = random( 1, 10 );
                // friction will slow the particle down
                this.friction = 1;
                // gravity will be applied and pull the particle down
                this.gravity = -3;
                // set the hue to a random number +-20 of the overall hue variable
                this.hue = random( hue - 20, hue + 20 );
                this.brightness = 100;//random( 60, 100 );
                this.alpha = 1;
                // set how fast the particle fades out
                this.decay = (ratio > 1) ? random( 0.001, 1 ):random( 0.001, 3 );
            }

            // update particle
            Particle.prototype.update = function( index ) {
                // remove last item in coordinates array
                this.coordinates.pop();
                // add current coordinates to the start of the array
                this.coordinates.unshift( [ this.x, this.y ] );
                // slow down the particle
                this.speed *= this.friction;
                // apply velocity
                this.x += Math.cos( this.angle ) * this.speed;
                this.y += Math.sin( this.angle ) * this.speed + this.gravity;
                // fade out the particle
                this.alpha -= this.decay;
                
                // remove the particle once the alpha is low enough, based on the passed in index
                if( this.alpha <= this.decay ) {
                    particles.splice( index, 1 );
                }
            }



            // draw particle
            Particle.prototype.draw = function() {
                
            ctx. beginPath();
                // move to the last tracked coordinates in the set, then draw a line to the current x and y
                ctx.moveTo( this.coordinates[ this.coordinates.length - 1 ][ 0 ], this.coordinates[ this.coordinates.length - 1 ][ 1 ] );
                ctx.lineTo( this.x, this.y );
                ctx.strokeStyle = 'hsla(' + this.hue + ', 100%, ' + this.brightness + '%, ' + this.alpha + ')';
                ctx.stroke();
            
            
            }

            // create particle group/explosion
            function createParticles( x, y ) {
                // increase the particle count for a bigger explosion, beware of the canvas performance hit with the increased particles though
                var particleCount = 30;
                while( particleCount-- ) {
                    particles.push( new Particle( x, y ) );
                }
            }

            loop();
            // main demo loop
            function loop() {
                // this function will run endlessly with requestAnimationFrame
                // requestAnimFrame( loop );
                window.requestAnimationFrame(loop);
                
                // increase the hue to get different colored fireworks over time
                hue += 0;
                
                // normally, clearRect() would be used to clear the canvas
                // we want to create a trailing effect though
                // setting the composite operation to destination-out will allow us to clear the canvas at a specific opacity, rather than wiping it entirely
                ctx.globalCompositeOperation = 'destination-out';
                // decrease the alpha property to create more prominent trails
                ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
                ctx.fillRect( 0, 0, cw, ch );
                // change the composite operation back to our main mode
                // lighter creates bright highlight points as the fireworks and particles overlap each other
                ctx.globalCompositeOperation = 'lighter';
                
            
                // loop over each firework, draw it, update it
                var i = fireworks.length;
                while( i-- ) {
                    fireworks[ i ].draw();
                    fireworks[ i ].update( i );
                }
                
                // loop over each particle, draw it, update it
                var i = particles.length;
                while( i-- ) {
                    particles[ i ].draw();
                    particles[ i ].update( i );
                }
                
                // for(var h=0;h<1;h++)
                //   {
                //        fireworks.push( new Firework( cw / 2, ch/2, cw / 2, ch/2 ) );
                //   }
                fireworks.push( new Firework( cw / 1.7, cw/1.13, cw / 1.7, cw/1.13 ) );
            }

            // once the window loads, we are ready for some fireworks!
            window.onload = loop;


        },
        fire(){
            var	c = document.getElementById( 'fire' ),
                $ = c.getContext( '2d' );			
                c.width  = window.innerWidth;
                c.height = window.innerWidth;

            var msX = window.innerWidth / 2,
                msY = window.innerWidth / 2,
                arr = [],
                num = 15;

            anim();
            var cnt = 0;
            function anim() {
                window.requestAnimationFrame(anim);
                if (cnt % 2 == 0) draw(10);		
                cnt++;
                $.globalCompositeOperation = 'destination-out';
                $.fillStyle = 'rgba(0, 0, 0, 0.5)';
                $.fillRect(0,0, c.width, c.height);
                for (i=0; i<arr.length; i++) {
                    var a = arr[i]; 
                    a.disp($); 
                    a.upd();	
                }	
                while(arr.length>num) arr.shift(); 
            }
                
            function draw(_cnt) {
                for(var i=0; i<_cnt;i++) {
                    var a = new _img(img, msX, msY); 
                    a.vx = rnd(-60,60);
                    a.vy = 0;
                    a.sz = rnd(0.7,0.9);
                    a.max = 1.5; 
                    a.alpha = 0.8;
                    a.grav = -1; 
                    a.drag = 0.8;
                    a.min = 1; 
                    a.fade = 0.01; 
                    a.rot = rnd(0,2);
                    a.spin = rnd(-1,1); 
                    a.compositeOperation = 'lighter'; 
                    arr.push(a); 				
                }
            }
            function _img(img, px, py) {
                this._px = px; 
                this._py = py; 
                this.vx = 0; 
                this.vy = 0; 
                this.min = 1; 
                this.sz = 1; 
                this.max = -1;
                this.shim = false;	
                this.drag = 1; 
                this.grav = 0; 
                this.alpha = 1; 
                this.fade = 0; 
                this.spin = 0; 
                this.rot = 0; 
                this.compositeOperation = 'source-over';
                this.img = img; 
                this.upd = function() {
                    this.vx *= this.drag; 
                    this.vy *= this.drag;
                    this.vy += this.grav; 
                    this._px += this.vx;
                    this._py += this.vy; 
                    this.sz *= this.min;
                    if((this.max>0) && (this.sz>this.max))
                        this.sz = this.max; 
                    this.alpha -= this.fade; 	
                    if(this.alpha<0) this.alpha = 0; 
                    this.rot += this.spin; 
                };
                this.disp = function($$) {
                    if(this.alpha ==0) return;
                    $$.save(); 
                    $$.translate(this._px, this._py);
                    var s = this.shim ? this.sz * Math.random() : this.sz;
                    // $$.scale(s,s);
                    $$.scale(1*scaleRatio,0.5*scaleRatio);
                    $$.rotate(this.rot * (Math.PI / 90));
                    $$.translate(img.width*-0.5, img.width*-0.5);
                    $$.globalAlpha = this.alpha; 
                    $$.globalCompositeOperation = this.compositeOperation;
                    $$.drawImage(img,0,0);
                    $$.restore();			
                };
            }
            img = new Image();
            img.src= 'img/firestar.png';
            function rnd(min, max) {
                return ((Math.random()*(max-min)) + min); 
            }
        },
        snow(){
            const snowflake = this.data.snowBitmap
            const holder = document.querySelector( '#snow' )
            const count = 2000

            let wind = {
            current: 0,
            force: 0.1,
            target: 0.1,
            min: 0.1,
            max: 0.25,
            easing: 0.005
            }

            const snow = new ShaderProgram( holder, {
            depthTest: false,
            texture: snowflake,
            uniforms: {
                worldSize: { type: 'vec3', value: [ 0, 0, 0 ] },
                gravity: { type: 'float', value: 100 },
                wind:{ type: 'float', value: 0 },
            },
            buffers: {
                size: { size: 1, data: [] },
                rotation: { size: 3, data: [] },
                speed: { size: 3, data: [] },
            },
            vertex: `
                precision highp float;

                attribute vec4 a_position;
                attribute vec4 a_color;
                attribute vec3 a_rotation;
                attribute vec3 a_speed;
                attribute float a_size;

                uniform float u_time;
                uniform vec2 u_mousemove;
                uniform vec2 u_resolution;
                uniform mat4 u_projection;
                uniform vec3 u_worldSize;
                uniform float u_gravity;
                uniform float u_wind;

                varying vec4 v_color;
                varying float v_rotation;

                void main() {

                v_color = a_color;
                v_rotation = a_rotation.x + u_time * a_rotation.y;

                vec3 pos = a_position.xyz;

                pos.x = mod(pos.x + u_time + u_wind * a_speed.x, u_worldSize.x * 2.0) - u_worldSize.x;
                pos.y = mod(pos.y - u_time * a_speed.y * u_gravity, u_worldSize.y * 2.0) - u_worldSize.y;

                pos.x += sin(u_time * a_speed.z) * a_rotation.z;
                pos.z += cos(u_time * a_speed.z) * a_rotation.z;

                gl_Position = u_projection * vec4( pos.xyz, a_position.w );
                gl_PointSize = ( a_size / gl_Position.w ) * 100.0;

                }`,
            fragment: `
                precision highp float;

                uniform sampler2D u_texture;

                varying vec4 v_color;
                varying float v_rotation;

                void main() {

                vec2 rotated = vec2(
                    cos(v_rotation) * (gl_PointCoord.x - 0.5) + sin(v_rotation) * (gl_PointCoord.y - 0.5) + 0.5,
                    cos(v_rotation) * (gl_PointCoord.y - 0.5) - sin(v_rotation) * (gl_PointCoord.x - 0.5) + 0.5
                );

                vec4 snowflake = texture2D(u_texture, rotated);

                gl_FragColor = vec4(snowflake.rgb, snowflake.a * v_color.a);

                }`,
            onResize( w, h, dpi ) {
                const position = [], color = [], size = [], rotation = [], speed = []

                // z in range from -80 to 80, camera distance is 100
                // max height at z of -80 is 110
                const height = 110
                const width = w / h * height
                const depth = 80

                Array.from( { length: w / h * count }, snowflake =>  {

                position.push(
                    -width + Math.random() * width * 2,
                    -height + Math.random() * height * 2,
                    Math.random() * depth * 2
                )

                speed.push(// 0, 0, 0 )
                    1 + Math.random(),
                    1 + Math.random(),
                    Math.random() * 10
                ) // x, y, sinusoid

                rotation.push(
                    Math.random() * 2 * Math.PI,
                    Math.random() * 20,
                    Math.random() * 10
                ) // angle, speed, sinusoid

                color.push(
                    1,
                    1,
                    1,
                    0.1 + Math.random() * 0.2
                )

                size.push(
                    5 * Math.random() * 5 * ( h * dpi / 1000 )
                )

                } )

                this.uniforms.worldSize = [ width, height, depth ]

                this.buffers.position = position
                this.buffers.color = color
                this.buffers.rotation = rotation
                this.buffers.size = size
                this.buffers.speed = speed
            },
            onUpdate( delta ) {
                wind.force += ( wind.target - wind.force ) * wind.easing
                wind.current += wind.force * ( delta * 0.2 )
                this.uniforms.wind = wind.current

                if ( Math.random() > 0.995 ) {
                wind.target = ( wind.min + Math.random() * ( wind.max - wind.min ) ) * ( Math.random() > 0.5 ? -1 : 1 )
                }

                // stats.update()
            },
            } )
        },
    };

    app.init();

    function screenRatio(){
        return $(window).width()/$(window).height()
    }

    function detectMobile(){
        return window.matchMedia("(max-width: 780px)").matches || /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)
    }
})(jQuery);