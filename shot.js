var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var width = canvas.width;
var height = canvas.height;
var loop ;
var posx = 10,
    posy = height / 2;
var imag_enemy, x, y, s;
var right = false,
    left = false,
		up = false,
		border = false,
		re = false,
		bba = false;
var shoot = [],
		myshoot = {radius : 5, sposx : 0, sposy : 0, speed : 10};
var enemies = [];
var score = 0,
		bosshp = 3000;
var iposx = 950,
		iposy = 20,
		i_interval = 1000,
		i_px = 15,
		i_mo = 2;
var eshoot = [],
		eneshoot = {radius : 5, bposx : 0, bposy : 0, speed : 10};
var dx = 2,
		dy = 4;
var	boss_shoot = [],
		boss_shoot2 = [];



img_plane = new Image();
img_plane.src = "http://maku-cam2.jiu.ac.jp/~wataru/sozai/teramotodan.png";
img_plane.onload = function(){
	imageLoadDone = true;
}

img_enemy = new Image();
img_enemy.src = "http://maku-cam2.jiu.ac.jp/~hiroki/jiu.png";
img_enemy.onlode = function() {
	imageLoadDone = true;
}

img_utyu = new Image();
img_utyu.src = "http://maku-cam2.jiu.ac.jp/~hiroki/utyu.jpg";
img_utyu.onlode = function() {
	imageLoadDone = true;
}


img_boss = new Image();
img_boss.src = "http://maku-cam2.jiu.ac.jp/~hiroki/boss.png";
img_boss.onlode = function() {
	imageLodeDone = true;
}

img_logo = new Image();
	img_logo.src = "http://maku-cam2.jiu.ac.jp/~hiroki/jiu2.png";
	img_logo.onlode = function(){
		imageLodeDone = true;
	}


function game (){
 
  context.clearRect(0, 0, width, height);
	bgi();
	plane();
		if(score < 30){ 
	context.drawImage(img_logo,660,5);
	score_s();
	c_shoot();
  c_enemies();
	createEnemy();
	moveEnemy();
	myhit();
	utu();	
	hit();
	enemyshoot();
}
		if(score >= 30){
		  context.clearRect(0, 0, width, height );
			window.onkeydown = false;
  		clearInterval(loop);
			loop2 = setInterval(game2,50);
    }
}

function game2 () {
	context.clearRect(0, 0, width, height);
	bgi();
	plane2();
	b_hp();
	boss();
	utu();
	bossdame();
	boss_limit();
	 if(iposx <= 500){
	 bossbullet_a();
	 }
	boss_myhit();
	boss_bhit();
	 
}

function plane() {
	context.drawImage(img_plane, posx, posy);
	if (right) posx += 12;
	else if(left) posx -= 12;
	if(up) posy -= 12;
	else if(border) posy += 12;
	if(posx <= 0) posx = 0;
	if(posx + img_plane.width>= width) posx = width - img_plane.width;
	if(posy <= 0) posy = 0;
	if(posy + img_plane.height>= height) posy = height - img_plane.height;
	}

function plane2() {
	context.drawImage(img_plane, posx, posy);
	context.fillStyle = "rgba(255, 220, 220, 0.8)";
	context.beginPath();
	context.arc(posx + 37, posy + 33, 6, 0, Math.PI*2, true);
	context.closePath();
	context.fill();
	if (right) posx += 12;
	else if(left) posx -= 12;
	if(up) posy -= 12;
	else if(border) posy += 12;
	if(posx <= 0) posx = 0;
	if(posx + img_plane.width>= width) posx = width - img_plane.width;
	if(posy <= 0) posy = 0;
	if(posy + img_plane.height>= height) posy = height - img_plane.height;
	}

function utu() {
	for(var i = 0; i < shoot.length; i++){
		var ballet = shoot[i];
		ballet.sposx += ballet.speed;
		context.fillStyle = '#ffffff';
		context.fillRect(ballet.sposx, ballet.sposy, ballet.radius, ballet.radius);
	}
}

function enemyshoot() {
	for(var i = 0;i < eshoot.length; i++){
		var eball = eshoot[i];
		eball.bposx -= eball.speed;
		context.fillStyle = '#ff0000';
		context.fillRect(eball.bposx, eball.bposy, eball.radius, eball.radius);
 }
}

function createEnemy() {
	var num = (Math.floor(Math.random() * 100)% 100);
		if(30 > num && num < 50){
			var s = num;
			var y = ((height - 50)* Math.random());
			var x = width;
			var enemy = {img : img_enemy, eposx : x, eposy : y, speed : s};
			enemies.push(enemy);
			}
}

