var BulletFactory = (function() {
  function buildBullet(player) {
    var bulletDirection = { 
      x: -Math.cos(player.getRotation() * (Math.PI / 180)),
      y: Math.sin(player.getRotation() * (Math.PI / 180)),
    };
    var bulletPosition = { 
      x: player.getCenter().x,
      y: player.getCenter().y
    };
    var bullet = new Bullet(bulletPosition, bulletDirection)
    bullet.init();
    return bullet;
  }

  return {
    buildBullet: buildBullet 
  }
});
