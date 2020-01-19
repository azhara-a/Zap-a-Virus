game.Player = me.Sprite.extend({
    init: function() {
        const image = me.loader.getImage("player");
        this._super(me.Sprite, "init", [
            me.game.viewport.width / 2 - image.width / 2,
            me.game.viewport.height - image.height - 20,
            { image : image }
        ]);
        // this.shoot();
        this.velx = 450;
        this.maxX = me.game.viewport.width - this.width;
        this.body = new me.Body(this);
        this.body.collisionType = me.collision.types.PLAYER_OBJECT;

        me.timer.setInterval(this.shoot.bind(this), 200, true);
    },

    shoot: function() {
        me.game.world.addChild(me.pool.pull("laser", this.pos.x - game.Laser.width, this.pos.y - game.Laser.height))
    },

    update: function(time) {

        this._super(me.Sprite, "update", [time]);
        if (me.input.isKeyPressed("left")) {
            this.pos.x -= this.velx * time / 1000;
        }

        if (me.input.isKeyPressed("right")) {
            this.pos.x += this.velx * time / 1000;
        }


        this.pos.x = me.Math.clamp(this.pos.x, 0, this.maxX);

        return true;
    },

    onCollision: function(res, other) {
        if (other.body.collisionType === me.collision.types.ENEMY_OBJECT) {
            console.log("here");
            me.game.PlayScreen.reset();
            return false;
        }

    }

    
});