function moveEnemy() {
	for(var i = 0; i < enemies.length; i++){
		var enemy = enemies[i];
		enemy.eposx -= enemy.speed;
		context.drawImage(enemy.img, enemy.eposx, enemy.eposy);
	}
}

function hit () {
	var remove = false;
		for(var i = 0; i < shoot.length; i++){
			for(var j = 0; j < enemies.length; j++){
			var s = shoot[i];
			var e = enemies[j];
			if((s.sposx + s.radius) >= e.eposx
			&& s.sposy <= e.eposy + e.img.width
			&& s.sposy >= e.eposy){
      remove = true;
			enemies.splice(j,1);
			score += 1;
       	var new_enemyshoot = {
					radius : 5, bposx : e.eposx - 10, bposy : e.eposy , speed : 10
			  };
				eshoot.push(new_enemyshoot);
			}
	    }
		if (remove == true){
			shoot.splice(i,1);
			remove = false;
  	}
		}
}

function score_s() {
	context.font = 'bold 17px Arial';
	context.fillStyle = '#ffffff';
	context.fillText('x', 700,20);
	context.fillText(score,740,20);
}

function b_hp() {
	context.font = 'bold 17px Arial';
	context.fillStyle = '#ffffff';
	context.fillText('HP', 700,20);
	context.fillText(bosshp, 740, 20);
}

function myhit() {
	var px = posx;
	var py = posy;
	var pw = img_plane.width;
	var ph = img_plane.height;
   for(var j = 0;j < eshoot.length; j++){
	 for(var i = 0;i < enemies.length; i++){
	 
	  var ex = enemies[i].eposx;
		var ey = enemies[i].eposy + enemies[i].img.height/2;
		var ebx = eshoot[j].bposx;
		var eby = eshoot[j].bposy;
		if((px <= ex && ex <= px + pw)&&(py <= ey && ey <= py + ph)){
			enemies.splice(i,1);
			delete plane;
		 	eshoot.splice(j,1);
			clearInterval(loop);
			bba = true;
			context.font = 'bold 42px Arial';
			context.fillStyle = '#ff0000';
			context.fillText('Game Over', 300,200);
		}

		if((px <= ebx && ebx <= px + pw)&&(py <= eby && eby <= py + ph)){
			enemies.splice(i,1);
			delete plane;
		 	eshoot.splice(j,1);
			clearInterval(loop);
			bba = true;
			context.font = 'bold 42px Arial';
			context.fillStyle = '#ff0000';
			context.fillText('Game Over', 300,200);

	 	}
   }
	 }
}

function c_enemies() {
	var new_enemies = [];
		for (var i = 0; i < enemies.length; i++) {
			if (enemies[i]) {
				var e = enemies[i];
					if (e.eposx + e.img.width > 0)
								new_enemies.push(enemies[i]);
			}
		}	
				enemies = new_enemies;
}


function c_shoot() {
	var new_shoot = [];
		for (var i = 0; i < shoot.length; i++) {
		 if(shoot[i]) {
		 	var s = shoot[i];
			  
				if(s.sposx > width + 10 || s.sposy > height + 10){
					delete shoot[i];
					}else{
						new_shoot.push(shoot[i]);
					}
		 }
		}
			shoot = new_shoot;
	}

function boss() {
	context.drawImage(img_boss, iposx, iposy);
	if(iposx > 500){
		iposx -= i_px;
	}
		iposy += dx;
		if((iposy >= 80) || (iposy <= -20)){
			dx = -dx;
		}

	window.onkeydown = keyDown;
}

	

function bossdame() {
	var tx = iposx;
	var ty = iposy;
	for(var i = 0; i < shoot.length; i++){
	sx = shoot[i].sposx;
	sy = shoot[i].sposy;

  if((sx >= tx) && (sx <= tx + img_boss.width)
		&& (sy >= ty) && (sy <= ty + height)){
		bosshp -= 10;
		shoot.splice(i,1);
		
			if(bosshp == -10){
				alert("complete!!");
				clearInterval(loop2);
				}
				
	}
}
}

function boss_limit() {
	if(bosshp <= 1000){
		iposx -= i_mo;
		}
}

function boss_myhit(){
	var px = posx ;
	var py = posy ;
	var tx = iposx;
	var ty = iposy;
	if((px + img_plane.width >= tx + 20) && (py + img_plane.height >= ty)){
			clearInterval(loop2);
			bba = true;
			context.font = 'bold 42px Arial';
			context.fillStyle = '#ffffff';
			context.fillText('Game Over', 300,200);

	}
}

