let textVnizuKnopki = document.querySelectorAll(".textVnizu");
let playBut= document.querySelectorAll(".playBut");

playBut.forEach((button) => {
    button.addEventListener("click", () => {
        for(let i = 0; i < textVnizuKnopki.length; i++) {
            textVnizuKnopki[i].style.opacity = 1;
            transition = 5;
        }
    });
    });

// canva
    (function(){

        var canvas = document.createElement("canvas"),
            ctx = canvas.getContext("2d"),
            w = canvas.width = innerWidth,
            h = canvas.height = innerHeight,
            particles = [],
            properties = {
                bgColor           : "#000000",
                particleColor     : "rgba(0, 255, 0, 1)",
                particleRadius    : 3,
                particleCount     : 60,
                particleMaxVelocity: 0.5,
                lineLength        : 150,
                particleLife      : 6
            };

        document.querySelector("body").appendChild(canvas);

// Kui akna suurust muudetakse
        window.onresize = function(){
            w = canvas.width = innerWidth;
            h = canvas.height = innerHeight;
        };
// üks osake
        class Particle {
            constructor(){
                this.x = Math.random() * w;
                this.y = Math.random() * h;
                this.velocityX = Math.random()*(properties.particleMaxVelocity*2)-properties.particleMaxVelocity;
                this.velocityY = Math.random()*(properties.particleMaxVelocity*2)-properties.particleMaxVelocity;
                this.life = Math.random() * properties.particleLife * 60;
            }

            position(){
                this.x += this.velocityX;
                this.y += this.velocityY;
                this.life--;
            }
            reDraw(){
                ctx.beginPath();
                ctx.arc(this.x, this.y, properties.particleRadius, 0, Math.PI*2);
                ctx.closePath();
                ctx.fillStyle = properties.particleColor;
                ctx.fill();
            }
            reCalculateLife(){
                if(this.life < 1){
                    this.x = Math.random() * w;
                    this.y = Math.random() * h;
                    this.velocityX = Math.random()*(properties.particleMaxVelocity*2)-properties.particleMaxVelocity;
                    this.velocityY = Math.random()*(properties.particleMaxVelocity*2)-properties.particleMaxVelocity;
                    this.life = Math.random() * properties.particleLife * 60;
                }
            }
        }

        function reDrawBackground(){
            ctx.fillStyle = properties.bgColor;
            ctx.fillRect(0, 0, w, h);
        }

        function reDrawParticles(){
            for(let i in particles){
                particles[i].reCalculateLife();
                particles[i].position();
                particles[i].reDraw();
                for(let j in particles){
                    const distance = Math.sqrt(
                        (particles[i].x - particles[j].x) ** 2 +
                        (particles[i].y - particles[j].y) ** 2
                    );
                    if(distance > properties.lineLength) continue;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.closePath();
                    ctx.strokeStyle = properties.particleColor;
                    ctx.lineWidth = (1 - distance / properties.lineLength) * 2.5;
                    ctx.stroke();
                }
            }
        }
// joonistamine
        function loop(){
            reDrawBackground();
            reDrawParticles();
            requestAnimationFrame(loop);
        }

        function init(){
            for(let i = 0; i < properties.particleCount; i++){
                particles.push(new Particle);
            }
            loop();
        }

        init();

    }());