function boss_bhit(){
	var px = posx + 31;
	var py = posy + 27;
	for (var i = 0; i < boss_shoot.length; i++){
	var bsx = boss_shoot[i].x ;
	var	bsy = boss_shoot[i].y ;
		if((bsx >= px) && (px + 12 >= bsx)
				&& (bsy >= py) && (py + 12 >= bsy)){
				boss_shoot.splice(i,1);
				clearInterval(loop2);
				bba = true;
				context.font = 'bold 42px Arial';
				context.fillStyle = '#ffffff';
				context.fillText('Game Over', 300,200);

		}
	}
}

function c_bossshoot(x, y, w, h, dx, dy) {
	 this.x = x;
	 this.y = y;
	 this.w = w;
	 this.h = h;
	 this.dx = dx;
	 this.dy = dy;
	 this.draw = _draw;
	 this.move = _move;
					return;
	
				function _draw() {
			     context.fillStyle = '#ff0000';
		       context.beginPath();	
					 context.arc(this.x, this.y, this.w, this.h, Math.PI*2, true);
			     context.closePath();
					 context.fill();
				 }										
 						function _move() {
						//console.log(this.y +":"+ this.x);
								this.x -= this.dx;
								this.y -= this.dy;
								
					// if(this.y + this.h > height || 0 > this.y){
						//	 this.dy = -this.dy;
					 // }
			}
}



function b_bullet(){
	boss_shoot[boss_shoot.length] = new c_bossshoot(iposx, iposy+200, 10, 0, 8, 2);
	boss_shoot[boss_shoot.length] = new c_bossshoot(iposx, iposy+200, 10, 0, 8, -2);
	boss_shoot[boss_shoot.length] = new c_bossshoot(iposx, iposy+200 , 10, 0, 10, -1);
	boss_shoot[boss_shoot.length] = new c_bossshoot(iposx, iposy+200 , 10, 0, 10, 1);
	boss_shoot[boss_shoot.length] = new c_bossshoot(iposx, iposy+200 , 10, 0, 50, 0);
	boss_shoot[boss_shoot.length] = new c_bossshoot(iposx, iposy+200 , 10, 0, 10, 3);
  boss_shoot[boss_shoot.length] = new c_bossshoot(iposx, iposy+200 , 10, 0, 10, -3);
  boss_shoot[boss_shoot.length] = new c_bossshoot(iposx, iposy+200 , 10, 0, 3, 20);
  boss_shoot[boss_shoot.length] = new c_bossshoot(iposx, iposy+200 , 10, 0, 3, -20);
  boss_shoot[boss_shoot.length] = new c_bossshoot(iposx, iposy+200 , 10, 0, 8, 8);
  boss_shoot[boss_shoot.length] = new c_bossshoot(iposx, iposy+200 , 10, 0, 8, -8);
  boss_shoot[boss_shoot.length] = new c_bossshoot(iposx, iposy+200 , 10, 0, 8, 7);
  boss_shoot[boss_shoot.length] = new c_bossshoot(iposx, iposy+200 , 10, 0, 8, -7);
  boss_shoot[boss_shoot.length] = new c_bossshoot(iposx, iposy+200 , 10, 0, 10, -6);
  boss_shoot[boss_shoot.length] = new c_bossshoot(iposx, iposy+200 , 10, 0, 10, 6);


	setTimeout(b_bullet,500);
}

function bossbullet_a() {
	for (var i = 0; i < boss_shoot.length; i++){
		boss_shoot[i].draw();
		boss_shoot[i].move();
		}
}

function bgi() {
	context.drawImage(img_utyu, 0, 0)
}



function keyDown(evt){
	if(evt.keyCode == 39) right = true;
	else if(evt.keyCode == 37) left = true;
	else if(evt.keyCode == 38) up = true;
	else if(evt.keyCode == 40) border = true;
	else if(evt.keyCode == 13 && bba){
	bba = false;
	location.reload();
	}
	if(evt.keyCode == 90) {
		var newshoot = {
			radius : 5, sposx : posx + 25, sposy : posy + 30, speed : 10
		};
	shoot.push(newshoot);
	}
}

function rew() {
	if(re){
	location.reload();
	}
}

function keyUp(evt){
	if(evt.keyCode == 39) right = false;
	else if(evt.keyCode == 37) left = false;
	else if(evt.keyCode == 38) up = false;
	else if(evt.keyCode == 40) border =false;
	else if(evt.keyCode == 13) re = false;
}

window.onkeydown = keyDown;
window.onkeyup = keyUp;
b_bullet();
loop = setInterval(game,50);
